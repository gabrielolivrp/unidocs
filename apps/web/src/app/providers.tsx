"use client";

import { Progress } from "@/components";
import { AlertProvider, LoadingProvider } from "@/contexts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <Progress />
    <LoadingProvider>
      <AlertProvider>{children}</AlertProvider>
    </LoadingProvider>
    <Toaster />
  </ThemeProvider>
);
