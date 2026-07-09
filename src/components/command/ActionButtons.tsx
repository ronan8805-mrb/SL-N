"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  MapPinned,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmergencyStore } from "@/store/emergency-store";
import { toast } from "sonner";

export function ActionButtons() {
  const { incident, setPipelineStage, addGuardian, pipelineStage } =
    useEmergencyStore();

  if (!incident) return null;

  const actions = [
    {
      label: "Dispatch Nearest",
      icon: Rocket,
      variant: "default" as const,
      onClick: () => {
        setPipelineStage("dispatched");
        toast.success("Nearest units dispatched");
      },
      disabled: pipelineStage !== "verified" && pipelineStage !== "received",
    },
    {
      label: "Mark Arrived",
      icon: MapPinned,
      variant: "outline" as const,
      onClick: () => {
        setPipelineStage("arrived");
        toast.success("Units marked as arrived on scene");
      },
      disabled: pipelineStage !== "en_route" && pipelineStage !== "dispatched",
    },
    {
      label: "Resolved",
      icon: CheckCircle,
      variant: "default" as const,
      onClick: () => {
        setPipelineStage("resolved");
        toast.success("Incident marked as resolved");
      },
      disabled: pipelineStage === "resolved",
    },
    {
      label: "Add Guardian",
      icon: UserPlus,
      variant: "outline" as const,
      onClick: () => {
        addGuardian("Seán Murphy (Brother)");
        toast.info("Guardian notified: Seán Murphy");
      },
      disabled: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            variant={action.variant}
            onClick={action.onClick}
            disabled={action.disabled}
            className="w-full h-auto py-3 flex-col gap-1.5"
          >
            <action.icon className="w-5 h-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}