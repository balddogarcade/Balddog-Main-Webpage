import * as React from "react";
import {
  Users,
  Clock,
  Coins,
  Trophy,
  Download,
  Globe2,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ArcadeSummaryStats,
  formatCompactNumber,
  formatPlayDuration,
  estimateCoinsSavedUsd,
} from "@/lib/arcade-stats";

interface ArcadePulseProps {
  stats: ArcadeSummaryStats | null;
}

export function ArcadePulse({ stats }: ArcadePulseProps) {
  if (!stats) {
    return null;
  }

  const avgSessionSeconds =
    stats.total_sessions > 0
      ? Math.round(stats.total_play_seconds / stats.total_sessions)
      : 0;

  const crtDays = (stats.total_play_seconds / 86400).toFixed(1);

  const metrics = [
    {
      icon: Users,
      label: "Jugadores Registrados",
      value: formatCompactNumber(stats.total_users),
      detail: `Activos en ${formatCompactNumber(Math.max(1, stats.active_countries))} ${
        stats.active_countries === 1 ? "país" : "países"
      }`,
      accent: "text-arcade-magenta",
    },
    {
      icon: Clock,
      label: "Tiempo Frente al CRT",
      value: formatPlayDuration(stats.total_play_seconds),
      detail: `${crtDays} días continuos de fichín`,
      accent: "text-arcade-amber",
    },
    {
      icon: Coins,
      label: "Partidas / Fichas Ahorradas",
      value: formatCompactNumber(stats.total_sessions),
      detail: `~$${estimateCoinsSavedUsd(stats.total_sessions)} USD en maquinitas`,
      accent: "text-pure-white",
    },
    {
      icon: Download,
      label: "Descargas del Catálogo",
      value: formatCompactNumber(stats.total_downloads),
      detail: `${formatCompactNumber(stats.total_games)} títulos curados en IPFS`,
      accent: "text-arcade-magenta",
    },
    {
      icon: Trophy,
      label: "Récords 1CC Certificados",
      value: formatCompactNumber(stats.total_1cc_records),
      detail: `${formatCompactNumber(stats.verified_replays)} replays verificados`,
      accent: "text-arcade-amber",
    },
    {
      icon: Globe2,
      label: "Promedio por Partida",
      value: formatPlayDuration(avgSessionSeconds),
      detail: "100% telemetría real de Supabase",
      accent: "text-pure-white",
    },
  ];

  return (
    <section
      id="stats"
      className="py-16 lg:py-24 border-b border-charcoal/60 bg-carbon/30 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-12">
          <Badge variant="mono" className="border-steel text-silver-gray px-3 py-1">
            <Activity className="h-3 w-3 mr-1.5 text-arcade-magenta animate-pulse" />
            <span>PULSO DEL SALÓN ARCADE</span>
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-pure-white">
            Números reales de la comunidad.
          </h2>

          <p className="font-sans text-sm sm:text-base text-muted-gray leading-relaxed">
            Cada descarga, partida y récord 1CC queda registrado en tiempo real por los jugadores de bald.dog ARCADE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="border-charcoal bg-carbon/90 hover:border-steel transition-colors"
              >
                <CardContent className="p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-gray block">
                      {item.label}
                    </span>
                    <div className="font-display text-3xl font-bold text-pure-white tracking-tight">
                      {item.value}
                    </div>
                    <p className="text-xs text-silver-gray">{item.detail}</p>
                  </div>
                  <div className="p-2.5 rounded-none bg-graphite border border-charcoal shrink-0">
                    <Icon className={`h-5 w-5 ${item.accent}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
