"use client";

import { Play, RotateCcw, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmergencyStore } from "@/store/emergency-store";
import { useDemoSequence } from "@/hooks/use-demo-sequence";

export function DemoControls() {
  const { isDemoRunning, resetDemo, viewMode } = useEmergencyStore();
  const { runFullDemo, runCitizenEmergency } = useDemoSequence();

  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
      <Button
        onClick={runFullDemo}
        disabled={isDemoRunning}
        className="bg-gradient-to-r from-emerald to-emerald-glow text-white font-semibold shadow-emerald/30 h-7 sm:h-9 px-2 sm:px-3 text-[10px] sm:text-xs rounded-md sm:rounded-lg"
        size="xs"
      >
        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Run Full Cinematic Demo</span>
        <span className="sm:hidden">Demo</span>
      </Button>

      {viewMode === "citizen" && (
        <Button
          onClick={runCitizenEmergency}
          disabled={isDemoRunning}
          variant="destructive"
          size="xs"
          className="h-7 sm:h-9 px-2 sm:px-3 text-[10px] sm:text-xs rounded-md sm:rounded-lg"
        >
          <Siren className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Simulate Full Emergency</span>
          <span className="sm:hidden">SOS</span>
        </Button>
      )}

      <Button
        onClick={resetDemo}
        variant="ghost"
        size="xs"
        disabled={isDemoRunning}
        className="h-7 sm:h-9 px-2 sm:px-3 text-[10px] sm:text-xs rounded-md sm:rounded-lg"
      >
        <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden min-[380px]:inline">Reset</span>
      </Button>
    </div>
  );
}