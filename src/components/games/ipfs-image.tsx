"use client";

import * as React from "react";

type ImageStatus = "loading" | "loaded" | "error";

interface IpfsImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
  fallbackText?: string;
}

export function IpfsImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  containerClassName = "relative h-full w-full overflow-hidden bg-obsidian",
  loading = "eager",
  fallbackText = "SIN PORTADA",
}: IpfsImageProps) {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const [errorSrc, setErrorSrc] = React.useState<string | null>(null);

  const status: ImageStatus = !src || errorSrc === src
    ? "error"
    : loadedSrc === src
      ? "loaded"
      : "loading";

  React.useEffect(() => {
    if (!src) return;

    const img = imgRef.current;
    if (!img || !img.complete) return;

    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      if (img.naturalWidth > 0) {
        setLoadedSrc(src);
      } else {
        setErrorSrc(src);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const handleLoad = React.useCallback(async () => {
    if (!src) return;
    const img = imgRef.current;
    if (img && typeof img.decode === "function") {
      try {
        await img.decode();
      } catch {
        // Ignorar errores de decode si el navegador ya pintó o canceló
      }
    }
    setLoadedSrc(src);
  }, [src]);

  const handleError = React.useCallback(() => {
    if (!src) return;
    setErrorSrc(src);
  }, [src]);

  if (!src || status === "error") {
    return (
      <div className={`${containerClassName} flex items-center justify-center text-xs font-mono text-muted-gray`}>
        {fallbackText}
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {status === "loading" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-obsidian overflow-hidden"
        >
          <div className="h-full w-full animate-pulse bg-charcoal/50" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
