"use client";

import { motion } from "framer-motion";
import { Play, RotateCcw, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmergencyStore } from "@/store/emergency-store";
import { useDemoSequence } from "@/hooks/use-demo-sequence";

export function DemoControls() {
  const { isDemoRunning, resetDemo, viewMode } = useEmergencyStore();
  const { runFullDemo, runCitizenEmergency } = useDemoSequence();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        onClick={runFullDemo}
        disabled={isDemoRunning}
        className="bg-gradient-to-r from-emerald to-emerald-glow text-white font-semibold shadow-emerald/30"
        size="sm"
      >
        <Play className="w-4 h-4" />
        <span className="hidden sm:inline">Run Full Cinematic Demo</span>
        <span className="sm:hidden">Full Demo</span>
      </Button>

      {viewMode === "citizen" && (
        <Button
          onClick={runCitizenEmergency}
          disabled={isDemoRunning}
          variant="destructive"
          size="sm"
        >
          <Siren className="w-4 h-4" />
          <span className="hidden sm:inline">Simulate Full Emergency</span>
          <span className="sm:hidden">Emergency</span>
        </Button>
      )}

      <Button onClick={resetDemo} variant="ghost" size="sm" disabled={isDemoRunning}>
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
}