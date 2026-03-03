import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          border: "1px solid #e5e7eb",
          color: "#1f2937",
        },
        className: "toast",
        duration: 3000,
      }}
    />
  );
}
