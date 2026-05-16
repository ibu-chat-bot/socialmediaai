"use client";

import React from "react";
import { Sparkles, MousePointer2, Plus, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyCanvas() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] text-center"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/10">
          <Sparkles className="text-primary" size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight uppercase">Yaratıcılığa Başla</h2>
        <p className="text-slate-400 font-medium mb-12 text-sm leading-relaxed">
          Stratejini oluşturmak için sol menüden bir araç seçebilir veya üst menüden bir video/PDF linki yapıştırabilirsin.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 border border-dashed border-slate-200 p-6 rounded-[24px] flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-400">
              <Plus size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Kart Ekle</p>
            <p className="text-[9px] text-slate-400 mt-1">Sol taraftaki araçları sürükle</p>
          </div>
          <div className="bg-white/50 border border-dashed border-slate-200 p-6 rounded-[24px] flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-400">
              <Zap size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Link Analiz Et</p>
            <p className="text-[9px] text-slate-400 mt-1">Üst menüye bir link yapıştır</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
