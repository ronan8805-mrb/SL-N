"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare,
  Navigation,
  MapPinned,
} from "lucide-react";
import { SERVICES } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ARRIVING_AT_MS = 22000;
const ARRIVED_AT_MS = 32000;
const MINUTE_TICK_MS = 5000;

function syncArrivalFromElapsed(
  elapsed: number,
  setArrivalPhase: ReturnType<typeof useEmergencyStore.getState>["setArrivalPhase"],
  setDisplayEtaMinutes: ReturnType<typeof useEmergencyStore.getState>["setDisplayEtaMinutes"],
  setPipelineStage: ReturnType<typeof useEmergencyStore.getState>["setPipelineStage"]
) {
  const minutes = Math.max(1, 4 - Math.floor(elapsed / MINUTE_TICK_MS));
  setDisplayEtaMinutes(minutes);

  if (elapsed >= ARRIVED_AT_MS) {
    setArrivalPhase("arrived");
    setPipelineStage("arrived");
  } else if (elapsed >= ARRIVING_AT_MS) {
    setArrivalPhase("arriving");
    setPipelineStage("en_route");
  }
}

export function DispatchSuccess() {
  const {
    selectedServices,
    responseTime,
    arrivalPhase,
    displayEtaMinutes,
    dispatchTimestamp,
    setArrivalPhase,
    setDisplayEtaMinutes,
    setPipelineStage,
    resetDemo,
    goToCommunications,
  } = useEmergencyStore();

  const services = SERVICES.filter(
    (s) =>
      selectedServices.includes(s.id) ||
      (selectedServices.length === 0 && ["ambulance", "garda"].includes(s.id))
  );

  useEffect(() => {
    if (!dispatchTimestamp) return;

    const tick = () => {
      const elapsed = Date.now() - dispatchTimestamp;
      syncArrivalFromElapsed(
        elapsed,
        setArrivalPhase,
        setDisplayEtaMinutes,
        setPipelineStage
      );
    };

    tick();
    const interval = setInterval(tick, 400);
    return () => clearInterval(interval);
  }, [
    dispatchTimestamp,
    setArrivalPhase,
    setDisplayEtaMinutes,
    setPipelineStage,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center w-full px-4 text-center"
    >
      <AnimatePresence mode="wait">
        {arrivalPhase === "arrived" ? (
          <motion.div
            key="arrived"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mb-6"
          >
            <div className="relative w-28 h-28 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald/30"
                animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald to-emerald-glow flex items-center justify-center emerald-glow border-2 border-emerald-glow/50">
                <MapPinned className="w-14 h-14 text-white" />
              </div>
            </div>
          </motion.div>
        ) : arrivalPhase === "arriving" ? (
          <motion.div
            key="arriving"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{ x: [0, 4, 0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Navigation className="w-12 h-12 text-amber-400" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dispatched"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-emerald/20 border-2 border-emerald flex items-center justify-center mb-6 emerald-glow"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-glow" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.h2
          key={arrivalPhase}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className={cn(
            "text-2xl font-black mb-2 tracking-wide",
            arrivalPhase === "arrived"
              ? "text-emerald-glow"
              : arrivalPhase === "arriving"
              ? "text-amber-400"
              : "text-emerald-glow"
          )}
        >
          {arrivalPhase === "arrived"
            ? "ARRIVED"
            : arrivalPhase === "arriving"
            ? "ARRIVING"
            : "Help Dispatched"}
        </motion.h2>
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-white/50 mb-6"
      >
        {arrivalPhase === "arrived" ? (
          <span className="text-emerald-glow font-semibold">
            Emergency services are on scene — you are safe
          </span>
        ) : arrivalPhase === "arriving" ? (
          <span className="text-amber-400/90 font-medium">
            Units are almost at your location…
          </span>
        ) : (
          <>
            Emergency services notified in{" "}
            <span className="text-emerald-glow font-bold">
              {responseTime > 0 ? responseTime.toFixed(1) : "2.1"}s
            </span>
          </>
        )}
      </motion.p>

      <motion.div
        layout
        className={cn(
          "glass rounded-2xl p-4 w-full max-w-xs mb-4 border",
          arrivalPhase === "arrived"
            ? "border-emerald/40 bg-emerald/5"
            : arrivalPhase === "arriving"
            ? "border-amber-400/30 bg-amber-500/5"
            : "border-white/5"
        )}
      >
        {arrivalPhase === "countdown" && (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-emerald-glow" />
              <span className="text-sm font-medium">ETA Countdown</span>
            </div>
            <motion.p
              key={displayEtaMinutes}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white tabular-nums"
            >
              {displayEtaMinutes}
              <span className="text-lg text-white/40 ml-1">min</span>
            </motion.p>
          </>
        )}

        {arrivalPhase === "arriving" && (
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <p className="text-4xl font-black text-amber-400 tracking-widest">ARRIVING</p>
            <p className="text-xs text-white/40 mt-2">Less than 1 minute away</p>
          </motion.div>
        )}

        {arrivalPhase === "arrived" && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <p className="text-4xl font-black text-emerald-glow tracking-widest">ARRIVED</p>
            <p className="text-xs text-emerald-glow/70 mt-2">On scene · Assistance in progress</p>
            <motion.div
              className="mt-3 h-1 bg-emerald/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-emerald-glow"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className={cn(
              "glass rounded-xl px-3 py-2 flex items-center gap-2",
              arrivalPhase === "arrived" && "border border-emerald/30"
            )}
          >
            <span>{s.icon}</span>
            <span className="text-xs font-medium">{s.name}</span>
            <motion.span
              animate={{ opacity: arrivalPhase === "arrived" ? 1 : [1, 0.3, 1] }}
              transition={{
                repeat: arrivalPhase === "arrived" ? 0 : Infinity,
                duration: 1.5,
              }}
              className={cn(
                "text-[9px] font-bold",
                arrivalPhase === "arrived"
                  ? "text-emerald-glow"
                  : arrivalPhase === "arriving"
                  ? "text-amber-400"
                  : "text-emerald"
              )}
            >
              {arrivalPhase === "arrived"
                ? "ON SCENE"
                : arrivalPhase === "arriving"
                ? "ARRIVING"
                : "EN ROUTE"}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {arrivalPhase !== "arrived" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xs mb-6"
        >
          <Button
            onClick={goToCommunications}
            className="w-full py-4 font-semibold bg-white/10 border border-emerald/30 hover:bg-emerald/20 text-emerald-glow"
          >
            <MessageSquare className="w-5 h-5" />
            Communicate with Emergency Services
          </Button>
          <p className="text-[10px] text-white/35 mt-2">
            Chat, send voice notes, record video, or adjust severity while you wait
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-[11px] text-white/40 mb-6"
      >
        <Shield className="w-3 h-3" />
        {arrivalPhase === "arrived"
          ? "Help has arrived — operators remain connected"
          : "Stay calm — operators can see your location and health data"}
      </motion.div>

      <Button onClick={resetDemo} variant="outline" size="sm">
        Start New Demo
      </Button>
    </motion.div>
  );
}