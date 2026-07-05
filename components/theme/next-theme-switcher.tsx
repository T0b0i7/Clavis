/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";

interface NextThemeSwitcherProps {
  className?: string;
}

export function NextThemeSwitcher({ className }: NextThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeSwitcher
      className={className}
      onChange={(next) => setTheme(next)}
      value={(theme ?? "system") as "light" | "dark" | "system"}
    />
  );
}
