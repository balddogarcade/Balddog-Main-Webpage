import type { LatestReplayItem, ReplayAssetRef } from "@/lib/arcade-stats";

export interface SocialLinks {
  x?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  twitch?: string | null;
  discord?: string | null;
  github?: string | null;
  website?: string | null;
}

export interface PublicHighScoreItem {
  game_id: string;
  game_slug: string;
  game_title: string;
  system: string;
  rom_filename: string;
  ipfs_cid: string;
  size_bytes: number;
  sha256: string;
  crc32: string;
  bios: ReplayAssetRef | null;
  parent: ReplayAssetRef | null;
  score: number;
  achieved_at: string;
  rank: number;
  total_players: number;
  replay_path: string | null;
  replay_url?: string;
  replay_size_bytes: number | null;
  verification_status: string;
}

export interface PublicMatchItem {
  id: string;
  game_id: string;
  game_slug: string | null;
  game_title: string | null;
  system: string | null;
  mode: string;
  duration_seconds: number;
  score: number | null;
  ended_at: string | null;
}

export interface PublicWebProfile {
  username: string;
  avatar_seed: string | null;
  bio: string | null;
  country_code: string | null;
  is_private: boolean;
  social_links: SocialLinks;
  total_plays: number | null;
  total_play_seconds: number | null;
  global_points: number;
  global_rank: number | null;
  first_places: number;
  podiums: number;
  total_1cc: number;
  verified_replays: number;
  netplay_matches: number;
  followers_count: number;
  following_count: number;
  high_scores: PublicHighScoreItem[];
  recent_matches: PublicMatchItem[];
}

export interface ArcadeRank {
  title: string;
  minPoints: number;
}

const ARCADE_RANKS: ArcadeRank[] = [
  { title: "NOVATO", minPoints: 0 },
  { title: "RETADOR", minPoints: 150 },
  { title: "LUCHADOR", minPoints: 450 },
  { title: "MAESTRO", minPoints: 900 },
  { title: "GRAN MAESTRO", minPoints: 1500 },
  { title: "LEYENDA", minPoints: 2000 },
];

export function getArcadeRank(points: number): ArcadeRank {
  let current = ARCADE_RANKS[0];
  for (const rank of ARCADE_RANKS) {
    if (points >= rank.minPoints) {
      current = rank;
    }
  }
  return current;
}

export interface ArcadeBadge {
  id: string;
  title: string;
  subtitle: string;
  tier?: string;
}

export function computeArcadeBadges(profile: PublicWebProfile): ArcadeBadge[] {
  const badges: ArcadeBadge[] = [];

  if (profile.first_places > 0) {
    badges.push({
      id: "king",
      title: "REY DEL ARCADE",
      subtitle: `${profile.first_places} × #1`,
    });
  }
  if (profile.podiums > 0) {
    badges.push({
      id: "podium",
      title: "PODIO",
      subtitle: `${profile.podiums} × Top 3`,
    });
  }
  if (profile.total_1cc > 0) {
    badges.push({
      id: "1cc_master",
      title: "1CC MASTER",
      subtitle: `${profile.total_1cc} juegos`,
    });
  }
  if (profile.verified_replays > 0) {
    badges.push({
      id: "verified_replay",
      title: "REPLAY VERIFICADO",
      subtitle: `${profile.verified_replays} auditados`,
    });
  }

  const hours = Math.floor((profile.total_play_seconds ?? 0) / 3600);
  if (hours >= 250) {
    badges.push({ id: "veteran", title: "VETERANO", subtitle: `${hours}h`, tier: "ORO" });
  } else if (hours >= 100) {
    badges.push({ id: "veteran", title: "VETERANO", subtitle: `${hours}h`, tier: "PLATA" });
  } else if (hours >= 25) {
    badges.push({ id: "veteran", title: "VETERANO", subtitle: `${hours}h`, tier: "BRONCE" });
  }

  const netplay = profile.netplay_matches ?? 0;
  if (netplay >= 250) {
    badges.push({ id: "netplay", title: "ANFITRIÓN NETPLAY", subtitle: `${netplay} salas`, tier: "ORO" });
  } else if (netplay >= 100) {
    badges.push({ id: "netplay", title: "ANFITRIÓN NETPLAY", subtitle: `${netplay} salas`, tier: "PLATA" });
  } else if (netplay >= 25) {
    badges.push({ id: "netplay", title: "ANFITRIÓN NETPLAY", subtitle: `${netplay} salas`, tier: "BRONCE" });
  }

  return badges;
}

export function countryCodeToFlagEmoji(code?: string | null): string {
  const clean = code?.trim().toUpperCase();
  if (!clean || clean.length !== 2 || !/^[A-Z]{2}$/.test(clean)) {
    return "";
  }
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + (clean.charCodeAt(0) - 65),
    A + (clean.charCodeAt(1) - 65)
  );
}

export interface ResolvedSocialLink {
  key: string;
  label: string;
  value: string;
  href: string | null;
}

function buildSocialHref(key: string, raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const handle = trimmed.replace(/^@/, "");
  switch (key) {
    case "x":
      return `https://x.com/${handle}`;
    case "instagram":
      return `https://instagram.com/${handle}`;
    case "youtube":
      return trimmed.startsWith("@")
        ? `https://youtube.com/${trimmed}`
        : `https://youtube.com/@${handle}`;
    case "twitch":
      return `https://twitch.tv/${handle}`;
    case "github":
      return `https://github.com/${handle}`;
    case "website":
      return `https://${trimmed}`;
    case "discord":
    default:
      return null;
  }
}

export function resolveSocialLinks(links?: SocialLinks | null): ResolvedSocialLink[] {
  if (!links) return [];
  const entries: Array<[keyof SocialLinks, string]> = [
    ["x", "X"],
    ["instagram", "IG"],
    ["youtube", "YT"],
    ["twitch", "TWITCH"],
    ["discord", "DISCORD"],
    ["github", "GITHUB"],
    ["website", "WEB"],
  ];

  const resolved: ResolvedSocialLink[] = [];
  for (const [key, label] of entries) {
    const val = links[key]?.trim();
    if (val) {
      resolved.push({
        key,
        label,
        value: val,
        href: buildSocialHref(key, val),
      });
    }
  }
  return resolved;
}

export function toReplayModalItem(
  profile: PublicWebProfile,
  scoreItem: PublicHighScoreItem
): LatestReplayItem | null {
  if (!scoreItem.replay_url || !scoreItem.replay_path) return null;
  return {
    id: `${profile.username}-${scoreItem.game_id}`,
    score: scoreItem.score,
    replay_path: scoreItem.replay_path,
    replay_url: scoreItem.replay_url,
    replay_size_bytes: scoreItem.replay_size_bytes,
    verification_status: scoreItem.verification_status,
    achieved_at: scoreItem.achieved_at,
    username: profile.username,
    country_code: profile.country_code,
    avatar_seed: profile.avatar_seed,
    game_slug: scoreItem.game_slug,
    game_title: scoreItem.game_title,
    system: scoreItem.system,
    rom_filename: scoreItem.rom_filename,
    ipfs_cid: scoreItem.ipfs_cid,
    size_bytes: scoreItem.size_bytes,
    sha256: scoreItem.sha256,
    crc32: scoreItem.crc32,
    bios: scoreItem.bios,
    parent: scoreItem.parent,
  };
}

export async function getPublicWebProfile(
  username: string
): Promise<PublicWebProfile | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !username.trim()) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/get_public_web_profile`,
      {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ p_username: username.trim() }),
        signal: controller.signal,
        next: { revalidate: 120 },
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as PublicWebProfile | null;
    if (!data || !data.username) {
      return null;
    }

    const baseUrl = supabaseUrl.replace(/\/+$/, "");
    data.high_scores = (data.high_scores ?? []).map((item) => ({
      ...item,
      replay_url: item.replay_path
        ? `${baseUrl}/storage/v1/object/public/replays/${item.replay_path}`
        : undefined,
    }));

    return data;
  } catch {
    return null;
  }
}
