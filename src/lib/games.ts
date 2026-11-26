import type { PublicGame } from "@/types/game";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const PUBLIC_GAME_SELECT = [
  "id",
  "slug",
  "title",
  "system",
  "cover_url",
  "max_players",
  "is_coop",
  "download_count",
  "total_play_seconds",
  "game_name",
  "adb_title",
  "short_title",
  "manufacturer",
  "year",
  "genre",
  "serie",
  "players",
  "nplayers",
  "emulator_name",
  "input_controls",
  "input_buttons",
  "buttons_colors",
  "history",
  "history_copyright_long",
  "youtube_video_id",
  "url_image_ingame",
  "url_image_title",
  "url_image_marquee",
  "url_image_cabinet",
  "url_image_flyer",
  "url_icon",
].join(",");

async function fetchGamesFromSupabase(query: string): Promise<PublicGame[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/games?${query}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) return [];
  const data = (await res.json()) as PublicGame[];
  return Array.isArray(data) ? data : [];
}

export async function getPublicCatalog(): Promise<PublicGame[]> {
  return fetchGamesFromSupabase(`select=${PUBLIC_GAME_SELECT}&order=title.asc`);
}

export async function getPublicGameBySlug(slug: string): Promise<PublicGame | null> {
  const rows = await fetchGamesFromSupabase(
    `select=${PUBLIC_GAME_SELECT}&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  return rows[0] ?? null;
}
