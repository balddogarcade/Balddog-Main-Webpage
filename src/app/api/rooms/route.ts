import { NextResponse } from "next/server";
import { getPublicMatchmakingStats, getPublicOpenRooms } from "@/lib/open-rooms";

export const dynamic = "force-dynamic";

export async function GET() {
  const [rooms, stats] = await Promise.all([
    getPublicOpenRooms(),
    getPublicMatchmakingStats(),
  ]);
  return NextResponse.json({ rooms, stats }, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
