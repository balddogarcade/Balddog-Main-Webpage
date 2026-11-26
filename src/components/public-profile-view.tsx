"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Trophy,
  Play,
  ShieldCheck,
  Clock,
  ExternalLink,
} from "lucide-react";
import { DiceBearAvatar } from "@/components/dicebear-avatar";
import { ReplayPlayerModal } from "@/components/replay-player-modal";
import { formatPlayDuration, type LatestReplayItem } from "@/lib/arcade-stats";
import {
  type PublicWebProfile,
  getArcadeRank,
  computeArcadeBadges,
  countryCodeToFlagEmoji,
  resolveSocialLinks,
  toReplayModalItem,
} from "@/lib/arcade-profile";

export function PublicProfileView({ profile }: { profile: PublicWebProfile }) {
  const [activeReplay, setActiveReplay] =
    React.useState<LatestReplayItem | null>(null);

  const rank = getArcadeRank(profile.global_points);
  const flag = countryCodeToFlagEmoji(profile.country_code);
  const badges = React.useMemo(() => computeArcadeBadges(profile), [profile]);
  const socialLinks = React.useMemo(
    () => resolveSocialLinks(profile.social_links),
    [profile.social_links]
  );

  return (
    <div className="min-h-screen bg-obsidian text-pure-white">
      {/* Top Bar estilo PublicProfileScreen.kt */}
      <div className="border-b border-charcoal bg-pure-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-carbon border border-steel px-2.5 py-1.5 font-mono text-[11px] font-bold text-pure-white hover:bg-graphite transition-colors rounded-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            VOLVER
          </Link>
          <span className="font-display text-sm sm:text-base font-bold tracking-tight text-pure-white uppercase">
            PERFIL PÚBLICO
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Hero Card */}
        <section className="bg-carbon border border-charcoal p-4 sm:p-6 space-y-4 rounded-none">
          <div className="flex items-center gap-4">
            <DiceBearAvatar
              seed={profile.avatar_seed}
              fallbackSeed={profile.username}
              size={60}
              alt={`Avatar de ${profile.username}`}
            />

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                {flag && (
                  <span className="text-lg leading-none" aria-hidden="true">
                    {flag}
                  </span>
                )}
                <h1 className="font-display text-xl sm:text-2xl font-bold text-pure-white truncate">
                  {profile.username}
                </h1>
                {profile.is_private && (
                  <Lock
                    className="h-4 w-4 text-muted-gray shrink-0"
                    aria-label="Perfil privado"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center bg-pure-white text-pure-black px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-wider rounded-none">
                  {rank.title}
                </span>
                <span className="font-mono text-xs font-bold text-silver-gray">
                  {profile.global_points.toLocaleString("es-ES")} PTS
                  {profile.global_rank !== null && ` · #${profile.global_rank}`}
                </span>
              </div>
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm text-silver-gray leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Contadores Seguidores / Siguiendo */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-obsidian border border-charcoal py-2.5 px-3 text-center rounded-none">
              <span className="font-mono text-xs font-bold text-pure-white">
                SEGUIDORES ({profile.followers_count.toLocaleString("es-ES")})
              </span>
            </div>
            <div className="bg-obsidian border border-charcoal py-2.5 px-3 text-center rounded-none">
              <span className="font-mono text-xs font-bold text-pure-white">
                SIGUIENDO ({profile.following_count.toLocaleString("es-ES")})
              </span>
            </div>
          </div>

          {/* Privacidad vs Redes Sociales + KPIs */}
          {profile.is_private ? (
            <div className="flex items-center gap-2.5 bg-obsidian border border-charcoal p-3 rounded-none">
              <Lock className="h-4 w-4 text-muted-gray shrink-0" />
              <p className="text-xs text-muted-gray">
                Este jugador ocultó sus redes sociales, tiempo e historial.
              </p>
            </div>
          ) : (
            <>
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) =>
                    link.href ? (
                      <a
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-obsidian border border-steel px-2.5 py-1 font-mono text-[11px] font-bold text-pure-white hover:bg-graphite transition-colors rounded-none"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3 w-3 text-muted-gray" />
                      </a>
                    ) : (
                      <span
                        key={link.key}
                        title={link.value}
                        className="inline-flex items-center gap-1.5 bg-obsidian border border-steel px-2.5 py-1 font-mono text-[11px] font-bold text-pure-white rounded-none"
                      >
                        {link.label}: {link.value}
                      </span>
                    )
                  )}
                </div>
              )}

              <div className="border-t border-charcoal pt-4 grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="font-mono text-sm sm:text-base font-bold text-pure-white">
                    {formatPlayDuration(profile.total_play_seconds ?? 0)}
                  </div>
                  <div className="font-mono text-[10px] text-muted-gray uppercase">
                    TIEMPO
                  </div>
                </div>
                <div>
                  <div className="font-mono text-sm sm:text-base font-bold text-pure-white">
                    {(profile.total_plays ?? 0).toLocaleString("es-ES")}
                  </div>
                  <div className="font-mono text-[10px] text-muted-gray uppercase">
                    PARTIDAS
                  </div>
                </div>
                <div>
                  <div className="font-mono text-sm sm:text-base font-bold text-pure-white">
                    {profile.total_1cc.toLocaleString("es-ES")}
                  </div>
                  <div className="font-mono text-[10px] text-muted-gray uppercase">
                    1CC
                  </div>
                </div>
                <div>
                  <div className="font-mono text-sm sm:text-base font-bold text-pure-white">
                    {profile.podiums.toLocaleString("es-ES")}
                  </div>
                  <div className="font-mono text-[10px] text-muted-gray uppercase">
                    PODIOS
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Insignias */}
          {badges.length > 0 && (
            <div className="border-t border-charcoal pt-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-graphite border border-charcoal px-2.5 py-1.5 rounded-none"
                >
                  <div className="font-mono text-[10px] font-bold text-pure-white">
                    {badge.tier ? `${badge.title} · ${badge.tier}` : badge.title}
                  </div>
                  <div className="font-mono text-[10px] text-muted-gray">
                    {badge.subtitle}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Récords 1CC */}
        <section className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-pure-white">
            RÉCORDS 1CC ({profile.high_scores.length})
          </h2>

          {profile.high_scores.length === 0 ? (
            <div className="bg-carbon border border-charcoal p-5 rounded-none">
              <p className="text-xs text-muted-gray">
                Sin récords 1CC registrados aún.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {profile.high_scores.map((rec) => {
                const isVerified = rec.verification_status === "verified";
                const replayItem = toReplayModalItem(profile, rec);

                return (
                  <div
                    key={rec.game_id}
                    className="bg-carbon border border-charcoal p-3 sm:p-4 flex items-center justify-between gap-3 rounded-none"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative h-14 w-11 shrink-0 bg-obsidian border border-charcoal overflow-hidden rounded-none">
                        <Image
                          src={`/images/covers/${rec.game_slug}.webp`}
                          alt={rec.game_title}
                          fill
                          className="object-contain"
                          sizes="44px"
                        />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="font-display text-sm font-bold text-pure-white truncate">
                          {rec.game_title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-gray">
                          <span>
                            #{rec.rank} de {rec.total_players}
                          </span>
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/40 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 rounded-none">
                              <ShieldCheck className="h-3 w-3" />
                              REPLAY VERIFICADO
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-graphite border border-charcoal px-1.5 py-0.5 text-[10px] font-bold text-silver-gray rounded-none">
                              <Clock className="h-3 w-3" />
                              1CC
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-sm font-bold text-pure-white">
                          {rec.score.toLocaleString("es-ES")}
                        </span>
                        <Trophy className="h-4 w-4 text-silver-gray" />
                      </div>

                      {replayItem && (
                        <button
                          type="button"
                          onClick={() => setActiveReplay(replayItem)}
                          className="inline-flex items-center gap-1.5 bg-pure-white text-pure-black px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase hover:bg-silver-gray transition-colors cursor-pointer rounded-none"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span className="hidden sm:inline">Replay</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Historial reciente */}
        {!profile.is_private && profile.recent_matches.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-pure-white">
              HISTORIAL RECIENTE ({profile.recent_matches.length})
            </h2>
            <div className="space-y-2">
              {profile.recent_matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-graphite border border-charcoal p-3 flex items-center justify-between gap-3 rounded-none"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-pure-white truncate">
                      {match.game_title ?? "Partida"}
                    </div>
                    <div className="font-mono text-[10px] text-muted-gray">
                      {match.mode.toUpperCase()} ·{" "}
                      {formatPlayDuration(match.duration_seconds)}
                    </div>
                  </div>
                  {match.score !== null && match.score > 0 && (
                    <span className="font-mono text-xs font-bold text-silver-gray shrink-0">
                      {match.score.toLocaleString("es-ES")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {activeReplay && (
        <ReplayPlayerModal
          replay={activeReplay}
          onClose={() => setActiveReplay(null)}
        />
      )}
    </div>
  );
}
