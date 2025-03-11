import { useToast } from "@/app/providers/ToastProvider";
import Toast from "./Toast";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-10 left-1/2 z-50 -translate-x-1/2 transform">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

export default ToastContainer;
