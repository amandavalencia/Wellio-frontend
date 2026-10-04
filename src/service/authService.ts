import type { User } from "../types/User";
import { get, post } from "./serviceBase";

export type LoginRequest = {
  email: string;
  password: string;
};
export const loginWithCookie = async (data: LoginRequest): Promise<void> => {
    await post<void>("/api/auth/login?useCookies=true", data);
  },
  getCurrentUser = async (): Promise<User> => {
    return await get<User>("/api/auth/manage/info");
  },
  registerUser = async (data: LoginRequest): Promise<void> => {
    await post<void>("/api/auth/register", data);
  },
  logout = async (): Promise<void> => {
    await post<void>("/api/auth/logout", {});
  };
