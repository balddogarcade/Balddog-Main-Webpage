# Replays Deterministas (`.bsv.zst` y `.bsv.gz`)

El reproductor web (`src/lib/bsv-parser.ts`) soporta tanto replays nuevos comprimidos con **Zstandard** (`.bsv.zst`) mediante `fzstd`, como replays legacy comprimidos con **Gzip** (`.bsv.gz`) mediante `DecompressionStream("gzip")`.

La detección del formato es automática por *magic bytes*:
- `0x28 0xB5 0x2F 0xFD` → Zstandard (`fzstd.decompress`)
- `0x1F 0x8B` → Gzip (`DecompressionStream("gzip")`)
- `BSV1` → Sin compresión
