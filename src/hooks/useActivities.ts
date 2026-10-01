import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getActivities } from "../service/activityService";
import type { Activity } from "../types/Activity";

export function useActivities() {
  const { user, loading } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (loading || !user) return;

    const fetchActivities = async () => {
      const allActivities = await getActivities();
      setActivities(allActivities);
    };

    fetchActivities();
  }, [loading, user]);

  const handleActivityCreated = (activity: Activity) => {
    setActivities((current) => [...current, activity]);
  };

  return { activities, handleActivityCreated };
}
