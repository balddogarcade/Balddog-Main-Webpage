import * as React from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiceBearAvatarProps {
  seed?: string | null;
  fallbackSeed?: string | null;
  size?: number;
  alt?: string;
  className?: string;
}

/**
 * Renderiza un avatar determinístico DiceBear Pixel Art (11.x) en marco cuadrado
 * acorde al manual de marca de bald.dog ARCADE.
 */
export function DiceBearAvatar({
  seed,
  fallbackSeed,
  size = 52,
  alt = "Avatar de jugador",
  className,
}: DiceBearAvatarProps) {
  const effectiveSeed =
    seed?.trim() || fallbackSeed?.trim() || "";

  const avatarUrl = React.useMemo(() => {
    if (!effectiveSeed) return null;
    return `https://api.dicebear.com/11.x/pixel-art/svg?seed=${encodeURIComponent(effectiveSeed)}&size=${size}`;
  }, [effectiveSeed, size]);

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center bg-obsidian border border-steel rounded-none p-1 overflow-hidden select-none",
        className
      )}
      style={{ width: size + 8, height: size + 8 }}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full object-contain [image-rendering:pixelated]"
          draggable={false}
        />
      ) : (
        <User className="h-5 w-5 text-muted-gray" aria-hidden="true" />
      )}
    </div>
  );
}
