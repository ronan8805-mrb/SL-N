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
import { COMMAND_CENTRE_CONFIG } from "@/lib/command-centres";
import { cn } from "@/lib/utils";

export function CommandDashboard() {
  const { incident, commandCentre } = useEmergencyStore();
  const centre = COMMAND_CENTRE_CONFIG[commandCentre];
  const CentreIcon = centre.Icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border",
              centre.bg,
              centre.border
            )}
          >
            <CentreIcon className={cn("w-5 h-5", centre.accent)} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {centre.title}{" "}
              <span className={centre.accent}>Command Centre</span>
            </h2>
            <p className="text-[11px] text-white/40">
              SLÁN National Emergency Operations
            </p>
          </div>
        </div>
        <CommandCentreToggle />
      </div>

      <StatusPipeline />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
        >
          <ActionButtons />
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatSimulation />
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-3">Response Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Packet Time", value: "1.2s", color: "text-emerald-glow" },
              { label: "Dispatch Time", value: "0.9s", color: "text-emerald-glow" },
              { label: "Total Response", value: incident ? "2.1s" : "—", color: "text-emerald-glow" },
            ].map((metric) => (
              <div key={metric.label} className="text-center bg-white/5 rounded-xl p-3">
                <p className={`text-2xl font-black ${metric.color}`}>{metric.value}</p>
                <p className="text-[10px] text-white/40 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}