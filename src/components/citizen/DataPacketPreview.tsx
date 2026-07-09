"use client";

import { useEffect } from "react";
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
} from "lucide-react";
import { SAMPLE_CITIZEN } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { Slider } from "@/components/ui/slider";
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
  } = useEmergencyStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = () => (Math.random() - 0.5) * 0.0003;
      const state = useEmergencyStore.getState();
      updateLocation(state.location.lat + jitter(), state.location.lng + jitter());
    }, 2000);
    return () => clearInterval(interval);
  }, [updateLocation]);

  useEffect(() => {
    const timer = setTimeout(() => dispatchEmergency(), 4000);
    return () => clearTimeout(timer);
  }, [dispatchEmergency]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 px-2"
    >
      <p className="text-center text-sm text-emerald-glow font-medium">
        Transmitting emergency data packet…
      </p>

      {/* GPS Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="relative h-32 map-grid">
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

      {/* Video Thumbnail */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Video className="w-4 h-4 text-emerald-glow" />
          <span className="text-xs font-medium">Live Video Feed</span>
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
          {isPlayingVideo && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-0.5 bg-emerald"
              transition={{ duration: 10 }}
            />
          )}
          <span className="absolute top-2 left-2 text-[9px] bg-alert/80 px-1.5 py-0.5 rounded font-bold">
            REC
          </span>
        </div>
      </motion.div>

      {/* Voice Note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-3"
      >
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
      </motion.div>

      {/* Health Profile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-3"
      >
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
      </motion.div>

      {/* Severity Slider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-3"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-glow" />
            <span className="text-xs font-medium">Severity</span>
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
      </motion.div>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-center text-[11px] text-white/40"
      >
        Auto-dispatching when packet complete…
      </motion.div>
    </motion.div>
  );
}