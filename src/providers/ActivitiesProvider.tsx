import { useEffect, useState } from "react";
import { ActivitiesContext } from "../context/ActivitiesContext";
import { useAuth } from "../hooks/useAuth";
import type { Activity } from "../types/Activity";
import { getActivities } from "../service/activityService";

export const ActivitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const refreshActivities = async () => {
    const activities = await getActivities();
    setActivities(activities);
  };

  return (
    <ActivitiesContext.Provider value={{ activities, refreshActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
