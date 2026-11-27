export interface PublicRoomPlayer {
  username: string;
  avatar_seed: string | null;
}

export interface PublicOpenRoom {
  room_id: string;
  code: string;
  game_id: string;
  game_slug: string;
  game_title: string;
  cover_url: string | null;
  player_count: number;
  max_players: number;
  created_at: string;
  players: PublicRoomPlayer[];
}

export interface GameMatchmakingStat {
  game_slug: string;
  searching: number;
  playing: number;
  open_rooms: number;
}

export interface MatchmakingStats {
  total_searching: number;
  total_playing: number;
  by_game: GameMatchmakingStat[];
}

async function callSupabasePublicRpc<T>(rpcName: string): Promise<T | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${rpcName}`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublicOpenRooms(): Promise<PublicOpenRoom[]> {
  const data = await callSupabasePublicRpc<PublicOpenRoom[]>("get_public_open_rooms");
  return Array.isArray(data) ? data : [];
}

export async function getPublicMatchmakingStats(): Promise<MatchmakingStats> {
  const data = await callSupabasePublicRpc<MatchmakingStats>("get_matchmaking_stats");
  if (!data) {
    return { total_searching: 0, total_playing: 0, by_game: [] };
  }
  return {
    total_searching: Number(data.total_searching ?? 0),
    total_playing: Number(data.total_playing ?? 0),
    by_game: Array.isArray(data.by_game) ? data.by_game : [],
  };
}
