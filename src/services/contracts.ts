import type { ActivitySession, Coordinate, VerificationStatus } from '../domain/models';

export interface ActivitySample { timestamp: number; distanceMeters: number; coordinate?: Coordinate; source: ActivitySession['source'] }
export interface ActivityProvider {
  start(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  stop(): Promise<ActivitySample[]>;
  subscribe(listener: (sample: ActivitySample) => void): () => void;
}
export interface MapProvider { renderRoute(route: Coordinate[]): unknown; projectPosition(coordinate: Coordinate): unknown }
export interface HealthProvider { requestAccess(): Promise<boolean>; importActivities(since: Date): Promise<ActivitySession[]> }
export interface ActivityValidator { validate(samples: ActivitySample[]): Promise<{ status: VerificationStatus; signals: string[] }> }

/** Demo validator boundary. Production validation must execute server-side and combine multiple signals. */
export class RulesBasedValidator implements ActivityValidator {
  async validate(samples: ActivitySample[]) {
    if (samples.length < 2) return { status: 'unverified' as const, signals: ['insufficient_samples'] };
    return { status: 'unverified' as const, signals: ['demo_client_session'] };
  }
}
