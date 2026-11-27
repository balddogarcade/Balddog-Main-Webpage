import Link from "next/link";
import type { Metadata } from "next";
import { Download, Smartphone, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DiceBearAvatar } from "@/components/dicebear-avatar";
import { Button } from "@/components/ui/button";
import { getPublicOpenRooms } from "@/lib/open-rooms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unirse a Sala | bald.dog ARCADE",
  description: "Abre esta sala en bald.dog ARCADE para Android o descarga la app oficial.",
};

export default async function RoomMagicLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const openRooms = await getPublicOpenRooms();
  const room = openRooms.find((r) => r.room_id.toLowerCase() === id.toLowerCase());
  const deepLinkScheme = `balddog://room/${id}`;
  const magicUrl = `https://bald.dog/room/${id}`;

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-16">
        <div className="border border-charcoal bg-carbon p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="inline-block border border-charcoal bg-obsidian px-2.5 py-1 font-mono text-xs text-arcade-magenta">
              LINK MÁGICO DE SALA
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-pure-white">
              {room ? room.game_title : "Sala Multijugador bald.dog ARCADE"}
            </h1>
            <p className="text-sm text-silver-gray">
              {room
                ? `Sala #${room.code} abierta (${room.player_count}/${room.max_players} jugadores).`
                : "Esta sala puede haber iniciado, estar llena o haberse cerrado. Aún puedes abrir la app para buscar otra partida."}
            </p>
          </div>

          {room && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-y border-charcoal py-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-gray">
                  <Users className="h-3.5 w-3.5" />
                  <span>Jugadores esperando</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.players.map((p, idx) => (
                    <div
                      key={`${room.room_id}-player-${idx}`}
                      className="flex items-center gap-2 border border-charcoal bg-obsidian px-2.5 py-1.5"
                    >
                      <DiceBearAvatar seed={p.avatar_seed} fallbackSeed={p.username} size={24} />
                      <span className="text-xs font-medium text-pure-white">{p.username}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-pure-white p-2 shrink-0">
                <QRCodeSVG value={magicUrl} size={96} level="M" />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <a href={deepLinkScheme} className="flex-1">
              <Button className="w-full gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Abrir en bald.dog ARCADE</span>
              </Button>
            </a>
            <Link href="/#download" className="flex-1">
              <Button variant="outline" className="w-full gap-2 border-charcoal bg-obsidian text-pure-white hover:bg-graphite">
                <Download className="h-4 w-4" />
                <span>Descargar APK Android</span>
              </Button>
            </Link>
          </div>

          <div className="pt-2 text-center">
            <Link href="/rooms" className="text-xs font-mono text-silver-gray hover:text-pure-white underline">
              Ver todas las salas abiertas
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
