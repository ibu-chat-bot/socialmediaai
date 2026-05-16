"use client";

import React, { useEffect } from "react";
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  ReactFlowProvider,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";

import { useCanvasStore } from "@/store/useCanvasStore";
import { VideoNode } from "@/components/canvas/nodes/VideoNode";
import { AIChatNode } from "@/components/canvas/nodes/AIChatNode";
import { ViralFinderNode } from "@/components/canvas/nodes/ViralFinderNode";
import { CompetitorAnalysisNode } from "@/components/canvas/nodes/CompetitorAnalysisNode";
import { CanvasToolbar } from "@/components/canvas/toolbars/CanvasToolbar";
import { CanvasTopbar } from "@/components/canvas/toolbars/CanvasTopbar";
import { JobStatusToast } from "@/components/canvas/JobStatusToast";

const nodeTypes = {
  video: VideoNode,
  aiChat: AIChatNode,
  text: VideoNode,
  note: VideoNode,
  viralFinder: ViralFinderNode,
  competitorAnalysis: CompetitorAnalysisNode,
};

function CanvasInternal({ id }: { id: string }) {
  const { 
    nodes, edges, onNodesChange, onEdgesChange, onConnect, 
    selectNode, deleteNode, loadCanvas, saveCanvas, setCanvasId,
    activeJobId, setActiveJobId
  } = useCanvasStore();
  
  const { getViewport } = useReactFlow();

  // 1. Kanvası Yükle
  useEffect(() => {
    setCanvasId(id);
    loadCanvas(id);
  }, [id, loadCanvas, setCanvasId]);

  // 2. Autosave Mekanizması (3 saniye gecikmeli)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCanvas();
    }, 3000);
    return () => clearTimeout(timer);
  }, [nodes, edges, saveCanvas]);

  // 3. Klavye Kısayolları
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const selectedNodes = nodes.filter((n) => n.selected);
        selectedNodes.forEach((n) => deleteNode(n.id));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nodes, deleteNode]);

  return (
    <div className="w-full h-screen bg-[#f8fafc] relative overflow-hidden font-sans">
      <CanvasTopbar />
      <CanvasToolbar />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <div className="bg-white border rounded-2xl p-2 shadow-xl">
            <MiniMap 
              style={{ width: 150, height: 100, borderRadius: 12 }} 
              nodeColor="#00875a"
              maskColor="rgba(0, 135, 90, 0.05)"
            />
          </div>
          <div className="bg-white border rounded-2xl p-2 shadow-xl flex flex-col gap-2">
            <Controls showInteractive={false} className="relative !m-0 !shadow-none !border-none" />
          </div>
        </div>
      </ReactFlow>

      <JobStatusToast jobId={activeJobId} onComplete={() => setActiveJobId(null)} />
      <InspectorPanel />
    </div>
  );
}

function InspectorPanel() {
  const { selectedNodeId, nodes, deleteNode } = useCanvasStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNodeId) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[320px] bg-white/95 backdrop-blur-md border border-slate-200 rounded-[32px] shadow-2xl p-8 animate-in slide-in-from-right duration-300">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Obje Detayları</h3>
      <div className="space-y-6">
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">ID</p>
          <p className="text-xs font-mono font-bold text-slate-700">{selectedNodeId}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Tip</p>
          <p className="text-sm font-bold capitalize text-primary">{selectedNode?.type}</p>
        </div>
        <button onClick={() => deleteNode(selectedNodeId)} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Objeyi Sil</button>
      </div>
    </div>
  );
}

export default function CanvasPage({ params }: { params: any }) {
  const { id } = React.use(params);
  return (
    <ReactFlowProvider>
      <CanvasInternal id={id as string} />
    </ReactFlowProvider>
  );
}
