# bald.dog ARCADE — Official Landing Webpage

> **“El patio de recreo de los perros calvos.”**  
> Official web portal and Android APK download center for **bald.dog ARCADE** (`dog.bald.arcade`), deployed to [bald.dog](https://bald.dog) via GitHub Pages.

---

## Overview

This repository contains the static web frontend for **bald.dog ARCADE**, built following the official Brand Manual (*High-Contrast Monochrome Editorial Arcade* with neon accents).

### Key Features
- **High-Impact Hero:** Mascot artwork showcase, official slogan, and direct Android APK download CTA.
- **Mobile QR Code Scanner:** Instant SVG QR code for desktop-to-mobile APK sideloading.
- **Arcade Capabilities Grid:** Details on Rust/FBNeo native emulation (NeoGeo, CPS1/2), 1CC RAM-probed leaderboards, P2P netplay, and IPFS distribution.
- **Brand Philosophy:** High-contrast OLED editorial design principles (poster-first 3:4 uncropped flyers).
- **Static Legal Stubs:** Fully compliant `/privacy/` and `/terms/` pages.
- **GitHub Pages Ready:** Pure static export (`output: 'export'`) with `CNAME` (`bald.dog`), `.nojekyll`, `robots.txt`, and `sitemap.xml`.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export `output: 'export'`)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with Brand Manual tokens (`ObsidianBlack`, `CarbonSurface`, `GraphiteSurface`, `CharcoalBorder`, `SteelBorder`)
- **Typography:** `Space Grotesk` (Headings/Display), `Inter` (Body/UI), `JetBrains Mono` (Technical/Specs) via `next/font`
- **UI Primitives:** Custom shadcn/ui components (`Button`, `Badge`, `Card`)
- **Icons:** SVG vector icons and `lucide-react`
- **QR Code Engine:** `qrcode.react` (pure vector SVG)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) using `actions/deploy-pages@v4`

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build static output (exports to ./out)
npm run build
```

---

## Production Deployment to GitHub Pages

Every push to the `main` branch automatically triggers the `.github/workflows/deploy.yml` workflow, which builds the static bundle and deploys it directly to GitHub Pages bound to `bald.dog`.

## License

GPL-3.0 License. Open source arcade preservation.
