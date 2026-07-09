"use client";

import { motion } from "framer-motion";
import { useEmergencyStore } from "@/store/emergency-store";

export function RescueButton() {
  const { setCitizenStep } = useEmergencyStore();

  return (
    <motion.button
      onClick={() => setCitizenStep("triage")}
      className="relative w-36 h-36 rounded-full bg-gradient-to-br from-alert to-red-700 flex items-center justify-center rescue-pulse cursor-pointer"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-alert-glow/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />
      <div className="text-center z-10">
        <span className="text-2xl font-black text-white tracking-widest">RESCUE</span>
        <p className="text-[10px] text-white/70 mt-1 font-medium">Tap to activate</p>
      </div>
    </motion.button>
  );
}