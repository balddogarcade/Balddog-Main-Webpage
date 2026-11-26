import * as React from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/pixel-art";
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
 * Renderiza un avatar determinístico DiceBear Pixel Art (v9.x) en marco cuadrado
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

  const dataUri = React.useMemo(() => {
    if (!effectiveSeed) return null;
    return createAvatar(pixelArt, {
      seed: effectiveSeed,
      size,
    }).toDataUri();
  }, [effectiveSeed, size]);

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center bg-obsidian border border-steel rounded-none p-1 overflow-hidden select-none",
        className
      )}
      style={{ width: size + 8, height: size + 8 }}
    >
      {dataUri ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dataUri}
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
