import Link from "next/link";
import { Users } from "lucide-react";
import type { PublicGame } from "@/types/game";
import { IpfsImage } from "@/components/games/ipfs-image";

export function GameCard({ game }: { game: PublicGame }) {
  const imageSrc = game.cover_url || game.url_image_title || game.url_image_ingame;

  return (
    <Link
      href={`/games/${encodeURIComponent(game.slug)}`}
      className="group bg-carbon border border-charcoal hover:border-steel transition-colors rounded-none flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[3/4] w-full bg-obsidian overflow-hidden border-b border-charcoal">
        <IpfsImage
          src={imageSrc}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {game.year && (
          <span className="absolute top-2 right-2 bg-obsidian/90 border border-charcoal px-2 py-0.5 text-[10px] font-mono text-silver-gray">
            {game.year}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-display text-sm font-bold text-pure-white group-hover:text-arcade-magenta transition-colors line-clamp-2">
            {game.title}
          </h2>
          {game.manufacturer && (
            <p className="text-xs font-mono text-muted-gray truncate">
              {game.manufacturer}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-charcoal/70 text-[11px] font-mono text-silver-gray">
          <span className="truncate">{game.genre || game.system}</span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Users className="h-3 w-3 text-arcade-magenta" />
            {game.nplayers || `${game.players ?? game.max_players}P`}
          </span>
        </div>
      </div>
    </Link>
  );
}
