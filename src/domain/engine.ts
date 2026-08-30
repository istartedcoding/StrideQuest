import type { Checkpoint, Coordinate } from './models';

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function routeProgress(distanceKm: number, routeDistanceKm: number): number {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0 || routeDistanceKm <= 0) return 0;
  return clamp(distanceKm / routeDistanceKm);
}

export function xpForActivity(distanceKm: number, checkpointsReached = 0, completedJourney = false): number {
  const safeDistance = Math.max(0, Number.isFinite(distanceKm) ? distanceKm : 0);
  return Math.floor(safeDistance * 100) + Math.max(0, checkpointsReached) * 75 + (completedJourney ? 500 : 0);
}

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function paceMinutesPerKm(distanceKm: number, elapsedSeconds: number): string {
  if (distanceKm <= 0 || elapsedSeconds <= 0) return '--:--';
  const paceSeconds = Math.round(elapsedSeconds / distanceKm);
  return `${Math.floor(paceSeconds / 60)}:${String(paceSeconds % 60).padStart(2, '0')}`;
}

export function nextCheckpoint(checkpoints: Checkpoint[], distanceKm: number): Checkpoint | undefined {
  return checkpoints.find(checkpoint => checkpoint.distanceKm > distanceKm);
}

export function checkpointsReachedBetween(checkpoints: Checkpoint[], fromKm: number, toKm: number): number {
  return checkpoints.filter(checkpoint => checkpoint.distanceKm > fromKm && checkpoint.distanceKm <= toKm).length;
}

export function interpolateRoute(route: Coordinate[], progress: number): Coordinate | undefined {
  if (!route.length) return undefined;
  if (route.length === 1) return route[0];
  const scaled = clamp(progress) * (route.length - 1);
  const index = Math.min(route.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return {
    latitude: route[index].latitude + (route[index + 1].latitude - route[index].latitude) * local,
    longitude: route[index].longitude + (route[index + 1].longitude - route[index].longitude) * local,
  };
}
