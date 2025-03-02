import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCookie, setCookie } from "../../shared/utils/cookies";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    setCookie("access_token", token, { path: "/", secure: true, httpOnly: false });
    setIsAuthenticated(true);
  };

  const logout = () => {
    cookies.remove("access_token", { path: "/" }); // 직접 삭제
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
