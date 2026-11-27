"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-charcoal/80 bg-obsidian/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-none border border-charcoal bg-carbon group-hover:border-steel transition-colors">
            <Image
              src="/images/mascot-portrait.jpg"
              alt="CHOPPER - bald.dog ARCADE"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="40px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-pure-white group-hover:text-silver-gray transition-colors">
                bald.dog
              </span>
              <span className="font-display text-xs font-bold tracking-widest text-arcade-magenta uppercase">
                ARCADE
              </span>
            </div>
            <span className="text-[10px] text-muted-gray font-mono hidden sm:inline-block">
              dog.bald.arcade
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/rooms"
            className="text-sm font-medium text-arcade-magenta hover:text-pure-white transition-colors"
          >
            Salas en Vivo
          </Link>
          <Link
            href="/#stats"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Estadísticas
          </Link>
          <Link
            href="/#top-downloads"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Rankings
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Características
          </Link>
          <Link
            href="/#philosophy"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Filosofía
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/#download">
            <Button variant="default" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Instalar App</span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/#download">
            <Button variant="default" size="sm" className="h-9 px-3 text-xs">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-none border border-charcoal bg-carbon p-2 text-silver-gray hover:text-pure-white hover:bg-graphite transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-charcoal bg-carbon px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-none px-3 py-2 text-sm font-medium text-arcade-magenta hover:bg-graphite hover:text-pure-white"
          >
            Salas en Vivo
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-none px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            Características
          </Link>
          <Link
            href="/#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-none px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            Filosofía
          </Link>
        </div>
      )}
    </header>
  );
}
