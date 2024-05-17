"use client";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
};
const authContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token ?? "");
    }
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setAuthToken("");
  };
  return (
    <authContext.Provider
      value={{ token: authToken ?? "", setToken, removeToken }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
