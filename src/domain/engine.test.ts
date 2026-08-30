import { describe, expect, it } from 'vitest';
import { checkpointsReachedBetween, interpolateRoute, nextCheckpoint, paceMinutesPerKm, routeProgress, xpForActivity } from './engine';

describe('routeProgress', () => {
  it('converts physical distance into bounded route progress', () => {
    expect(routeProgress(2, 10)).toBe(0.2);
    expect(routeProgress(12, 10)).toBe(1);
    expect(routeProgress(-1, 10)).toBe(0);
  });
});

describe('xpForActivity', () => {
  it('awards distance, checkpoint, and completion XP', () => {
    expect(xpForActivity(2.5, 2, true)).toBe(900);
    expect(xpForActivity(-2)).toBe(0);
  });
});

describe('interpolateRoute', () => {
  it('interpolates the route independently from rendering', () => {
    expect(interpolateRoute([{latitude:0,longitude:0},{latitude:10,longitude:20}], .5)).toEqual({latitude:5,longitude:10});
  });
});

describe('activity helpers', () => {
  const checkpoints = [
    { id: 'one', name: 'One', distanceKm: 1, kind: 'checkpoint' as const },
    { id: 'two', name: 'Two', distanceKm: 2, kind: 'landmark' as const },
  ];

  it('normalizes rounded pace seconds', () => {
    expect(paceMinutesPerKm(1, 359.6)).toBe('6:00');
  });

  it('finds upcoming and newly reached checkpoints', () => {
    expect(nextCheckpoint(checkpoints, 1)?.id).toBe('two');
    expect(checkpointsReachedBetween(checkpoints, 0.5, 2)).toBe(2);
  });
});
