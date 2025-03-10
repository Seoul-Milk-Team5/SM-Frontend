import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { deleteCookie, getCookie } from "@/shared/utils";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<{ userName: string; userId: string }>>;
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
  getUser: () => string;
  getUserData: () => { userName: string; userId: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    userName: "",
    userId: "",
  });

  useEffect(() => {
    const token = getCookie("access_token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const getUser = () => {
    const token = getCookie("access_token");
    return token;
  };

  const getUserData = () => {
    return userData;
  };

  const login = (role: string) => {
    // setCookie("access_token", token, { path: "/", secure: true, httpOnly: false });
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    deleteCookie("access_token");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setUserData, userRole, getUser, login, logout, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
