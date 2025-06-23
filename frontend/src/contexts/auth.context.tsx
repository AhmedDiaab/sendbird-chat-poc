// src/contexts/auth.context.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "@/lib/api";

export interface AuthState {
  userId: string | null;
  nickname: string | null;
  profileUrl: string | null;
  token: string | null;
  setAuth: (
    userId: string,
    nickname: string,
    profileUrl: string,
    token: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialise from localStorage if present
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId")
  );
  const [nickname, setNickname] = useState<string | null>(() =>
    localStorage.getItem("nickname")
  );
  const [profileUrl, setProfileUrl] = useState<string | null>(() =>
    localStorage.getItem("profileUrl")
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  // Persist any change
  useEffect(() => {
    const setOrRemove = (key: string, value: string | null) =>
      value ? localStorage.setItem(key, value) : localStorage.removeItem(key);

    setOrRemove("userId", userId);
    setOrRemove("nickname", nickname);
    setOrRemove("profileUrl", profileUrl);
    setOrRemove("token", token);
  }, [userId, nickname, profileUrl, token]);

  // Always attach token to axios when it exists
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["x-api-key"] = import.meta.env.VITE_API_KEY;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  /* --------- helpers exposed to the app ---------- */
  const setAuth = (uid: string, nick: string, pUrl: string, tkn: string) => {
    setUserId(uid);
    setNickname(nick);
    setProfileUrl(pUrl);
    setToken(tkn);
  };

  const logout = () => {
    setAuth(null as any, null as any, null as any, null as any);
    localStorage.clear();
  };

  const value: AuthState = {
    userId,
    nickname,
    profileUrl,
    token,
    setAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext must be used inside AuthProvider");
  return ctx;
};
