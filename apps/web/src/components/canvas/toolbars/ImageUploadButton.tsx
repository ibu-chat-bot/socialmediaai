"use client";

import React, { useRef, useState } from "react";
import { Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";
import axios from "axios";
import { useCanvasStore } from "@/store/useCanvasStore";

export function ImageUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { id: boardId, addNode } = useCanvasStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !boardId) return;

    setStatus("loading");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("board_id", boardId);

    try {
      const res = await axios.post("http://localhost:8000/import/image", formData);
      const { analysis } = res.data;

      addNode("text", { x: 400, y: 400 }, { 
        label: `Görsel Analizi: ${file.name}`,
        content: analysis,
        type: "image_analysis"
      });

      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={status === "loading"}
        className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all text-[10px] font-black uppercase tracking-widest text-slate-600"
      >
        {status === "loading" ? <Loader2 size={14} className="animate-spin text-primary" /> : <ImageIcon size={14} className="text-purple-500" />}
        Görsel
      </button>
    </div>
  );
}
