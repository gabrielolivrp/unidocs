import { useTheme } from "next-themes";
import { Theme, ToastContainer } from "react-toastify";

const Toaster = () => {
  const { theme } = useTheme();
  return (
    <ToastContainer
      hideProgressBar
      position="top-right"
      theme={theme as Theme}
    />
  );
};

export { Toaster };
