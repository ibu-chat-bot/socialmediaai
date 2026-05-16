"use client";

import React, { useState } from "react";
import { NodeProps } from "reactflow";
import { NodeCard } from "./NodeCard";
import { Search, Sparkles, Loader2, TrendingUp, Target, Globe } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

export function ViralFinderNode({ id, selected }: NodeProps) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setAnalysis(null);

    try {
      const res = await axios.post("http://localhost:8000/viral/analyze", {
        topic,
        platform
      });
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error("Viral Finder hatası:", err);
      setAnalysis("Üzgünüm, trend analizi sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NodeCard 
      title="🚀 Viral Trend Finder" 
      icon={TrendingUp} 
      selected={selected}
      headerColor="bg-slate-900 text-white"
      iconColor="text-yellow-400"
      className="w-[480px] min-h-[400px]"
    >
      <div className="space-y-6">
        {/* INPUT AREA */}
        <div className="space-y-3">
          <div className="flex gap-2">
            {[
              { id: "instagram", name: "Instagram", icon: Globe },
              { id: "tiktok", name: "TikTok", icon: Target },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  platform === p.id ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                )}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              type="text" 
              placeholder="Niş veya konu girin (örn: SaaS Marketing)..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Trendleri Keşfet
          </button>
        </div>

        {/* RESULTS AREA */}
        {analysis && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={12} /> AI Trend Analizi
            </h4>
            <div className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap font-medium">
              {analysis}
            </div>
          </div>
        )}

        {!analysis && !isLoading && (
          <div className="text-center py-8 opacity-30">
            <TrendingUp size={48} className="mx-auto mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest">Arama Bekleniyor</p>
          </div>
        )}
      </div>
    </NodeCard>
  );
}
