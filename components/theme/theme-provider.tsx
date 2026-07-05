/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
