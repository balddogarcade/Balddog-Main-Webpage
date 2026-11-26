import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ArcadePulse } from "@/components/arcade-pulse";
import { GameRankings } from "@/components/game-rankings";
import { Features } from "@/components/features";
import { DownloadSection } from "@/components/download-section";
import { Philosophy } from "@/components/philosophy";
import { Footer } from "@/components/footer";
import { getPublicArcadeStats } from "@/lib/arcade-stats";

export const revalidate = 300;

export default async function Home() {
  const stats = await getPublicArcadeStats();

  return (
    <div className="flex min-h-screen flex-col bg-obsidian">
      <Navbar />
      <main className="flex-1">
        <Hero stats={stats?.summary ?? null} />
        <ArcadePulse stats={stats?.summary ?? null} />
        <GameRankings
          topDownloaded={stats?.top_downloaded ?? []}
          topPlayed={stats?.top_played ?? []}
        />
        <Features />
        <DownloadSection />
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
}
