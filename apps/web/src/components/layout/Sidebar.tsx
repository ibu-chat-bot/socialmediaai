"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  SquarePlus, 
  Sparkles, 
  CreditCard, 
  Settings, 
  HelpCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Layers, label: "Canvases", href: "/canvases" },
  { icon: Sparkles, label: "Templates", href: "/templates" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-right bg-white flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* LOGO */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-lg">N</span>
        </div>
        <span className="font-bold text-lg tracking-tight">Nailing AI</span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
              pathname === item.href 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* FOOTER AREA */}
      <div className="p-4 border-t space-y-4">
        {/* CREDITS CARD */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Credits</span>
            <Sparkles size={14} className="text-primary" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">250</span>
            <span className="text-xs text-muted-foreground">remaining</span>
          </div>
          <button className="w-full mt-3 bg-white border text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Top Up
          </button>
        </div>

        <div className="space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <Settings size={20} />
            Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
