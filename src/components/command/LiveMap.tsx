"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";
import { useCommandCentreTheme } from "@/hooks/use-command-centre-theme";
import { cn } from "@/lib/utils";

export function LiveMap() {
  const { location, incident, updateLocation, pipelineStage } =
    useEmergencyStore();
  const theme = useCommandCentreTheme();

  useEffect(() => {
    if (!incident) return;
    const interval = setInterval(() => {
      const jitter = () => (Math.random() - 0.5) * 0.0002;
      const state = useEmergencyStore.getState();
      updateLocation(state.location.lat + jitter(), state.location.lng + jitter());
    }, 1500);
    return () => clearInterval(interval);
  }, [incident, updateLocation]);

  return (
    <div className="glass rounded-2xl overflow-hidden h-full min-h-[280px] relative">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Navigation className={cn("w-4 h-4", theme.accent)} />
        <span className="text-xs font-semibold">{theme.mapTitle}</span>
        {incident && (
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={cn(
              "text-[9px] px-2 py-0.5 rounded-full font-bold",
              theme.liveBadge
            )}
          >
            LIVE
          </motion.span>
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${theme.mapGrid} 1px, transparent 1px), linear-gradient(90deg, ${theme.mapGrid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/5" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-white/5" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-white/5" />

        {pipelineStage === "en_route" && (
          <motion.div
            className={cn(
              "absolute w-3 h-3 rounded-full shadow-lg",
              theme.unitColor
            )}
            animate={{
              left: ["20%", "35%", "45%", "47%"],
              top: ["70%", "55%", "45%", "43%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        )}

        <motion.div
          className="absolute z-10"
          animate={{
            left: incident ? ["46%", "47%", "46.5%", "47%"] : "47%",
            top: incident ? ["42%", "43%", "42.5%", "43%"] : "43%",
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-alert/40"
            />
            <div className="w-5 h-5 rounded-full bg-alert border-2 border-white shadow-lg shadow-alert/50 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-card to-transparent p-4">
        <p className="text-xs font-medium">{location.address}</p>
        <p className="text-[10px] text-white/40 font-mono mt-1">
          {location.lat.toFixed(5)}°N, {Math.abs(location.lng).toFixed(5)}°W
        </p>
      </div>
    </div>
  );
}