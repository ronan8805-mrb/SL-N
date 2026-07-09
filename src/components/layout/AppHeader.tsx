"use client";

import { motion } from "framer-motion";
import { ViewToggle } from "./ViewToggle";
import { SpeedComparison } from "./SpeedComparison";
import { DemoControls } from "./DemoControls";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/use-translation";

export function AppHeader() {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass-strong border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-3 flex flex-col gap-1.5 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald to-emerald-glow flex items-center justify-center shadow-lg shadow-emerald/20">
            <span className="text-sm sm:text-lg font-black text-white tracking-tighter">S</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold tracking-tight leading-tight">
              {t.header.slan} <span className="text-emerald-glow">{t.header.title}</span>
            </h1>
            <p className="text-[9px] sm:text-[11px] text-white/40 tracking-wide hidden sm:block">
              {t.header.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 justify-between lg:justify-end">
          <LanguageSwitcher />
          <SpeedComparison />
          <ViewToggle />
          <DemoControls />
        </div>
      </div>
    </motion.header>
  );
}