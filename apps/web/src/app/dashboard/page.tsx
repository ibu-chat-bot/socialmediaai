"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Plus, 
  Search, 
  Clock, 
  MoreHorizontal, 
  ArrowRight,
  Sparkles,
  FileText,
  Video
} from "lucide-react";
import Link from "next/link";

const recentCanvases = [
  { id: "1", title: "Viral Reels Strategy", lastEdit: "2 hours ago", type: "Reels" },
  { id: "2", title: "Personal Branding Brain", lastEdit: "5 hours ago", type: "YouTube" },
  { id: "3", title: "Competitor Analysis - Tech", lastEdit: "1 day ago", type: "Research" },
];

const templates = [
  { id: "t1", title: "YouTube Metni Yazıcı", icon: Video, color: "bg-blue-500" },
  { id: "t2", title: "Fikir Ver -> Reels Metni", icon: Sparkles, color: "bg-orange-500" },
  { id: "t3", title: "Twit Metni Yazarı", icon: FileText, color: "bg-sky-500" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Hoş geldin, Alex 👋</h1>
          <p className="text-muted-foreground text-sm font-medium">Bugün hangi viral içeriği oluşturuyoruz?</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Ara..." 
              className="pl-10 pr-4 py-2 bg-white border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
            />
          </div>
          <Link href="/canvas/new" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus size={18} />
            Yeni Kanvas
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS / SUGGESTIONS */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary to-green-600 p-6 rounded-3xl text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-1">AI Video Analizi</h3>
              <p className="text-white/80 text-xs font-medium mb-4">Bir link yapıştır, AI tüm stratejiyi çıkarsın.</p>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </div>
            </div>
            <Video className="absolute -right-4 -bottom-4 text-white/10" size={120} />
          </div>
          <div className="bg-white border p-6 rounded-3xl relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
            <h3 className="text-xl font-bold mb-1 text-foreground">Şablon Keşfet</h3>
            <p className="text-muted-foreground text-xs font-medium mb-4">1000+ viral kancadan birini seç.</p>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white border p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">AI Önerisi</h3>
            <p className="text-sm font-medium leading-relaxed">"Görünen o ki en çok **Teknoloji** videoları üzerine çalışıyorsun. Senin için yeni bir **SaaS lansman** şablonu hazırladım."</p>
          </div>
          <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
            Öneriyi İncele <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* RECENT CANVASES */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Clock size={20} />
            Son Çalışmalar
          </h2>
          <button className="text-sm font-bold text-muted-foreground hover:text-foreground">Tümünü Gör</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recentCanvases.map((canvas) => (
            <Link key={canvas.id} href={`/canvas/${canvas.id}`} className="bg-white border p-5 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <Layers size={20} />
                </div>
                <MoreHorizontal size={16} className="text-muted-foreground" />
              </div>
              <h4 className="font-bold text-sm mb-1 line-clamp-1">{canvas.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{canvas.type}</span>
                <span className="text-[10px] font-medium text-slate-400">{canvas.lastEdit}</span>
              </div>
            </Link>
          ))}
          <Link href="/canvas/new" className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-slate-50 hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
            <Plus size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">Yeni Kanvas</span>
          </Link>
        </div>
      </div>

      {/* TEMPLATES */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Sparkles size={20} />
            Sana Özel Şablonlar
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white border p-6 rounded-3xl flex items-start gap-4 hover:shadow-lg transition-all cursor-pointer">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg", template.color)}>
                <template.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">{template.title}</h4>
                <p className="text-xs text-muted-foreground font-medium mb-3">En iyi sonuçlar için optimize edildi.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">VİRAL</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">STRATEJİ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
