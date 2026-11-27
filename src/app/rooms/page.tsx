import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
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
      <div className="border-b border-charcoal bg-pure-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-carbon border border-charcoal hover:border-steel px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver
            </Link>
            <span className="font-display text-sm font-bold uppercase tracking-wider text-pure-white">
              Salas en Vivo
            </span>
          </div>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Salas en Vivo" },
            ]}
          />
        </div>
      </div>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <OpenRoomsBoard initialRooms={rooms} initialStats={stats} />
      </main>
      <Footer />
    </div>
  );
}
