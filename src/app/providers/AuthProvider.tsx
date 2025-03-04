import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { deleteCookie, getCookie } from "@/shared/utils";


interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);


  const token = getCookie("access_token");
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = (role: string) => {
    setUserRole(role);
  };

  const logout = () => {
    deleteCookie("access_token");
    setUserRole(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
