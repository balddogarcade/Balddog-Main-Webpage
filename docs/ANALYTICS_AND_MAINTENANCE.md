# Analítica Web y Mantenimiento de Base de Datos

## Cloudflare Web Analytics (`bald.dog`)

La web pública utiliza **Cloudflare Web Analytics** para medir tráfico y rendimiento sin cookies ni rastreo de PII:

- **Configuración:** Habilitado a nivel de zona en Cloudflare (`auto_install: True`, `site_tag: daaa548cd2a240fcb97a9f2b03f986d4`).
- **Inyección automática:** Cloudflare inyecta el script `static.cloudflareinsights.com/beacon.min.js` en las respuestas HTML de `bald.dog`. No debe agregarse manualmente en `src/app/layout.tsx` para evitar duplicados.
- **Complemento:** Trabaja en conjunto con Firebase Analytics (GA4) de la app Android.

## Mantenimiento Automático en Supabase (`pg_cron`)

El proyecto Supabase compartido ejecuta la extensión `pg_cron` (`cleanup-stale-rooms`, cada 5 minutos) para cerrar salas de netplay huérfanas o inactivas por más de 30 minutos (`public.cleanup_stale_rooms()`), manteniendo consistentes los contadores públicos consumidos por `get_public_arcade_stats()`.

## Salas Abiertas y Métricas de Emparejamiento

- `src/lib/open-rooms.ts` consulta `get_public_open_rooms()` y `get_matchmaking_stats()` con `cache: "no-store"` para alimentar `/rooms`, `/room/[id]` y `/api/rooms` cada 12 segundos sin exponer `endpoint` ni PII.
