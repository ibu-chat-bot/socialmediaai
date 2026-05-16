"use client";

import React, { useState } from "react";
import { NodeProps } from "reactflow";
import { NodeCard } from "./NodeCard";
import { ShieldAlert, BarChart3, Loader2, UserPlus, Zap, Eye } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

export function CompetitorAnalysisNode({ id, selected }: NodeProps) {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [report, setReport] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setReport(null);

    try {
      const res = await axios.post("http://localhost:8000/competitor/analyze", {
        url,
        platform
      });
      setReport(res.data.report);
      setStats({
        avgLikes: res.data.avg_engagement,
        posts: res.data.post_count
      });
    } catch (err) {
      console.error("Analiz hatası:", err);
      setReport("Rakip analizi sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NodeCard 
      title="🛡️ Competitor Intelligence" 
      icon={ShieldAlert} 
      selected={selected}
      headerColor="bg-red-600 text-white"
      className="w-[520px] min-h-[450px]"
    >
      <div className="space-y-6">
        {/* INPUT */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {["instagram", "tiktok"].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  platform === p ? "bg-red-600 text-white border-red-600" : "bg-white text-slate-400 border-slate-100"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          
          <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Rakip profil URL'si girin..." 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-500/20 outline-none"
          />
          
          <button 
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />}
            Rakibi Çözümle
          </button>
        </div>

        {/* STATS */}
        {stats && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ort. Beğeni</p>
              <p className="text-lg font-black text-red-600">{Math.round(stats.avgLikes).toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analiz Edilen</p>
              <p className="text-lg font-black text-slate-700">{stats.posts} Gönderi</p>
            </div>
          </div>
        )}

        {/* REPORT */}
        {report && (
          <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100">
            <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={12} /> Stratejik İstihbarat Raporu
            </h4>
            <div className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap font-medium">
              {report}
            </div>
          </div>
        )}
      </div>
    </NodeCard>
  );
}
