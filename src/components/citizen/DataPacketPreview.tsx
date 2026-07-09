"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Video,
  Mic,
  Heart,
  Activity,
  Play,
  Pause,
  Square,
  MessageSquare,
  Send,
  Clock,
  ChevronLeft,
  ChevronDown,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { SAMPLE_CITIZEN, getChatAvailableServices } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DataPacketPreview() {
  const {
    location,
    severity,
    setSeverity,
    isRecording,
    setIsRecording,
    isPlayingVideo,
    setIsPlayingVideo,
    isPlayingVoice,
    setIsPlayingVoice,
    updateLocation,
    dispatchEmergency,
    isDispatched,
    privateMessage,
    setPrivateMessage,
    selectedServices,
    citizenChatMessages,
    addCitizenChatMessage,
    chatTargetService,
    setChatTargetService,
    notifyGuardians,
    guardiansNotified,
    goToDispatchStatus,
    eta,
    responseTime,
  } = useEmergencyStore();

  const availableChatServices = useMemo(
    () => getChatAvailableServices(selectedServices),
    [selectedServices]
  );

  const filteredChatMessages = useMemo(
    () => citizenChatMessages.filter((m) => m.serviceId === chatTargetService),
    [citizenChatMessages, chatTargetService]
  );

  const activeChatService = availableChatServices.find((s) => s.id === chatTargetService);

  const [chatInput, setChatInput] = useState("");
  const [autoDispatchCountdown, setAutoDispatchCountdown] = useState(3);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = () => (Math.random() - 0.5) * 0.0003;
      const state = useEmergencyStore.getState();
      updateLocation(state.location.lat + jitter(), state.location.lng + jitter());
    }, 2000);
    return () => clearInterval(interval);
  }, [updateLocation]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredChatMessages]);

  useEffect(() => {
    const valid = availableChatServices.some((s) => s.id === chatTargetService);
    if (!valid && availableChatServices.length > 0) {
      setChatTargetService(availableChatServices[0].id);
    }
  }, [availableChatServices, chatTargetService, setChatTargetService]);

  // Auto-dispatch after packet transmits (first visit only)
  useEffect(() => {
    if (isDispatched) return;

    setAutoDispatchCountdown(3);

    const countdownInterval = setInterval(() => {
      setAutoDispatchCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    const dispatchTimer = setTimeout(() => {
      if (!useEmergencyStore.getState().isDispatched) {
        dispatchEmergency();
      }
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(dispatchTimer);
    };
  }, [isDispatched, dispatchEmergency]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    addCitizenChatMessage(chatInput.trim(), chatTargetService);
    setChatInput("");
  };

  const handleNotifyGuardians = () => {
    if (guardiansNotified) return;
    notifyGuardians();
    toast.success("Guardians notified with full emergency packet");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 px-2 pb-4"
    >
      {isDispatched ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-3 flex items-center justify-between border border-emerald/30"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-glow" />
            <div>
              <p className="text-xs font-semibold text-emerald-glow">Help is on the way</p>
              <p className="text-[10px] text-white/40">
                ETA ~{Math.ceil(eta)} min · Update packet anytime below
              </p>
            </div>
          </div>
          <button
            onClick={goToDispatchStatus}
            className="text-[10px] text-emerald-glow font-medium flex items-center gap-1 hover:underline"
          >
            <ChevronLeft className="w-3 h-3" />
            ETA view
          </button>
        </motion.div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-emerald-glow font-medium">
            Transmitting emergency data packet…
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[11px] text-white/40 mt-1"
          >
            Auto-dispatching in {autoDispatchCountdown}s
          </motion.p>
        </div>
      )}

      {/* GPS Map */}
      <motion.div className="glass rounded-2xl overflow-hidden">
        <div className="relative h-28 map-grid">
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-emerald shadow-lg shadow-emerald/50"
            animate={{
              left: ["45%", "48%", "46%", "47%"],
              top: ["40%", "42%", "41%", "43%"],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ transform: "translate(-50%, -50%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-card/80 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-2">
            <MapPin className="w-3 h-3 text-emerald-glow" />
            <span className="text-[10px] text-white/70">{location.address}</span>
          </div>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute top-2 right-3 text-[9px] text-emerald font-bold uppercase tracking-wider"
          >
            Live GPS
          </motion.span>
        </div>
        <div className="px-3 py-2 flex justify-between text-[10px] text-white/40 font-mono">
          <span>{location.lat.toFixed(4)}°N</span>
          <span>{location.lng.toFixed(4)}°W</span>
        </div>
      </motion.div>

      {/* Video */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Video className="w-4 h-4 text-emerald-glow" />
          <span className="text-xs font-medium">Video for Emergency Services</span>
        </div>
        <div
          className="relative h-24 rounded-xl bg-gradient-to-br from-navy-light to-navy overflow-hidden cursor-pointer"
          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
            >
              {isPlayingVideo ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </motion.div>
          </div>
          <span className="absolute top-2 left-2 text-[9px] bg-alert/80 px-1.5 py-0.5 rounded font-bold">
            {isPlayingVideo ? "REC" : "TAP TO RECORD"}
          </span>
        </div>
      </div>

      {/* Voice Note */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-emerald-glow" />
            <span className="text-xs font-medium">Voice Note</span>
          </div>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-bold transition-colors",
              isRecording
                ? "bg-alert/30 text-alert-glow animate-pulse"
                : "bg-white/10 text-white/60"
            )}
          >
            {isRecording ? "Recording…" : "Record"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlayingVoice(!isPlayingVoice)}
            className="w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center"
          >
            {isPlayingVoice ? (
              <Square className="w-3 h-3 text-emerald-glow" />
            ) : (
              <Play className="w-3 h-3 text-emerald-glow ml-0.5" />
            )}
          </button>
          <div className="flex-1 flex items-end gap-0.5 h-8">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-emerald/40 rounded-full"
                animate={
                  isPlayingVoice || isRecording
                    ? { height: [4, Math.random() * 24 + 4, 4] }
                    : { height: 4 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.5 + Math.random() * 0.5,
                  delay: i * 0.03,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/40 font-mono">0:04</span>
        </div>
      </div>

      {/* Private message */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-emerald-glow" />
          <span className="text-xs font-medium">Private Message to Emergency Services</span>
        </div>
        <textarea
          value={privateMessage}
          onChange={(e) => setPrivateMessage(e.target.value)}
          placeholder="Describe your situation… (optional)"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-emerald/40"
        />
      </div>

      {/* Health Profile */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-alert-glow" />
          <span className="text-xs font-medium">Health Profile</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white/40 text-[9px]">Name</p>
            <p className="font-medium">{SAMPLE_CITIZEN.name}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white/40 text-[9px]">Blood Type</p>
            <p className="font-medium text-alert-glow">{SAMPLE_CITIZEN.bloodType}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 col-span-2">
            <p className="text-white/40 text-[9px]">Conditions</p>
            <p className="font-medium">{SAMPLE_CITIZEN.conditions.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Severity */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-glow" />
            <span className="text-xs font-medium">Severity Level</span>
          </div>
          <span
            className={cn(
              "text-lg font-black tabular-nums",
              severity >= 8 ? "text-alert-glow" : severity >= 5 ? "text-yellow-400" : "text-emerald-glow"
            )}
          >
            {severity}/10
          </span>
        </div>
        <Slider value={severity} onChange={setSeverity} min={1} max={10} />
        <p className="text-[9px] text-white/30 mt-2">Adjust anytime — even while waiting for help</p>
      </div>

      {/* Notify Guardians */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNotifyGuardians}
        disabled={guardiansNotified}
        className={cn(
          "w-full glass rounded-2xl p-3 flex items-center gap-3 transition-colors",
          guardiansNotified
            ? "border border-emerald/30 opacity-80"
            : "border border-emerald/20 hover:border-emerald/40 hover:bg-emerald/5"
        )}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald/20 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-emerald-glow" />
        </div>
        <div className="text-left flex-1">
          <p className="text-xs font-semibold">
            {guardiansNotified ? "Guardians Notified ✓" : "Notify Guardians"}
          </p>
          <p className="text-[10px] text-white/40">
            {guardiansNotified
              ? "Full packet sent — location, health & severity"
              : "Forgot to swipe? Send rich packet data instantly"}
          </p>
        </div>
      </motion.button>

      {/* Citizen chat */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-glow" />
            <span className="text-xs font-medium">Chat</span>
          </div>
          <div className="relative">
            <select
              value={chatTargetService}
              onChange={(e) => setChatTargetService(e.target.value as typeof chatTargetService)}
              className="appearance-none bg-white/10 border border-white/10 rounded-lg pl-2 pr-7 py-1.5 text-[11px] font-medium focus:outline-none focus:border-emerald/40 cursor-pointer"
            >
              {availableChatServices.map((svc) => (
                <option key={svc.id} value={svc.id} className="bg-navy-card">
                  {svc.icon} {svc.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
          </div>
        </div>

        {activeChatService && (
          <p className="text-[10px] text-white/35 mb-2">
            Speaking with {activeChatService.name}
            {!selectedServices.includes(activeChatService.id) && activeChatService.id === "guardian"
              ? " · always available"
              : ""}
          </p>
        )}

        <div className="bg-white/5 rounded-xl p-2 max-h-32 overflow-y-auto scrollbar-thin space-y-2 mb-2">
          {filteredChatMessages.length === 0 ? (
            <p className="text-[10px] text-white/30 text-center py-3">
              Send a message to {activeChatService?.name ?? "this service"}
            </p>
          ) : (
            filteredChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "text-[11px] rounded-lg px-2 py-1.5 max-w-[90%]",
                  msg.sender === "citizen"
                    ? "bg-white/10 ml-auto text-right"
                    : msg.sender === "system"
                    ? "bg-emerald/10 mx-auto text-center text-[10px] text-emerald-glow/80"
                    : "bg-emerald/20 mr-auto"
                )}
              >
                <p>{msg.text}</p>
                <p className="text-[9px] text-white/30 mt-0.5">{msg.time}</p>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
            placeholder={`Message ${activeChatService?.shortName ?? "service"}…`}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald/40"
          />
          <button
            onClick={handleSendChat}
            className="w-9 h-9 rounded-xl bg-emerald/20 flex items-center justify-center hover:bg-emerald/30"
          >
            <Send className="w-4 h-4 text-emerald-glow" />
          </button>
        </div>
      </div>

      {!isDispatched ? (
        <motion.div
          className="glass rounded-2xl p-4 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-emerald"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>
          <p className="text-[11px] text-white/50">
            Packet sending automatically — help will be dispatched shortly
          </p>
        </motion.div>
      ) : (
        <Button
          onClick={goToDispatchStatus}
          variant="outline"
          className="w-full"
        >
          Back to ETA Countdown
        </Button>
      )}
    </motion.div>
  );
}