import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@unidocs/common";

const variant = {
  h1: "text-5xl font-semibold leading-tight",
  h2: "text-4xl font-semibold leading-[1.3]",
  h3: "text-3xl font-semibold leading-snug",
  h4: "text-2xl font-semibold leading-snug",
  h5: "text-xl font-semibold leading-snug",
  h6: "text-base font-base leading-relaxed",
  lead: "text-sm font-normal leading-relaxed",
  paragraph: "text-sm font-light leading-relaxed",
  small: "text-sm font-light leading-normal",
} as const;

const typographyVariants = cva(`block antialiased`, {
  variants: {
    variant,
  },
});

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as: keyof typeof variant;
}

const mapAsToElement = (a: keyof typeof variant) => {
  switch (a) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return a;
    case "lead":
    case "paragraph":
    case "small":
      return "p";
  }
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, className, ...props }, ref) =>
    React.createElement(mapAsToElement(as), {
      ...props,
      ref,
      className: cn(
        typographyVariants({
          variant: as,
          className,
        })
      ),
    })
);

export { Typography };
