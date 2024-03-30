import { cn } from "@unidocs/common";
import * as React from "react";

export interface FormItemProps extends HTMLDivElement {}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));

export { FormItem };
