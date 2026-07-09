"use client";

import {
  getTranslations,
  getServices,
  getPipelineStages,
  interpolate,
  type Locale,
} from "@/lib/i18n";
import { useEmergencyStore } from "@/store/emergency-store";

export function useTranslation() {
  const locale = useEmergencyStore((s) => s.locale);
  const setLocale = useEmergencyStore((s) => s.setLocale);
  const t = getTranslations(locale);
  const services = getServices(locale);
  const pipelineStages = getPipelineStages(locale);

  return { t, locale, setLocale, services, pipelineStages, interpolate };
}

export type { Locale };