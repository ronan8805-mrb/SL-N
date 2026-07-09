"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import { SERVICES } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function IncidentFeed() {
  const { incident, pipelineStage } = useEmergencyStore();

  const feedItems = incident
    ? [
        {
          id: incident.id,
          title: `${incident.citizenName} — Emergency`,
          severity: incident.severity,
          services: incident.services,
          time: incident.timestamp.toLocaleTimeString("en-IE"),
          status: pipelineStage,
        },
      ]
    : [];

  return (
    <div className="glass rounded-2xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Live Incident Feed</h3>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-1.5 text-[10px] text-emerald font-bold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          LIVE
        </motion.span>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {feedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-white/30 text-sm"
            >
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 opacity-30" />
              Awaiting incidents…
              <p className="text-[11px] mt-2">Run the citizen demo to see live feed</p>
            </motion.div>
          ) : (
            feedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white/5 rounded-xl p-4 border border-emerald/20 hover:border-emerald/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-[10px] text-white/40 font-mono">{item.id}</p>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      item.severity >= 8
                        ? "bg-alert/20 text-alert-glow"
                        : "bg-yellow-500/20 text-yellow-400"
                    )}
                  >
                    SEV {item.severity}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  {item.services.map((sid) => {
                    const svc = SERVICES.find((s) => s.id === sid);
                    return svc ? (
                      <span key={sid} className="text-sm" title={svc.name}>
                        {svc.icon}
                      </span>
                    ) : null;
                  })}
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                  <span className="text-emerald-glow font-medium uppercase">
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}