import { createContext, useEffect, useState } from "react";
import api from "../api/api";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/profile")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.access_token);
    const profile = await api.get("/auth/profile");
    setUser(profile.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
