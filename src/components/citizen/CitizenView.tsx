"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEmergencyStore } from "@/store/emergency-store";
import { LockScreen } from "./LockScreen";
import { TriageWheel } from "./TriageWheel";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { DataPacketPreview } from "./DataPacketPreview";
import { DispatchSuccess } from "./DispatchSuccess";

const stepVariants = {
  initial: { opacity: 0, x: 60, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.95 },
};

export function CitizenView() {
  const { citizenStep } = useEmergencyStore();

  return (
    <div className="flex justify-center py-6 px-4">
      <div className="phone-frame relative w-full max-w-[390px] min-h-[780px] rounded-[3rem] bg-navy-light overflow-hidden border border-white/5">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />

        {/* Screen content */}
        <div className="relative h-full gradient-mesh pt-10 pb-6 px-4 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={citizenStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full"
            >
              {citizenStep === "lock" && <LockScreen />}
              {citizenStep === "swipe" && <LockScreen />}
              {citizenStep === "triage" && (
                <div className="pt-8">
                  <TriageWheel />
                </div>
              )}
              {citizenStep === "confirm" && (
                <div className="pt-8">
                  <ConfirmationScreen />
                </div>
              )}
              {citizenStep === "data" && (
                <div className="pt-4">
                  <DataPacketPreview />
                </div>
              )}
              {citizenStep === "dispatched" && (
                <div className="pt-12">
                  <DispatchSuccess />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}