import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Política de Privacidad — bald.dog ARCADE",
  description: "Política de privacidad y compromiso offline-first de bald.dog ARCADE.",
};

export default function PrivacyPage() {
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
            <Badge variant="mono">PRIVACIDAD & PRIVILEGIOS MÍNIMOS</Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-pure-white">
              Política de Privacidad
            </h1>
            <p className="text-xs font-mono text-muted-gray">
              Última actualización: Noviembre 2026 • Aplicación móvil: dog.bald.arcade
            </p>
          </div>

          <div className="space-y-6 text-sm text-silver-gray leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                1. Compromiso de Cero Telemetría
              </h2>
              <p>
                <strong>bald.dog ARCADE</strong> está diseñado bajo una estricta filosofía <em>offline-first</em>. No recopilamos, no vendemos, no almacenamos ni transmitimos datos personales identificables, identificadores publicitarios (GAID) ni perfiles de uso a ningún servidor corporativo ni a intermediarios de analítica.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                2. Almacenamiento Local en tu Dispositivo
              </h2>
              <p>
                Todas las imágenes de juegos (ROMs), archivos de guardado (save states), registros de puntajes locales y configuraciones de controles permanecen exclusivamente dentro del almacenamiento aislado de tu propio teléfono móvil Android (Scoped Storage). Tienes control total para respaldar o eliminar estos datos en cualquier momento.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                3. Conexiones de Red y Multijugador (Netplay)
              </h2>
              <p>
                El acceso a internet en la aplicación se limita exclusivamente a:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-gray">
                <li>Descarga opcional de metadatos de juegos desde la red descentralizada IPFS (Pinata Gateway).</li>
                <li>Conexión punto a punto (P2P) entre dispositivos de jugadores al crear o ingresar a salas cooperativas multijugador. No se graban ni se monitorean las sesiones de juego.</li>
                <li>Envío voluntario de récords 1CC certificados al leaderboard global de Supabase cuando el usuario decide compartir su puntuación.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                4. Permisos del Sistema Operativo
              </h2>
              <p>
                La aplicación solo solicita los permisos estrictamente necesarios para su funcionamiento (acceso a almacenamiento local para cargar partidas y Bluetooth para mandos físicos). Nunca se solicita acceso a contactos, cámara, micrófono ni geolocalización.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-pure-white">
                5. Contacto
              </h2>
              <p>
                Para cualquier inquietud sobre la arquitectura de privacidad o el código fuente, puedes auditar el repositorio abierto en GitHub:{" "}
                <a
                  href="https://github.com/balddogarcade/Balddog-Android-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pure-white underline underline-offset-4"
                >
                  github.com/balddogarcade/Balddog-Android-App
                </a>.
              </p>
            </section>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
