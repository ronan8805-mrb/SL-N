"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES, type ServiceType } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 60;

const directionMap: Record<string, ServiceType> = {
  up: "ambulance",
  left: "garda",
  right: "fire",
  down: "guardian",
};

export function SwipeGestures() {
  const { toggleService, selectedServices, setCitizenStep } = useEmergencyStore();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [flash, setFlash] = useState<ServiceType | null>(null);

  const rotateX = useTransform(y, [-100, 0, 100], [8, 0, -8]);
  const rotateY = useTransform(x, [-100, 0, 100], [-8, 0, 8]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    const { offset } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);
    if (absX > absY) {
      setActiveDirection(offset.x > 0 ? "right" : "left");
    } else if (absY > 20) {
      setActiveDirection(offset.y > 0 ? "down" : "up");
    } else {
      setActiveDirection(null);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);

    let direction: string | null = null;
    if (absX > SWIPE_THRESHOLD || absY > SWIPE_THRESHOLD) {
      direction = absX > absY
        ? offset.x > 0 ? "right" : "left"
        : offset.y > 0 ? "down" : "up";
    }

    if (direction && directionMap[direction]) {
      const service = directionMap[direction];
      toggleService(service);
      setFlash(service);
      setTimeout(() => setFlash(null), 600);
    }

    setActiveDirection(null);
    x.set(0);
    y.set(0);
  };

  const arrows = [
    { dir: "up", Icon: ArrowUp, label: "Ambulance", pos: "top-2 left-1/2 -translate-x-1/2" },
    { dir: "left", Icon: ArrowLeft, label: "Gardaí", pos: "left-2 top-1/2 -translate-y-1/2" },
    { dir: "right", Icon: ArrowRight, label: "Fire", pos: "right-2 top-1/2 -translate-y-1/2" },
    { dir: "down", Icon: ArrowDown, label: "Guardians", pos: "bottom-2 left-1/2 -translate-x-1/2" },
  ];

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <p className="text-center text-xs text-white/40 mb-4">Swipe to select services</p>

      <div className="relative w-[280px] h-[280px] mx-auto">
        {arrows.map(({ dir, Icon, label, pos }) => {
          const service = directionMap[dir];
          const isSelected = selectedServices.includes(service);
          const isActive = activeDirection === dir;
          const svc = SERVICES.find((s) => s.id === service)!;

          return (
            <motion.div
              key={dir}
              className={cn("absolute flex flex-col items-center gap-1", pos)}
              animate={{
                opacity: isActive || isSelected ? 1 : 0.35,
                scale: isActive ? 1.2 : isSelected ? 1.1 : 1,
              }}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isSelected ? "text-emerald-glow" : isActive ? "text-white" : "text-white/40"
                )}
              />
              <span className="text-[9px] text-white/50 font-medium">{label}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-sm"
                >
                  {svc.icon}
                </motion.span>
              )}
            </motion.div>
          );
        })}

        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.6}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x, y, rotateX, rotateY }}
          className="absolute inset-8 rounded-full glass-strong flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2"
            >
              <span className="text-2xl">👆</span>
            </motion.div>
            <p className="text-xs text-white/60 font-medium">Drag me</p>
          </div>

          {flash && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 rounded-full bg-emerald/30"
            />
          )}
        </motion.div>
      </div>

      {selectedServices.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCitizenStep("confirm")}
          className="mt-6 w-full py-3 rounded-2xl bg-emerald/20 border border-emerald/30 text-emerald-glow font-semibold text-sm hover:bg-emerald/30 transition-colors"
        >
          Continue with {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""}
        </motion.button>
      )}
    </div>
  );
}