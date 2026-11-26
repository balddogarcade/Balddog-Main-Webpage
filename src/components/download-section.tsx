"use client";

import * as React from "react";
import { Download, QrCode, ExternalLink, ShieldCheck, Terminal, FileCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function DownloadSection() {
  const directApkUrl =
    "https://github.com/balddogarcade/Balddog-Android-App/releases/latest/download/app-release.apk";
  const releasePageUrl =
    "https://github.com/balddogarcade/Balddog-Android-App/releases/latest";
  const sha256Url =
    "https://github.com/balddogarcade/Balddog-Android-App/releases/latest/download/app-release.apk.sha256";

  return (
    <section id="download" className="py-20 lg:py-28 border-b border-charcoal/60 bg-gradient-to-b from-carbon/40 via-obsidian to-obsidian">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <Badge variant="arcade" className="px-3.5 py-1 text-xs">
            DESCARGA DIRECTA ANDROID
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pure-white">
            Lleva el salón arcade en el bolsillo.
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-gray leading-relaxed">
            Descarga directamente el paquete de instalación oficial para tu dispositivo Android. Sin tiendas restrictivas ni registros invasivos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Download & QR Code (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            <Card className="border-charcoal bg-carbon p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                
                {/* QR Code Container */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="p-3.5 rounded-none bg-pure-white border-2 border-pure-white shadow-2xl">
                    <QRCodeSVG
                      value={directApkUrl}
                      size={144}
                      level="H"
                      includeMargin={false}
                      fgColor="#050506"
                      bgColor="#FAFAFA"
                    />
                  </div>
                  <span className="mt-2 text-[11px] font-mono text-muted-gray flex items-center gap-1">
                    <QrCode className="h-3.5 w-3.5 text-arcade-magenta" />
                    <span>Escanear con tu móvil</span>
                  </span>
                </div>

                {/* Download CTA & Info */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 min-w-0 flex-1">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-pure-white">
                      app-release.apk
                    </h3>
                    <p className="text-sm text-silver-gray mt-1">
                      Versión estable optimizada para procesadores ARM de 64 bits.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                    <a
                      href={directApkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto h-11 px-4 text-xs sm:text-sm whitespace-nowrap">
                        <Download className="h-4 w-4 shrink-0" />
                        <span>Descargar APK</span>
                      </Button>
                    </a>
                    <a
                      href={releasePageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto h-11 px-4 text-xs sm:text-sm whitespace-nowrap border-charcoal hover:border-silver-gray">
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        <span>Ver Release en GitHub</span>
                      </Button>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-gray pt-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Compilado con R8 ProGuard • Binarios Rust optimizados con llvm-strip</span>
                  </div>
                </div>

              </div>

              {/* Sideload guide tips */}
              <div className="mt-8 pt-6 border-t border-charcoal/80">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-gray block mb-3">
                  ¿Cómo instalar en tu dispositivo Android?
                </span>
                <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-silver-gray">
                  <li className="flex items-start gap-2 bg-graphite/40 p-3 rounded-none border border-charcoal">
                    <span className="font-mono text-arcade-magenta font-bold">1.</span>
                    <span>Descarga el archivo APK desde el botón o escaneando el QR.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-graphite/40 p-3 rounded-none border border-charcoal">
                    <span className="font-mono text-arcade-magenta font-bold">2.</span>
                    <span>Acepta &ldquo;Instalar fuentes desconocidas&rdquo; en tu navegador si te lo solicita.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-graphite/40 p-3 rounded-none border border-charcoal">
                    <span className="font-mono text-arcade-magenta font-bold">3.</span>
                    <span>Abre la app, otorga permisos de almacenamiento y ¡a jugar!</span>
                  </li>
                </ol>
              </div>

              {/* VirusTotal & Integrity Transparency Banner */}
              <div className="mt-6 p-4 rounded-none border border-emerald-500/30 bg-emerald-950/15 space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
                      Transparencia y Análisis VirusTotal
                    </span>
                  </div>
                  <Badge variant="mono" className="border-emerald-500/40 text-emerald-400">
                    SLSA + SHA-256
                  </Badge>
                </div>
                <p className="text-xs text-silver-gray leading-relaxed">
                  Cada release oficial se compila de forma reproducible en GitHub Actions, incluye atestación criptográfica{" "}
                  <span className="text-pure-white font-medium">SLSA Build Provenance</span> y se analiza automáticamente con{" "}
                  <span className="text-pure-white font-medium">VirusTotal API v3</span>. Puedes revisar el reporte público de VirusTotal y el checksum{" "}
                  <code className="font-mono text-emerald-400">SHA-256</code> directamente en la página del release antes de instalar.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                  <a
                    href={releasePageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Ver reporte VirusTotal y notas del Release</span>
                  </a>
                  <a
                    href={sha256Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-silver-gray hover:text-pure-white hover:underline"
                  >
                    <FileCode className="h-3.5 w-3.5" />
                    <span>app-release.apk.sha256</span>
                  </a>
                </div>
              </div>
            </Card>

          </div>

          {/* Right Column: Technical Specs Card (5 cols) */}
          <div className="lg:col-span-5">
            <Card className="border-charcoal bg-carbon p-6">
              <div className="flex items-center justify-between pb-4 border-b border-charcoal">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-arcade-amber" />
                  <span className="font-display text-sm font-bold uppercase tracking-wider text-pure-white">
                    Ficha Técnica del Build
                  </span>
                </div>
                <Badge variant="mono">RELEASE</Badge>
              </div>

              <div className="divide-y divide-charcoal/60 font-mono text-xs">
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Application ID</span>
                  <span className="text-pure-white">dog.bald.arcade</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Arquitectura</span>
                  <span className="text-pure-white">arm64-v8a</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Tamaño del APK</span>
                  <span className="text-arcade-magenta font-bold">~25.4 MB</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Android Mínimo</span>
                  <span className="text-pure-white">Android 8.0 (API 26+)</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Core Nativo</span>
                  <span className="text-silver-gray">libbalddog_android.so</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Motor Retro</span>
                  <span className="text-silver-gray">libfbneo_libretro.so</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Distribución</span>
                  <span className="text-pure-white">GitHub Releases + In-App Updater</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-muted-gray">Licencia</span>
                  <span className="text-emerald-400">GPL-3.0 / Open Source</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-charcoal flex justify-between items-center">
                <a
                  href="https://github.com/balddogarcade/Balddog-Android-App/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-silver-gray hover:text-pure-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Historial de versiones y changelog</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
