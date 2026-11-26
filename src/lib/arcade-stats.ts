export interface ArcadeGameStat {
  slug: string;
  title: string;
  system: string;
  max_players: number;
  is_coop: boolean;
  download_count: number;
  total_play_seconds: number;
}

export interface ArcadeSummaryStats {
  total_users: number;
  total_games: number;
  total_downloads: number;
  total_play_seconds: number;
  total_sessions: number;
  total_1cc_records: number;
  verified_replays: number;
  active_countries: number;
}

export interface PublicArcadeStats {
  summary: ArcadeSummaryStats;
  top_downloaded: ArcadeGameStat[];
  top_played: ArcadeGameStat[];
}

export async function getPublicArcadeStats(): Promise<PublicArcadeStats | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/get_public_arcade_stats`,
      {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
        body: "{}",
        signal: controller.signal,
        next: { revalidate: 300 },
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as PublicArcadeStats;
    if (!data || !data.summary) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function formatPlayDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  if (safe < 60) {
    return `${safe}s`;
  }
  const minutes = Math.floor(safe / 60);
  if (minutes < 60) {
    const remSec = safe % 60;
    return remSec > 0 ? `${minutes}m ${remSec}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remMin = minutes % 60;
  return remMin > 0 ? `${hours.toLocaleString("es-ES")}h ${remMin}m` : `${hours.toLocaleString("es-ES")}h`;
}

export function formatCompactNumber(value: number): string {
  return Math.max(0, Math.floor(value)).toLocaleString("es-ES");
}

export function estimateCoinsSavedUsd(totalSessions: number): string {
  const usd = Math.max(0, totalSessions) * 0.25;
  return usd.toLocaleString("es-ES", {
    minimumFractionDigits: usd % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
