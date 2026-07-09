"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { viewMode, setViewMode } = useEmergencyStore();
  const { t } = useTranslation();
  const isCitizen = viewMode === "citizen";

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1 relative">
      <motion.div
        className="absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 rounded-lg sm:rounded-xl bg-emerald/20 border border-emerald/30"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          left: isCitizen ? 2 : "50%",
          right: isCitizen ? "50%" : 2,
        }}
      />
      <button
        onClick={() => setViewMode("citizen")}
        className={cn(
          "relative z-10 flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-colors",
          isCitizen ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">{t.header.citizenView}</span>
        <span className="sm:hidden">{t.header.citizenShort}</span>
      </button>
      <button
        onClick={() => setViewMode("command")}
        className={cn(
          "relative z-10 flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-colors",
          !isCitizen ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">{t.header.commandView}</span>
        <span className="sm:hidden">{t.header.commandShort}</span>
      </button>
    </div>
  );
}