export interface ParsedBsvReplay {
  romCrc32: number;
  totalFrames: number;
  durationSeconds: number;
  /** 4 puertos (u16) por frame: frames[frameIdx * 4 + port] */
  frames: Uint16Array;
}

const BSV_HEADER_LEN = 16;
const BYTES_PER_FRAME = 8; // [u16; 4] little-endian

/**
 * Descarga un archivo .bsv.gz, lo descomprime con gzip en el navegador
 * y parsea la cabecera estándar Libretro BSV1 + inputs frame a frame.
 */
export async function fetchAndParseBsvGz(
  url: string,
  signal?: AbortSignal
): Promise<ParsedBsvReplay> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`No se pudo descargar el replay (HTTP ${response.status})`);
  }

  let rawBuffer: ArrayBuffer;
  if (typeof DecompressionStream !== "undefined" && response.body) {
    const decompressedStream = response.body.pipeThrough(
      new DecompressionStream("gzip")
    );
    rawBuffer = await new Response(decompressedStream).arrayBuffer();
  } else {
    throw new Error(
      "Tu navegador no soporta DecompressionStream('gzip') para reproducir replays."
    );
  }

  const view = new DataView(rawBuffer);
  if (rawBuffer.byteLength < BSV_HEADER_LEN) {
    throw new Error("Archivo BSV1 inválido o truncado.");
  }

  // Magic "BSV1"
  const magic =
    String.fromCharCode(view.getUint8(0)) +
    String.fromCharCode(view.getUint8(1)) +
    String.fromCharCode(view.getUint8(2)) +
    String.fromCharCode(view.getUint8(3));

  if (magic !== "BSV1") {
    throw new Error(`Cabecera BSV1 inválida (recibido: ${magic}).`);
  }

  const romCrc32 = view.getUint32(4, true);
  const stateSize = view.getUint32(8, true);
  const payloadStart = BSV_HEADER_LEN + stateSize;

  if (rawBuffer.byteLength < payloadStart) {
    throw new Error("Datos de frames truncados en archivo BSV1.");
  }

  const frameBytesLen = rawBuffer.byteLength - payloadStart;
  const totalFrames = Math.floor(frameBytesLen / BYTES_PER_FRAME);
  const frames = new Uint16Array(totalFrames * 4);

  let offset = payloadStart;
  for (let i = 0; i < totalFrames; i++) {
    const base = i * 4;
    frames[base] = view.getUint16(offset, true);
    frames[base + 1] = view.getUint16(offset + 2, true);
    frames[base + 2] = view.getUint16(offset + 4, true);
    frames[base + 3] = view.getUint16(offset + 6, true);
    offset += BYTES_PER_FRAME;
  }

  return {
    romCrc32,
    totalFrames,
    durationSeconds: Math.round(totalFrames / 60),
    frames,
  };
}
