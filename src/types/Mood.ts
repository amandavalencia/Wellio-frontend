export type Mood = {
  id: number;
  date: string;
  mood: number;
  stressLevel: number;
  note: string | null;
};

export type CreateMood = {
  date: string;
  mood: number;
  stressLevel: number;
  note?: string | null;
};

export type UpdateMood = CreateMood;
