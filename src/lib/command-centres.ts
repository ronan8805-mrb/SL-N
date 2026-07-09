import { Ambulance, Flame, Shield } from "lucide-react";
import type { CommandCentre } from "@/store/emergency-store";

export interface CommandCentreTheme {
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  accent: string;
  accentGlow: string;
  bg: string;
  border: string;
  indicatorBg: string;
  indicatorBorder: string;
  cardBorder: string;
  cardHover: string;
  pipelineBar: string;
  pipelineActive: string;
  pipelineText: string;
  liveDot: string;
  liveBadge: string;
  chatBubble: string;
  mapGrid: string;
  unitColor: string;
  gradient: string;
  Icon: typeof Ambulance;
  feedTitle: string;
  feedEmpty: string;
  incidentSuffix: string;
  mapTitle: string;
  pipelineTitle: string;
  chatTitle: string;
  chatPlaceholder: string;
  quickResponse: string;
  quickResponseToast: string;
  packetBadge: string;
  metrics: { label: string; value: string }[];
  actions: {
    dispatch: string;
    dispatchToast: string;
    arrived: string;
    arrivedToast: string;
    resolved: string;
    resolvedToast: string;
    secondary: string;
    secondaryToast: string;
  };
}

export const COMMAND_CENTRE_CONFIG: Record<CommandCentre, CommandCentreTheme> = {
  ambulance: {
    label: "Ambulance Command",
    shortLabel: "Ambulance",
    title: "Ambulance",
    subtitle: "National Ambulance Service · Medical Emergency Ops",
    accent: "text-red-400",
    accentGlow: "text-red-300",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    indicatorBg: "bg-red-500/20",
    indicatorBorder: "border-red-500/30",
    cardBorder: "border-red-500/25",
    cardHover: "hover:border-red-500/45",
    pipelineBar: "bg-red-500",
    pipelineActive: "bg-red-500/20 border-red-500 text-red-400",
    pipelineText: "text-red-300",
    liveDot: "bg-red-500",
    liveBadge: "bg-red-500/30 text-red-300",
    chatBubble: "bg-red-500/20",
    mapGrid: "rgba(239, 68, 68, 0.06)",
    unitColor: "bg-red-500 shadow-red-500/50",
    gradient: "from-red-500/5 via-transparent to-transparent",
    Icon: Ambulance,
    feedTitle: "Medical Emergency Feed",
    feedEmpty: "Awaiting medical incidents…",
    incidentSuffix: "Medical Emergency",
    mapTitle: "Ambulance Tracking",
    pipelineTitle: "Patient Care Pipeline",
    chatTitle: "Citizen Medical Chat",
    chatPlaceholder: "Send medical guidance to citizen…",
    quickResponse: "Stay calm — ambulance is en route. Monitor breathing.",
    quickResponseToast: "Medical guidance sent to citizen",
    packetBadge: "MEDICAL PACKET",
    metrics: [
      { label: "Triage Time", value: "1.2s" },
      { label: "Dispatch Time", value: "0.9s" },
      { label: "EMS Response", value: "2.1s" },
    ],
    actions: {
      dispatch: "Dispatch Nearest Ambulance",
      dispatchToast: "Nearest ambulance dispatched",
      arrived: "Crew On Scene",
      arrivedToast: "Ambulance crew marked on scene",
      resolved: "Patient Handover",
      resolvedToast: "Patient handover complete",
      secondary: "Alert Hospital",
      secondaryToast: "Receiving hospital notified",
    },
  },
  garda: {
    label: "Gardaí Command",
    shortLabel: "Garda",
    title: "Gardaí",
    subtitle: "An Garda Síochána · Public Safety Operations",
    accent: "text-blue-400",
    accentGlow: "text-blue-300",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    indicatorBg: "bg-blue-500/20",
    indicatorBorder: "border-blue-500/30",
    cardBorder: "border-blue-500/25",
    cardHover: "hover:border-blue-500/45",
    pipelineBar: "bg-blue-500",
    pipelineActive: "bg-blue-500/20 border-blue-500 text-blue-400",
    pipelineText: "text-blue-300",
    liveDot: "bg-blue-500",
    liveBadge: "bg-blue-500/30 text-blue-300",
    chatBubble: "bg-blue-500/20",
    mapGrid: "rgba(59, 130, 246, 0.06)",
    unitColor: "bg-blue-500 shadow-blue-500/50",
    gradient: "from-blue-500/5 via-transparent to-transparent",
    Icon: Shield,
    feedTitle: "Public Safety Feed",
    feedEmpty: "Awaiting public safety incidents…",
    incidentSuffix: "Public Safety Alert",
    mapTitle: "Garda Unit Tracking",
    pipelineTitle: "Incident Response Pipeline",
    chatTitle: "Citizen Safety Chat",
    chatPlaceholder: "Send safety instructions to citizen…",
    quickResponse: "Garda unit en route. Stay in a safe, visible location.",
    quickResponseToast: "Safety instructions sent to citizen",
    packetBadge: "SAFETY PACKET",
    metrics: [
      { label: "Alert Time", value: "1.2s" },
      { label: "Dispatch Time", value: "0.9s" },
      { label: "Unit Response", value: "2.1s" },
    ],
    actions: {
      dispatch: "Dispatch Nearest Unit",
      dispatchToast: "Nearest Garda unit dispatched",
      arrived: "Unit On Scene",
      arrivedToast: "Garda unit marked on scene",
      resolved: "Incident Resolved",
      resolvedToast: "Incident marked as resolved",
      secondary: "Request Backup",
      secondaryToast: "Backup unit requested",
    },
  },
  fire: {
    label: "Fire Brigade Command",
    shortLabel: "Fire",
    title: "Fire Brigade",
    subtitle: "Fire & Rescue Service · Emergency Operations",
    accent: "text-orange-400",
    accentGlow: "text-orange-300",
    bg: "bg-orange-500/20",
    border: "border-orange-500/30",
    indicatorBg: "bg-orange-500/20",
    indicatorBorder: "border-orange-500/30",
    cardBorder: "border-orange-500/25",
    cardHover: "hover:border-orange-500/45",
    pipelineBar: "bg-orange-500",
    pipelineActive: "bg-orange-500/20 border-orange-500 text-orange-400",
    pipelineText: "text-orange-300",
    liveDot: "bg-orange-500",
    liveBadge: "bg-orange-500/30 text-orange-300",
    chatBubble: "bg-orange-500/20",
    mapGrid: "rgba(249, 115, 22, 0.06)",
    unitColor: "bg-orange-500 shadow-orange-500/50",
    gradient: "from-orange-500/5 via-transparent to-transparent",
    Icon: Flame,
    feedTitle: "Fire & Rescue Feed",
    feedEmpty: "Awaiting fire & rescue incidents…",
    incidentSuffix: "Fire / Rescue Call",
    mapTitle: "Appliance Tracking",
    pipelineTitle: "Fire Response Pipeline",
    chatTitle: "Citizen Rescue Chat",
    chatPlaceholder: "Send fire safety instructions…",
    quickResponse: "Fire appliance en route. Move away from hazard if safe.",
    quickResponseToast: "Fire safety instructions sent to citizen",
    packetBadge: "RESCUE PACKET",
    metrics: [
      { label: "Alert Time", value: "1.2s" },
      { label: "Dispatch Time", value: "0.9s" },
      { label: "Appliance ETA", value: "2.1s" },
    ],
    actions: {
      dispatch: "Dispatch Nearest Appliance",
      dispatchToast: "Nearest fire appliance dispatched",
      arrived: "Crew On Scene",
      arrivedToast: "Fire crew marked on scene",
      resolved: "Incident Extinguished",
      resolvedToast: "Fire incident marked resolved",
      secondary: "Request Support",
      secondaryToast: "Additional appliance requested",
    },
  },
};

export const COMMAND_CENTRE_ORDER: CommandCentre[] = ["ambulance", "garda", "fire"];

export function getCommandCentreTheme(centre: CommandCentre) {
  return COMMAND_CENTRE_CONFIG[centre];
}