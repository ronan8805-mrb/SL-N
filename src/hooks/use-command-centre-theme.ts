"use client";

import { useEmergencyStore } from "@/store/emergency-store";
import { buildCommandCentreTheme } from "@/lib/command-centres";

export function useCommandCentreTheme() {
  const commandCentre = useEmergencyStore((s) => s.commandCentre);
  const locale = useEmergencyStore((s) => s.locale);
  return buildCommandCentreTheme(commandCentre, locale);
}