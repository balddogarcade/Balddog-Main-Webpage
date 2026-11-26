import type { Metadata } from "next";
import { Gamepad2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CatalogGrid } from "@/components/games/catalog-grid";
import { getPublicCatalog } from "@/lib/games";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Catálogo Arcade — bald.dog ARCADE",
  description:
    "Explora el catálogo completo de juegos arcade disponibles en bald.dog ARCADE con fichas técnicas, historia y galerías.",
};

export default async function GamesCatalogPage() {
  const games = await getPublicCatalog();

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-charcoal pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-arcade-magenta">
            <Gamepad2 className="h-4 w-4" />
            <span>Catálogo Oficial</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-pure-white">
            Juegos Arcade
          </h1>
          <p className="text-sm text-silver-gray max-w-2xl">
            {games.length} clásicos verificados para jugar en solitario o netplay P2P con rankings 1CC.
          </p>
        </div>

        <CatalogGrid games={games} />
      </main>
      <Footer />
    </div>
  );
}
