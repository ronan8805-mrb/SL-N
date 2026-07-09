import { translations, interpolate, type TranslationTree } from "./translations";

export { interpolate };
import type { CommandCentre, Locale, ServiceType } from "./types";

export type { Locale, ServiceType, CommandCentre, TranslationTree };

export function getTranslations(locale: Locale): TranslationTree {
  return translations[locale];
}

export function getServices(locale: Locale) {
  const s = translations[locale].services;
  return [
    { id: "ambulance" as const, name: s.ambulance.name, shortName: s.ambulance.short, icon: "🚑", color: "#ef4444", direction: "up" as const, eta: 4, swipeLabel: s.ambulance.swipe },
    { id: "garda" as const, name: s.garda.name, shortName: s.garda.short, icon: "👮", color: "#3b82f6", direction: "left" as const, eta: 3, swipeLabel: s.garda.swipe },
    { id: "fire" as const, name: s.fire.name, shortName: s.fire.short, icon: "🚒", color: "#f97316", direction: "right" as const, eta: 5, swipeLabel: s.fire.swipe },
    { id: "guardian" as const, name: s.guardian.name, shortName: s.guardian.short, icon: "🛡️", color: "#10b981", direction: "down" as const, eta: 2, swipeLabel: s.guardian.swipe },
  ];
}

export function getServiceChatReplies(locale: Locale): Record<ServiceType, string> {
  return translations[locale].chat.serviceReplies;
}

export function getPipelineStages(locale: Locale) {
  const p = translations[locale].pipeline;
  return [
    { id: "received", label: p.received, icon: "📡" },
    { id: "verified", label: p.verified, icon: "✓" },
    { id: "dispatched", label: p.dispatched, icon: "🚀" },
    { id: "en_route", label: p.enRoute, icon: "🚑" },
    { id: "arrived", label: p.arrived, icon: "📍" },
    { id: "resolved", label: p.resolved, icon: "✅" },
  ];
}

export function getDemoChatMessages(locale: Locale) {
  return translations[locale].chat.demoMessages;
}

export function getCommandCentreTheme(centre: CommandCentre, locale: Locale) {
  return translations[locale].commandCentres[centre];
}

export function getLocaleCode(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en-IE";
}