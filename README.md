# bald.dog ARCADE — Official Landing Webpage

> **“El patio de recreo de los perros calvos.”**  
> Official web portal and Android APK download center for **bald.dog ARCADE** (`dog.bald.arcade`), deployed to [bald.dog](https://bald.dog) on **Cloudflare Workers**.

---

## Overview

This repository contains the Next.js web application for **bald.dog ARCADE**, built following the official Brand Manual (*High-Contrast Monochrome Editorial Arcade* with neon accents).

### Key Features
- **High-Impact Hero & Live Telemetry:** Mascot artwork showcase, official slogan, live community counters (players, playtime, matches, 1CC records), and direct Android APK download CTA.
- **Arcade Pulse & Top 6 Rankings:** Real-time aggregated stats (`#stats`), Top 6 Most Downloaded (`#top-downloads`), and Top 6 Most Played by Time (`#most-played`) with official 3:4 `.webp` flyers.
- **Direct APK Distribution & QR Code:** Direct download link to `app-release.apk` from GitHub Releases (`releases/latest/download/app-release.apk`), release notes link, and instant SVG QR code.
- **Security & VirusTotal Transparency:** Dedicated section highlighting **VirusTotal API v3** scanning, **SLSA Build Provenance** attestation, and `app-release.apk.sha256` verification.
- **Arcade Capabilities Grid:** Details on Rust/FBNeo native emulation (NeoGeo, CPS1/2), 1CC RAM-probed leaderboards, P2P netplay, and IPFS ROM distribution.
- **Legal Pages:** `/privacy/` and `/terms/` routes plus `robots.txt` and `sitemap.xml`.
- **Cloudflare Workers Ready:** Powered by `@opennextjs/cloudflare` and `wrangler` with automatic custom domain routing (`bald.dog` and `www.bald.dog`).

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Adapter / Runtime:** `@opennextjs/cloudflare` on **Cloudflare Workers** (`wrangler`)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with Brand Manual tokens (`ObsidianBlack`, `CarbonSurface`, `GraphiteSurface`, `CharcoalBorder`, `SteelBorder`)
- **Typography:** `Space Grotesk` (Headings/Display), `Inter` (Body/UI), `JetBrains Mono` (Technical/Specs) via `next/font`
- **UI Primitives:** Custom shadcn/ui components (`Button`, `Badge`, `Card`)
- **Icons & QR:** `lucide-react` and `qrcode.react` (pure vector SVG)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) deploying via `npm run deploy`

---

## Local Development & Deployment

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build Next.js production bundle
npm run build

# Preview locally in Cloudflare workerd runtime
npm run preview

# Build OpenNext bundle and deploy to Cloudflare Workers
npm run deploy
```

---

## Production Deployment to Cloudflare Workers

Every push to `main` automatically triggers `.github/workflows/deploy.yml`, which builds the OpenNext bundle and deploys the Worker bound to `bald.dog` and `www.bald.dog` using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from GitHub Repository Secrets.

For full architecture, DNS setup, commands, and troubleshooting, see [docs/CLOUDFLARE_AND_RELEASES.md](docs/CLOUDFLARE_AND_RELEASES.md).

## License

GPL-3.0 License. Open source arcade preservation.

---

## Analytics & Backend Maintenance

- **Cloudflare Web Analytics:** Cookie-free web analytics enabled automatically on `bald.dog` via Cloudflare (`auto_install: True`).
- **Firebase Analytics (Web + Android):** Unified GA4 event tracking via `src/lib/analytics.ts` and `AnalyticsProvider` (configured with `NEXT_PUBLIC_FIREBASE_*` from `.env.example`).
- **Supabase `pg_cron`:** Automated 5-minute maintenance job (`cleanup-stale-rooms`) closes orphaned netplay rooms inactive for over 30 minutes.
- **Docs:** See [docs/ANALYTICS_AND_MAINTENANCE.md](docs/ANALYTICS_AND_MAINTENANCE.md).

---

## Live Open Rooms & QR Magic Links

- **`/rooms` & `/api/rooms`:** Live public board of open `waiting` netplay rooms with game filtering, real-time `searching` / `playing` metrics, DiceBear avatars, and scannable QR codes pointing to `https://bald.dog/room/<room_id>`.
- **`/room/[id]` & `/.well-known/assetlinks.json`:** Android App Link verification and web fallback landing page for users without the app installed.


## Replays
El visor web de replays soporta `.bsv.zst` (Zstandard vía `fzstd`) y `.bsv.gz` (Gzip legacy) de forma transparente.
