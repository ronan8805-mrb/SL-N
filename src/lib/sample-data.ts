export type ServiceType = "ambulance" | "garda" | "fire" | "guardian";

export interface Service {
  id: ServiceType;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  direction: "up" | "left" | "right" | "down";
  eta: number;
}

export const SERVICES: Service[] = [
  {
    id: "ambulance",
    name: "Ambulance",
    shortName: "EMS",
    icon: "🚑",
    color: "#ef4444",
    direction: "up",
    eta: 4,
  },
  {
    id: "garda",
    name: "Gardaí",
    shortName: "Garda",
    icon: "👮",
    color: "#3b82f6",
    direction: "left",
    eta: 3,
  },
  {
    id: "fire",
    name: "Fire Brigade",
    shortName: "Fire",
    icon: "🚒",
    color: "#f97316",
    direction: "right",
    eta: 5,
  },
  {
    id: "guardian",
    name: "Guardians",
    shortName: "Guardian",
    icon: "🛡️",
    color: "#10b981",
    direction: "down",
    eta: 2,
  },
];

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

export const CHAT_MESSAGES = [
  { id: "1", sender: "system", text: "Emergency packet received", time: "14:32:01" },
  { id: "2", sender: "citizen", text: "I can't breathe properly, chest feels tight", time: "14:32:03" },
  { id: "3", sender: "operator", text: "Help is on the way Aoife. Ambulance ETA 4 minutes. Stay on the line.", time: "14:32:05" },
  { id: "4", sender: "citizen", text: "Thank you, I'm at the corner near The Palace Bar", time: "14:32:08" },
  { id: "5", sender: "operator", text: "We can see your exact location. Gardaí are also en route.", time: "14:32:12" },
];

export function getChatAvailableServices(selected: ServiceType[]): Service[] {
  const ids = new Set<ServiceType>(selected);
  ids.add("guardian");
  return SERVICES.filter((s) => ids.has(s.id));
}

export const SERVICE_CHAT_REPLIES: Record<ServiceType, string> = {
  ambulance:
    "Ambulance dispatch received your packet. Medical team is reviewing your location and health profile.",
  garda:
    "Gardaí unit acknowledged. We're coordinating with other services on your incident.",
  fire:
    "Fire brigade notified. Your live data packet has been shared with the nearest station.",
  guardian:
    "Guardians alerted with your full emergency packet — location, health profile, and severity.",
};

export const PIPELINE_STAGES = [
  { id: "received", label: "Received", icon: "📡" },
  { id: "verified", label: "Verified", icon: "✓" },
  { id: "dispatched", label: "Dispatched", icon: "🚀" },
  { id: "en_route", label: "En Route", icon: "🚑" },
  { id: "arrived", label: "Arrived", icon: "📍" },
  { id: "resolved", label: "Resolved", icon: "✅" },
];