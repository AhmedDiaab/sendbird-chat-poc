import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthState {
  user: string | null;
  token: string | null;
  setAuth: (user: string, token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setAuth = (u: string, t: string) => {
    setUser(u);
    setToken(t);
  };
  const logout = () => setAuth(null as any, null as any);

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext used outside provider");
  return ctx;
};
