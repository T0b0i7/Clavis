/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { getVisitCount } from "@/lib/db/visits";

export function VisitCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getVisitCount().then(setCount).catch(console.error);
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <span className="text-muted-foreground/60 text-xs">
      <AnimatedNumber
        className="font-medium text-muted-foreground tabular-nums"
        value={count}
      />{" "}
      thocks and counting
    </span>
  );
}
