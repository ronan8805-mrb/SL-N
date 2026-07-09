"use client";

import { motion } from "framer-motion";
import { IncidentFeed } from "./IncidentFeed";
import { LiveMap } from "./LiveMap";
import { DataPacketCard } from "./DataPacketCard";
import { ActionButtons } from "./ActionButtons";
import { ChatSimulation } from "./ChatSimulation";
import { StatusPipeline } from "./StatusPipeline";
import { CommandCentreToggle } from "./CommandCentreToggle";
import { useEmergencyStore } from "@/store/emergency-store";
import { useCommandCentreTheme } from "@/hooks/use-command-centre-theme";
import { cn } from "@/lib/utils";

export function CommandDashboard() {
  const { incident } = useEmergencyStore();
  const theme = useCommandCentreTheme();
  const CentreIcon = theme.Icon;

  return (
    <motion.div
      key={theme.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative max-w-7xl mx-auto px-4 py-6 space-y-6"
    >
      <div
        className={cn(
          "absolute inset-0 pointer-events-none bg-gradient-to-b rounded-3xl",
          theme.gradient
        )}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border",
              theme.bg,
              theme.border
            )}
          >
            <CentreIcon className={cn("w-5 h-5", theme.accent)} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {theme.title}{" "}
              <span className={theme.accent}>Command Centre</span>
            </h2>
            <p className="text-[11px] text-white/40">{theme.subtitle}</p>
          </div>
        </div>
        <CommandCentreToggle />
      </div>

      <div className="relative">
        <StatusPipeline />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IncidentFeed />
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LiveMap />
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DataPacketCard />
        </motion.div>
      </div>

      {incident && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <ActionButtons />
        </motion.div>
      )}

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatSimulation />
        <div className="glass rounded-2xl p-4">
          <h3 className={cn("text-sm font-semibold mb-3", theme.accent)}>
            {theme.title} Response Metrics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {theme.metrics.map((metric) => (
              <div key={metric.label} className="text-center bg-white/5 rounded-xl p-3">
                <p className={cn("text-2xl font-black", theme.accentGlow)}>
                  {incident ? metric.value : "—"}
                </p>
                <p className="text-[10px] text-white/40 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}