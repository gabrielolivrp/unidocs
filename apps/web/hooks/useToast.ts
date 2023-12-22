import { toast, Id, ToastContent } from "react-toastify";

type Level = "info" | "success" | "warning" | "error" | "default";

type Content = ToastContent;

type ToastId = Id;

type UseToast = () => { toast: (level: Level, content: Content) => ToastId };

const useToast: UseToast = () => ({
  toast: (level, content) =>
    toast(content, {
      type: level,
    }),
});

export { useToast };
