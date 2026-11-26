import { getPublicArcadeStats, type LatestReplayItem } from "@/lib/arcade-stats";

/**
 * Busca una repetición pública por su identificador único.
 * Actualmente consulta `latest_replays` de `getPublicArcadeStats()`.
 */
export async function getPublicReplayById(
  id: string
): Promise<LatestReplayItem | null> {
  const normalizedId = id.trim();
  if (!normalizedId) {
    return null;
  }

  const stats = await getPublicArcadeStats();
  const replays = stats?.latest_replays;
  if (!replays || replays.length === 0) {
    return null;
  }

  return replays.find((item) => item.id === normalizedId) ?? null;
}
