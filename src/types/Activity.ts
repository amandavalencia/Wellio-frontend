export type Activity = {
  id: number;
  date: string;
  activityType: string;
  durationMinutes: number;
  intensity: number;
};

export type CreateActivity = {
  date: string;
  activityType: string;
  durationMinutes: number;
  intensity: number;
};

export type UpdateActivity = CreateActivity;
