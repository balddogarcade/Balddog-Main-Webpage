import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
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
              Catálogo Arcade
            </span>
          </div>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo" },
            ]}
          />
        </div>
      </div>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <CatalogGrid games={games} />
      </main>
      <Footer />
    </div>
  );
}
