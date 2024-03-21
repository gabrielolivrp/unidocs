import { ReactNode } from "react";
import { cn } from "@unidocs/common";

interface FormMessageProps {
  children: ReactNode;
}

const FormMessage = ({ children }: FormMessageProps) => {
  if (!children) return null;
  return (
    <p className={cn("text-[0.8rem] font-medium text-destructive")}>
      {children}
    </p>
  );
};

export { FormMessage };
