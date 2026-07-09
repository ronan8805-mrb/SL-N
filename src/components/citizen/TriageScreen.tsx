"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SwipeGestures } from "./SwipeGestures";
import { useEmergencyStore } from "@/store/emergency-store";
import { useTranslation } from "@/hooks/use-translation";

export function TriageScreen() {
  const { cancelAll } = useEmergencyStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center pt-6 pb-4 h-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert/20 border border-alert/30 mb-3">
          <AlertTriangle className="w-3 h-3 text-alert-glow" />
          <span className="text-[10px] font-bold text-alert-glow uppercase tracking-wider">
            {t.citizen.triage.emergencyActive}
          </span>
        </div>
        <h2 className="text-lg font-bold">{t.citizen.triage.title}</h2>
        <p className="text-xs text-white/40 mt-1 max-w-[260px]">
          {t.citizen.triage.subtitle}
        </p>
      </motion.div>

      <SwipeGestures mode="triage" />

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={cancelAll}
        className="mt-6 text-[11px] text-white/30 hover:text-alert-glow transition-colors"
      >
        {t.citizen.triage.cancel}
      </motion.button>
    </div>
  );
}