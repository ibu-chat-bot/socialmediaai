"use client";

import React from "react";
import { NodeProps } from "reactflow";
import { NodeCard } from "./NodeCard";
import { Youtube, Play, FileText } from "lucide-react";

export function VideoNode({ data, selected }: NodeProps) {
  return (
    <NodeCard 
      title="YouTube Video" 
      icon={Youtube} 
      selected={selected}
      iconColor="text-red-500"
    >
      <div className="space-y-4">
        {/* THUMBNAIL PLACEHOLDER */}
        <div className="aspect-video bg-slate-100 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={20} className="text-red-500 fill-red-500" />
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" 
            alt="thumbnail" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h4 className="font-bold text-sm mb-1 leading-snug">How to Go Viral in 2024: The Ultimate Guide</h4>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Duration: 12:45</p>
        </div>

        <button className="w-full bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
          <FileText size={14} />
          Transkripti İncele
        </button>
      </div>
    </NodeCard>
  );
}
