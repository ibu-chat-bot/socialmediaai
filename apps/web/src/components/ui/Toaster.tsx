"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-2xl rounded-[24px] p-6">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-xs font-black uppercase tracking-widest text-slate-800">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-xs font-medium text-slate-500 leading-relaxed">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-slate-300 hover:text-slate-600" />
          </Toast>
        );
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}
