"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { SERVICES, type ServiceType } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function TriageWheel() {
  const { selectedServices, toggleService, setCitizenStep } = useEmergencyStore();
  const rotation = useMotionValue(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
    rotation.set(rotation.get() + info.offset.x * 0.3);
  };

  const handleServiceTap = (service: ServiceType) => {
    toggleService(service);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const anglePerService = 360 / SERVICES.length;

  return (
    <div className="flex flex-col items-center w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-white/50 mb-6 text-center"
      >
        Select emergency services
      </motion.p>

      <div className="relative w-[300px] h-[300px]">
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5"
          style={{ rotate: rotation }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          ref={wheelRef}
        >
          {SERVICES.map((service, i) => {
            const angle = (i * anglePerService - 90) * (Math.PI / 180);
            const radius = 120;
            const cx = 150 + radius * Math.cos(angle);
            const cy = 150 + radius * Math.sin(angle);
            const isSelected = selectedServices.includes(service.id);

            return (
              <motion.button
                key={service.id}
                onClick={() => handleServiceTap(service.id)}
                className={cn(
                  "absolute w-16 h-16 -ml-8 -mt-8 rounded-2xl flex flex-col items-center justify-center transition-all",
                  isSelected
                    ? "bg-emerald/30 border-2 border-emerald shadow-lg shadow-emerald/20 scale-110"
                    : "glass hover:bg-white/10"
                )}
                style={{ left: cx, top: cy }}
                whileTap={{ scale: 0.9 }}
                animate={isSelected ? { scale: [1, 1.15, 1.1] } : {}}
              >
                <span className="text-xl">{service.icon}</span>
                <span className="text-[8px] font-bold mt-0.5 text-white/70">
                  {service.shortName}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-alert/80 to-red-800 flex items-center justify-center shadow-xl shadow-alert/30">
            <span className="text-xs font-black text-white tracking-wider">TRIAGE</span>
          </div>
        </div>

        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid #10b981",
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-8 justify-center">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleServiceTap(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              selectedServices.includes(s.id)
                ? "bg-emerald/20 text-emerald-glow border border-emerald/40"
                : "bg-white/5 text-white/40 border border-white/10"
            )}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCitizenStep("confirm")}
          className="mt-6 w-full max-w-xs py-4 rounded-2xl bg-emerald text-white font-bold shadow-lg shadow-emerald/30 hover:bg-emerald-glow transition-colors"
        >
          Confirm Selection →
        </motion.button>
      )}
    </div>
  );
}