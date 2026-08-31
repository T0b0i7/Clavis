/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

"use client";

import { At, Hash, Keyboard } from "@phosphor-icons/react";
import { LayoutGroup } from "motion/react";
import { useSettings } from "@/components/settings/settings-provider";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  groupClass,
  MODES,
  Selector,
  Sep,
  SubOptionStack,
  Toggle,
} from "./primitives";
import type { TestControlsProps } from "./test-controls";

/** Desktop inline three-group toolbar. */
export function DesktopToolbar({
  mode,
  timeOption,
  wordOption,
  quoteLength,
  punctuation,
  numbers,
  difficulty,
  onModeChange,
  onTimeOptionChange,
  onWordOptionChange,
  onQuoteLengthChange,
  onPunctuationToggle,
  onNumbersToggle,
  onDifficultyToggle,
}: TestControlsProps) {
  const { keyboardLayout, language } = useSettings();
  const tr = (k: string) => t(k, language);
  return (
    <LayoutGroup id="toolbar">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-foreground/[0.04] px-2.5 py-1.5 font-medium text-[10px] text-muted-foreground/60 uppercase tracking-widest">
          <Keyboard size={12} />
          {keyboardLayout}
        </div>
        {/* Toggles */}
        <div className={groupClass}>
          <Toggle active={punctuation} onClick={onPunctuationToggle}>
            <At size={13} weight="duotone" />
            {tr("controls.punctuation")}
          </Toggle>
          <Toggle active={numbers} onClick={onNumbersToggle}>
            <Hash size={13} weight="duotone" />
            {tr("controls.numbers")}
          </Toggle>
          <Sep />
          <Toggle
            active={difficulty === "easy"}
            onClick={() => onDifficultyToggle("easy")}
          >
            {tr("difficulty.easy")}
          </Toggle>
          <Toggle
            active={difficulty === "hard"}
            onClick={() => onDifficultyToggle("hard")}
          >
            {tr("difficulty.hard")}
          </Toggle>
        </div>

        {/* Mode selector */}
        <div className={groupClass}>
          {MODES.map(({ value, icon: Icon }) => (
            <Selector
              active={mode === value}
              key={value}
              layoutId="mode"
              onClick={() => onModeChange(value)}
            >
              <Icon size={13} />
              {tr(`mode.${value}`)}
            </Selector>
          ))}
        </div>

        {/* Sub-options */}
        <div
          className={cn(
            groupClass,
            "relative grid transition-opacity duration-200 [&>*]:col-start-1 [&>*]:row-start-1",
            mode === "zen" && "pointer-events-none opacity-0"
          )}
        >
          <SubOptionStack
            mode={mode}
            onQuoteLengthChange={onQuoteLengthChange}
            onTimeOptionChange={onTimeOptionChange}
            onWordOptionChange={onWordOptionChange}
            quoteLength={quoteLength}
            timeOption={timeOption}
            wordOption={wordOption}
          />
        </div>
      </div>
    </LayoutGroup>
  );
}
