import * as React from "react";
import Image from "next/image";
import { Sparkles, Layers, ShieldCheck, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Philosophy() {
  return (
    <section id="philosophy" className="py-20 lg:py-28 border-b border-charcoal/60 bg-carbon/50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mascot Portrait Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-none overflow-hidden border-2 border-charcoal bg-carbon p-2 shadow-2xl group hover:border-arcade-magenta/50 transition-colors">
              <div className="relative w-full h-full rounded-none overflow-hidden bg-obsidian">
                <Image
                  src="/images/mascot-portrait.jpg"
                  alt="CHOPPER, Mascota Doberman Calvo - bald.dog ARCADE"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                
                <div className="absolute inset-x-3 bottom-3 rounded-none border border-charcoal bg-obsidian/90 p-3 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-pure-white block">
                      CHOPPER — Perro Calvo
                    </span>
                    <span className="text-[10px] text-muted-gray font-mono">
                      Guardián del código y los fichines
                    </span>
                  </div>
                  <Badge variant="mono" className="text-[10px]">
                    OFFICIAL
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1.5 text-arcade-amber" />
              <span>DISEÑO EDITORIAL ARCADE</span>
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pure-white leading-tight">
              Sin ruido de luces de neón en la interfaz. El póster del juego manda.
            </h2>

            <p className="font-sans text-base sm:text-lg text-silver-gray leading-relaxed">
              La mayoría de frontends modernos saturan la vista con colores estridentes y menús sobrecargados. En <strong className="text-pure-white">bald.dog ARCADE</strong> apostamos por una estética editorial sobria en escala de grises sobre negros puros.
            </p>

            <p className="font-sans text-sm sm:text-base text-muted-gray leading-relaxed">
              Al retirar el cromo decorativo, los auténticos flyers arcade en relación vertical 3:4 y el pixel art cobran el protagonismo que merecen. Una experiencia de galería concebida para deleitar a los entusiastas del arcade clásico en pantallas móviles de alta resolución.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
              <div className="p-4 rounded-none border border-charcoal bg-graphite/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className="h-4 w-4 text-pure-white" />
                  <span className="font-display text-sm font-bold text-pure-white">Poster-First 3:4</span>
                </div>
                <p className="text-xs text-muted-gray leading-relaxed">
                  Flyers y afiches completos sin recortes arbitrarios, respetando el formato impreso histórico.
                </p>
              </div>

              <div className="p-4 rounded-none border border-charcoal bg-graphite/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <HeartHandshake className="h-4 w-4 text-arcade-magenta" />
                  <span className="font-display text-sm font-bold text-pure-white">Comunidad & Código Libre</span>
                </div>
                <p className="text-xs text-muted-gray leading-relaxed">
                  Desarrollado bajo licencia abierta GPL-3.0 con pasión colectiva por la preservación retro.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
