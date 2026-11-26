import type { LatestReplayItem } from "@/lib/arcade-stats";

export const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
] as const;

export interface DownloadedAsset {
  filename: string;
  cid: string;
  data: Uint8Array;
  fromCache: boolean;
}

export interface IpfsDownloadProgress {
  currentFile: string;
  fileIndex: number;
  totalFiles: number;
  loadedBytes: number;
  totalBytes: number;
  percent: number;
  gateway: string;
  fromCache: boolean;
}

const DB_NAME = "balddog-roms-cache";
const STORE_NAME = "roms";
const DB_VERSION = 1;

function openCacheDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getCachedAsset(cid: string): Promise<Uint8Array | null> {
  try {
    const db = await openCacheDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(cid);
      req.onsuccess = () => {
        const val = req.result;
        resolve(val instanceof Uint8Array ? val : null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function putCachedAsset(cid: string, data: Uint8Array): Promise<void> {
  try {
    const db = await openCacheDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(data, cid);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // Ignorar errores de cuota o modo incógnito
  }
}

async function downloadSingleAsset(
  filename: string,
  cid: string,
  expectedSizeBytes: number,
  fileIndex: number,
  totalFiles: number,
  onProgress: (p: IpfsDownloadProgress) => void,
  signal?: AbortSignal
): Promise<DownloadedAsset> {
  const cached = await getCachedAsset(cid);
  if (cached && cached.byteLength > 0) {
    onProgress({
      currentFile: filename,
      fileIndex,
      totalFiles,
      loadedBytes: cached.byteLength,
      totalBytes: cached.byteLength,
      percent: 100,
      gateway: "Caché local (IndexedDB)",
      fromCache: true,
    });
    return { filename, cid, data: cached, fromCache: true };
  }

  let lastError: Error | null = null;

  for (const gateway of IPFS_GATEWAYS) {
    if (signal?.aborted) {
      throw new DOMException("Descarga cancelada", "AbortError");
    }
    const url = `${gateway}${cid}`;
    try {
      const response = await fetch(url, { signal, mode: "cors" });
      if (!response.ok || !response.body) {
        lastError = new Error(`HTTP ${response.status} en ${gateway}`);
        continue;
      }

      const contentLengthHeader = response.headers.get("Content-Length");
      const totalBytes =
        contentLengthHeader && Number(contentLengthHeader) > 0
          ? Number(contentLengthHeader)
          : Math.max(expectedSizeBytes, 1);

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let loadedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          loadedBytes += value.byteLength;
          const percent = Math.min(
            99,
            Math.round((loadedBytes / totalBytes) * 100)
          );
          onProgress({
            currentFile: filename,
            fileIndex,
            totalFiles,
            loadedBytes,
            totalBytes,
            percent,
            gateway: new URL(gateway).hostname,
            fromCache: false,
          });
        }
      }

      const combined = new Uint8Array(loadedBytes);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.byteLength;
      }

      onProgress({
        currentFile: filename,
        fileIndex,
        totalFiles,
        loadedBytes,
        totalBytes: loadedBytes,
        percent: 100,
        gateway: new URL(gateway).hostname,
        fromCache: false,
      });

      await putCachedAsset(cid, combined);
      return { filename, cid, data: combined, fromCache: false };
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw err;
      }
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw (
    lastError ??
    new Error(`No se pudo descargar ${filename} desde ningún gateway IPFS.`)
  );
}

/**
 * Descarga ordenadamente BIOS (si aplica), ROM padre (si es clon) y ROM principal desde IPFS.
 */
export async function downloadGameAssetsFromIpfs(
  replay: LatestReplayItem,
  onProgress: (p: IpfsDownloadProgress) => void,
  signal?: AbortSignal
): Promise<DownloadedAsset[]> {
  const queue: Array<{ filename: string; cid: string; sizeBytes: number }> = [];

  if (replay.bios) {
    queue.push({
      filename: replay.bios.rom_filename,
      cid: replay.bios.ipfs_cid,
      sizeBytes: replay.bios.size_bytes,
    });
  }
  if (replay.parent) {
    queue.push({
      filename: replay.parent.rom_filename,
      cid: replay.parent.ipfs_cid,
      sizeBytes: replay.parent.size_bytes,
    });
  }
  queue.push({
    filename: replay.rom_filename,
    cid: replay.ipfs_cid,
    sizeBytes: replay.size_bytes,
  });

  const results: DownloadedAsset[] = [];
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const asset = await downloadSingleAsset(
      item.filename,
      item.cid,
      item.sizeBytes,
      i + 1,
      queue.length,
      onProgress,
      signal
    );
    results.push(asset);
  }

  return results;
}
