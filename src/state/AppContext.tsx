import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { journeys } from '../data/mock';
import { checkpointsReachedBetween, xpForActivity } from '../domain/engine';
import type { ActivitySession, ActivityType, Journey, LocalArea } from '../domain/models';

interface AppState {
  journey: Journey;
  session: ActivitySession;
  totalXp: number;
  totalDistanceKm: number;
  completedSessions: ActivitySession[];
  lastRewardXp: number;
  homeArea?: LocalArea;
  setHomeArea: (area?: LocalArea) => void;
  selectJourney: (journey: Journey) => void;
  startSession: (type: ActivityType) => void;
  togglePause: () => void;
  finishSession: () => void;
  discardSession: () => void;
  tick: () => void;
}

const initialSession: ActivitySession = { id: 'demo', type: 'walk', status: 'idle', distanceKm: 0, elapsedSeconds: 0, source: 'simulation', verification: 'unverified' };
const initialProgress = Object.fromEntries(journeys.map(journey => [journey.id, journey.completedKm]));
const STORAGE_KEY = '@stridequest/progress-v1';
const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [selectedJourneyId, setSelectedJourneyId] = useState(journeys[0].id);
  const [progressByJourney, setProgressByJourney] = useState<Record<string, number>>(initialProgress);
  const [session, setSession] = useState(initialSession);
  const [completedSessions, setCompletedSessions] = useState<ActivitySession[]>([]);
  const [totalXp, setTotalXp] = useState(6840);
  const [lastRewardXp, setLastRewardXp] = useState(0);
  const [homeArea, setHomeArea] = useState<LocalArea>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (!value) return;
        const saved = JSON.parse(value) as {
          selectedJourneyId?: string;
          progressByJourney?: Record<string, number>;
          totalXp?: number;
          completedSessions?: ActivitySession[];
          homeArea?: LocalArea;
        };
        if (saved.selectedJourneyId && journeys.some(item => item.id === saved.selectedJourneyId)) setSelectedJourneyId(saved.selectedJourneyId);
        if (saved.progressByJourney && typeof saved.progressByJourney === 'object') setProgressByJourney({ ...initialProgress, ...saved.progressByJourney });
        if (typeof saved.totalXp === 'number' && Number.isFinite(saved.totalXp)) setTotalXp(saved.totalXp);
        if (Array.isArray(saved.completedSessions)) setCompletedSessions(saved.completedSessions.slice(0, 100));
        if (saved.homeArea && Number.isFinite(saved.homeArea.coordinate?.latitude) && Number.isFinite(saved.homeArea.coordinate?.longitude)) setHomeArea(saved.homeArea);
      })
      .catch(error => console.warn('Stored progress could not be restored.', error))
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedJourneyId, progressByJourney, totalXp, completedSessions, homeArea }))
      .catch(error => console.warn('Progress could not be saved.', error));
  }, [completedSessions, homeArea, hydrated, progressByJourney, selectedJourneyId, totalXp]);

  const journey = useMemo(() => {
    const selected = journeys.find(item => item.id === selectedJourneyId) ?? journeys[0];
    return { ...selected, completedKm: progressByJourney[selected.id] ?? selected.completedKm };
  }, [progressByJourney, selectedJourneyId]);

  const selectJourney = useCallback((selected: Journey) => setSelectedJourneyId(selected.id), []);
  const startSession = useCallback((type: ActivityType) => {
    setLastRewardXp(0);
    setSession({ ...initialSession, id: String(Date.now()), type, status: 'active' });
  }, []);
  const togglePause = useCallback(() => setSession(current => ({
    ...current,
    status: current.status === 'active' ? 'paused' : current.status === 'paused' ? 'active' : current.status,
  })), []);
  const discardSession = useCallback(() => setSession(initialSession), []);

  const finishSession = useCallback(() => {
    setSession(current => {
      if (current.status !== 'active' && current.status !== 'paused') return current;
      const previousDistance = journey.completedKm;
      const completedDistance = Math.min(journey.distanceKm, previousDistance + current.distanceKm);
      const reached = checkpointsReachedBetween(journey.checkpoints, previousDistance, completedDistance);
      const completedJourney = previousDistance < journey.distanceKm && completedDistance >= journey.distanceKm;
      const reward = xpForActivity(current.distanceKm, reached, completedJourney);
      const finished: ActivitySession = { ...current, status: 'complete' };
      setProgressByJourney(progress => ({ ...progress, [journey.id]: completedDistance }));
      setCompletedSessions(history => [finished, ...history]);
      setTotalXp(xp => xp + reward);
      setLastRewardXp(reward);
      return finished;
    });
  }, [journey]);

  const tick = useCallback(() => setSession(current => {
    if (current.status !== 'active') return current;
    const increment = current.type === 'run' ? 0.003 : 0.0016;
    const remaining = Math.max(0, journey.distanceKm - journey.completedKm);
    return {
      ...current,
      elapsedSeconds: current.elapsedSeconds + 1,
      distanceKm: Math.min(remaining, current.distanceKm + increment),
    };
  }), [journey.completedKm, journey.distanceKm]);

  const totalDistanceKm = useMemo(
    () => journeys.reduce((sum, item) => sum + (progressByJourney[item.id] ?? item.completedKm), 0),
    [progressByJourney],
  );

  const value = useMemo<AppState>(() => ({
    journey, session, totalXp, totalDistanceKm, completedSessions, lastRewardXp, homeArea, setHomeArea,
    selectJourney, startSession, togglePause, finishSession, discardSession, tick,
  }), [completedSessions, discardSession, finishSession, homeArea, journey, lastRewardXp, selectJourney, session, startSession, tick, togglePause, totalDistanceKm, totalXp]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
