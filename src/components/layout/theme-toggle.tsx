"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getThemePreference, setThemePreference, type ThemePreference } from "@/lib/theme";

const NEXT: Record<ThemePreference, ThemePreference> = { light: "dark", dark: "system", system: "light" };

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePreference>("system");
  useEffect(() => setPref(getThemePreference()), []);
  const Icon = pref === "light" ? Sun : pref === "dark" ? Moon : Monitor;
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={`Theme: ${pref}. Switch to ${NEXT[pref]}.`}
      title={`Theme: ${pref}`}
      onClick={() => {
        const next = NEXT[pref];
        setPref(next);
        setThemePreference(next);
      }}
    >
      <Icon />
    </Button>
  );
}
