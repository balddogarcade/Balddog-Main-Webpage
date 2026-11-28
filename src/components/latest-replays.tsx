"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ShieldCheck, Clock, Film, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DiceBearAvatar } from "@/components/dicebear-avatar";
import { trackModal, trackNavigation, trackShare } from "@/lib/analytics";
import type { LatestReplayItem } from "@/lib/arcade-stats";
import { ReplayPlayerModal } from "@/components/replay-player-modal";

export function LatestReplays({ replays }: { replays: LatestReplayItem[] }) {
  const [activeReplay, setActiveReplay] =
    React.useState<LatestReplayItem | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleShare = async (item: LatestReplayItem) => {
    const url = `${window.location.origin}/replays/${encodeURIComponent(item.id)}`;
    const text = `Mira esta repetición de ${item.username} en ${item.game_title} (${item.score.toLocaleString("es-ES")} pts) en bald.dog ARCADE`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: `${item.game_title} — bald.dog ARCADE`, text, url });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
    } catch {
      // Ignore clipboard errors
    }
  };

  if (!replays || replays.length === 0) {
    return null;
  }

  return (
    <section
      id="replays"
      className="relative overflow-hidden py-16 lg:py-24 border-b border-charcoal/60 bg-obsidian"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/images/bg_repeticiones.webp')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/65 via-obsidian/45 to-obsidian/75"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
              <Film className="h-3 w-3 mr-1.5 text-arcade-magenta" />
              <span>REPLAYS DETERMINISTAS 1CC</span>
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pure-white">
              Últimas 6 Repeticiones
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-gray font-mono">
            Partidas de 1 ficha • Libretro BSV1 + gzip (~25 KB) frame a frame
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {replays.map((item) => {
            const isVerified = item.verification_status === "verified";
            const sizeKb = item.replay_size_bytes
              ? `${Math.max(1, Math.round(item.replay_size_bytes / 1024))} KB`
              : "~25 KB";

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-none border border-charcoal bg-carbon/90 overflow-hidden hover:border-steel hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full bg-obsidian overflow-hidden">
                  <Image
                    src={`/images/covers/${item.game_slug}.webp`}
                    alt={item.game_title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
                  />

                  <div className="absolute top-2.5 left-2.5">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-none bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                        <ShieldCheck className="h-3 w-3" />
                        VERIFICADO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-none bg-arcade-amber/20 border border-arcade-amber/40 px-2 py-1 text-[10px] font-mono font-bold text-arcade-amber backdrop-blur-md">
                        <Clock className="h-3 w-3" />
                        1CC
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <Badge
                      variant="mono"
                      className="bg-obsidian/85 backdrop-blur-md text-[10px]"
                    >
                      {item.system}
                    </Badge>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
                  <div className="space-y-1">
                    <Link
                      href={`/games/${encodeURIComponent(item.game_slug)}`}
                      onClick={() => trackNavigation(`/games/${item.game_slug}`, "home_latest_replays", item.game_title)}
                      className="font-display text-sm font-bold text-pure-white hover:text-arcade-magenta transition-colors line-clamp-1 block"
                    >
                      {item.game_title}
                    </Link>
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-gray">
                      <Link
                        href={`/u/${encodeURIComponent(item.username)}`}
                        onClick={() => trackNavigation(`/u/${item.username}`, "home_latest_replays_player", item.username)}
                        className="inline-flex items-center gap-1.5 group/user hover:text-pure-white transition-colors min-w-0"
                      >
                        <DiceBearAvatar
                          seed={item.avatar_seed}
                          fallbackSeed={item.username}
                          size={16}
                          alt={`Avatar de ${item.username}`}
                        />
                        <span className="truncate">
                          <span className="text-pure-white font-semibold group-hover/user:underline">
                            {item.username}
                          </span>
                          {item.country_code ? ` (${item.country_code})` : ""}
                        </span>
                      </Link>
                      <span className="shrink-0">{sizeKb}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-charcoal/70 flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase text-muted-gray block">
                        1CC
                      </span>
                      <span className="font-bold text-arcade-amber truncate block">
                        {item.score.toLocaleString("es-ES")}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          handleShare(item);
                          trackShare("replay", item.id, "clipboard");
                        }}
                        title="Compartir repetición"
                        aria-label="Compartir repetición"
                        className="inline-flex items-center justify-center rounded-none border border-steel bg-obsidian px-2 py-1.5 text-[11px] font-mono text-silver-gray hover:text-pure-white hover:border-pure-white transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3 w-3 text-arcade-emerald" />
                        ) : (
                          <Share2 className="h-3 w-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplay(item);
                          trackModal("replay_player", "open", item.game_slug);
                        }}
                        className="inline-flex items-center gap-1 rounded-none bg-arcade-magenta px-2.5 py-1.5 text-[11px] font-mono font-bold text-pure-white hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        Ver
                      </button>
                    </div>
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
