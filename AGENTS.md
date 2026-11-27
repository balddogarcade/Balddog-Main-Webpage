# Reglas de Diseño y Consistencia (`AGENTS.md`)

Este archivo define reglas obligatorias que todo agente de IA debe respetar al crear o modificar páginas en `Balddog-Main-Webpage` para mantener una consistencia visual absoluta en todo el sitio.

## 1. Estructura Obligatoria de Páginas Internas

Toda página interna de navegación (ej. `/games`, `/rooms`, etc.) **DEBE** seguir exactamente esta estructura de layout, encabezados, márgenes, tipografía y breadcrumbs:

1. **Contenedor raíz:**
   ```tsx
   <div className="min-h-screen flex flex-col bg-obsidian text-pure-white">
     <Navbar />
     {/* Barra de sub-encabezado */}
     {/* <main> */}
     <Footer />
   </div>
   ```

2. **Barra de sub-encabezado (obligatoria inmediatamente debajo de `<Navbar />`):**
   - Contenedor externo: `border-b border-charcoal bg-pure-black`
   - Contenedor interno: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 flex-wrap`
   - **Lado izquierdo** (`flex items-center gap-3`):
     - Botón **Volver**:
       ```tsx
       <Link
         href="/"
         className="inline-flex items-center gap-1.5 bg-carbon border border-charcoal hover:border-steel px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none"
       >
         <ArrowLeft className="h-3.5 w-3.5" />
         Volver
       </Link>
       ```
     - Título de la sección:
       ```tsx
       <span className="font-display text-sm font-bold uppercase tracking-wider text-pure-white">
         Título de la Sección
       </span>
       ```
   - **Lado derecho**: Componente `<Breadcrumb />` (`@/components/ui/breadcrumb`) comenzando siempre por `{ label: "Inicio", href: "/" }`:
     ```tsx
     <Breadcrumb
       items={[
         { label: "Inicio", href: "/" },
         { label: "Título de la Sección" },
       ]}
     />
     ```

3. **Contenedor `<main>`:**
   - **SIEMPRE** usar exactamente estas clases para mantener los mismos márgenes, ancho máximo y espaciado vertical:
     ```tsx
     <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
     ```

## 2. Prohibiciones

- **PROHIBIDO** crear encabezados alternativos dentro de `<main>` con `py-12`, kickers sueltos o `<h1>` grandes (`text-3xl sm:text-4xl`) en páginas internas de navegación.
- **PROHIBIDO** omitir el botón `Volver` o el componente `<Breadcrumb />` en páginas internas.
- **PROHIBIDO** alterar los paddings horizontales (`px-4 sm:px-6 lg:px-8`) o el ancho máximo (`max-w-7xl`) respecto al resto de las páginas internas.

## 3. Regla de Instrumentación de Analytics

- Todo nuevo botón, enlace de navegación, filtro, modal o acción interactiva **DEBE** instrumentarse usando `@/lib/analytics` (`trackEvent`, `trackNavigation`, `trackDownload`, `trackModal`, `trackFilter`, `trackShare`), `@/hooks/use-analytics`, o `@/components/tracked-link`.
- Nunca importar `firebase/analytics` directamente en componentes UI; usar siempre los helpers SSR-safe de `src/lib/analytics.ts`.


## Replays (`.bsv.zst` + `.bsv.gz`)
- `src/lib/bsv-parser.ts` utiliza `fzstd` para descomprimir `.bsv.zst` y `DecompressionStream("gzip")` para `.bsv.gz` mediante detección por *magic bytes*. Mantener ambos caminos al modificar el reproductor de replays.
