<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Reglas de Comunicación

1. **Idioma obligatorio — Comunicación siempre en español:**
   - **SIEMPRE** comunícate con el usuario en **español** (respuestas, explicaciones, preguntas, reportes de estado y mensajes de error).
   - *(Los mensajes de commit en Git deben redactarse en inglés).*

---

## Reglas Críticas de Git y Secretos

1. **Autoría exclusiva (`cjbaezilla`) — Prohibido co-autorear commits:**
   - **NUNCA** agregues líneas `Co-authored-by:` ni trailers de atribución a IA/herramientas.
   - El **único autor** de todos los commits debe ser **`cjbaezilla`**.
2. **Cero secretos en el repositorio:**
   - **NUNCA** hagas commit de `.dev.vars`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` ni credenciales en archivos o logs.
3. **Commits descriptivos en inglés:**
   - Incluye siempre título claro y cuerpo descriptivo en inglés.

---

## Invariantes de Cloudflare Workers, OpenNext y Releases

1. **Despliegue exclusivo en Cloudflare Workers:**
   - El sitio corre sobre **Cloudflare Workers** (`@opennextjs/cloudflare` + `wrangler`).
   - **NUNCA** agregues `output: "export"` en `next.config.ts` (rompe `.next/standalone` requerido por OpenNext) ni workflows de GitHub Pages.
2. **Dominios personalizados en `wrangler.jsonc`:**
   - Mantén siempre `routes` con `custom_domain: true` para `bald.dog` y `www.bald.dog`.
3. **Distribución oficial del APK y VirusTotal (`src/components/download-section.tsx`):**
   - El botón principal y el código QR deben apuntar a `https://github.com/balddogarcade/Balddog-Android-App/releases/latest/download/app-release.apk`.
   - Mantén el botón secundario a `releases/latest`, el enlace a `app-release.apk.sha256` y el banner de **Transparencia y Análisis VirusTotal** (`SLSA + SHA-256`).
4. **Referencia técnica:** Consulta [docs/CLOUDFLARE_AND_RELEASES.md](docs/CLOUDFLARE_AND_RELEASES.md) para arquitectura, comandos y troubleshooting.
