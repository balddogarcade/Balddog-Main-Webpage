"use client";

import * as React from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  HardDriveDownload,
  Cpu,
  FileCode2,
} from "lucide-react";
import type { LatestReplayItem } from "@/lib/arcade-stats";
import { fetchAndParseBsvGz, type ParsedBsvReplay } from "@/lib/bsv-parser";
import {
  downloadGameAssetsFromIpfs,
  type IpfsDownloadProgress,
} from "@/lib/ipfs-loader";

interface FbneoWasmModule {
  FS: {
    mkdirTree: (path: string) => void;
    writeFile: (path: string, data: Uint8Array) => void;
  };
  HEAPU8: Uint8Array;
  HEAP16: Int16Array;
  ccall: (
    ident: string,
    returnType: string | null,
    argTypes: string[],
    args: unknown[]
  ) => unknown;
  cwrap: (
    ident: string,
    returnType: string | null,
    argTypes: string[]
  ) => (...args: unknown[]) => unknown;
}

declare global {
  interface Window {
    createFbneoModule?: (opts?: {
      locateFile?: (path: string) => string;
    }) => Promise<FbneoWasmModule>;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatFramesTime(frames: number): string {
  const totalSec = Math.max(0, Math.floor(frames / 60));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

async function loadFbneoScript(): Promise<void> {
  if (typeof window !== "undefined" && window.createFbneoModule) {
    return;
  }
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/wasm/fbneo.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("No se pudo cargar el motor /wasm/fbneo.js"));
    document.body.appendChild(script);
  });
}

type LoadStage = "bsv" | "ipfs" | "wasm" | "ready" | "error";

export function ReplayPlayerModal({
  replay,
  onClose,
}: {
  replay: LatestReplayItem;
  onClose: () => void;
}) {
  const [stage, setStage] = React.useState<LoadStage>("bsv");
  const [errorStage, setErrorStage] = React.useState<"bsv" | "ipfs" | "wasm">(
    "bsv"
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [ipfsProgress, setIpfsProgress] =
    React.useState<IpfsDownloadProgress | null>(null);
  const [retryKey, setRetryKey] = React.useState(0);

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [speed, setSpeed] = React.useState<1 | 2 | 4>(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [totalFrames, setTotalFrames] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const isPlayingRef = React.useRef(isPlaying);
  const speedRef = React.useRef(speed);
  const isMutedRef = React.useRef(isMuted);

  React.useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  React.useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  React.useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const frameCursorRef = React.useRef(0);
  const parsedReplayRef = React.useRef<ParsedBsvReplay | null>(null);
  const wasmApiRef = React.useRef<{
    mod: FbneoWasmModule;
    setInputFrame: (p0: number, p1: number, p2: number, p3: number) => void;
    runFrame: () => void;
    resetCore: () => void;
    unloadGame: () => void;
    getVideoPtr: () => number;
    getVideoWidth: () => number;
    getVideoHeight: () => number;
    getAudioPtr: () => number;
    getAudioFrames: () => number;
    getSampleRate: () => number;
  } | null>(null);

  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const nextAudioTimeRef = React.useRef(0);

  React.useEffect(() => {
    const abortController = new AbortController();
    let rafId = 0;
    let cancelled = false;

    async function boot() {
      let activeStage: "bsv" | "ipfs" | "wasm" = "bsv";
      try {
        setErrorMsg(null);
        setStage("bsv");
        setErrorStage("bsv");
        setIsFinished(false);
        setCurrentFrame(0);
        frameCursorRef.current = 0;

        if (!replay.replay_url) {
          throw new Error("URL de replay no disponible.");
        }

        const parsed = await fetchAndParseBsvGz(
          replay.replay_url,
          abortController.signal
        );
        if (cancelled) return;
        parsedReplayRef.current = parsed;
        setTotalFrames(parsed.totalFrames);

        activeStage = "ipfs";
        setStage("ipfs");
        const assets = await downloadGameAssetsFromIpfs(
          replay,
          (p) => {
            if (!cancelled) setIpfsProgress(p);
          },
          abortController.signal
        );
        if (cancelled) return;

        activeStage = "wasm";
        setStage("wasm");
        await loadFbneoScript();
        if (cancelled || !window.createFbneoModule) return;

        const mod = await window.createFbneoModule({
          locateFile: (path) => `/wasm/${path}`,
        });
        if (cancelled) return;

        mod.FS.mkdirTree("/roms");
        mod.FS.mkdirTree("/system");
        mod.FS.mkdirTree("/saves");

        for (const asset of assets) {
          mod.FS.writeFile(`/roms/${asset.filename}`, asset.data);
        }

        const initCore = mod.cwrap("bd_init", null, []);
        const loadGame = mod.cwrap("bd_load_game", "number", ["string"]);
        const setInputFrame = mod.cwrap("bd_set_input_frame", null, [
          "number",
          "number",
          "number",
          "number",
        ]) as (p0: number, p1: number, p2: number, p3: number) => void;
        const runFrame = mod.cwrap("bd_run_frame", null, []) as () => void;
        const resetCore = mod.cwrap("bd_reset", null, []) as () => void;
        const unloadGame = mod.cwrap("bd_unload_game", null, []) as () => void;
        const getVideoPtr = mod.cwrap("bd_get_video_ptr", "number", []) as () => number;
        const getVideoWidth = mod.cwrap("bd_get_video_width", "number", []) as () => number;
        const getVideoHeight = mod.cwrap("bd_get_video_height", "number", []) as () => number;
        const getAudioPtr = mod.cwrap("bd_get_audio_ptr", "number", []) as () => number;
        const getAudioFrames = mod.cwrap("bd_get_audio_frames", "number", []) as () => number;
        const getSampleRate = mod.cwrap("bd_get_sample_rate", "number", []) as () => number;

        initCore();
        const ok = loadGame(`/roms/${replay.rom_filename}`) as number;
        if (!ok) {
          throw new Error(
            `FBNeo no pudo cargar ${replay.rom_filename}. Verifica BIOS o ROM padre.`
          );
        }

        wasmApiRef.current = {
          mod,
          setInputFrame,
          runFrame,
          resetCore,
          unloadGame,
          getVideoPtr,
          getVideoWidth,
          getVideoHeight,
          getAudioPtr,
          getAudioFrames,
          getSampleRate,
        };

        setStage("ready");
        setIsPlaying(true);

        let lastTime = performance.now();
        let accumulator = 0;
        const frameDurationMs = 1000 / 60;

        const loop = (now: number) => {
          if (cancelled) return;
          rafId = requestAnimationFrame(loop);

          const dt = Math.min(100, now - lastTime);
          lastTime = now;

          const api = wasmApiRef.current;
          const rep = parsedReplayRef.current;
          if (!api || !rep || !isPlayingRef.current) return;

          accumulator += dt * speedRef.current;
          let steps = 0;
          const maxSteps = speedRef.current * 2;

          while (accumulator >= frameDurationMs && steps < maxSteps) {
            accumulator -= frameDurationMs;
            steps++;

            const idx = frameCursorRef.current;
            if (idx >= rep.totalFrames) {
              setIsPlaying(false);
              setIsFinished(true);
              break;
            }

            const base = idx * 4;
            api.setInputFrame(
              rep.frames[base],
              rep.frames[base + 1],
              rep.frames[base + 2],
              rep.frames[base + 3]
            );
            api.runFrame();
            frameCursorRef.current = idx + 1;

            // Audio solo en 1x y si no está silenciado
            if (speedRef.current === 1 && !isMutedRef.current) {
              const aFrames = api.getAudioFrames();
              if (aFrames > 0) {
                if (!audioCtxRef.current) {
                  audioCtxRef.current = new AudioContext();
                  nextAudioTimeRef.current = audioCtxRef.current.currentTime;
                }
                const ctx = audioCtxRef.current;
                if (ctx.state === "suspended") {
                  void ctx.resume();
                }
                const sr = api.getSampleRate() || 44100;
                const audioBuf = ctx.createBuffer(2, aFrames, sr);
                const left = audioBuf.getChannelData(0);
                const right = audioBuf.getChannelData(1);
                const ptr16 = api.getAudioPtr() >> 1;
                for (let i = 0; i < aFrames; i++) {
                  left[i] = api.mod.HEAP16[ptr16 + i * 2] / 32768;
                  right[i] = api.mod.HEAP16[ptr16 + i * 2 + 1] / 32768;
                }
                const src = ctx.createBufferSource();
                src.buffer = audioBuf;
                src.connect(ctx.destination);
                const startAt = Math.max(
                  ctx.currentTime + 0.01,
                  nextAudioTimeRef.current
                );
                src.start(startAt);
                nextAudioTimeRef.current = startAt + aFrames / sr;
              }
            }
          }

          // Renderizar último frame al canvas
          const w = api.getVideoWidth();
          const h = api.getVideoHeight();
          const vPtr = api.getVideoPtr();
          const canvas = canvasRef.current;
          if (canvas && w > 0 && h > 0 && vPtr > 0) {
            if (canvas.width !== w || canvas.height !== h) {
              canvas.width = w;
              canvas.height = h;
            }
            const ctx2d = canvas.getContext("2d");
            if (ctx2d) {
              const imgData = ctx2d.createImageData(w, h);
              imgData.data.set(
                api.mod.HEAPU8.subarray(vPtr, vPtr + w * h * 4)
              );
              ctx2d.putImageData(imgData, 0, 0);
            }
          }

          setCurrentFrame(frameCursorRef.current);
        };

        rafId = requestAnimationFrame(loop);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setErrorStage(activeStage);
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Error inesperado cargando el replay."
        );
        setStage("error");
      }
    }

    void boot();

    return () => {
      cancelled = true;
      abortController.abort();
      if (rafId) cancelAnimationFrame(rafId);
      if (wasmApiRef.current) {
        try {
          wasmApiRef.current.unloadGame();
        } catch {
          // ignore
        }
        wasmApiRef.current = null;
      }
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [replay, retryKey]);

  const handleRestart = () => {
    if (!wasmApiRef.current) return;
    wasmApiRef.current.resetCore();
    frameCursorRef.current = 0;
    setCurrentFrame(0);
    setIsFinished(false);
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void containerRef.current.requestFullscreen();
    }
  };

  const progressPct =
    totalFrames > 0 ? Math.min(100, (currentFrame / totalFrames) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pure-black/85 backdrop-blur-md p-4">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl rounded-2xl border border-charcoal bg-obsidian shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-charcoal bg-carbon/80">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-arcade-magenta animate-pulse" />
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-pure-white truncate">
                {replay.game_title}
              </h3>
              <p className="font-mono text-xs text-muted-gray truncate">
                Jugador: <span className="text-pure-white">{replay.username}</span> •{" "}
                Score:{" "}
                <span className="text-arcade-amber font-bold">
                  {replay.score.toLocaleString("es-ES")}
                </span>{" "}
                • {replay.system}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-gray hover:text-pure-white hover:bg-charcoal transition-colors"
            aria-label="Cerrar reproductor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewport: Loading UX o Canvas */}
        <div className="relative aspect-[4/3] w-full bg-pure-black flex items-center justify-center">
          {stage !== "ready" ? (
            <div className="w-full max-w-md px-6 py-8 space-y-5">
              {/* Stepper de Carga */}
              <div className="space-y-3">
                <LoadingStepRow
                  icon={<FileCode2 className="h-4 w-4" />}
                  label="1. Descargando inputs deterministas (.bsv.gz)"
                  status={
                    stage === "bsv"
                      ? "active"
                      : stage === "error" && errorStage === "bsv"
                      ? "error"
                      : "done"
                  }
                />
                <LoadingStepRow
                  icon={<HardDriveDownload className="h-4 w-4" />}
                  label="2. Descargando ROM / BIOS desde IPFS"
                  status={
                    stage === "ipfs"
                      ? "active"
                      : stage === "wasm" ||
                        (stage === "error" && errorStage === "wasm")
                      ? "done"
                      : stage === "error" && errorStage === "ipfs"
                      ? "error"
                      : "pending"
                  }
                />
                <LoadingStepRow
                  icon={<Cpu className="h-4 w-4" />}
                  label="3. Inicializando motor FBNeo WebAssembly"
                  status={
                    stage === "wasm"
                      ? "active"
                      : stage === "error" && errorStage === "wasm"
                      ? "error"
                      : "pending"
                  }
                />
              </div>

              {/* Barra de progreso IPFS */}
              {stage === "ipfs" && ipfsProgress && (
                <div className="rounded-xl border border-charcoal bg-carbon/90 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-pure-white truncate">
                      {ipfsProgress.currentFile} ({ipfsProgress.fileIndex}/
                      {ipfsProgress.totalFiles})
                    </span>
                    <span className="text-arcade-amber font-bold">
                      {ipfsProgress.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-graphite overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-arcade-amber to-arcade-magenta transition-all duration-150"
                      style={{ width: `${ipfsProgress.percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-gray">
                    <span>
                      {formatBytes(ipfsProgress.loadedBytes)} /{" "}
                      {formatBytes(ipfsProgress.totalBytes)}
                    </span>
                    <span>{ipfsProgress.gateway}</span>
                  </div>
                </div>
              )}

              {stage === "error" && errorMsg && (
                <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-4 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border border-charcoal px-3 py-1.5 text-xs font-mono text-muted-gray hover:text-pure-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setRetryKey((k) => k + 1)}
                      className="rounded-lg bg-arcade-magenta px-3 py-1.5 text-xs font-mono font-bold text-pure-white hover:opacity-90"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="h-full w-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          )}
        </div>

        {/* Controles y Barra de Avance */}
        {stage === "ready" && (
          <div className="px-5 py-3.5 border-t border-charcoal bg-carbon/90 space-y-2.5">
            {/* Barra de avance por frames */}
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-graphite overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-arcade-amber to-arcade-magenta transition-all duration-75"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-gray">
                <span>
                  {formatFramesTime(currentFrame)} /{" "}
                  {formatFramesTime(totalFrames)}
                </span>
                <span>
                  Frame {currentFrame.toLocaleString("es-ES")} /{" "}
                  {totalFrames.toLocaleString("es-ES")}
                  {isFinished ? " • FINALIZADO" : ""}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-arcade-magenta px-3 py-1.5 text-xs font-mono font-bold text-pure-white hover:opacity-90"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Pausa
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Reproducir
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal bg-obsidian px-2.5 py-1.5 text-xs font-mono text-pure-white hover:border-steel"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reiniciar
                </button>

                <div className="flex items-center rounded-lg border border-charcoal bg-obsidian p-0.5">
                  {([1, 2, 4] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpeed(s)}
                      className={`rounded-md px-2 py-1 text-xs font-mono font-bold transition-colors ${
                        speed === s
                          ? "bg-arcade-amber text-pure-black"
                          : "text-muted-gray hover:text-pure-white"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  className="rounded-lg border border-charcoal bg-obsidian p-1.5 text-muted-gray hover:text-pure-white"
                  aria-label={isMuted ? "Activar audio" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="rounded-lg border border-charcoal bg-obsidian p-1.5 text-muted-gray hover:text-pure-white"
                  aria-label="Pantalla completa"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingStepRow({
  icon,
  label,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  status: "pending" | "active" | "done" | "error";
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
          status === "done"
            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
            : status === "active"
            ? "border-arcade-amber/50 bg-arcade-amber/15 text-arcade-amber"
            : status === "error"
            ? "border-red-500/50 bg-red-500/15 text-red-400"
            : "border-charcoal bg-carbon text-muted-gray"
        }`}
      >
        {status === "active" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : status === "done" ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          icon
        )}
      </div>
      <span
        className={
          status === "pending"
            ? "text-muted-gray"
            : status === "error"
            ? "text-red-300"
            : "text-pure-white"
        }
      >
        {label}
      </span>
    </div>
  );
}
