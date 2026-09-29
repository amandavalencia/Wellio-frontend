export type Sleep = {
  id: number;
  date: string;
  durationMinutes: number;
  sleepQuality: number;
};

export type CreateSleep = {
  date: string;
  durationMinutes: number;
  sleepQuality: number;
};

export type UpdateSleep = CreateSleep;
