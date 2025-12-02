import { useState, useEffect } from 'react';

export interface ActivityLog {
  id: string;
  type: 'create' | 'update' | 'delete' | 'publish' | 'import' | 'export';
  target: 'blog' | 'contact' | 'testimonial' | 'case-study' | 'course';
  title: string;
  timestamp: Date;
}

const ACTIVITY_KEY = 'stratiumex_activity_log';
const MAX_ACTIVITIES = 50;

export function useActivityLog() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp)
        }));
        setActivities(parsed);
      } catch {
        console.error('Error parsing activity log');
      }
    }
  }, []);

  const addActivity = (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    const updated = [newActivity, ...activities].slice(0, MAX_ACTIVITIES);
    setActivities(updated);
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
  };

  const clearActivities = () => {
    setActivities([]);
    localStorage.removeItem(ACTIVITY_KEY);
  };

  return { activities, addActivity, clearActivities };
}
