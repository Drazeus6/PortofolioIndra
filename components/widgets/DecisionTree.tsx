'use client';

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DECISION_TREE_GRAPH } from '@/lib/data';
import { Scale, ShieldAlert, Cpu, CheckCircle2, FileCode } from 'lucide-react';
import { useViewMode } from '@/context/ViewModeContext';

function CustomNode({ data }: { data: any }) {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const getIcon = () => {
    if (data.badge?.includes('Trigger')) return <ShieldAlert className="w-5 h-5 text-amber-400" />;
    if (data.badge?.includes('Celah')) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (data.badge?.includes('Prinsip')) return <Scale className="w-5 h-5 text-emerald-400" />;
    if (data.badge?.includes('Yurisprudensi')) return <FileCode className="w-5 h-5 text-violet-400" />;
    return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <div
      className={`p-4 rounded-xl border max-w-xs shadow-xl transition-all duration-300 ${
        isDev
          ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 backdrop-blur-md hover:border-emerald-500/50'
          : 'bg-white border-blue-200 text-slate-800 shadow-blue-100 hover:border-blue-500'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-emerald-500 !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isDev ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          {data.badge}
        </span>
      </div>
      <h4 className="font-bold text-sm mb-1 leading-snug">{data.label}</h4>
      <p className={`text-xs leading-relaxed ${isDev ? 'text-slate-400 font-mono' : 'text-slate-600'}`}>
        {data.description}
      </p>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !w-3 !h-3" />
    </div>
  );
}

export function DecisionTree() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [nodes] = useNodesState(DECISION_TREE_GRAPH.nodes);
  const [edges] = useEdgesState(DECISION_TREE_GRAPH.edges);

  return (
    <div
      className={`w-full h-[550px] rounded-2xl border overflow-hidden relative ${
        isDev
          ? 'bg-slate-950 border-slate-800 shadow-2xl'
          : 'bg-slate-50 border-blue-100 shadow-xl'
      }`}
    >
      <div className="absolute top-4 left-4 z-10 p-3 rounded-xl bg-slate-900/80 backdrop-blur border border-slate-700 text-white max-w-sm">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400" />
          Interactive Legal & Cybercrime Simulator
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Simulasi pohon keputusan: Konstruksi hukum sanksi Ta&apos;zir pada kekosongan norma Deepfake AI (UU ITE 2024).
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        colorMode={isDev ? 'dark' : 'light'}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color={isDev ? '#334155' : '#cbd5e1'}
        />
      </ReactFlow>
    </div>
  );
}
