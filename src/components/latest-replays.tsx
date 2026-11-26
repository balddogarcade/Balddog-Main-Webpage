"use client";

import * as React from "react";
import Image from "next/image";
import { Play, ShieldCheck, Clock, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LatestReplayItem } from "@/lib/arcade-stats";
import { ReplayPlayerModal } from "@/components/replay-player-modal";

export function LatestReplays({ replays }: { replays: LatestReplayItem[] }) {
  const [activeReplay, setActiveReplay] =
    React.useState<LatestReplayItem | null>(null);

  if (!replays || replays.length === 0) {
    return null;
  }

  return (
    <section
      id="replays"
      className="relative py-20 border-t border-charcoal/70 bg-obsidian"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-arcade-magenta/30 bg-arcade-magenta/10 px-3 py-1 text-xs font-mono text-arcade-magenta">
              <Film className="h-3.5 w-3.5" />
              REPLAYS DETERMINISTAS 1CC
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-pure-white tracking-tight">
              Últimas 6 Repeticiones
            </h2>
            <p className="text-sm text-muted-gray max-w-2xl">
              Partidas de 1 ficha reproducibles frame a frame directamente en tu
              navegador con ROMs descargadas desde IPFS.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {replays.map((item) => {
            const isVerified = item.verification_status === "verified";
            const sizeKb = item.replay_size_bytes
              ? `${Math.max(1, Math.round(item.replay_size_bytes / 1024))} KB`
              : "~25 KB";

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl border border-charcoal bg-carbon/90 overflow-hidden hover:border-steel transition-all duration-300"
              >
                <div className="relative h-40 w-full bg-obsidian overflow-hidden">
                  <Image
                    src={`/images/covers/${item.game_slug}.webp`}
                    alt={item.game_title}
                    fill
                    className="object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <Badge
                      variant="mono"
                      className="bg-obsidian/85 backdrop-blur-md text-[10px]"
                    >
                      {item.system}
                    </Badge>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                        <ShieldCheck className="h-3 w-3" />
                        VERIFICADO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-arcade-amber/20 border border-arcade-amber/40 px-2 py-0.5 text-[10px] font-mono font-bold text-arcade-amber backdrop-blur-md">
                        <Clock className="h-3 w-3" />
                        1CC
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-pure-white line-clamp-1">
                      {item.game_title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-gray">
                      <span>
                        Por{" "}
                        <span className="text-pure-white font-semibold">
                          {item.username}
                        </span>
                        {item.country_code ? ` (${item.country_code})` : ""}
                      </span>
                      <span>{sizeKb}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-charcoal/70 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-gray">
                        Puntaje 1CC
                      </div>
                      <div className="font-mono text-base font-bold text-arcade-amber">
                        {item.score.toLocaleString("es-ES")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveReplay(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-arcade-magenta px-3.5 py-2 text-xs font-mono font-bold text-pure-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Ver Replay
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeReplay && (
        <ReplayPlayerModal
          replay={activeReplay}
          onClose={() => setActiveReplay(null)}
        />
      )}
    </section>
  );
}
