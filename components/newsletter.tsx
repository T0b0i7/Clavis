/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

"use client";

import { PaperPlaneTilt, Check, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useSettings } from "@/components/settings/settings-provider";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const { language } = useSettings();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isFrench = language === "french";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(isFrench
          ? "Merci ! Vous êtes abonné aux actualités de Clavis."
          : "Thank you! You're subscribed to Clavis updates.");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error ?? (isFrench ? "Erreur" : "Error"));
      }
    } catch {
      setStatus("error");
      setMessage(isFrench
        ? "Erreur de connexion. Réessayez plus tard."
        : "Connection error. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-[11px] text-green-600 dark:text-green-400">
        <Check size={14} weight="bold" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        className={cn(
          "w-40 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1.5",
          "text-[11px] text-foreground placeholder-muted-foreground/50",
          "focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20",
          "transition-colors"
        )}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        placeholder={isFrench ? "Votre email" : "Your email"}
        type="email"
        value={email}
      />
      <button
        className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors",
          status === "loading"
            ? "cursor-wait opacity-50"
            : "bg-primary text-primary-foreground hover:opacity-90"
        )}
        disabled={status === "loading"}
        title={isFrench
          ? "S'abonner aux actualités Clavis"
          : "Subscribe to Clavis updates"}
        type="submit"
      >
        {status === "loading" ? (
          <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <PaperPlaneTilt size={12} weight="fill" />
        )}
        <span>{isFrench ? "OK" : "OK"}</span>
      </button>
      {status === "error" && (
        <button
          className="text-muted-foreground/50 hover:text-muted-foreground"
          onClick={() => setStatus("idle")}
          title="Fermer"
          type="button"
        >
          <X size={12} />
        </button>
      )}
      {status === "error" && message && (
        <span className="text-[10px] text-red-500">{message}</span>
      )}
    </form>
  );
}
