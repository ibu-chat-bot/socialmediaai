"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function JobStatusToast({ jobId, onComplete }: { jobId: string | null, onComplete?: () => void }) {
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (!jobId) return;

    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:8000/jobs/${jobId}`);
        setJob(res.data);
        
        if (res.data.status === "completed" || res.data.status === "failed") {
          clearInterval(poll);
          if (res.data.status === "completed") onComplete?.();
        }
      } catch (err) {
        console.error("Job polling hatası:", err);
      }
    }, 1500);

    return () => clearInterval(poll);
  }, [jobId, onComplete]);

  if (!jobId || !job) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] w-80 bg-white border border-slate-200 rounded-[24px] shadow-2xl p-5 animate-in slide-in-from-left duration-500">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          job.status === "completed" ? "bg-green-50 text-green-500" :
          job.status === "failed" ? "bg-red-50 text-red-500" : "bg-primary/10 text-primary"
        )}>
          {job.status === "running" ? <Loader2 size={20} className="animate-spin" /> :
           job.status === "completed" ? <CheckCircle size={20} /> :
           job.status === "failed" ? <XCircle size={20} /> : <Clock size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            {job.type.replace("_", " ")}
          </p>
          <p className="text-xs font-bold text-slate-700 truncate">{job.message}</p>
        </div>
      </div>
      
      {/* PROGRESS BAR */}
      <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${job.progress}%` }} 
        />
      </div>
    </div>
  );
}
