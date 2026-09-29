import { get, post, put, del } from "./serviceBase";
import type { Mood, CreateMood } from "../types/Mood";

const moodsUrl = "/api/mood";

export const getMoods = async (): Promise<Mood[]> => {
    return await get<Mood[]>(moodsUrl);
  },
  getMoodById = async (id: number): Promise<Mood> => {
    return await get<Mood>(`${moodsUrl}/${id}`);
  },
  createMood = async (data: CreateMood): Promise<Mood> => {
    return await post<Mood>(moodsUrl, data);
  },
  updateMood = async (id: number, data: CreateMood): Promise<Mood> => {
    return await put<Mood>(`${moodsUrl}/${id}`, data);
  },
  deleteMood = async (id: number): Promise<void> => {
    return await del<void>(`${moodsUrl}/${id}`);
  };
