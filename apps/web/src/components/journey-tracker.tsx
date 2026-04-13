'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'apio_journey';

interface JourneyData {
  pagesViewed: string[];
  timeOnSite: number;
  referrer: string;
  startedAt: number;
}

function getJourney(): JourneyData {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as JourneyData;
    }
  } catch {
    // ignore
  }
  return {
    pagesViewed: [],
    timeOnSite: 0,
    referrer: document.referrer,
    startedAt: Date.now(),
  };
}

function saveJourney(journey: JourneyData) {
  try {
    const toStore = {
      ...journey,
      timeOnSite: Math.round((Date.now() - journey.startedAt) / 1000),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // ignore
  }
}

export function JourneyTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const journey = getJourney();

    if (!journey.pagesViewed.includes(pathname)) {
      journey.pagesViewed.push(pathname);
    }

    saveJourney(journey);
  }, [pathname]);

  return null;
}
