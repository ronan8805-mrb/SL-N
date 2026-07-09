import { getServices, type Locale, type ServiceType } from "@/lib/i18n";

export type { ServiceType };

export interface Service {
  id: ServiceType;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  direction: "up" | "left" | "right" | "down";
  eta: number;
  swipeLabel?: string;
}

export interface CitizenProfile {
  name: string;
  age: number;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: string;
}

export const SAMPLE_CITIZEN: CitizenProfile = {
  name: "Aoife Murphy",
  age: 34,
  bloodType: "O+",
  allergies: ["Penicillin"],
  medications: ["Salbutamol inhaler"],
  conditions: ["Mild asthma"],
  emergencyContact: "Seán Murphy — +353 87 123 4567",
};

export interface Incident {
  id: string;
  citizenName: string;
  services: ServiceType[];
  severity: number;
  status: "pending" | "dispatched" | "en_route" | "arrived" | "resolved";
  location: { lat: number; lng: number; address: string };
  timestamp: Date;
  hasVideo: boolean;
  hasVoiceNote: boolean;
}

export const INITIAL_LOCATION = {
  lat: 53.3498,
  lng: -6.2603,
  address: "Temple Bar, Dublin 2, Ireland",
};

export function getChatAvailableServices(
  selected: ServiceType[],
  locale: Locale
): Service[] {
  const ids = new Set<ServiceType>(selected);
  ids.add("guardian");
  return getServices(locale).filter((s) => ids.has(s.id));
}

export function getLocalizedCitizen(locale: Locale) {
  const t = locale === "es"
    ? {
        conditions: "Asma leve",
        allergies: "Penicilina",
        medications: "Inhalador de salbutamol",
        emergencyContact: "Seán Murphy — +353 87 123 4567",
      }
    : {
        conditions: "Mild asthma",
        allergies: "Penicillin",
        medications: "Salbutamol inhaler",
        emergencyContact: "Seán Murphy — +353 87 123 4567",
      };
  return { ...SAMPLE_CITIZEN, ...t, conditions: [t.conditions], allergies: [t.allergies], medications: [t.medications] };
}

export function getLocalizedLocation(locale: Locale) {
  return {
    ...INITIAL_LOCATION,
    address: locale === "es" ? "Temple Bar, Dublín 2, Irlanda" : INITIAL_LOCATION.address,
  };
}