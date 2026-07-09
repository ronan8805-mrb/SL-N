"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { viewMode, setViewMode } = useEmergencyStore();
  const isCitizen = viewMode === "citizen";

  return (
    <div className="glass rounded-2xl p-1 flex items-center gap-1 relative">
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl bg-emerald/20 border border-emerald/30"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          left: isCitizen ? 4 : "50%",
          right: isCitizen ? "50%" : 4,
        }}
      />
      <button
        onClick={() => setViewMode("citizen")}
        className={cn(
          "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
          isCitizen ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        <Smartphone className="w-4 h-4" />
        <span className="hidden sm:inline">Citizen View</span>
        <span className="sm:hidden">Citizen</span>
      </button>
      <button
        onClick={() => setViewMode("command")}
        className={cn(
          "relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
          !isCitizen ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        <Shield className="w-4 h-4" />
        <span className="hidden sm:inline">Command Dashboard</span>
        <span className="sm:hidden">Command</span>
      </button>
    </div>
  );
}