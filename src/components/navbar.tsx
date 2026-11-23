"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Github, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-charcoal/80 bg-obsidian/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-charcoal bg-carbon group-hover:border-steel transition-colors">
            <Image
              src="/images/mascot-portrait.jpg"
              alt="bald.dog ARCADE"
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
            href="#features"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Características
          </Link>
          <Link
            href="#download"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Descarga APK
          </Link>
          <Link
            href="#philosophy"
            className="text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            Filosofía
          </Link>
          <a
            href="https://github.com/balddogarcade/Balddog-Android-App"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-silver-gray hover:text-pure-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Action Button & Slogan Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <Badge variant="mono" className="hidden lg:flex items-center gap-1.5 text-muted-gray border-charcoal">
            <Sparkles className="h-3 w-3 text-arcade-amber" />
            <span>arm64-v8a ready</span>
          </Badge>
          <a href="#download">
            <Button variant="default" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Instalar App</span>
            </Button>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a href="#download">
            <Button variant="default" size="sm" className="h-9 px-3 text-xs">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-charcoal bg-carbon p-2 text-silver-gray hover:text-pure-white hover:bg-graphite transition-colors"
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
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            Características
          </Link>
          <Link
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            Descarga APK
          </Link>
          <Link
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            Filosofía
          </Link>
          <a
            href="https://github.com/balddogarcade/Balddog-Android-App"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-silver-gray hover:bg-graphite hover:text-pure-white"
          >
            <Github className="h-4 w-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      )}
    </header>
  );
}
