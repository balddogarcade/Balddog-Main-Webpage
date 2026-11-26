import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GameDetailView } from "@/components/games/game-detail-view";
import { getPublicGameBySlug } from "@/lib/games";

export const revalidate = 120;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const game = await getPublicGameBySlug(decoded);

  if (!game) {
    return { title: "Juego no encontrado — bald.dog ARCADE" };
  }

  const desc = [game.manufacturer, game.year, game.genre].filter(Boolean).join(" • ");
  return {
    title: `${game.title} — bald.dog ARCADE`,
    description: desc || `Ficha técnica, galería e historia de ${game.title} en bald.dog ARCADE.`,
    openGraph: game.cover_url
      ? { images: [{ url: game.cover_url, alt: game.title }] }
      : undefined,
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const game = await getPublicGameBySlug(decoded);

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-carbon border border-charcoal p-6 text-center space-y-4 rounded-none">
            <div className="mx-auto h-12 w-12 bg-obsidian border border-steel flex items-center justify-center rounded-none">
              <Gamepad2 className="h-6 w-6 text-muted-gray" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-xl font-bold text-pure-white">
                Juego no encontrado
              </h1>
              <p className="text-xs font-mono text-muted-gray">
                No existe una ROM registrada con el identificador &ldquo;{decoded}&rdquo;.
              </p>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-pure-white text-pure-black px-4 py-2 font-display text-xs font-bold uppercase tracking-wider hover:bg-silver-gray transition-colors rounded-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
      <Navbar />
      <div className="flex-1">
        <GameDetailView game={game} />
      </div>
      <Footer />
    </div>
  );
}
