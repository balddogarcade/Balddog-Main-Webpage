"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Cpu,
  Gamepad2,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DiceBearAvatar } from "@/components/dicebear-avatar";
import { ReplayPlayer } from "@/components/replay-player-modal";
import { countryCodeToFlagEmoji } from "@/lib/arcade-profile";
import type { LatestReplayItem } from "@/lib/arcade-stats";

export function ReplayDetailView({ replay }: { replay: LatestReplayItem }) {
  const [copied, setCopied] = React.useState(false);
  const flag = countryCodeToFlagEmoji(replay.country_code);

  const formattedDate = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(replay.achieved_at));
    } catch {
      return replay.achieved_at;
    }
  }, [replay.achieved_at]);

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignorar si el navegador bloquea el portapapeles
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-pure-white">
      {/* Top Bar estilo páginas internas */}
      <div className="border-b border-charcoal bg-pure-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-carbon border border-charcoal hover:border-steel px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver
            </Link>
            <span className="font-display text-sm font-bold uppercase tracking-wider text-pure-white truncate">
              {replay.game_title}
            </span>
          </div>

          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Repeticiones" },
              { label: replay.username, href: `/u/${encodeURIComponent(replay.username)}` },
            ]}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Reproductor embebido */}
          <div className="lg:col-span-8">
            <ReplayPlayer replay={replay} />
          </div>

          {/* Ficha técnica de la repetición */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-carbon border border-charcoal p-5 space-y-4 rounded-none">
              <div className="flex items-center justify-between gap-2 border-b border-charcoal pb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-gray">
                  Repetición Oficial
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-obsidian border border-steel text-[11px] font-mono text-arcade-mint rounded-none">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {replay.verification_status}
                </span>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-gray">
                  Puntaje
                </p>
                <p className="font-display text-3xl font-bold text-arcade-amber flex items-center gap-2 mt-1">
                  <Trophy className="h-6 w-6 shrink-0" />
                  {replay.score.toLocaleString("es-ES")}
                </p>
              </div>

              <div className="border-t border-charcoal pt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-gray">Jugador</span>
                  <Link
                    href={`/u/${encodeURIComponent(replay.username)}`}
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-pure-white hover:text-arcade-cyan transition-colors"
                  >
                    <DiceBearAvatar
                      seed={replay.avatar_seed || replay.username}
                      size={22}
                    />
                    <span>{replay.username}</span>
                    {flag && <span aria-hidden="true">{flag}</span>}
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-gray flex items-center gap-1.5">
                    <Gamepad2 className="h-3.5 w-3.5" />
                    Juego
                  </span>
                  <Link
                    href={`/games/${encodeURIComponent(replay.game_slug)}`}
                    className="font-mono text-xs text-pure-white hover:text-arcade-cyan transition-colors text-right truncate max-w-[200px]"
                  >
                    {replay.game_title}
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-gray flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" />
                    Sistema
                  </span>
                  <span className="font-mono text-xs text-silver-gray">
                    {replay.system}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-gray flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Fecha
                  </span>
                  <span className="font-mono text-xs text-silver-gray">
                    {formattedDate}
                  </span>
                </div>
              </div>

              <div className="border-t border-charcoal pt-4">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-obsidian border border-steel hover:border-pure-white px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-pure-white transition-colors rounded-none"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-arcade-mint" />
                      Enlace copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Compartir repetición
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
