"use client";

import React, { useState, useRef, useEffect } from "react";
import { NodeProps, useReactFlow } from "reactflow";
import { NodeCard } from "./NodeCard";
import { Sparkles, Send, Clock, Loader2, Copy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatNode({ id, selected }: NodeProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState("openai");
  
  const { getEdges, getNodes } = useReactFlow();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overridePrompt?: string) => {
    const prompt = overridePrompt || input;
    if (!prompt.trim() || isLoading) return;

    // 1. Bağlamı (Context) Topla
    const edges = getEdges();
    const nodes = getNodes();
    
    // Bu karta gelen bağlantıları bul
    const connectedNodeIds = edges
      .filter((edge) => edge.target === id)
      .map((edge) => edge.source);
    
    const contextData = nodes
      .filter((node) => connectedNodeIds.includes(node.id))
      .map((node) => `[${node.type?.toUpperCase()} - ${node.data.label}]: ${JSON.stringify(node.data)}`)
      .join("\n\n");

    const newMessages: Message[] = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          context: contextData,
          provider
        }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        assistantMessage += chunk;
        
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantMessage;
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat hatası:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NodeCard 
      title="✦ AI Strategist" 
      icon={Sparkles} 
      selected={selected}
      headerColor="bg-primary text-white"
      className="w-[860px] h-[600px] flex flex-col"
    >
      <div className="flex-1 flex gap-6 overflow-hidden -m-5">
        {/* SIDEBAR */}
        <div className="w-[220px] bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Modeller</div>
          <div className="space-y-2">
            {[
              { id: "openai", name: "GPT-4o", color: "bg-green-500" },
              { id: "claude", name: "Claude 3.5", color: "bg-orange-500" },
              { id: "gemini", name: "Gemini Pro", color: "bg-blue-500" },
            ].map((p) => (
              <button 
                key={p.id}
                onClick={() => setProvider(p.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-xs font-bold",
                  provider === p.id ? "bg-white border-primary shadow-sm" : "bg-transparent border-transparent text-slate-400 hover:bg-white/50"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", p.color)} />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
          {/* MESSAGES */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <Sparkles size={48} className="mb-4 text-primary" />
                <h3 className="font-black uppercase tracking-widest text-sm mb-2">Analiz Bekliyor</h3>
                <p className="text-xs font-medium max-w-[240px]">Bağlı kartlardaki transkriptleri, metinleri ve verileri analiz etmek için bir soru sor.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-white font-medium rounded-tr-none shadow-lg shadow-primary/10" 
                      : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none"
                  )}>
                    {msg.content || (isLoading && i === messages.length - 1 ? "..." : "")}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-6 border-t border-slate-100 bg-white">
            {messages.length === 0 && (
              <div className="flex gap-2 mb-4 justify-center">
                {["Viral Hooklar Bul", "İçeriği Reels'e Dönüştür", "Özet Çıkar"].map((label) => (
                  <button 
                    key={label}
                    onClick={() => handleSend(label)}
                    className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            
            <div className="bg-slate-50 border border-slate-100 p-2 rounded-[24px] flex items-center gap-2 focus-within:border-primary/50 transition-all">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Bağlı içerikleri analiz et..." 
                className="bg-transparent border-none outline-none flex-1 px-4 text-sm font-medium h-12"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-12 h-12 bg-primary text-white rounded-[18px] flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </NodeCard>
  );
}
