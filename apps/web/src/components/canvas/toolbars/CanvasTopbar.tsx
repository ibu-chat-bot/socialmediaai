"use client";

import React from "react";
import { 
  Undo2, 
  Redo2, 
  Share2, 
  Save, 
  ChevronDown,
  Monitor,
  Maximize,
  CloudCheck,
  Loader2
} from "lucide-react";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useReactFlow } from "reactflow";

import { YouTubeImportDialog } from "./YouTubeImportDialog";
import { WebImportDialog } from "./WebImportDialog";
import { PDFUploadButton } from "./PDFUploadButton";
import { ImageUploadButton } from "./ImageUploadButton";
import { AudioUploadButton } from "./AudioUploadButton";
import { SocialImportDialog } from "./SocialImportDialog";

export function CanvasTopbar() {
  const { name, isSaving } = useCanvasStore();
  const { fitView } = useReactFlow();

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-[24px] shadow-2xl shadow-slate-200/50 min-w-[800px]">
      <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-primary">
          <Monitor size={18} />
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">{name}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isSaving ? (
              <>
                <Loader2 size={10} className="text-primary animate-spin" />
                <span className="text-[9px] font-bold text-primary uppercase">Kaydediliyor...</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Bulutla Senkronize</span>
              </>
            )}
          </div>
        </div>
        <ChevronDown size={14} className="text-slate-300 ml-2" />
      </div>

      {/* IMPORT AREA */}
      <div className="flex items-center gap-3">
        <YouTubeImportDialog />
        <WebImportDialog />
        <PDFUploadButton />
        <div className="w-[1px] h-6 bg-slate-100 mx-1" />
        <ImageUploadButton />
        <AudioUploadButton />
        <div className="w-[1px] h-6 bg-slate-100 mx-1" />
        <SocialImportDialog type="instagram" />
        <SocialImportDialog type="tiktok" />
      </div>

      <div className="flex items-center gap-4 flex-1 justify-center">
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-200 cursor-not-allowed"><Undo2 size={18} /></button>
          <button className="p-2 text-slate-200 cursor-not-allowed"><Redo2 size={18} /></button>
        </div>
        <div className="w-[1px] h-4 bg-slate-100" />
        <button 
          onClick={() => fitView()}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Maximize size={14} className="text-slate-400" />
          <span className="text-xs font-black">Fit View</span>
        </button>
      </div>

      <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Share2 size={18} />
        </button>
        <button className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Save size={16} />
          Kaydet
        </button>
      </div>
    </div>
  );
}
