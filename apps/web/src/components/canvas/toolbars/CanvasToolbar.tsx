"use client";

import React from "react";
import { 
  MousePointer2, 
  Hand, 
  Type, 
  StickyNote, 
  Image, 
  Video, 
  Mic, 
  FileText, 
  Sparkles,
  LayoutTemplate
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/store/useCanvasStore";

const tools = [
  { id: "select", icon: MousePointer2, label: "Seç" },
  { id: "hand", icon: Hand, label: "Kaydır" },
  { id: "divider1", type: "divider" },
  { id: "templates", icon: LayoutTemplate, label: "Şablonlar", primary: true },
  { id: "aiChat", icon: Sparkles, label: "AI Chat", primary: true, action: "aiChat" },
  { id: "viralFinder", icon: LayoutTemplate, label: "Viral Finder", primary: true, action: "viralFinder" },
  { id: "competitorAnalysis", icon: ShieldAlert, label: "Rakip Analizi", primary: true, action: "competitorAnalysis" },
  { id: "divider2", type: "divider" },
  { id: "text", icon: Type, label: "Metin", action: "text" },
  { id: "note", icon: StickyNote, label: "Not", action: "note" },
  { id: "video", icon: Video, label: "Video", action: "video" },
];

export function CanvasToolbar() {
  const [activeTool, setActiveTool] = React.useState("select");
  const { addNode } = useCanvasStore();

  const handleToolClick = (tool: any) => {
    setActiveTool(tool.id);
    if (tool.action) {
      addNode(tool.action, { x: Math.random() * 400, y: Math.random() * 400 });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 p-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-[24px] shadow-2xl shadow-slate-200/50">
      {tools.map((tool) => {
        if (tool.type === "divider") {
          return <div key={tool.id} className="w-8 h-[1px] bg-slate-100 my-1" />;
        }

        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 group relative",
              activeTool === tool.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            )}
          >
            {Icon && <Icon size={20} strokeWidth={activeTool === tool.id ? 3 : 2} />}
            <div className="absolute left-16 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {tool.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
