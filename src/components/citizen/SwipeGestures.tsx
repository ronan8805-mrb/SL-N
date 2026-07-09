"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES, type ServiceType } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 50;

const directionMap: Record<string, ServiceType> = {
  up: "ambulance",
  left: "garda",
  right: "fire",
  down: "guardian",
};

function getDominantDirection(offsetX: number, offsetY: number): string | null {
  const absX = Math.abs(offsetX);
  const absY = Math.abs(offsetY);
  if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) return null;
  if (absX > absY) return offsetX > 0 ? "right" : "left";
  return offsetY > 0 ? "down" : "up";
}

interface SwipeGesturesProps {
  mode?: "triage";
  onContinue?: () => void;
}

export function SwipeGestures({ mode = "triage", onContinue }: SwipeGesturesProps) {
  const { toggleService, selectedServices, setCitizenStep } = useEmergencyStore();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [flash, setFlash] = useState<ServiceType | null>(null);
  const triggeredThisDrag = useRef<Set<string>>(new Set());

  const rotateX = useTransform(y, [-100, 0, 100], [8, 0, -8]);
  const rotateY = useTransform(x, [-100, 0, 100], [-8, 0, 8]);

  const registerSwipe = (direction: string) => {
    if (!directionMap[direction]) return;
    if (triggeredThisDrag.current.has(direction)) return;

    triggeredThisDrag.current.add(direction);
    const service = directionMap[direction];
    toggleService(service);
    setFlash(service);
    setActiveDirection(direction);
    if (navigator.vibrate) navigator.vibrate(12);
    setTimeout(() => setFlash(null), 500);
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    const { offset } = info;
    const direction = getDominantDirection(offset.x, offset.y);
    setActiveDirection(direction);

    // Multi-direction: register each direction crossed in a single gesture
    if (offset.y < -SWIPE_THRESHOLD) registerSwipe("up");
    if (offset.y > SWIPE_THRESHOLD) registerSwipe("down");
    if (offset.x < -SWIPE_THRESHOLD) registerSwipe("left");
    if (offset.x > SWIPE_THRESHOLD) registerSwipe("right");
  };

  const handleDragEnd = () => {
    triggeredThisDrag.current.clear();
    setActiveDirection(null);
    x.set(0);
    y.set(0);
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      setCitizenStep("confirm");
    }
  };

  const arrows = [
    { dir: "up", Icon: ArrowUp, label: "Ambulance", pos: "top-2 left-1/2 -translate-x-1/2" },
    { dir: "left", Icon: ArrowLeft, label: "Gardaí", pos: "left-2 top-1/2 -translate-y-1/2" },
    { dir: "right", Icon: ArrowRight, label: "Fire", pos: "right-2 top-1/2 -translate-y-1/2" },
    { dir: "down", Icon: ArrowDown, label: "Guardians", pos: "bottom-2 left-1/2 -translate-x-1/2" },
  ];

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <p className="text-center text-xs text-white/50 mb-2">
        Swipe in any direction — multiple services in one gesture
      </p>
      <p className="text-center text-[10px] text-white/30 mb-4">
        Swipe again to deselect · Tap chips below to adjust
      </p>

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
                scale: isActive ? 1.25 : isSelected ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
          dragElastic={0.55}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x, y, rotateX, rotateY }}
          className="absolute inset-8 rounded-full glass-strong flex items-center justify-center cursor-grab active:cursor-grabbing z-10 touch-none"
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2"
            >
              <span className="text-2xl">👆</span>
            </motion.div>
            <p className="text-xs text-white/60 font-medium">Drag to triage</p>
          </div>

          {flash && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              className="absolute inset-0 rounded-full bg-emerald/40 pointer-events-none"
            />
          )}
        </motion.div>
      </div>

      {/* Select / deselect chips */}
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        {SERVICES.map((svc) => {
          const isSelected = selectedServices.includes(svc.id);
          return (
            <motion.button
              key={svc.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => toggleService(svc.id)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5",
                isSelected
                  ? "bg-emerald/25 text-emerald-glow border-2 border-emerald/50 shadow-lg shadow-emerald/10"
                  : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
              )}
            >
              <span>{svc.icon}</span>
              {svc.name}
              {isSelected && <span className="text-[9px] opacity-70">✓</span>}
            </motion.button>
          );
        })}
      </div>

      {selectedServices.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleContinue}
          className="mt-5 w-full py-3.5 rounded-2xl bg-emerald text-white font-bold text-sm shadow-lg shadow-emerald/30 hover:bg-emerald-glow transition-colors"
        >
          Continue — {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
        </motion.button>
      )}

      {mode === "triage" && selectedServices.length === 0 && (
        <p className="text-center text-[10px] text-white/25 mt-4">
          Select at least one service to continue
        </p>
      )}
    </div>
  );
}