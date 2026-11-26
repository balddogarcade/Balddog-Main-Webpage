"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { PublicGame } from "@/types/game";
import { GameCard } from "@/components/games/game-card";

export function CatalogGrid({ games }: { games: PublicGame[] }) {
  const [query, setQuery] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("ALL");

  const genres = React.useMemo(() => {
    const set = new Set<string>();
    for (const g of games) {
      if (g.genre) set.add(g.genre);
    }
    return ["ALL", ...Array.from(set).sort()];
  }, [games]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((g) => {
      const matchesGenre = selectedGenre === "ALL" || g.genre === selectedGenre;
      if (!matchesGenre) return false;
      if (!q) return true;
      return (
        g.title.toLowerCase().includes(q) ||
        g.slug.toLowerCase().includes(q) ||
        (g.manufacturer?.toLowerCase().includes(q) ?? false) ||
        (g.serie?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [games, query, selectedGenre]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, fabricante, saga o ROM..."
            className="w-full bg-carbon border border-charcoal focus:border-steel outline-none pl-10 pr-4 py-2.5 text-sm font-mono text-pure-white placeholder:text-muted-gray rounded-none"
          />
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-carbon border border-charcoal focus:border-steel outline-none px-4 py-2.5 text-sm font-mono text-silver-gray rounded-none"
        >
          <option value="ALL">Todos los géneros ({games.length})</option>
          {genres
            .filter((g) => g !== "ALL")
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-carbon border border-charcoal p-10 text-center text-sm font-mono text-muted-gray rounded-none">
          No se encontraron juegos con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
