import { AuthProvider } from "./AuthProvider";
import { CookiesProvider } from "react-cookie";
import { ToastProvider } from "./ToastProvider";
import ToastContainer from "@/shared/ui/Toast/ToastContainer";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </CookiesProvider>
  );
};
