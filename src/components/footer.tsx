import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, DiscordIcon, XIcon } from "@/components/icons";
import { TrackedLink } from "@/components/tracked-link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-charcoal/80 bg-carbon text-silver-gray font-sans">
      {/* Background image + dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-0 bg-[url('/images/bg_footer.png')] bg-cover bg-center bg-no-repeat"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-0 bg-obsidian/80"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        {/* Community Callout */}
        <div className="mb-12 border border-charcoal bg-obsidian p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-widest text-arcade-magenta">
              <span className="h-1.5 w-1.5 bg-arcade-magenta" />
              <span>Comunidad Arcade</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-pure-white tracking-tight">
              Únete al patio de recreo de los perros calvos
            </h3>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed">
              Coordina partidas netplay en vivo, comparte tus récords 1CC, reporta bugs y participa en la preservación del arcade clásico.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <TrackedLink
              href="https://discord.gg/wrN9KRvubj"
              external
              source="footer_community"
              label="Discord"
              className="inline-flex items-center gap-2 bg-arcade-magenta hover:bg-arcade-magenta/90 text-pure-white px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors rounded-none"
            >
              <DiscordIcon className="h-4 w-4" />
              <span>Entrar a Discord</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </TrackedLink>
            <TrackedLink
              href="https://github.com/balddogarcade/"
              external
              source="footer_community"
              label="GitHub"
              className="inline-flex items-center gap-2 bg-carbon border border-charcoal hover:border-steel text-silver-gray hover:text-pure-white px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors rounded-none"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </TrackedLink>
            <TrackedLink
              href="https://x.com/BaldDogArcade"
              external
              source="footer_community"
              label="X"
              className="inline-flex items-center gap-2 bg-carbon border border-charcoal hover:border-steel text-silver-gray hover:text-pure-white px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors rounded-none"
            >
              <XIcon className="h-4 w-4" />
              <span>X / Twitter</span>
            </TrackedLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <TrackedLink href="/" source="footer_brand" label="bald.dog ARCADE" className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-none overflow-hidden border border-charcoal bg-obsidian">
                <Image
                  src="/images/mascot-portrait.jpg"
                  alt="CHOPPER - bald.dog ARCADE"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold tracking-tight text-pure-white">
                  bald.dog
                </span>
                <span className="font-display text-xs font-bold tracking-widest text-arcade-magenta uppercase">
                  ARCADE
                </span>
              </div>
            </TrackedLink>

            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed max-w-sm">
              &ldquo;El patio de recreo de los perros calvos.&rdquo; — Preservación de salones recreativos, competición 1CC auditada por RAM y netplay libre en Android.
            </p>

            <div className="pt-2 text-[11px] font-mono text-muted-gray">
              <span>Application ID: </span>
              <span className="text-silver-gray">dog.bald.arcade</span>
            </div>
          </div>

          {/* Column: Navegación */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <TrackedLink href="/" source="footer_nav" label="Inicio" className="hover:text-pure-white transition-colors">
                  Inicio
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/#stats" className="hover:text-pure-white transition-colors">
                  Estadísticas
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/#top-downloads" className="hover:text-pure-white transition-colors">
                  Rankings
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/#features" className="hover:text-pure-white transition-colors">
                  Características
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/#download" className="hover:text-pure-white transition-colors">
                  Centro de Descarga
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/#philosophy" className="hover:text-pure-white transition-colors">
                  Filosofía Editorial
                </TrackedLink>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Políticas */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
              Legal & Políticas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <TrackedLink source="footer" href="/privacy" className="hover:text-pure-white transition-colors">
                  Política de Privacidad
                </TrackedLink>
              </li>
              <li>
                <TrackedLink source="footer" href="/terms" className="hover:text-pure-white transition-colors">
                  Términos de Servicio
                </TrackedLink>
              </li>
              <li>
                <span className="text-muted-gray">Licencia GPL-3.0</span>
              </li>
            </ul>
          </div>

          {/* Column: Enlaces Oficiales */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
              Ecosistema
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/balddogarcade/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-gray" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/wrN9KRvubj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <DiscordIcon className="h-3.5 w-3.5" />
                  <span>Discord</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-gray" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/BaldDogArcade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <XIcon className="h-3.5 w-3.5" />
                  <span>X / Twitter</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-gray" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/balddogarcade/Balddog-Android-App/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Releases & APKs</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-gray" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Preservation Declaration & Author */}
        <div className="mt-12 pt-8 border-t border-charcoal/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-gray">
          <p className="text-center sm:text-left">
            bald.dog ARCADE es un proyecto gratuito, sin fines de lucro y de código abierto dedicado a la preservación histórica del arcade.
          </p>
          <p className="shrink-0 font-mono text-center sm:text-right">
            © 2026 bald.dog ARCADE · Por{" "}
            <TrackedLink
              href="https://cbaeza.com"
              external
              source="footer_author"
              label="Carlos Baeza Negroni"
              className="text-silver-gray hover:text-pure-white underline underline-offset-4 transition-colors"
            >
              Carlos Baeza Negroni
            </TrackedLink>
          </p>
        </div>

      </div>
    </footer>
  );
}
