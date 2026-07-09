import { Ambulance, Flame, Shield } from "lucide-react";
import type { CommandCentre } from "@/store/emergency-store";

export const COMMAND_CENTRE_CONFIG: Record<
  CommandCentre,
  {
    label: string;
    shortLabel: string;
    title: string;
    accent: string;
    bg: string;
    border: string;
    indicatorBg: string;
    indicatorBorder: string;
    Icon: typeof Ambulance;
  }
> = {
  ambulance: {
    label: "Ambulance Command",
    shortLabel: "Ambulance",
    title: "Ambulance",
    accent: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    indicatorBg: "bg-red-500/20",
    indicatorBorder: "border-red-500/30",
    Icon: Ambulance,
  },
  garda: {
    label: "Gardaí Command",
    shortLabel: "Garda",
    title: "Gardaí",
    accent: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    indicatorBg: "bg-blue-500/20",
    indicatorBorder: "border-blue-500/30",
    Icon: Shield,
  },
  fire: {
    label: "Fire Brigade Command",
    shortLabel: "Fire",
    title: "Fire Brigade",
    accent: "text-orange-400",
    bg: "bg-orange-500/20",
    border: "border-orange-500/30",
    indicatorBg: "bg-orange-500/20",
    indicatorBorder: "border-orange-500/30",
    Icon: Flame,
  },
};

export const COMMAND_CENTRE_ORDER: CommandCentre[] = ["ambulance", "garda", "fire"];