"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { SERVICES } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function ConfirmationScreen() {
  const {
    selectedServices,
    serviceConfirmations,
    confirmService,
    countdown,
    setCountdown,
    setCitizenStep,
    cancelAll,
    finalizeConfirmationOnTimeout,
  } = useEmergencyStore();

  const advancedRef = useRef(false);

  const services = SERVICES.filter((s) => selectedServices.includes(s.id));
  const acceptedServices = services.filter(
    (s) => serviceConfirmations[s.id] === true
  );
  const allConfirmed = services.every(
    (s) => serviceConfirmations[s.id] !== null
  );
  const allAccepted =
    services.length > 0 &&
    services.every((s) => serviceConfirmations[s.id] === true);
  const anyRejected = services.some(
    (s) => serviceConfirmations[s.id] === false
  );

  const advanceToData = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    finalizeConfirmationOnTimeout();
  };

  useEffect(() => {
    advancedRef.current = false;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const state = useEmergencyStore.getState();
      if (state.countdown <= 0) {
        clearInterval(timer);
        advanceToData();
        return;
      }
      setCountdown(state.countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [setCountdown]);

  useEffect(() => {
    if (allConfirmed && acceptedServices.length > 0) {
      const t = setTimeout(() => setCitizenStep("data"), 600);
      return () => clearTimeout(t);
    }
  }, [allConfirmed, anyRejected, acceptedServices.length, setCitizenStep]);

  const circumference = 2 * Math.PI * 54;
  const progress = ((14 - countdown) / 14) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center w-full px-4"
    >
      <p className="text-sm text-white/50 mb-2 text-center">
        Confirm each service — false alarm prevention
      </p>
      <p className="text-[10px] text-white/30 mb-4 text-center">
        Tap ✓ or ✗ · Unconfirmed services auto-confirm when timer ends
      </p>

      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={countdown <= 5 ? "#ef4444" : "#10b981"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={countdown}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "text-4xl font-black tabular-nums",
              countdown <= 5 ? "text-alert-glow" : "text-emerald-glow"
            )}
          >
            {countdown}
          </motion.span>
          <span className="text-[10px] text-white/40">seconds</span>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {services.map((service, i) => {
          const status = serviceConfirmations[service.id];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-[10px] text-white/40">ETA ~{service.eta} min</p>
                </div>
              </div>

              {status === null ? (
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => confirmService(service.id, true)}
                    className="w-10 h-10 rounded-xl bg-emerald/20 border border-emerald/40 flex items-center justify-center hover:bg-emerald/30"
                  >
                    <Check className="w-5 h-5 text-emerald-glow" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => confirmService(service.id, false)}
                    className="w-10 h-10 rounded-xl bg-alert/20 border border-alert/40 flex items-center justify-center hover:bg-alert/30"
                  >
                    <X className="w-5 h-5 text-alert-glow" />
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      status ? "bg-emerald/30" : "bg-alert/30"
                    )}
                  >
                    {status ? (
                      <Check className="w-5 h-5 text-emerald-glow" />
                    ) : (
                      <X className="w-5 h-5 text-alert-glow" />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>

      {allAccepted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-emerald-glow mt-4"
        >
          All confirmed — preparing data packet…
        </motion.p>
      )}

      {countdown <= 3 && !allAccepted && selectedServices.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-white/40 mt-4"
        >
          Auto-confirming swiped services…
        </motion.p>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={cancelAll}
        className="mt-8 w-full max-w-sm py-4 rounded-2xl bg-alert/20 border-2 border-alert/50 text-alert-glow font-bold text-sm hover:bg-alert/30 transition-colors"
      >
        CANCEL ALL
      </motion.button>
    </motion.div>
  );
}