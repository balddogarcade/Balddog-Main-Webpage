import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { DownloadSection } from "@/components/download-section";
import { Philosophy } from "@/components/philosophy";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-obsidian">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <DownloadSection />
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
}
