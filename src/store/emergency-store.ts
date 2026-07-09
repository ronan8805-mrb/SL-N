import { create } from "zustand";
import {
  INITIAL_LOCATION,
  SAMPLE_CITIZEN,
  type ServiceType,
  type Incident,
} from "@/lib/sample-data";

export type ViewMode = "citizen" | "command";
export type CitizenStep =
  | "lock"
  | "swipe"
  | "triage"
  | "confirm"
  | "data"
  | "dispatched";
export type PipelineStage =
  | "received"
  | "verified"
  | "dispatched"
  | "en_route"
  | "arrived"
  | "resolved";

interface EmergencyState {
  viewMode: ViewMode;
  citizenStep: CitizenStep;
  selectedServices: ServiceType[];
  serviceConfirmations: Record<ServiceType, boolean | null>;
  countdown: number;
  severity: number;
  isRecording: boolean;
  isPlayingVideo: boolean;
  isPlayingVoice: boolean;
  responseTime: number;
  eta: number;
  location: typeof INITIAL_LOCATION;
  incident: Incident | null;
  pipelineStage: PipelineStage;
  isDemoRunning: boolean;
  demoSpeed: "slan" | "traditional";
  chatMessages: { id: string; sender: string; text: string; time: string }[];
  guardians: string[];
  isDispatched: boolean;
  privateMessage: string;
  citizenChatMessages: { id: string; sender: "citizen" | "operator"; text: string; time: string }[];

  setViewMode: (mode: ViewMode) => void;
  setCitizenStep: (step: CitizenStep) => void;
  toggleService: (service: ServiceType) => void;
  confirmService: (service: ServiceType, confirmed: boolean) => void;
  setCountdown: (n: number) => void;
  setEta: (n: number) => void;
  setSeverity: (n: number) => void;
  setIsRecording: (v: boolean) => void;
  setIsPlayingVideo: (v: boolean) => void;
  setIsPlayingVoice: (v: boolean) => void;
  updateLocation: (lat: number, lng: number) => void;
  setPipelineStage: (stage: PipelineStage) => void;
  setIsDemoRunning: (v: boolean) => void;
  setDemoSpeed: (speed: "slan" | "traditional") => void;
  dispatchEmergency: () => void;
  cancelAll: () => void;
  resetDemo: () => void;
  addGuardian: (name: string) => void;
  addChatMessage: (sender: string, text: string) => void;
  setPrivateMessage: (msg: string) => void;
  addCitizenChatMessage: (text: string) => void;
  goToCommunications: () => void;
  goToDispatchStatus: () => void;
}

const initialConfirmations: Record<ServiceType, boolean | null> = {
  ambulance: null,
  garda: null,
  fire: null,
  guardian: null,
};

export const useEmergencyStore = create<EmergencyState>((set, get) => ({
  viewMode: "citizen",
  citizenStep: "lock",
  selectedServices: [],
  serviceConfirmations: { ...initialConfirmations },
  countdown: 14,
  severity: 7,
  isRecording: false,
  isPlayingVideo: false,
  isPlayingVoice: false,
  responseTime: 0,
  eta: 4,
  location: { ...INITIAL_LOCATION },
  incident: null,
  pipelineStage: "received",
  isDemoRunning: false,
  demoSpeed: "slan",
  chatMessages: [],
  guardians: [],
  isDispatched: false,
  privateMessage: "",
  citizenChatMessages: [],

  setViewMode: (mode) => set({ viewMode: mode }),
  setCitizenStep: (step) => set({ citizenStep: step }),
  toggleService: (service) =>
    set((s) => ({
      selectedServices: s.selectedServices.includes(service)
        ? s.selectedServices.filter((x) => x !== service)
        : [...s.selectedServices, service],
    })),
  confirmService: (service, confirmed) =>
    set((s) => ({
      serviceConfirmations: {
        ...s.serviceConfirmations,
        [service]: confirmed,
      },
    })),
  setCountdown: (n) => set({ countdown: n }),
  setEta: (n) => set({ eta: n }),
  setSeverity: (n) => set({ severity: n }),
  setIsRecording: (v) => set({ isRecording: v }),
  setIsPlayingVideo: (v) => set({ isPlayingVideo: v }),
  setIsPlayingVoice: (v) => set({ isPlayingVoice: v }),
  updateLocation: (lat, lng) =>
    set((s) => ({
      location: { ...s.location, lat, lng },
    })),
  setPipelineStage: (stage) => set({ pipelineStage: stage }),
  setIsDemoRunning: (v) => set({ isDemoRunning: v }),
  setDemoSpeed: (speed) => set({ demoSpeed: speed }),

  dispatchEmergency: () => {
    const { selectedServices, severity, location } = get();
    const incident: Incident = {
      id: `INC-${Date.now().toString(36).toUpperCase()}`,
      citizenName: SAMPLE_CITIZEN.name,
      services: selectedServices.length ? selectedServices : ["ambulance", "garda"],
      severity,
      status: "dispatched",
      location,
      timestamp: new Date(),
      hasVideo: true,
      hasVoiceNote: true,
    };
    set({
      incident,
      isDispatched: true,
      citizenStep: "dispatched",
      pipelineStage: "dispatched",
      responseTime: get().demoSpeed === "slan" ? 2.1 : 18.4,
      eta: 4,
    });
  },

  cancelAll: () =>
    set({
      citizenStep: "lock",
      selectedServices: [],
      serviceConfirmations: { ...initialConfirmations },
      countdown: 14,
      isDemoRunning: false,
      isDispatched: false,
      incident: null,
      privateMessage: "",
      citizenChatMessages: [],
      responseTime: 0,
      pipelineStage: "received",
    }),

  resetDemo: () =>
    set({
      citizenStep: "lock",
      selectedServices: [],
      serviceConfirmations: { ...initialConfirmations },
      countdown: 14,
      severity: 7,
      isRecording: false,
      isPlayingVideo: false,
      isPlayingVoice: false,
      responseTime: 0,
      eta: 4,
      location: { ...INITIAL_LOCATION },
      incident: null,
      pipelineStage: "received",
      isDemoRunning: false,
      isDispatched: false,
      privateMessage: "",
      chatMessages: [],
      citizenChatMessages: [],
      guardians: [],
    }),

  addGuardian: (name) =>
    set((s) => ({ guardians: [...s.guardians, name] })),

  addChatMessage: (sender, text) =>
    set((s) => ({
      chatMessages: [
        ...s.chatMessages,
        {
          id: Date.now().toString(),
          sender,
          text,
          time: new Date().toLocaleTimeString("en-IE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
      ],
    })),

  setPrivateMessage: (msg) => set({ privateMessage: msg }),

  addCitizenChatMessage: (text) =>
    set((s) => {
      const time = new Date().toLocaleTimeString("en-IE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const citizenMsg = {
        id: Date.now().toString(),
        sender: "citizen" as const,
        text,
        time,
      };
      const operatorReply = {
        id: (Date.now() + 1).toString(),
        sender: "operator" as const,
        text: "Received. We're monitoring your location and data packet. Help is en route.",
        time,
      };
      return {
        citizenChatMessages: [...s.citizenChatMessages, citizenMsg, operatorReply],
      };
    }),

  goToCommunications: () => set({ citizenStep: "data" }),
  goToDispatchStatus: () => set({ citizenStep: "dispatched" }),
}));