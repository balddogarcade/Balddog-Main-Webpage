import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Shield, Terminal, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/80 bg-carbon text-silver-gray font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-charcoal bg-obsidian">
                <Image
                  src="/images/mascot-portrait.jpg"
                  alt="bald.dog ARCADE"
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
            </Link>

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
                <Link href="/" className="hover:text-pure-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-pure-white transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="/#download" className="hover:text-pure-white transition-colors">
                  Centro de Descarga
                </Link>
              </li>
              <li>
                <Link href="/#philosophy" className="hover:text-pure-white transition-colors">
                  Filosofía Editorial
                </Link>
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
                <Link href="/privacy" className="hover:text-pure-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-pure-white transition-colors">
                  Términos de Servicio
                </Link>
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
                  href="https://github.com/balddogarcade/Balddog-Android-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
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
              <li>
                <a
                  href="https://gateway.pinata.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pure-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>IPFS Pinata Gateway</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-gray" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-charcoal/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-gray">
          <p className="text-center sm:text-left">
            bald.dog ARCADE es un proyecto de emulación de código abierto para propósitos de estudio y preservación histórica sin fines comerciales. Todas las marcas registradas pertenecen a sus respectivos titulares.
          </p>
          <p className="shrink-0 font-mono">
            © 2026 bald.dog ARCADE.
          </p>
        </div>

      </div>
    </footer>
  );
}
