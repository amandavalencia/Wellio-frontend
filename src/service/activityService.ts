import { get, post, put, del } from "./serviceBase";
import type { Activity, CreateActivity } from "../types/Activity";

const activitiesUrl = "/api/activity";

//tog bort try catch eftersom att jag ist kan hantera felmeddelandet i den komponent som gör anroppet istället för att här returnera felmeddelandet
export const getActivities = async (): Promise<Activity[]> => {
    return await get<Activity[]>(activitiesUrl);
  },
  getActivityById = async (id: number): Promise<Activity> => {
    return await get<Activity>(`${activitiesUrl}/${id}`);
  },
  createActivity = async (data: CreateActivity): Promise<Activity> => {
    return await post<Activity>(activitiesUrl, data);
  },
  updateActivity = async (
    id: number,
    data: CreateActivity,
  ): Promise<Activity> => {
    return await put<Activity>(`${activitiesUrl}/${id}`, data);
  },
  deleteActivity = async (id: number): Promise<void> => {
    return await del<void>(`${activitiesUrl}/${id}`);
  };
