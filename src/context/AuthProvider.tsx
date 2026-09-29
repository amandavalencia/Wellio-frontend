import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";
import {
  getCurrentUser,
  loginWithCookie,
  registerUser,
} from "../service/authService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string): Promise<void> => {
    await loginWithCookie({ email, password });
    const user = await getCurrentUser();
    setUser(user);
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    await registerUser({ email, password });
    await signIn(email, password);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
