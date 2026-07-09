"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import { AppHeader } from "@/components/layout/AppHeader";
import { CitizenView } from "@/components/citizen/CitizenView";
import { CommandDashboard } from "@/components/command/CommandDashboard";
import { useEmergencyStore } from "@/store/emergency-store";

export function AppShell() {
  const { viewMode } = useEmergencyStore();

  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      <AppHeader />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {viewMode === "citizen" ? (
            <motion.div
              key="citizen"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CitizenView />
            </motion.div>
          ) : (
            <motion.div
              key="command"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CommandDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-4 text-[10px] text-white/20">
        SLÁN Rescue Live Demo · Chosanta LTD · Public Safety Emergency Platform
      </footer>

      <SonnerToaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(21, 29, 46, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#e8edf5",
          },
        }}
      />
      <HotToaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(21, 29, 46, 0.95)",
            color: "#e8edf5",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}