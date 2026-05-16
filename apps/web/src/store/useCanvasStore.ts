import { create } from "zustand";
import axios from "axios";
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  addEdge, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect, 
  applyNodeChanges, 
  applyEdgeChanges,
  Viewport
} from "reactflow";

const API_URL = "http://localhost:8000";

export type CanvasState = {
  id: string | null;
  name: string;
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  selectedNodeId: string | null;
  isSaving: boolean;
  activeJobId: string | null;

  setCanvasId: (id: string) => void;
  setActiveJobId: (id: string | null) => void;
  loadCanvas: (id: string) => Promise<void>;
  saveCanvas: () => Promise<void>;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  
  addNode: (type: string, position?: { x: number; y: number }, data?: any) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  setViewport: (viewport: Viewport) => void;
};

export const useCanvasStore = create<CanvasState>((set, get) => ({
  id: null,
  name: "Yeni Kanvas",
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  selectedNodeId: null,
  isSaving: false,
  activeJobId: null,

  setCanvasId: (id) => set({ id }),
  setActiveJobId: (id) => set({ activeJobId: id }),

  loadCanvas: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/boards/${id}`);
      const data = res.data;
      set({ 
        id: data.id, 
        name: data.name, 
        nodes: data.nodes || [], 
        edges: data.edges || [],
        viewport: data.viewport || { x: 0, y: 0, zoom: 1 }
      });
    } catch (err) {
      console.error("Yükleme hatası:", err);
    }
  },

  saveCanvas: async () => {
    const { id, name, nodes, edges, viewport, isSaving } = get();
    if (!id || isSaving) return;

    set({ isSaving: true });
    try {
      await axios.post(`${API_URL}/boards/${id}/save`, {
        name,
        nodes,
        edges,
        viewport
      });
    } catch (err) {
      console.error("Kaydetme hatası:", err);
    } finally {
      set({ isSaving: false });
    }
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge({ ...connection, animated: true, style: { stroke: "#00875a", strokeWidth: 3 } }, get().edges) });
  },

  addNode: (type, position = { x: 100, y: 100 }, data = {}) => {
    const id = `${type}-${Date.now()}`;
    const newNode: Node = { id, type, position, data: { ...data, label: type.toUpperCase() } };
    set({ nodes: [...get().nodes, newNode] });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  selectNode: (id) => set({ selectedNodeId: id }),
  setViewport: (viewport) => set({ viewport }),
}));
