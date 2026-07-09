"use client";

import { motion } from "framer-motion";
import { useEmergencyStore } from "@/store/emergency-store";
import {
  buildCommandCentreTheme,
  COMMAND_CENTRE_ORDER,
} from "@/lib/command-centres";
import { cn } from "@/lib/utils";

export function CommandCentreToggle() {
  const { commandCentre, setCommandCentre, locale } = useEmergencyStore();
  const activeIndex = COMMAND_CENTRE_ORDER.indexOf(commandCentre);
  const activeTheme = buildCommandCentreTheme(commandCentre, locale);

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1 relative">
      <motion.div
        className={cn(
          "absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 rounded-lg sm:rounded-xl border",
          activeTheme.indicatorBg,
          activeTheme.indicatorBorder
        )}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          width: `calc(${100 / COMMAND_CENTRE_ORDER.length}% - 4px)`,
          left: `calc(${(activeIndex * 100) / COMMAND_CENTRE_ORDER.length}% + 2px)`,
        }}
      />
      {COMMAND_CENTRE_ORDER.map((id) => {
        const centre = buildCommandCentreTheme(id, locale);
        const isActive = commandCentre === id;
        return (
          <button
            key={id}
            onClick={() => setCommandCentre(id)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium transition-colors min-w-0",
              isActive ? centre.accent : "text-white/50 hover:text-white/70"
            )}
          >
            <centre.Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden md:inline truncate">{centre.label}</span>
            <span className="md:hidden truncate">{centre.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}