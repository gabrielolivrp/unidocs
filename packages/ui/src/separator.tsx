import * as React from "react";

import { cn } from "@unidocs/common";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation: "vertical" | "horizontal";
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);

export { Separator };
