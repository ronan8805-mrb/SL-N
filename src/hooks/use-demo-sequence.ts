"use client";

import { useCallback } from "react";
import { useEmergencyStore } from "@/store/emergency-store";
import { CHAT_MESSAGES } from "@/lib/sample-data";
import { delay } from "@/lib/utils";
import { toast } from "sonner";

export function useDemoSequence() {
  const store = useEmergencyStore();

  const runFullDemo = useCallback(async () => {
    if (store.isDemoRunning) return;
    store.setIsDemoRunning(true);
    store.resetDemo();
    store.setDemoSpeed("slan");

    toast.info("Starting cinematic demo sequence…", { duration: 2000 });

    store.setViewMode("citizen");
    await delay(800);

    store.setCitizenStep("triage");
    if (!useEmergencyStore.getState().selectedServices.includes("ambulance")) {
      store.toggleService("ambulance");
    }
    if (!useEmergencyStore.getState().selectedServices.includes("garda")) {
      store.toggleService("garda");
    }
    await delay(2000);

    store.setCitizenStep("confirm");
    store.setCountdown(14);
    await delay(1200);

    store.confirmService("ambulance", true);
    await delay(600);
    store.confirmService("garda", true);
    await delay(1000);

    store.setCitizenStep("data");
    store.setIsRecording(true);
    store.setPrivateMessage("Chest feels tight, mild asthma — need inhaler");
    await delay(2000);
    store.setIsRecording(false);
    store.addCitizenChatMessage("I can't breathe properly");
    await delay(3500); // wait for auto-dispatch

    toast.success("Help dispatched in 2.1 seconds!", { duration: 3000 });
    await delay(3000);

    store.goToCommunications();
    await delay(1500);
    store.goToDispatchStatus();
    await delay(1000);

    store.setViewMode("command");
    await delay(600);

    store.setPipelineStage("verified");
    await delay(800);

    for (const msg of CHAT_MESSAGES) {
      store.addChatMessage(msg.sender, msg.text);
      await delay(700);
    }

    store.setPipelineStage("en_route");
    await delay(1200);
    store.setPipelineStage("arrived");
    await delay(1000);
    store.setPipelineStage("resolved");

    toast.success("Demo complete — incident resolved", { duration: 4000 });
    store.setIsDemoRunning(false);
  }, [store]);

  const runCitizenEmergency = useCallback(async () => {
    if (store.isDemoRunning) return;
    store.setIsDemoRunning(true);
    store.resetDemo();
    store.setCitizenStep("triage");
    if (!useEmergencyStore.getState().selectedServices.includes("ambulance")) {
      store.toggleService("ambulance");
    }
    if (!useEmergencyStore.getState().selectedServices.includes("garda")) {
      store.toggleService("garda");
    }
    await delay(1500);
    store.setCitizenStep("confirm");
    store.confirmService("ambulance", true);
    store.confirmService("garda", true);
    await delay(1000);
    store.setCitizenStep("data");
    store.setPrivateMessage("Emergency — need immediate assistance");
    await delay(3500); // wait for auto-dispatch
    store.setIsDemoRunning(false);
  }, [store]);

  return { runFullDemo, runCitizenEmergency };
}