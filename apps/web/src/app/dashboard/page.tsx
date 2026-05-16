"use client";

import React from "react";
import { Plus, Clock, LayoutGrid, Star, ArrowRight, Zap, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const RECENT_BOARDS = [
  { id: "1", name: "SaaS Launch Strategy", date: "2 saat önce", nodes: 12, color: "bg-emerald-500" },
  { id: "2", name: "Instagram Viral Hooks", date: "Dün", nodes: 8, color: "bg-purple-500" },
  { id: "3", name: "Competitor Analysis - Nike", date: "3 gün önce", nodes: 24, color: "bg-slate-900" },
];

const TEMPLATES = [
  { name: "Viral Video Reçetesi", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Rakip SWOT Analizi", icon: Search, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Yıllık İçerik Planı", icon: LayoutGrid, color: "text-primary", bg: "bg-emerald-50" },
];

export default function DashboardPage() {
  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase mb-2">Çalışma Alanı</h1>
          <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" /> Bugün 3 yeni analiz tamamladın.
          </p>
        </motion.div>
        
        <Link href="/canvas/new">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <Plus size={18} />
            Yeni Kanvas Oluştur
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* RECENT BOARDS */}
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock size={12} /> Son Çalışmalar
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {RECENT_BOARDS.map((board, i) => (
              <motion.div 
                key={board.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-100 p-6 rounded-[28px] flex items-center gap-6 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 ${board.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <LayoutGrid size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{board.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{board.date}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{board.nodes} Kart</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all pr-4">
                  <ArrowRight size={20} className="text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SIDE TOOLS */}
        <div className="col-span-4 space-y-8">
          {/* TEMPLATES */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Hazır Şablonlar</h3>
            <div className="space-y-4">
              {TEMPLATES.map((t) => (
                <button key={t.name} className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
                  <div className={`w-10 h-10 ${t.bg} ${t.color} rounded-xl flex items-center justify-center`}>
                    <t.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CREDITS / UPGRADE */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Kredi Durumu</span>
              <span className="text-xs font-black text-emerald-700">850 / 1000</span>
            </div>
            <div className="h-2 w-full bg-emerald-100 rounded-full mb-6">
              <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
            </div>
            <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
              Limitleri Artır
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
