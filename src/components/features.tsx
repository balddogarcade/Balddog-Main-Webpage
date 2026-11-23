import * as React from "react";
import { Cpu, Trophy, Users, Globe2, Eye, ShieldCheck, Flame, Radio } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      icon: Cpu,
      title: "Emulación Arcade Fiel",
      system: "FBNeo + Rust Native",
      description:
        "Rendimiento extremo con backend nativo en Rust y C++ para placas recreativas legendarias: SNK NeoGeo MVS/AES, Capcom CPS1/CPS2 y más. Entrada táctil con latencia reducida y soporte para mandos Bluetooth.",
      badge: "60 FPS SOLID",
    },
    {
      icon: Trophy,
      title: "Leaderboards 1CC Certificados",
      system: "RAM Probing Engine",
      description:
        "Competición real bajo la regla dorada del arcade: 1 Credit Clear. El motor sondea la memoria RAM del emulador en tiempo real con expresiones certificadas. Si metes otra ficha, tu récord no califica.",
      badge: "ANTI-CHEAT",
    },
    {
      icon: Users,
      title: "Netplay P2P & Co-op",
      system: "Salas 2P / 4P",
      description:
        "Crea salas privadas con código simple o únete a partidas públicas en segundos. Juega títulos cooperativos como beat 'em ups o reta a duelo en juegos de pelea sin servidores pesados intermedios.",
      badge: "MULTIPLAYER",
    },
    {
      icon: Globe2,
      title: "Catálogo Descentralizado",
      system: "Pinata IPFS Cloud",
      description:
        "Preservación distribuida. Los catálogos y metadatos se sincronizan a través de la red global IPFS, permitiendo acceso descentralizado y almacenamiento local 100% offline para tus viajes.",
      badge: "DECENTRALIZED",
    },
    {
      icon: Eye,
      title: "Diseño Editorial Monocromático",
      system: "High-Contrast UI",
      description:
        "Una interfaz en escala de grises de grado galería concebida para pantallas OLED. Sin distracciones de luces de neón en los menús: el arte del flyer original en formato vertical 3:4 es la verdadera estrella.",
      badge: "OLED PURE",
    },
    {
      icon: ShieldCheck,
      title: "Soberanía & Cero Anuncios",
      system: "Open Source / Libre",
      description:
        "Sin banners publicitarios, sin suscripciones mensuales y sin telemetría invasiva. Un APK limpio de tan solo ~24 MB gracias a optimizaciones R8 y eliminación de símbolos innecesarios.",
      badge: "24 MB APK",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 border-b border-charcoal/60 bg-obsidian relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
            <Radio className="h-3 w-3 mr-1.5 text-arcade-magenta animate-pulse" />
            <span>INGENIERÍA ARCADE PARA ANDROID</span>
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pure-white">
            Construido para puristas del fichín.
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-gray leading-relaxed">
            bald.dog ARCADE combina la preservación histórica con tecnología móvil moderna. Cada función fue diseñada para honrar la experiencia original de las salas recreativas.
          </p>
        </div>

        {/* Features 2/3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="group border-charcoal bg-carbon/90 hover:border-steel hover:bg-carbon hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top border accent on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-transparent group-hover:bg-gradient-to-r group-hover:from-arcade-magenta group-hover:to-arcade-amber transition-all" />

                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-graphite border border-charcoal group-hover:border-steel text-pure-white transition-colors">
                      <Icon className="h-5 w-5 text-pure-white group-hover:text-arcade-magenta transition-colors" />
                    </div>
                    <Badge variant="mono" className="text-[10px]">
                      {feature.badge}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-gray block mb-1">
                      {feature.system}
                    </span>
                    <CardTitle className="text-lg font-bold group-hover:text-pure-white transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-silver-gray text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
