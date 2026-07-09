"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Shield } from "lucide-react";
import { SERVICES } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { Button } from "@/components/ui/button";

export function DispatchSuccess() {
  const { selectedServices, responseTime, eta, setEta, resetDemo } =
    useEmergencyStore();

  const services = SERVICES.filter(
    (s) =>
      selectedServices.includes(s.id) ||
      (selectedServices.length === 0 && ["ambulance", "garda"].includes(s.id))
  );

  useEffect(() => {
    if (eta <= 0) return;
    const timer = setInterval(() => {
      const current = useEmergencyStore.getState().eta;
      if (current > 0) setEta(current - 1);
    }, 60000);
    const fastTimer = setInterval(() => {
      const current = useEmergencyStore.getState().eta;
      if (current > 0.5) setEta(Math.max(0, current - 0.1));
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(fastTimer);
    };
  }, [eta, setEta]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center w-full px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-emerald/20 border-2 border-emerald flex items-center justify-center mb-6 emerald-glow"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-glow" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-black text-emerald-glow mb-2"
      >
        Help Dispatched
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-white/50 mb-6"
      >
        Emergency services notified in{" "}
        <span className="text-emerald-glow font-bold">
          {responseTime > 0 ? responseTime.toFixed(1) : "2.1"}s
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-4 w-full max-w-xs mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-emerald-glow" />
          <span className="text-sm font-medium">ETA Countdown</span>
        </div>
        <motion.p
          key={Math.floor(eta)}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-black text-white tabular-nums"
        >
          {Math.ceil(eta)}
          <span className="text-lg text-white/40 ml-1">min</span>
        </motion.p>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="glass rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <span>{s.icon}</span>
            <span className="text-xs font-medium">{s.name}</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-[9px] text-emerald font-bold"
            >
              EN ROUTE
            </motion.span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 text-[11px] text-white/40 mb-6"
      >
        <Shield className="w-3 h-3" />
        Stay calm — operators can see your location and health data
      </motion.div>

      <Button onClick={resetDemo} variant="outline" size="sm">
        Start New Demo
      </Button>
    </motion.div>
  );
}