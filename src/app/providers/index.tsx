import { AuthProvider } from "./AuthProvider";
import { CookiesProvider } from "react-cookie";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>        
    </CookiesProvider>
  );
};