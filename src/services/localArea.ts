import * as Location from 'expo-location';
import type { LocalArea } from '../domain/models';

export type LocalAreaResult =
  | { status: 'granted'; area: LocalArea }
  | { status: 'denied' };

function approximate(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export async function requestLocalArea(): Promise<LocalAreaResult> {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) return { status: 'denied' };

  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const coordinate = {
    latitude: approximate(position.coords.latitude),
    longitude: approximate(position.coords.longitude),
  };

  let label = 'Your local area';
  try {
    const [address] = await Location.reverseGeocodeAsync(coordinate);
    const parts = [address?.city ?? address?.subregion, address?.region ?? address?.country]
      .filter((part, index, values): part is string => Boolean(part) && values.indexOf(part) === index);
    if (parts.length) label = parts.join(', ');
  } catch {
    // A readable area is optional; the rounded private start remains usable offline.
  }

  return { status: 'granted', area: { label, coordinate, updatedAt: Date.now() } };
}
