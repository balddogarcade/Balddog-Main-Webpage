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

## Firebase Analytics (Web + Android Unificados)

La web está instrumentada con **Firebase Analytics** (`firebase/app` y `firebase/analytics`) conectado al mismo proyecto de Firebase Console que `Balddog-Android-App`:

- **Inicialización segura para SSR:** `src/lib/firebase.ts` y `src/lib/analytics.ts` validan `typeof window !== "undefined"` e `isSupported()` antes de inicializar `getAnalytics()`. Si las variables `NEXT_PUBLIC_FIREBASE_*` no están configuradas, las llamadas son no-op seguros.
- **Variables de entorno (`.env.example`):**
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
  - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- **Tracking automático de rutas:** `src/components/analytics-provider.tsx` (montado en `src/app/layout.tsx`) emite `page_view` en cada navegación de App Router.

### Taxonomía de Eventos

| Evento | Parámetros | Origen |
| --- | --- | --- |
| `page_view` | `page_path`, `page_title`, `page_location` | `AnalyticsProvider` |
| `navigation_click` | `destination`, `source`, `label`, `external` | `Navbar`, `Footer`, `Hero`, `TrackedLink` |
| `apk_download_click` | `asset_name`, `source`, `url` | `DownloadSection` |
| `mobile_menu_toggle` | `open` | `Navbar` |
| `modal_interaction` | `modal_name`, `action`, `context` | `LatestReplays`, `GameDetailView`, `PublicProfileView` |
| `replay_control` | `action`, `speed` | `ReplayPlayerModal` |
| `share` | `content_type`, `item_id`, `method` | `LatestReplays`, `ReplayDetailView`, `PublicProfileView` |
| `catalog_search` | `search_term`, `results_count` | `CatalogGrid` |
| `filter_change` | `filter_type`, `value`, `source` | `CatalogGrid` |
| `rooms_refresh` | `rooms_count` | `OpenRoomsBoard` |
