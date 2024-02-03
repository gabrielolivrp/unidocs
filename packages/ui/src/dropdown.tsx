"use client";

import * as React from "react";
import { Menu } from "@headlessui/react";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@unidocs/common";
import { Icon, Icons } from "./icon";

const Dropdown = React.forwardRef<
  React.ElementRef<typeof Menu>,
  React.ComponentPropsWithoutRef<typeof Menu> & {
    children: React.ReactNode;
  }
>(({ children, ...props }, ref) => (
  <Menu as="div" ref={ref} {...props} className="relative">
    {children}
  </Menu>
));

const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof Menu.Button>,
  React.ComponentPropsWithoutRef<typeof Menu.Button> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <Menu.Button
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent",
      className
    )}
    {...props}
  >
    {children}
  </Menu.Button>
));

const DropdownContent = React.forwardRef<
  React.ElementRef<typeof Menu.Items>,
  React.ComponentPropsWithoutRef<typeof Menu.Items>
>(({ className, ...props }, ref) => (
  <Menu.Items
    ref={ref}
    className={cn(
      "absolute right-0 origin-top-right z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      className
    )}
    {...props}
  />
));

const DropdownItem = React.forwardRef<
  React.ElementRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item> & {
    icon?: Icons;
    children: React.ReactNode;
  }
>(({ className, icon, children, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cn(
      "cursor-pointer w-full flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {icon && <Icon className="w-4 h-4 mr-2" name={icon} />}
    <label className="cursor-pointer">{children}</label>
  </Menu.Item>
));

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));

const DropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
};
