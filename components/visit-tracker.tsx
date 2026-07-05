/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
"use client";

import { useEffect } from "react";
import { recordVisit } from "@/lib/db/visits";

export function VisitTracker() {
  useEffect(() => {
    recordVisit();
  }, []);
  return null;
}
