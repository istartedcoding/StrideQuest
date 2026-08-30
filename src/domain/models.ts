export type ActivityType = 'walk' | 'run';
export type ActivityStatus = 'idle' | 'active' | 'paused' | 'complete';
export type VerificationStatus = 'verified' | 'unverified' | 'suspicious';
export type LeaderboardScope = 'Global' | 'Country' | 'City' | 'Friends' | 'Group';

export interface Coordinate { latitude: number; longitude: number }
export interface LocalArea {
  label: string;
  coordinate: Coordinate;
  updatedAt: number;
}
export interface Checkpoint { id: string; name: string; distanceKm: number; kind: 'checkpoint' | 'landmark' }
export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  distanceKm: number;
  completedKm: number;
  rewardXp: number;
  color: string;
  route: Coordinate[];
  checkpoints: Checkpoint[];
  difficulty: 'Easy' | 'Moderate' | 'Epic';
}
export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  unit: 'km' | 'days' | 'XP' | 'checkpoints';
  endsIn: string;
  participants: number;
  rewardXp: number;
  color: string;
}
export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  initials: string;
  distanceKm: number;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
  verification: VerificationStatus;
}
export interface ActivitySession {
  id: string;
  type: ActivityType;
  status: ActivityStatus;
  distanceKm: number;
  elapsedSeconds: number;
  source: 'simulation' | 'gps' | 'device' | 'health' | 'manual';
  verification: VerificationStatus;
}
