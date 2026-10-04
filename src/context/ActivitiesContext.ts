import { createContext } from "react";
import type { Activity } from "../types/Activity";

type ActivitiesContextType = {
  activities: Activity[];
  refreshActivities: () => Promise<void>;
};

export const ActivitiesContext = createContext<
  ActivitiesContextType | undefined
>(undefined);
