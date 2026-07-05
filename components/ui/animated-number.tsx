/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  className?: string;
  /** Duration in ms for the digit transform. Default 1200. */
  duration?: number;
  /** Initial value to animate from. Default 0. */
  from?: number;
  /** Suffix appended after the number (e.g. "%", "s"). */
  suffix?: string;
  value: number;
}

/** Number-flow animated counter. Mounts at `from`, then rolls to `value`. */
export function AnimatedNumber({
  className,
  duration = 1200,
  from = 0,
  suffix,
  value,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    requestAnimationFrame(() => setDisplay(value));
  }, [value]);

  return (
    <NumberFlow
      className={className}
      format={{ useGrouping: true }}
      locales="en-US"
      suffix={suffix}
      transformTiming={{ duration, easing: "ease-out" }}
      value={display}
      willChange
    />
  );
}
