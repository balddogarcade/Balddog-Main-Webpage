import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Términos de Servicio — bald.dog ARCADE",
  description: "Términos de uso y aviso legal de preservación arcade para bald.dog ARCADE.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-obsidian">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-silver-gray hover:text-pure-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver a la portada</span>
          </Link>

          <div className="space-y-3 border-b border-charcoal/80 pb-6">
            <Badge variant="mono">MARCO LEGAL & LICENCIAS</Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-pure-white">
              Términos de Servicio y Aviso Legal
            </h1>
            <p className="text-xs font-mono text-muted-gray">
              Versión 1.0 • Noviembre 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-silver-gray leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                1. Naturaleza y Propósito del Software
              </h2>
              <p>
                <strong>bald.dog ARCADE</strong> es un frontend de emulación de código abierto desarrollado para propósitos de investigación histórica, preservación cultural del software de recreativas y compatibilidad con juegos independientes / homebrew creados para plataformas clásicas (como SNK NeoGeo y Capcom CPS1/2).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                2. Propiedad Intelectual y ROMs
              </h2>
              <p>
                bald.dog ARCADE <strong>NO</strong> aloja ni distribuye software comercial protegido por derechos de autor sin autorización. Todas las marcas registradas, nombres de sistemas y propiedades intelectuales pertenecen a sus respectivos fabricantes (SNK, Capcom, etc.). Es responsabilidad exclusiva del usuario disponer de copias de seguridad legítimas de los juegos que decida ejecutar en el emulador conforme a las leyes aplicables en su territorio.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                3. Licenciamiento de Código Abierto
              </h2>
              <p>
                El código del frontend y los módulos nativos se distribuyen bajo la Licencia Pública General GNU (GPL-3.0). Tienes derecho a inspeccionar, compilar, modificar y bifurcar el código fuente de acuerdo con los términos de dicha licencia.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                4. Exención de Garantías
              </h2>
              <p>
                El software se proporciona &ldquo;tal cual&rdquo; (AS IS), sin garantías explícitas ni implícitas de funcionamiento ininterrumpido en todos los dispositivos Android existentes. El equipo de bald.dog ARCADE no se hace responsable por daños o pérdidas de datos derivados del uso indebido del software.
              </p>
            </section>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
