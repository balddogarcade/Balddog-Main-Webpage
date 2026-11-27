"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Gamepad2, Play, Users, X } from "lucide-react";
import type { PublicGame } from "@/types/game";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { IpfsImage } from "@/components/games/ipfs-image";
import { trackModal, trackNavigation } from "@/lib/analytics";

export function GameDetailView({ game }: { game: PublicGame }) {
  const gallery = React.useMemo(
    () =>
      [
        { key: "ingame", label: "In-Game", url: game.url_image_ingame },
        { key: "title", label: "Título", url: game.url_image_title },
        { key: "cabinet", label: "Gabinete", url: game.url_image_cabinet },
        { key: "flyer", label: "Flyer", url: game.url_image_flyer },
      ].filter((item): item is { key: string; label: string; url: string } => Boolean(item.url)),
    [game]
  );

  const [lightbox, setLightbox] = React.useState<{ label: string; url: string } | null>(null);

  const specs = [
    { label: "Género", value: game.genre },
    { label: "Jugadores", value: game.nplayers || (game.players ? `${game.players}` : null) },
    { label: "Controles", value: game.input_controls },
    { label: "Botones", value: game.input_buttons != null ? `${game.input_buttons}` : null },
    { label: "Referencia MAME", value: game.emulator_name },
    { label: "ROM", value: game.game_name || game.slug },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value));

  return (
    <div className="min-h-screen bg-obsidian text-pure-white">
      <div className="border-b border-charcoal bg-pure-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/games"
              onClick={() => trackNavigation("/games", "game_detail_back", "Volver")}
              className="inline-flex items-center gap-1.5 bg-carbon border border-charcoal hover:border-steel px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver
            </Link>
            <span className="font-display text-sm font-bold uppercase tracking-wider text-pure-white truncate">
              Ficha de Juego
            </span>
          </div>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo", href: "/games" },
              { label: game.title },
            ]}
          />
        </div>
      </div>
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

      {/* Hero */}
      <section className="bg-carbon border border-charcoal p-6 rounded-none space-y-6">
        {game.url_image_marquee && (
          <div className="w-full overflow-hidden border border-charcoal bg-obsidian">
            <IpfsImage
              src={game.url_image_marquee}
              alt={`${game.title} marquee`}
              containerClassName="relative w-full min-h-24 max-h-32 overflow-hidden bg-obsidian flex items-center justify-center"
              className="w-full max-h-32 object-contain mx-auto"
              fallbackText="MARQUEE NO DISPONIBLE"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-40 shrink-0 aspect-[3/4] bg-obsidian border border-charcoal overflow-hidden">
            <IpfsImage
              src={game.cover_url || game.url_image_title}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {game.serie && (
                <span className="bg-obsidian border border-steel px-2.5 py-0.5 text-[11px] font-mono text-arcade-magenta uppercase">
                  {game.serie}
                </span>
              )}
              {game.year && (
                <span className="bg-obsidian border border-charcoal px-2.5 py-0.5 text-[11px] font-mono text-silver-gray">
                  {game.year}
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-pure-white">
              {game.title}
            </h1>

            {game.manufacturer && (
              <p className="text-sm font-mono text-silver-gray">
                Desarrollado por <span className="text-pure-white">{game.manufacturer}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-muted-gray">
              <span className="inline-flex items-center gap-1.5">
                <Gamepad2 className="h-3.5 w-3.5 text-arcade-magenta" />
                {game.system}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-arcade-magenta" />
                {game.nplayers || `${game.max_players} jugadores`}
              </span>
              {game.input_controls && (
                <span className="inline-flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-arcade-magenta" />
                  {game.input_controls}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Galería IPFS */}
      {gallery.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-pure-white">Galería</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gallery.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setLightbox(item);
                  trackModal("game_gallery_lightbox", "open", `${game.slug}:${item.key}`);
                }}
                className="group bg-carbon border border-charcoal hover:border-steel overflow-hidden text-left rounded-none"
              >
                <div className="aspect-video bg-obsidian overflow-hidden">
                  <IpfsImage
                    src={item.url}
                    alt={`${game.title} ${item.label}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackText="NO DISPONIBLE"
                  />
                </div>
                <div className="px-3 py-1.5 text-[11px] font-mono text-silver-gray border-t border-charcoal">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Ficha técnica + Historia / Video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {specs.length > 0 && (
          <section className="bg-carbon border border-charcoal p-5 rounded-none space-y-3 h-fit">
            <h2 className="font-display text-base font-bold text-pure-white">Ficha Técnica</h2>
            <dl className="divide-y divide-charcoal/70 text-xs font-mono">
              {specs.map((s) => (
                <div key={s.label} className="py-2.5 flex justify-between gap-4">
                  <dt className="text-muted-gray">{s.label}</dt>
                  <dd className="text-pure-white text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="lg:col-span-2 space-y-6">
          {game.youtube_video_id && (
            <section className="bg-carbon border border-charcoal p-5 rounded-none space-y-3">
              <div className="flex items-center gap-2 font-display text-base font-bold text-pure-white">
                <Play className="h-4 w-4 text-arcade-magenta" />
                <h2>Gameplay</h2>
              </div>
              <div className="aspect-video w-full bg-obsidian border border-charcoal overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${game.youtube_video_id}`}
                  title={`${game.title} gameplay`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {game.history && (
            <section className="bg-carbon border border-charcoal p-5 rounded-none space-y-3">
              <h2 className="font-display text-base font-bold text-pure-white">Historia</h2>
              <p className="text-sm text-silver-gray whitespace-pre-line leading-relaxed">
                {game.history}
              </p>
              {game.history_copyright_long && (
                <p className="text-[11px] font-mono text-muted-gray pt-2 border-t border-charcoal/70">
                  {game.history_copyright_long}
                </p>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="max-w-4xl w-full bg-carbon border border-steel p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-silver-gray">
                {game.title} — {lightbox.label}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="text-silver-gray hover:text-pure-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <IpfsImage
              src={lightbox.url}
              alt={lightbox.label}
              containerClassName="relative w-full min-h-[40vh] max-h-[75vh] overflow-hidden bg-obsidian flex items-center justify-center"
              className="w-full max-h-[75vh] object-contain bg-obsidian"
              fallbackText="IMAGEN NO DISPONIBLE"
            />
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
