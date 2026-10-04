import { get, post, put, del } from "./serviceBase";
import type { Sleep, CreateSleep } from "../types/Sleep";

const sleepsUrl = "/api/sleep";

export const getSleeps = async (): Promise<Sleep[]> => {
    return await get<Sleep[]>(sleepsUrl);
  },
  getSleepById = async (id: number): Promise<Sleep> => {
    return await get<Sleep>(`${sleepsUrl}/${id}`);
  },
  createSleep = async (data: CreateSleep): Promise<Sleep> => {
    return await post<Sleep>(sleepsUrl, data);
  },
  updateSleep = async (id: number, data: CreateSleep): Promise<Sleep> => {
    return await put<Sleep>(`${sleepsUrl}/${id}`, data);
  },
  deleteSleep = async (id: number): Promise<void> => {
    return await del<void>(`${sleepsUrl}/${id}`);
  };
