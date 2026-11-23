import * as React from "react";
import Image from "next/image";
import { Download, Github, ShieldCheck, Zap, Trophy, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-charcoal/60 bg-gradient-to-b from-obsidian via-obsidian to-carbon/40">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-arcade-magenta/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Slogan, Headline, Description, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Official Slogan Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-arcade-magenta/50 bg-arcade-magenta/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-arcade-magenta animate-pulse" />
              <span className="font-display text-xs sm:text-sm font-semibold tracking-wide text-pure-white">
                “El patio de recreo de los perros calvos.”
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pure-white leading-[1.08]">
              Preservación arcade pura en tu celular Android.
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-silver-gray leading-relaxed max-w-2xl">
              Revive los salones de maquinitas legendarios de NeoGeo y CPS2 con emulación de alto rendimiento escrita en Rust y C++. Compite en leaderboards 1CC auditados contra trampas directamente en la memoria RAM y juega en cooperativo con tus amigos sin intermediarios.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <a href="#download">
                <Button variant="default" size="lg" className="gap-3 w-full sm:w-auto h-13 px-8 text-base">
                  <Smartphone className="h-5 w-5" />
                  <span>Descargar APK Android</span>
                </Button>
              </a>
              <a
                href="https://github.com/balddogarcade/Balddog-Android-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="gap-2.5 w-full sm:w-auto h-13 px-6 text-base">
                  <Github className="h-5 w-5" />
                  <span>Ver en GitHub</span>
                </Button>
              </a>
            </div>

            {/* Quick Tech Specs / Trust Badges */}
            <div className="pt-4 border-t border-charcoal/80 w-full flex flex-wrap items-center gap-3 text-xs text-muted-gray font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite/70 border border-charcoal">
                <Zap className="h-3.5 w-3.5 text-arcade-amber" />
                <span>ARM64-v8a</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite/70 border border-charcoal">
                <ShieldCheck className="h-3.5 w-3.5 text-pure-white" />
                <span>R8 Optimized (~24 MB)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite/70 border border-charcoal">
                <Trophy className="h-3.5 w-3.5 text-arcade-magenta" />
                <span>1 Credit Clear (1CC)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-graphite/70 border border-charcoal">
                <span>Android 8.0+</span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Mascot Artwork */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-3xl overflow-hidden border-2 border-charcoal bg-carbon p-2 shadow-2xl transition-transform duration-500 hover:border-arcade-magenta/60 hover:shadow-[0_0_50px_rgba(255,42,133,0.3)]">
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian">
                <Image
                  src="/images/mascot-pointing.jpg"
                  alt="Doberman calvo señalando al jugador - bald.dog ARCADE"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />

                {/* Overlay Badge at Bottom */}
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-charcoal/90 bg-obsidian/85 p-3.5 backdrop-blur-md flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
                      Te queremos en el arcade
                    </span>
                    <span className="text-[11px] text-muted-gray">
                      Sin cuentas forzadas • 100% Offline Ready
                    </span>
                  </div>
                  <Badge variant="arcade" className="text-[10px] uppercase tracking-wider">
                    Insert Coin
                  </Badge>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
