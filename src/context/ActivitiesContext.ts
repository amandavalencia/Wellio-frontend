import { createContext } from "react";
import type { Activity } from "../types/Activity";

type ActivitiesContextType = {
  activities: Activity[];
  handleActivityCreated: (activity: Activity) => void;
};

export const ActivitiesContext = createContext<
  ActivitiesContextType | undefined
>(undefined);
