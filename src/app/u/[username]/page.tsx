import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PublicProfileView } from "@/components/public-profile-view";
import { getPublicWebProfile } from "@/lib/arcade-profile";

export const revalidate = 120;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeURIComponent(username);
  const profile = await getPublicWebProfile(decoded);

  if (!profile) {
    return {
      title: "Jugador no encontrado",
    };
  }

  return {
    title: `${profile.username} — Perfil Arcade`,
    description:
      profile.bio?.trim() ||
      `Perfil público de ${profile.username} en bald.dog ARCADE: ${profile.global_points} PTS, ${profile.total_1cc} récords 1CC.`,
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decoded = decodeURIComponent(username);
  const profile = await getPublicWebProfile(decoded);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-carbon border border-charcoal p-6 text-center space-y-4 rounded-none">
            <div className="mx-auto h-12 w-12 bg-obsidian border border-steel flex items-center justify-center rounded-none">
              <UserX className="h-6 w-6 text-muted-gray" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-xl font-bold text-pure-white">
                Perfil no encontrado
              </h1>
              <p className="text-xs font-mono text-muted-gray">
                No existe un jugador registrado con el nombre &ldquo;{decoded}&rdquo;.
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
        <PublicProfileView profile={profile} />
      </div>
      <Footer />
    </div>
  );
}
