# bald.dog ARCADE — Official Landing Webpage

> **“El patio de recreo de los perros calvos.”**  
> Official web portal and Android APK download center for **bald.dog ARCADE** (`dog.bald.arcade`), deployed to [bald.dog](https://bald.dog) on **Cloudflare Workers**.

---

## Overview

This repository contains the Next.js web application for **bald.dog ARCADE**, built following the official Brand Manual (*High-Contrast Monochrome Editorial Arcade* with neon accents).

### Key Features
- **High-Impact Hero:** Mascot artwork showcase, official slogan, and direct Android APK download CTA.
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
