import { Ambulance, Flame, Shield } from "lucide-react";
import { getCommandCentreTheme, type CommandCentre, type Locale } from "@/lib/i18n";

const STYLES = {
  ambulance: {
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
  },
  garda: {
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
  },
  fire: {
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
  },
} as const;

export const COMMAND_CENTRE_ORDER: CommandCentre[] = ["ambulance", "garda", "fire"];

export function buildCommandCentreTheme(centre: CommandCentre, locale: Locale) {
  const text = getCommandCentreTheme(centre, locale);
  const style = STYLES[centre];
  return {
    ...text,
    ...style,
    actions: {
      dispatch: text.dispatch,
      dispatchToast: text.dispatchToast,
      arrived: text.arrived,
      arrivedToast: text.arrivedToast,
      resolved: text.resolved,
      resolvedToast: text.resolvedToast,
      secondary: text.secondary,
      secondaryToast: text.secondaryToast,
    },
    metrics: text.metrics,
  };
}

export type CommandCentreTheme = ReturnType<typeof buildCommandCentreTheme>;