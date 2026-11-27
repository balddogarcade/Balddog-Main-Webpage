"use client";

import * as React from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw, Search, Smartphone, Users } from "lucide-react";
import { trackEvent, trackNavigation } from "@/lib/analytics";
import { DiceBearAvatar } from "@/components/dicebear-avatar";
import { Button } from "@/components/ui/button";
import type { MatchmakingStats, PublicOpenRoom } from "@/lib/open-rooms";

interface OpenRoomsBoardProps {
  initialRooms: PublicOpenRoom[];
  initialStats: MatchmakingStats;
}

export function OpenRoomsBoard({ initialRooms, initialStats }: OpenRoomsBoardProps) {
  const [rooms, setRooms] = React.useState<PublicOpenRoom[]>(initialRooms);
  const [stats, setStats] = React.useState<MatchmakingStats>(initialStats);
  const [query, setQuery] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/rooms", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { rooms?: PublicOpenRoom[]; stats?: MatchmakingStats };
        if (Array.isArray(data.rooms)) setRooms(data.rooms);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      // Silencioso en polling periódico
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      void refresh();
    }, 12000);
    return () => clearInterval(id);
  }, [refresh]);

  const statsBySlug = React.useMemo(() => {
    const map = new Map<string, { searching: number; playing: number; open_rooms: number }>();
    for (const row of stats.by_game) {
      map.set(row.game_slug, row);
    }
    return map;
  }, [stats]);

  const filteredRooms = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter(
      (r) =>
        r.game_title.toLowerCase().includes(q) ||
        r.game_slug.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q)
    );
  }, [rooms, query]);

  return (
    <div className="space-y-8">
      {/* Live Global Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-charcoal bg-carbon p-4">
          <div className="text-xs font-mono uppercase text-muted-gray">Salas Abiertas</div>
          <div className="mt-1 font-display text-2xl font-bold text-pure-white">{rooms.length}</div>
        </div>
        <div className="border border-charcoal bg-carbon p-4">
          <div className="text-xs font-mono uppercase text-muted-gray">Buscando Emparejamiento</div>
          <div className="mt-1 font-display text-2xl font-bold text-arcade-magenta">{stats.total_searching}</div>
        </div>
        <div className="border border-charcoal bg-carbon p-4">
          <div className="text-xs font-mono uppercase text-muted-gray">Jugando Activamente</div>
          <div className="mt-1 font-display text-2xl font-bold text-pure-white">{stats.total_playing}</div>
        </div>
      </div>

      {/* Filter & Refresh */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por juego o código de sala..."
            className="w-full border border-charcoal bg-carbon pl-9 pr-3 py-2.5 text-sm text-pure-white placeholder:text-muted-gray focus:border-pure-white focus:outline-none"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            trackEvent("rooms_refresh", { rooms_count: rooms.length });
            void refresh();
          }}
          disabled={refreshing}
          className="gap-2 border-charcoal bg-carbon text-pure-white hover:bg-graphite"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </Button>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="border border-charcoal bg-carbon p-10 text-center space-y-3">
          <Users className="h-8 w-8 mx-auto text-muted-gray" />
          <h3 className="font-display text-lg font-bold text-pure-white">
            No hay salas abiertas en este momento
          </h3>
          <p className="text-sm text-silver-gray max-w-md mx-auto">
            Abre bald.dog ARCADE en tu Android y usa Emparejamiento Rápido o crea una sala pública para que aparezca aquí con su código QR.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const magicUrl = `https://bald.dog/room/${room.room_id}`;
            const gameStat = statsBySlug.get(room.game_slug);
            return (
              <div
                key={room.room_id}
                className="border border-charcoal bg-carbon p-5 flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block border border-charcoal bg-obsidian px-2 py-0.5 font-mono text-xs text-arcade-magenta">
                        #{room.code}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-pure-white leading-tight">
                        {room.game_title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-muted-gray">
                        {room.player_count}/{room.max_players} jugadores
                        {gameStat ? ` · ${gameStat.searching} buscando · ${gameStat.playing} jugando` : ""}
                      </p>
                    </div>
                    <div className="bg-pure-white p-1.5 shrink-0">
                      <QRCodeSVG value={magicUrl} size={84} level="M" />
                    </div>
                  </div>

                  {/* Seated Players (only username + DiceBear avatar, zero IPs) */}
                  <div className="space-y-2 border-t border-charcoal pt-3">
                    <div className="text-[11px] font-mono uppercase text-muted-gray">
                      En sala ahora
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.players.map((p, idx) => (
                        <div
                          key={`${room.room_id}-${idx}`}
                          className="flex items-center gap-2 border border-charcoal bg-obsidian px-2.5 py-1.5"
                        >
                          <DiceBearAvatar seed={p.avatar_seed} fallbackSeed={p.username} size={22} />
                          <span className="text-xs font-medium text-pure-white">{p.username}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-charcoal pt-4">
                  <span className="text-[11px] font-mono text-muted-gray">
                    Escanea el QR con tu teléfono
                  </span>
                  <Link
                    href={`/room/${room.room_id}`}
                    onClick={() => trackNavigation(`/room/${room.room_id}`, "open_rooms_board", room.game_title)}
                  >
                    <Button size="sm" className="gap-1.5">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span>Unirse</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
