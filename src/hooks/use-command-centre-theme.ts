"use client";

import { useEmergencyStore } from "@/store/emergency-store";
import { getCommandCentreTheme } from "@/lib/command-centres";

export function useCommandCentreTheme() {
  const commandCentre = useEmergencyStore((s) => s.commandCentre);
  return getCommandCentreTheme(commandCentre);
}