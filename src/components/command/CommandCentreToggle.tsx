"use client";

import { motion } from "framer-motion";
import { Ambulance, Flame } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function CommandCentreToggle() {
  const { commandCentre, setCommandCentre } = useEmergencyStore();
  const isAmbulance = commandCentre === "ambulance";

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1 relative">
      <motion.div
        className={cn(
          "absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 rounded-lg sm:rounded-xl border",
          isAmbulance
            ? "bg-red-500/20 border-red-500/30"
            : "bg-orange-500/20 border-orange-500/30"
        )}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          left: isAmbulance ? 2 : "50%",
          right: isAmbulance ? "50%" : 2,
        }}
      />
      <button
        onClick={() => setCommandCentre("ambulance")}
        className={cn(
          "relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-colors",
          isAmbulance ? "text-red-400" : "text-white/50 hover:text-white/70"
        )}
      >
        <Ambulance className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Ambulance Command</span>
        <span className="sm:hidden">Ambulance</span>
      </button>
      <button
        onClick={() => setCommandCentre("fire")}
        className={cn(
          "relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-colors",
          !isAmbulance ? "text-orange-400" : "text-white/50 hover:text-white/70"
        )}
      >
        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Fire Brigade Command</span>
        <span className="sm:hidden">Fire</span>
      </button>
    </div>
  );
}