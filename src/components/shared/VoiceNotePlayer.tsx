"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, Square } from "lucide-react";
import { VOICE_NOTE_SRC } from "@/lib/media";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface VoiceNotePlayerProps {
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
  isRecording?: boolean;
  onRecordingChange?: (recording: boolean) => void;
  showRecordButton?: boolean;
  compact?: boolean;
}

export function VoiceNotePlayer({
  isPlaying,
  onPlayingChange,
  isRecording = false,
  onRecordingChange,
  showRecordButton = false,
  compact = false,
}: VoiceNotePlayerProps) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      const secs = Math.floor(audio.duration);
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      setDuration(`${m}:${s.toString().padStart(2, "0")}`);
    };
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => onPlayingChange(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [onPlayingChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => onPlayingChange(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, onPlayingChange]);

  const togglePlay = () => onPlayingChange(!isPlaying);

  const bars = compact ? 40 : 30;

  return (
    <div>
      <audio ref={audioRef} src={VOICE_NOTE_SRC} preload="metadata" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs">
          <Mic className="w-3 h-3 text-emerald-glow" />
          <span className={compact ? "" : "text-xs font-medium"}>
            {t.citizen.data.voiceNote}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showRecordButton && onRecordingChange && (
            <button
              onClick={() => onRecordingChange(!isRecording)}
              className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-bold transition-colors",
                isRecording
                  ? "bg-alert/30 text-alert-glow animate-pulse"
                  : "bg-white/10 text-white/60"
              )}
            >
              {isRecording ? t.common.recording : t.common.record}
            </button>
          )}
          <button
            onClick={togglePlay}
            className="text-[10px] text-emerald-glow font-medium"
          >
            {isPlaying ? t.common.stop : t.common.play}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={cn(
            "rounded-lg bg-emerald/20 flex items-center justify-center shrink-0",
            compact ? "w-8 h-8" : "w-8 h-8"
          )}
        >
          {isPlaying ? (
            <Square className="w-3 h-3 text-emerald-glow" />
          ) : (
            <Play className="w-3 h-3 text-emerald-glow ml-0.5" />
          )}
        </button>
        <div className="flex-1 relative">
          <div className={cn("flex items-end gap-0.5", compact ? "h-6" : "h-8")}>
            {Array.from({ length: bars }).map((_, i) => {
              const barProgress = (i / bars) * 100;
              const isActive = isPlaying && barProgress <= progress;
              return (
                <motion.div
                  key={i}
                  className={cn(
                    "flex-1 rounded-full",
                    isActive ? "bg-emerald-glow" : "bg-emerald/30"
                  )}
                  animate={
                    isPlaying || isRecording
                      ? { height: [4, Math.random() * (compact ? 20 : 24) + 4, 4] }
                      : { height: 4 + Math.sin(i * 0.3) * (compact ? 3 : 4) }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 0.4 + Math.random() * 0.4,
                    delay: i * 0.02,
                  }}
                />
              );
            })}
          </div>
          {isPlaying && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/60 pointer-events-none"
              style={{ left: `${progress}%` }}
            />
          )}
        </div>
        <span className="text-[10px] text-white/40 font-mono shrink-0">{duration}</span>
      </div>
    </div>
  );
}