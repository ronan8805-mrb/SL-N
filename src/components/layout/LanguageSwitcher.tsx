"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  const isEs = locale === "es";

  return (
    <div className="glass rounded-xl p-0.5 flex items-center gap-0.5 relative">
      <Globe className="w-3 h-3 text-white/40 ml-1.5 hidden sm:block" />
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-lg bg-emerald/20 border border-emerald/30"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          width: "calc(50% - 2px)",
          left: isEs ? "calc(50% + 1px)" : 2,
        }}
      />
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "relative z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors",
          !isEs ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        {t.header.langEn}
      </button>
      <button
        onClick={() => setLocale("es")}
        className={cn(
          "relative z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors",
          isEs ? "text-emerald-glow" : "text-white/50 hover:text-white/70"
        )}
      >
        {t.header.langEs}
      </button>
    </div>
  );
}