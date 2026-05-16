"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Send, Loader2, CheckCircle } from "lucide-react";
import axios from "axios";
import { useCanvasStore } from "@/store/useCanvasStore";

export function WebImportDialog() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { id: boardId, addNode } = useCanvasStore();

  const handleImport = async () => {
    if (!url || !boardId) return;
    setStatus("loading");
    try {
      const res = await axios.post("http://localhost:8000/import/web", {
        url,
        board_id: boardId
      });
      
      const { data } = res.data;
      // Tuvala yeni bir Web Node ekle
      addNode("text", { x: 200, y: 200 }, { 
        label: data.title || "Web Makale",
        content: data.text,
        url: url
      });

      setStatus("success");
      setUrl("");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 focus-within:border-primary/50 transition-all">
      <div className="pl-3 text-blue-500">
        <LinkIcon size={18} />
      </div>
      <input 
        type="text" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleImport()}
        placeholder="Web URL (Makale)..." 
        className="bg-transparent border-none outline-none text-[11px] font-bold w-40 h-8"
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
