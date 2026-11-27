import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { OpenRoomsBoard } from "@/components/open-rooms-board";
import { getPublicMatchmakingStats, getPublicOpenRooms } from "@/lib/open-rooms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Salas Abiertas en Vivo | bald.dog ARCADE",
  description: "Explora salas multijugador abiertas, métricas en tiempo real y escanea el código QR para unirte directo desde Android.",
};

export default async function RoomsPage() {
  const [rooms, stats] = await Promise.all([
    getPublicOpenRooms(),
    getPublicMatchmakingStats(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-arcade-magenta">
            Netplay P2P · QR Direct Join
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-pure-white">
            Salas Abiertas en Vivo
          </h1>
          <p className="text-sm text-silver-gray max-w-2xl">
            Escanea el código QR de cualquier sala con tu teléfono para abrir bald.dog ARCADE directamente en el lobby y unirte a la partida.
          </p>
        </div>

        <OpenRoomsBoard initialRooms={rooms} initialStats={stats} />
      </main>
      <Footer />
    </div>
  );
}
