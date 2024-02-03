"use client";
import NextNProgress from "nextjs-progressbar";

const Progress = () => (
  <NextNProgress
    transformCSS={(css) => (
      <style>{css.replaceAll("#29D", "hsl(var(--primary))")}</style>
    )}
  />
);

export { Progress };
