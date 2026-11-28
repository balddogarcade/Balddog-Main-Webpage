import * as React from "react";
import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { Download, Clock, Users, Flame, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  type ArcadeGameStat,
  formatCompactNumber,
  formatPlayDuration,
} from "@/lib/arcade-stats";

interface GameRankingsProps {
  topDownloaded: ArcadeGameStat[];
  topPlayed: ArcadeGameStat[];
}

function GamePosterCard({
  game,
  rank,
  mode,
  maxSeconds,
}: {
  game: ArcadeGameStat;
  rank: number;
  mode: "downloads" | "playtime";
  maxSeconds: number;
}) {
  const isFirst = rank === 1;
  const progressPct =
    mode === "playtime" && maxSeconds > 0
      ? Math.max(8, Math.round((game.total_play_seconds / maxSeconds) * 100))
      : 0;

  return (
    <div className="group flex flex-col rounded-none border border-charcoal bg-carbon/90 overflow-hidden hover:border-steel hover:-translate-y-1 transition-all duration-300">
      {/* Poster 3:4 */}
      <div className="relative aspect-[3/4] w-full bg-obsidian overflow-hidden">
        <Image
          src={`/images/covers/${game.slug}.webp`}
          alt={`${game.title} (${game.system})`}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
        />

        {/* Rank Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`inline-flex items-center justify-center rounded-none px-2.5 py-1 font-mono text-xs font-bold backdrop-blur-md border ${
              isFirst
                ? mode === "downloads"
                  ? "bg-arcade-magenta/90 text-pure-white border-arcade-magenta"
                  : "bg-arcade-amber/90 text-pure-black border-arcade-amber"
                : "bg-obsidian/85 text-pure-white border-charcoal"
            }`}
          >
            #{rank}
          </span>
        </div>

        {/* System Badge */}
        <div className="absolute top-2.5 right-2.5">
          <Badge variant="mono" className="bg-obsidian/85 backdrop-blur-md text-[10px]">
            {game.system}
          </Badge>
        </div>
      </div>

      {/* Metadata Footer */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
        <div>
          <TrackedLink
            href={`/games/${encodeURIComponent(game.slug)}`}
            source="home_game_rankings"
            label={game.title}
            className="font-display text-sm font-bold text-pure-white hover:text-arcade-magenta transition-colors line-clamp-1 block"
          >
            {game.title}
          </TrackedLink>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-muted-gray">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {game.max_players}P
            </span>
            {game.is_coop && <span>• Co-op</span>}
          </div>
        </div>

        {mode === "downloads" ? (
          <div className="pt-2 border-t border-charcoal/70 flex items-center justify-between text-xs font-mono">
            <span className="text-muted-gray inline-flex items-center gap-1">
              <Download className="h-3.5 w-3.5 text-arcade-magenta" />
              Descargas
            </span>
            <span className="font-bold text-pure-white">
              {formatCompactNumber(game.download_count)}
            </span>
          </div>
        ) : (
          <div className="pt-2 border-t border-charcoal/70 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-gray inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-arcade-amber" />
                Tiempo
              </span>
              <span className="font-bold text-pure-white">
                {formatPlayDuration(game.total_play_seconds)}
              </span>
            </div>
            <div className="h-1 w-full rounded-none bg-graphite overflow-hidden">
              <div
                className="h-full rounded-none bg-gradient-to-r from-arcade-amber to-arcade-magenta"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function GameRankings({ topDownloaded, topPlayed }: GameRankingsProps) {
  if (topDownloaded.length === 0 && topPlayed.length === 0) {
    return null;
  }

  const maxPlayedSeconds =
    topPlayed.length > 0 ? Math.max(...topPlayed.map((g) => g.total_play_seconds)) : 0;

  return (
    <>
      {/* Top 6 Más Descargados */}
      {topDownloaded.length > 0 && (
        <section
          id="top-downloads"
          className="py-16 lg:py-24 border-b border-charcoal/60 bg-obsidian relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/bg_favoritos.webp')" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/65 via-obsidian/45 to-obsidian/75"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="space-y-2">
                <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
                  <Flame className="h-3 w-3 mr-1.5 text-arcade-magenta" />
                  <span>TOP 6 MÁS DESCARGADOS</span>
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pure-white">
                  Los favoritos del catálogo IPFS.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-gray font-mono">
                Flyers originales 3:4 • Descarga directa en la app
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {topDownloaded.map((game, idx) => (
                <GamePosterCard
                  key={game.slug}
                  game={game}
                  rank={idx + 1}
                  mode="downloads"
                  maxSeconds={0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top 6 Más Jugados por Tiempo */}
      {topPlayed.length > 0 && (
        <section
          id="most-played"
          className="py-16 lg:py-24 border-b border-charcoal/60 bg-carbon/25 relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/bg_dondesequema.webp')" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/65 via-obsidian/45 to-obsidian/75"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="space-y-2">
                <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
                  <Trophy className="h-3 w-3 mr-1.5 text-arcade-amber" />
                  <span>TOP 6 MÁS JUGADOS EN TIEMPO</span>
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pure-white">
                  Donde se queman más horas de fichín.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-gray font-mono">
                Tiempo acumulado por todos los jugadores
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {topPlayed.map((game, idx) => (
                <GamePosterCard
                  key={game.slug}
                  game={game}
                  rank={idx + 1}
                  mode="playtime"
                  maxSeconds={maxPlayedSeconds}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
