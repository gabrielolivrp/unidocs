import * as React from "react";

export interface FormItemProps {
  children: React.ReactNode;
}

const FormItem = ({ children }: FormItemProps) => (
  <div className="flex flex-col space-y-1.5">{children}</div>
);

export { FormItem };
