import { cn } from "@unidocs/common";
import { ReactNode } from "react";
import { Label } from "./label";

interface FormLabelProps {
  error?: boolean;
  children: ReactNode;
}

const FormLabel = ({ children, error = false }: FormLabelProps) => (
  <Label className={cn(error && "text-destructive", "font-semibold")}>
    {children}
  </Label>
);

export { FormLabel };
