"use client";

import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";

export function SpeedComparison() {
  const { responseTime, demoSpeed } = useEmergencyStore();
  const slanTime = responseTime > 0 ? responseTime : 2.1;
  const traditionalTime = 18.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl sm:rounded-2xl px-2 sm:px-4 py-1.5 sm:py-3 flex items-center gap-2 sm:gap-4"
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald/20 flex items-center justify-center">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-glow" />
        </div>
        <div>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/40">SLÁN</p>
          <p className="text-sm sm:text-lg font-bold text-emerald-glow tabular-nums leading-none">
            {slanTime.toFixed(1)}s
          </p>
        </div>
      </div>

      <div className="w-px h-5 sm:h-8 bg-white/10" />

      <div className="flex items-center gap-1.5 sm:gap-2 opacity-60">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white/5 flex items-center justify-center hidden min-[400px]:flex">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
        </div>
        <div>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/40 hidden min-[400px]:block">
            999
          </p>
          <p className="text-sm sm:text-lg font-bold text-white/50 tabular-nums line-through decoration-alert/60 leading-none">
            {traditionalTime}s+
          </p>
        </div>
      </div>

      {demoSpeed === "slan" && responseTime === 0 && (
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[9px] sm:text-[10px] text-emerald/70 font-medium hidden md:block"
        >
          8.7× faster
        </motion.span>
      )}
    </motion.div>
  );
}