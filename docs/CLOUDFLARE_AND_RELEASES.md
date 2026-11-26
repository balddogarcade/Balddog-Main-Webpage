# Arquitectura, Despliegue en Cloudflare Workers y Distribución de Releases

Guía técnica completa para el mantenimiento, operación y despliegue de **bald.dog ARCADE — Official Landing Webpage** (`bald.dog`).

---

## 1. Arquitectura de Hosting y Runtime

La web está construida con **Next.js 16 (App Router + Turbopack)** y se ejecuta sobre **Cloudflare Workers** mediante `@opennextjs/cloudflare` y `wrangler`:

- **Adaptador:** `@opennextjs/cloudflare` empaqueta la aplicación en `.open-next/worker.js` y los archivos estáticos en `.open-next/assets`.
- **Configuración de Next.js (`next.config.ts`):**
  - **Invariante crítica:** NO definir `output: "export"` en `next.config.ts`. OpenNext requiere la salida estándar/standalone de Next.js; usar `output: "export"` (residuo de GitHub Pages) provoca el error:
    `ENOENT: no such file or directory, open '.../.next/standalone/.next/server/pages-manifest.json'`.
- **Configuración de Wrangler (`wrangler.jsonc`):**
  - Worker: `balddog-main-webpage`
  - Dominios personalizados (`custom_domain: true`):
    - `bald.dog`
    - `www.bald.dog`
  - Al declarar `routes` con `custom_domain: true`, `wrangler deploy` crea y mantiene automáticamente los registros DNS y certificados SSL/TLS en Cloudflare.

---

## 2. DNS y Dominio (`Porkbun` → `Cloudflare`)

- **Registrador:** Porkbun (`bald.dog`)
- **Nameservers autoritativos:**
  - `apollo.ns.cloudflare.com`
  - `lilith.ns.cloudflare.com`

### Comandos de Verificación DNS y HTTPS
```bash
# Verificar delegación NS
dig @1.1.1.1 NS bald.dog +short

# Verificar resolución A hacia Cloudflare
dig @1.1.1.1 A bald.dog +short

# Verificar respuesta HTTP/2 y cabeceras
curl -sI https://bald.dog | head -n 5
```

---

## 3. CI/CD Automático (`.github/workflows/deploy.yml`)

Cada `push` a `main` (o ejecución manual vía `workflow_dispatch`) ejecuta:
1. `actions/checkout@v4` y `actions/setup-node@v4` (Node.js 22 + caché `npm`).
2. `npm ci`
3. `npm run deploy` (`opennextjs-cloudflare build && opennextjs-cloudflare deploy`).

### GitHub Secrets Requeridos (`Settings > Secrets and variables > Actions`)
| Secret | Descripción |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token de API de Cloudflare con permisos de *Workers Scripts: Edit* y *Zone/DNS* |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare donde vive el Worker |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Secrets del Worker (`wrangler secret put`) para consultar `get_public_arcade_stats()` server-side |

> **Seguridad:** Nunca commitear `.dev.vars`, tokens ni credenciales en el repositorio.

---

## 4. Comandos de Operación y Mantenimiento

```bash
# Servidor local de desarrollo (Next.js)
npm run dev

# Compilación de verificación TypeScript / Next.js
npm run build

# Previsualización local simulando el runtime de Cloudflare Workers (workerd)
npm run preview

# Compilar bundle OpenNext y desplegar manualmente a Cloudflare Workers
CLOUDFLARE_API_TOKEN="..." CLOUDFLARE_ACCOUNT_ID="..." npm run deploy

# Inspeccionar logs en vivo del Worker en producción
npx wrangler tail balddog-main-webpage
```

---

## 5. Distribución de Releases Android y Transparencia VirusTotal

En `src/components/download-section.tsx`, la web distribuye directamente los artefactos publicados por el repositorio de la app Android (`balddogarcade/Balddog-Android-App`):

| Propósito | URL Oficial |
|---|---|
| Descarga directa del APK (Botón principal y QR) | `https://github.com/balddogarcade/Balddog-Android-App/releases/latest/download/app-release.apk` |
| Página del Release (Notas, Changelog y reporte VirusTotal) | `https://github.com/balddogarcade/Balddog-Android-App/releases/latest` |
| Checksum criptográfico SHA-256 | `https://github.com/balddogarcade/Balddog-Android-App/releases/latest/download/app-release.apk.sha256` |

El banner **Transparencia y Análisis VirusTotal** destaca:
- Compilación reproducible en GitHub Actions.
- Atestación **SLSA Build Provenance** (`actions/attest-build-provenance`).
- Escaneo automático con **VirusTotal API v3** enlazado en cada Release.
- Verificación de integridad **SHA-256** previa a la instalación tanto manual como desde el auto-actualizador in-app.

---

## 6. Troubleshooting Rápido

- **Error `ENOENT: .../.next/standalone/.next/server/pages-manifest.json`:**
  Verifica que `next.config.ts` no tenga `output: "export"`.
- **Error `DNS_PROBE_POSSIBLE` en el navegador:**
  Verifica que los nameservers en Porkbun apunten a `apollo.ns.cloudflare.com` y `lilith.ns.cloudflare.com`, y ejecuta `npm run deploy` para que `wrangler` registre `bald.dog` y `www.bald.dog` como *Custom Domains* en Cloudflare.
- **Fallo en GitHub Actions al desplegar:**
  Confirma que `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` estén cargados en **Repository secrets** (no en *Variables*).
