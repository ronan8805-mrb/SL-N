"use client";

import { motion } from "framer-motion";
import {
  Video,
  Heart,
  MapPin,
  Play,
  Pause,
  User,
} from "lucide-react";
import { SAMPLE_CITIZEN } from "@/lib/sample-data";
import { useEmergencyStore } from "@/store/emergency-store";
import { VoiceNotePlayer } from "@/components/shared/VoiceNotePlayer";
import { useCommandCentreTheme } from "@/hooks/use-command-centre-theme";
import { cn } from "@/lib/utils";

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
  const theme = useCommandCentreTheme();

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
        <span
          className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold",
            theme.liveBadge
          )}
        >
          {theme.packetBadge}
        </span>
      </div>

      {/* Citizen info */}
      <div className={cn("flex items-center gap-3 bg-white/5 rounded-xl p-3 border", theme.border)}>
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", theme.bg)}>
          <User className={cn("w-5 h-5", theme.accent)} />
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
        <VoiceNotePlayer
          isPlaying={isPlayingVoice}
          onPlayingChange={setIsPlayingVoice}
          compact
        />
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