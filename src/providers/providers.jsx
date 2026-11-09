"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </ThemeProvider>
  );
}