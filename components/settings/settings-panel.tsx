/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

"use client";

import { CaretRight, Command, X } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import {
  FONT_OPTIONS,
  KEYBOARD_LAYOUT_OPTIONS,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  useSettings,
} from "@/components/settings/settings-provider";
import { t } from "@/lib/i18n";
import { NextThemeSwitcher } from "@/components/theme/next-theme-switcher";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { FontList } from "./font-picker";
import { ThemeGrid } from "./theme-picker";

/* ─── Main panel ─────────────────────────────────────────── */

interface SettingsPanelProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const {
    accent,
    setAccent,
    fingerColors,
    setFingerColors,
    font,
    setFont,
    ghostMode,
    setGhostMode,
    heatmap,
    setHeatmap,
    keyboardLayout,
    setKeyboardLayout,
    language,
    setLanguage,
    liveStats,
    setLiveStats,
    faahMode,
    setFaahMode,
    showKeyboard,
    setShowKeyboard,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
  } = useSettings();
  const tr = (k: string) => t(k, language);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const swipe = isMobile ? "down" : "right";
  const selectedFont = FONT_OPTIONS.find((f) => f.id === font);
  const selectedTheme = THEME_OPTIONS.find((c) => c.id === accent);

  // Style Recipe: Rounded & Spacious — carte 0.20" / bouton 0.10" / badge 0.08" / marge 0.5"
  const popupClass = cn(
    "h-full border border-foreground/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.12)]",
    isMobile
      ? "mx-3! mb-3! flex max-h-[90dvh] flex-col rounded-[20px]! [--bleed:0px]"
      : "m-3! flex h-[calc(100%-1.5rem)]! flex-col rounded-[20px]! [--bleed:0px]"
  );

  return (
    <Drawer onOpenChange={onOpenChange} open={open} swipeDirection={swipe}>
      <DrawerPopup className={popupClass}>
        <DrawerContent className="flex h-full flex-col">
          <SubDrawerHeader title={tr("settings.title")} />

          <div className="mt-8 flex-1 space-y-7 overflow-y-auto px-1 pr-2">
            {/* ── Appearance ── */}
            <Section title={tr("settings.appearance")}>
              <Row label={tr("settings.appearance.mode")}>
                <NextThemeSwitcher />
              </Row>

              <SubDrawerRow
                label={tr("settings.appearance.themes")}
                popupClass={popupClass}
                preview={
                  <>
                    <span className="flex h-3.5 w-8 overflow-hidden rounded-full ring-1 ring-foreground/10">
                      {selectedTheme?.colors.map((c) => (
                        <span
                          className="flex-1"
                          key={c}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </span>
                    <span className="text-[11px]">{selectedTheme?.label}</span>
                  </>
                }
                swipe={swipe}
              >
                <ThemeGrid active={accent} onSelect={setAccent} />
              </SubDrawerRow>

              <SubDrawerRow
                label={tr("settings.appearance.font")}
                popupClass={popupClass}
                preview={
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: selectedFont?.cssFamily }}
                  >
                    {selectedFont?.label ?? font}
                  </span>
                }
                swipe={swipe}
                title={tr("settings.appearance.font")}
              >
                <FontList active={font} onSelect={setFont} />
              </SubDrawerRow>
            </Section>

            {/* ── Keyboard ── */}
            <Section title={tr("settings.keyboardSection")}>
              <div className="px-4 pb-1">
                <div className="mb-1.5 text-[11px] font-medium text-muted-foreground/70">
                  {tr("settings.keyboard.layout")}
                </div>
                <div className="grid grid-cols-2 gap-1.5 rounded-[16px] bg-foreground/[0.04] p-1 md:flex md:rounded-full">
                  {KEYBOARD_LAYOUT_OPTIONS.map((opt) => (
                    <button
                      className={cn(
                        "whitespace-nowrap rounded-full px-3.5 py-2 text-center text-[11px] font-semibold tracking-wide transition-all duration-200 md:flex-1 md:py-1.5",
                        keyboardLayout === opt.id
                          ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                          : "text-muted-foreground/60 hover:bg-foreground/[0.06] hover:text-foreground"
                      )}
                      key={opt.id}
                      onClick={() => setKeyboardLayout(opt.id)}
                      type="button"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground/40">
                  {tr("settings.keyboard.layoutHint")}
                </p>
              </div>
              {isMobile ? (
                <div className="mx-4 rounded-[10px] border border-dashed border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-center text-[11px] leading-relaxed text-muted-foreground/50">
                  Clavier visuel indisponible sur mobile — test optimisé pour PC
                </div>
              ) : (
                <>
                  <Toggle
                    description={tr("settings.keyboard.showDesc")}
                    enabled={showKeyboard}
                    label={tr("settings.keyboard.show")}
                    onToggle={() => setShowKeyboard(!showKeyboard)}
                  />
                  <Toggle
                    description={tr("settings.keyboard.soundDesc")}
                    enabled={soundEnabled}
                    label={tr("settings.keyboard.sound")}
                    onToggle={() => setSoundEnabled(!soundEnabled)}
                  />
                </>
              )}
              {soundEnabled && !isMobile && (
                <VolumeSlider onChange={setSoundVolume} value={soundVolume} />
              )}
            </Section>

            {/* ── Gameplay ── */}
            <Section title={tr("settings.gameplay")}>
              <Toggle
                description={tr("settings.gameplay.liveStatsDesc")}
                enabled={liveStats}
                label={tr("settings.gameplay.liveStats")}
                onToggle={() => setLiveStats(!liveStats)}
              />
              <Toggle
                description={tr("settings.gameplay.ghostDesc")}
                enabled={ghostMode}
                label={tr("settings.gameplay.ghost")}
                onToggle={() => setGhostMode(!ghostMode)}
              />
              <Toggle
                description={tr("settings.gameplay.faahDesc")}
                enabled={faahMode}
                label={tr("settings.gameplay.faah")}
                onToggle={() => setFaahMode(!faahMode)}
              />
              <Toggle
                description={tr("settings.gameplay.fingerDesc")}
                enabled={fingerColors}
                label={tr("settings.gameplay.finger")}
                onToggle={() => setFingerColors(!fingerColors)}
              />
              <Toggle
                description={tr("settings.gameplay.heatmapDesc")}
                enabled={heatmap}
                label={tr("settings.gameplay.heatmap")}
                onToggle={() => setHeatmap(!heatmap)}
              />
            </Section>

            {/* ── Language ── */}
            <Section title={tr("settings.languageSection")}>
              <Row label={tr("settings.language.label")}>
                <div className="flex gap-1.5">
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      className={cn(
                        "rounded-[10px] px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                        language === opt.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-foreground/[0.06] text-muted-foreground hover:bg-foreground/10"
                      )}
                      key={opt.id}
                      onClick={() => setLanguage(opt.id)}
                      type="button"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Row>
            </Section>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-center gap-1.5 pt-6 pb-2 text-[10px] text-muted-foreground/30">
            Press
            <kbd className="inline-flex items-center gap-px rounded border border-foreground/10 bg-foreground/[0.04] px-1 py-0.5 text-[10px] text-muted-foreground/40 leading-none">
              <Command size={10} weight="duotone" />
              <span>K</span>
            </kbd>
            {tr("hint.pressToToggle")}
          </div>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  );
}

/* ─── Shared sub-drawer header ───────────────────────────── */

function SubDrawerHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <DrawerTitle className="font-semibold text-foreground text-sm">
        {title}
      </DrawerTitle>
      <DrawerClose className="flex items-center justify-center rounded-full bg-foreground/[0.06] p-1.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
        <X size={14} />
        <span className="sr-only">Close</span>
      </DrawerClose>
    </div>
  );
}

/* ─── Sub-drawer row (reusable pattern) ──────────────────── */

function SubDrawerRow({
  label,
  preview,
  children,
  swipe,
  popupClass,
  title,
}: {
  label: string;
  preview: ReactNode;
  children: ReactNode;
  swipe: "down" | "right";
  popupClass: string;
  title?: string;
}) {
  return (
    <Drawer swipeDirection={swipe}>
      <DrawerTrigger className="group flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left transition-colors hover:bg-foreground/[0.04]">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        <span className="flex items-center gap-2 text-muted-foreground text-xs transition-colors group-hover:text-foreground">
          {preview}
          <CaretRight
            className="text-muted-foreground/40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
            size={12}
          />
        </span>
      </DrawerTrigger>
      <DrawerPopup className={popupClass}>
        <SubDrawerHeader title={title ?? label} />
        <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
      </DrawerPopup>
    </Drawer>
  );
}

/* ─── Primitives ─────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <p className="mb-3 font-semibold text-[10px] tracking-[0.14em] text-muted-foreground/40 uppercase">
        {title}
      </p>
      <div className="space-y-1 rounded-[14px] border border-foreground/[0.04] bg-foreground/[0.02] p-1.5">
        {children}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] px-4 py-3 transition-colors hover:bg-foreground/[0.04]">
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}

function Toggle({
  label,
  description,
  enabled,
  onToggle,
  disabledOnMobile,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  disabledOnMobile?: string;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const disabled = !!disabledOnMobile && isMobile;

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left transition-colors",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:bg-foreground/[0.04]"
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onToggle}
      title={disabled ? disabledOnMobile : undefined}
      type="button"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        {description && (
          <span className="text-[11px] leading-relaxed text-muted-foreground/55">
            {description}
          </span>
        )}
      </div>
      <div
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200",
          disabled && "bg-muted",
          !disabled && enabled && "bg-primary",
          !(disabled || enabled) && "bg-foreground/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 dark:bg-foreground",
            !disabled && enabled && "translate-x-4"
          )}
        />
      </div>
    </button>
  );
}

function VolumeSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <Slider
        max={100}
        min={0}
        onValueChange={(v) => {
          const arr = Array.isArray(v) ? v : [v];
          onChange(arr[0] / 100);
        }}
        step={5}
        value={[value * 100]}
      />
      <span className="w-10 rounded-full bg-foreground/[0.06] px-2 py-1 text-center text-[11px] font-medium text-muted-foreground tabular-nums">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}
