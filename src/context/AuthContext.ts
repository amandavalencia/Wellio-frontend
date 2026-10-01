import { createContext } from "react";
import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
