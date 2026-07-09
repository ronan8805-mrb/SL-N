"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useEmergencyStore } from "@/store/emergency-store";
import { cn } from "@/lib/utils";

export function ChatSimulation() {
  const { chatMessages, incident, addChatMessage } = useEmergencyStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = () => {
    addChatMessage("operator", "We're tracking your location. Help is close.");
  };

  return (
    <div className="glass rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-emerald-glow" />
        <h3 className="text-sm font-semibold">Citizen Chat</h3>
        {incident && (
          <span className="text-[9px] text-emerald font-bold ml-auto">CONNECTED</span>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-2 overflow-y-auto scrollbar-thin min-h-[200px] max-h-[280px] mb-3"
      >
        {!incident ? (
          <p className="text-center text-white/30 text-sm py-8">
            Chat activates when incident is received
          </p>
        ) : (
          <AnimatePresence>
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-xs",
                  msg.sender === "citizen"
                    ? "bg-white/10 ml-auto rounded-br-sm"
                    : msg.sender === "operator"
                    ? "bg-emerald/20 mr-auto rounded-bl-sm"
                    : "bg-white/5 mx-auto text-center text-white/40 text-[10px]"
                )}
              >
                {msg.sender !== "system" && (
                  <p className="text-[9px] text-white/40 mb-0.5 capitalize">
                    {msg.sender}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className="text-[9px] text-white/30 mt-1 text-right font-mono">
                  {msg.time}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <button
        onClick={handleSend}
        disabled={!incident}
        className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:bg-white/10 transition-colors disabled:opacity-30"
      >
        <span className="flex-1 text-left text-xs">Send quick response…</span>
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}