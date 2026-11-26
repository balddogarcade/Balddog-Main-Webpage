import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReplayDetailView } from "@/components/replays/replay-detail-view";
import { getPublicReplayById } from "@/lib/replays";

export const revalidate = 120;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const replay = await getPublicReplayById(decoded);

  if (!replay) {
    return {
      title: "Repetición no encontrada — bald.dog ARCADE",
    };
  }

  return {
    title: `Repetición de ${replay.username} en ${replay.game_title} — bald.dog ARCADE`,
    description: `Puntaje: ${replay.score.toLocaleString("es-ES")} en ${replay.game_title} (${replay.system}).`,
  };
}

export default async function ReplayDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const replay = await getPublicReplayById(decoded);

  if (!replay) {
    return (
      <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-carbon border border-charcoal p-6 text-center space-y-4 rounded-none">
            <div className="mx-auto h-12 w-12 bg-obsidian border border-steel flex items-center justify-center rounded-none">
              <Film className="h-6 w-6 text-muted-gray" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-xl font-bold text-pure-white">
                Repetición no encontrada
              </h1>
              <p className="text-xs font-mono text-muted-gray">
                No existe una repetición pública con el identificador &ldquo;{decoded}&rdquo;.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-pure-white text-pure-black px-4 py-2 font-display text-xs font-bold uppercase tracking-wider hover:bg-silver-gray transition-colors rounded-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al inicio
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
        <ReplayDetailView replay={replay} />
      </div>
      <Footer />
    </div>
  );
}
