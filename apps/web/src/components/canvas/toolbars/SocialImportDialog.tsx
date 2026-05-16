"use client";

import React, { useState } from "react";
import { Instagram, Music2, Send, Loader2, CheckCircle } from "lucide-react";
import axios from "axios";
import { useCanvasStore } from "@/store/useCanvasStore";
import { cn } from "@/lib/utils";

export function SocialImportDialog({ type }: { type: "instagram" | "tiktok" }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { id: boardId, addNode } = useCanvasStore();

  const handleImport = async () => {
    if (!url || !boardId) return;
    setStatus("loading");
    try {
      const res = await axios.post(`http://localhost:8000/import/${type}`, {
        url,
        board_id: boardId
      });
      
      const { data } = res.data;
      // Tuvala yeni bir Social Node ekle
      addNode("text", { x: 200, y: 200 }, { 
        label: `${type.toUpperCase()} Post`,
        content: data.caption,
        metadata: {
          likes: data.likes,
          author: data.owner || data.author,
          url: url
        },
        platform: type
      });

      setStatus("success");
      setUrl("");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const Icon = type === "instagram" ? Instagram : Music2;
  const colorClass = type === "instagram" ? "text-pink-600" : "text-black";

  return (
    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 focus-within:border-primary/50 transition-all">
      <div className={cn("pl-3", colorClass)}>
        <Icon size={18} />
      </div>
      <input 
        type="text" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleImport()}
        placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} URL...`} 
        className="bg-transparent border-none outline-none text-[11px] font-bold w-32 h-8"
      />
      <button 
        onClick={handleImport}
        disabled={status === "loading"}
        className="bg-white p-2 rounded-xl border shadow-sm hover:text-primary transition-colors disabled:opacity-50"
      >
        {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : status === "success" ? <CheckCircle size={14} className="text-green-500" /> : <Send size={14} />}
      </button>
    </div>
  );
}
