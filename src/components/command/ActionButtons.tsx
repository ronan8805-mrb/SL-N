"use client";

import { motion } from "framer-motion";
import { Rocket, MapPinned, CheckCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmergencyStore } from "@/store/emergency-store";
import { useCommandCentreTheme } from "@/hooks/use-command-centre-theme";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ActionButtons() {
  const { incident, setPipelineStage, addGuardian, pipelineStage } =
    useEmergencyStore();
  const theme = useCommandCentreTheme();
  const { t } = useTranslation();

  if (!incident) return null;

  const actions = [
    {
      label: theme.actions.dispatch,
      icon: Rocket,
      variant: "default" as const,
      onClick: () => {
        setPipelineStage("dispatched");
        toast.success(theme.actions.dispatchToast);
      },
      disabled: pipelineStage !== "verified" && pipelineStage !== "received",
    },
    {
      label: theme.actions.arrived,
      icon: MapPinned,
      variant: "outline" as const,
      onClick: () => {
        setPipelineStage("arrived");
        toast.success(theme.actions.arrivedToast);
      },
      disabled: pipelineStage !== "en_route" && pipelineStage !== "dispatched",
    },
    {
      label: theme.actions.resolved,
      icon: CheckCircle,
      variant: "default" as const,
      onClick: () => {
        setPipelineStage("resolved");
        toast.success(theme.actions.resolvedToast);
      },
      disabled: pipelineStage === "resolved",
    },
    {
      label: theme.actions.secondary,
      icon: UserPlus,
      variant: "outline" as const,
      onClick: () => {
        addGuardian(t.sample.guardianName);
        toast.info(theme.actions.secondaryToast);
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
            className={cn(
              "w-full h-auto py-3 flex-col gap-1.5",
              action.variant === "default" && theme.bg.replace("/20", "/30")
            )}
          >
            <action.icon className={cn("w-5 h-5", theme.accent)} />
            <span className="text-xs">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}