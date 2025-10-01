'use client';

import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  page: string;
}

const AnalyticsTracker = ({ page }: AnalyticsTrackerProps) => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const referrer = document.referrer || undefined;
        const userAgent = navigator.userAgent;
        
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, referrer, userAgent }),
        });
      } catch (error) {
        console.error('Failed to track analytics:', error);
      }
    };

    trackVisit();
  }, [page]);

  return null;
};

export default AnalyticsTracker;
