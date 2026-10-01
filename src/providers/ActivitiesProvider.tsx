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

  const handleActivityCreated = (activity: Activity) => {
    setActivities((current) => [...current, activity]);
  };

  return (
    <ActivitiesContext.Provider value={{ activities, handleActivityCreated }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
