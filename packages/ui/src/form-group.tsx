import * as React from "react";

export interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => (
  <div className="flex flex-col space-y-1.5">{children}</div>
);

export { FormGroup };
