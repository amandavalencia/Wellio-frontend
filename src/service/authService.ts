import { post } from "./serviceBase";

export type LoginRequest = {
  email: string;
  password: string;
};
export const loginWithCookie = async (data: LoginRequest): Promise<void> => {
  await post<void>("/api/auth/login?useCookies=true", data);
};
