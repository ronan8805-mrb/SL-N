"use client";

import { motion } from "framer-motion";
import { PIPELINE_STAGES } from "@/lib/sample-data";
import { useEmergencyStore, type PipelineStage } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

const stageOrder: PipelineStage[] = [
  "received",
  "verified",
  "dispatched",
  "en_route",
  "arrived",
  "resolved",
];

export function StatusPipeline() {
  const { pipelineStage, incident } = useEmergencyStore();
  const currentIndex = stageOrder.indexOf(pipelineStage);

  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-semibold mb-4">Status Pipeline</h3>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10" />
        <motion.div
          className="absolute top-5 left-5 h-0.5 bg-emerald"
          initial={{ width: 0 }}
          animate={{
            width: incident
              ? `${(currentIndex / (stageOrder.length - 1)) * 100}%`
              : "0%",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ maxWidth: "calc(100% - 40px)" }}
        />

        <div className="relative flex justify-between">
          {PIPELINE_STAGES.map((stage, i) => {
            const isActive = i <= currentIndex && incident;
            const isCurrent = stageOrder[i] === pipelineStage;

            return (
              <motion.div
                key={stage.id}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 transition-all",
                    isActive
                      ? "bg-emerald/20 border-emerald text-emerald-glow"
                      : "bg-white/5 border-white/10 text-white/30"
                  )}
                  animate={
                    isCurrent
                      ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.4)", "0 0 0 0 rgba(16,185,129,0)"] }
                      : {}
                  }
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                >
                  {stage.icon}
                </motion.div>
                <span
                  className={cn(
                    "text-[9px] font-medium text-center max-w-[60px]",
                    isActive ? "text-emerald-glow" : "text-white/30"
                  )}
                >
                  {stage.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}