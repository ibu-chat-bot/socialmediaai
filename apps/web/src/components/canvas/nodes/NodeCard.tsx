"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { cn } from "@/lib/utils";
import { MoreHorizontal, GripVertical } from "lucide-react";

interface NodeCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  selected?: boolean;
  headerColor?: string;
  iconColor?: string;
  className?: string;
}

export function NodeCard({ 
  title, 
  icon: Icon, 
  children, 
  selected, 
  headerColor = "bg-white", 
  iconColor = "text-primary",
  className
}: NodeCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-[24px] border-2 shadow-sm transition-all duration-300 min-w-[320px] overflow-hidden",
      selected ? "border-primary shadow-xl shadow-primary/10 ring-4 ring-primary/5" : "border-slate-100 hover:border-slate-300",
      className
    )}>
      {/* HANDLES */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-primary border-2 border-white -left-1.5" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary border-2 border-white -right-1.5" />

      {/* HEADER */}
      <div className={cn("px-5 py-3 flex items-center justify-between border-b border-slate-50", headerColor)}>
        <div className="flex items-center gap-3">
          <div className={cn("p-1.5 rounded-lg bg-white shadow-sm", iconColor)}>
            <Icon size={18} />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-slate-700">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal size={16} />
          </button>
          <div className="text-slate-300 cursor-grab active:cursor-grabbing">
            <GripVertical size={16} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
