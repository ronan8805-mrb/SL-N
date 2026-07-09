"use client";

import { motion } from "framer-motion";
import { Wifi, Battery, Signal } from "lucide-react";
import { RescueButton } from "./RescueButton";
import { SwipeGestures } from "./SwipeGestures";

export function LockScreen() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-IE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-between h-full min-h-[500px] py-8">
      {/* Status bar */}
      <div className="w-full flex items-center justify-between px-6 text-[10px] text-white/50">
        <span className="font-semibold">SLÁN</span>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
        </div>
      </div>

      {/* Clock */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-6xl font-extralight tracking-tight tabular-nums">{time}</p>
        <p className="text-sm text-white/40 mt-1">{date}</p>
      </motion.div>

      {/* Rescue Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <RescueButton />
      </motion.div>

      {/* Swipe Gestures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <SwipeGestures />
      </motion.div>

      <p className="text-[10px] text-white/25 text-center px-8">
        Slide up to unlock · Swipe directions to select services
      </p>
    </div>
  );
}