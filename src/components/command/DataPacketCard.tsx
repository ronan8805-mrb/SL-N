"use client";

import { motion } from "framer-motion";
import {
  Video,
  Mic,
  Heart,
  MapPin,
  Play,
  Pause,
  User,
} from "lucide-react";
import { SAMPLE_CITIZEN } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";

export function DataPacketCard() {
  const {
    incident,
    location,
    severity,
    isPlayingVideo,
    setIsPlayingVideo,
    isPlayingVoice,
    setIsPlayingVoice,
  } = useEmergencyStore();

  if (!incident) {
    return (
      <div className="glass rounded-2xl p-6 text-center text-white/30 text-sm h-full flex items-center justify-center">
        <div>
          <Heart className="w-8 h-8 mx-auto mb-3 opacity-30" />
          Data packet will appear when incident is active
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Emergency Data Packet</h3>
        <span className="text-[10px] bg-emerald/20 text-emerald-glow px-2 py-0.5 rounded-full font-bold">
          COMPLETE
        </span>
      </div>

      {/* Citizen info */}
      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
        <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
          <User className="w-5 h-5 text-emerald-glow" />
        </div>
        <div>
          <p className="font-semibold text-sm">{SAMPLE_CITIZEN.name}</p>
          <p className="text-[10px] text-white/40">
            {SAMPLE_CITIZEN.age}y · {SAMPLE_CITIZEN.bloodType} · Severity {severity}/10
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 text-xs">
        <MapPin className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">{location.address}</p>
          <p className="text-[10px] text-white/40 font-mono">
            {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </p>
        </div>
      </div>

      {/* Video */}
      <div className="rounded-xl overflow-hidden bg-navy-light">
        <div
          className="relative h-28 cursor-pointer"
          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-card" />
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlayingVideo ? (
              <Pause className="w-8 h-8 text-white/60" />
            ) : (
              <Play className="w-8 h-8 text-white/60 ml-1" />
            )}
          </div>
          <div className="absolute top-2 left-2 flex items-center gap-1 text-[9px]">
            <Video className="w-3 h-3" />
            <span>Video Feed</span>
          </div>
          <span className="absolute top-2 right-2 text-[9px] bg-alert/80 px-1.5 py-0.5 rounded font-bold">
            LIVE
          </span>
        </div>
      </div>

      {/* Voice */}
      <div className="bg-white/5 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs">
            <Mic className="w-3 h-3 text-emerald-glow" />
            Voice Note
          </div>
          <button
            onClick={() => setIsPlayingVoice(!isPlayingVoice)}
            className="text-[10px] text-emerald-glow font-medium"
          >
            {isPlayingVoice ? "Stop" : "Play"}
          </button>
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-emerald/30 rounded-full"
              animate={
                isPlayingVoice
                  ? { height: [2, Math.random() * 20 + 2, 2] }
                  : { height: 2 + Math.sin(i * 0.3) * 4 }
              }
              transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.02 }}
            />
          ))}
        </div>
      </div>

      {/* Health */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white/40 text-[9px]">Allergies</p>
          <p>{SAMPLE_CITIZEN.allergies.join(", ")}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white/40 text-[9px]">Medications</p>
          <p>{SAMPLE_CITIZEN.medications.join(", ")}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 col-span-2">
          <p className="text-white/40 text-[9px]">Emergency Contact</p>
          <p>{SAMPLE_CITIZEN.emergencyContact}</p>
        </div>
      </div>
    </motion.div>
  );
}