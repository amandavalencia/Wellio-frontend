import { ActivityHeader } from "../components/activities/activityHeader";
import { ActivityList } from "../components/activities/ActivityList";
import { ActivityInsightsCard } from "../components/activities/ActivityInsightsCard";
import { ActivityRegistration } from "../components/activities/ActivityRegistration";
import { useActivities } from "../hooks/useActivities";

export const ActivityOverview = () => {
  const { activities, refreshActivities } = useActivities();
  return (
    <>
      <ActivityHeader></ActivityHeader>
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch m-4 mt-8">
        <div className="rounded-lg bg-white/72 shadow-[0_8px_28px_rgb(85_73_81/0.05)] backdrop-blur-sm p-4 flex-1">
          <ActivityRegistration refreshActivities={refreshActivities} />
        </div>
        <ActivityInsightsCard activities={activities} />
      </div>
      <ActivityList
        activities={activities}
        refreshActivities={refreshActivities}
      />
    </>
  );
};
