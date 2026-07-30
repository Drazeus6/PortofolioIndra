'use client';

import React, { useMemo, useState } from 'react';
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
import { Scale, ShieldAlert, Cpu, CheckCircle2, FileCode, ListFilter, Eye } from 'lucide-react';
import { useViewMode } from '@/context/ViewModeContext';
import { motion } from 'framer-motion';

function CustomNode({ data }: { data: any }) {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';

  const getIcon = () => {
    if (data.badge?.includes('Trigger')) return <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />;
    if (data.badge?.includes('Celah')) return <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />;
    if (data.badge?.includes('Prinsip')) return <Scale className="w-4 h-4 text-emerald-400 shrink-0" />;
    if (data.badge?.includes('Yurisprudensi')) return <FileCode className="w-4 h-4 text-violet-400 shrink-0" />;
    return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-sm border min-w-[240px] max-w-xs transition-all duration-300 font-mono min-h-[48px] ${
        isDev
          ? 'bg-dark-card border-dark-border text-slate-100 backdrop-blur-md hover:border-blue-500/80 hover:shadow-[0_0_20px_rgba(0,102,255,0.25)]'
          : 'bg-dark-card border-amber-900/80 text-slate-100 backdrop-blur-md hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]'
      }`}
    >
      <Handle type="target" position={Position.Top} className={`!w-3.5 !h-3.5 ${isDev ? '!bg-blue-500' : '!bg-amber-500'}`} />
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
            isDev ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}
        >
          {data.badge}
        </span>
      </div>
      <h4 className="font-bold text-xs md:text-sm mb-1 leading-snug text-white font-sans">{data.label}</h4>
      <p className="text-xs text-slate-300 leading-relaxed font-mono">
        {data.description}
      </p>
      <Handle type="source" position={Position.Bottom} className={`!w-3.5 !h-3.5 ${isDev ? '!bg-blue-500' : '!bg-amber-500'}`} />
    </motion.div>
  );
}

export function DecisionTree() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [showAccessibleText, setShowAccessibleText] = useState(false);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const [nodes] = useNodesState(DECISION_TREE_GRAPH.nodes);
  const [edges] = useEdgesState(DECISION_TREE_GRAPH.edges);

  return (
    <div
      className={`w-full rounded-md border overflow-hidden relative flex flex-col transition-all duration-300 ${
        isDev
          ? 'bg-dark-surface border-dark-border shadow-2xl'
          : 'bg-dark-surface border-amber-900/60 shadow-2xl'
      }`}
    >
      {/* Header Info & Screen Reader Toggle */}
      <div className="p-3.5 bg-dark-base border-b border-dark-border flex items-center justify-between z-10 font-mono">
        <div className="flex items-center gap-2 text-white">
          <Scale className={`w-4 h-4 ${isDev ? 'text-blue-400' : 'text-amber-400'}`} />
          <span className="font-bold text-xs">Legal &amp; Deepfake AI Flow Simulator</span>
        </div>
        <button
          onClick={() => setShowAccessibleText(!showAccessibleText)}
          className="px-3 py-2 rounded-sm bg-dark-card border border-dark-border hover:border-slate-500 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors uppercase tracking-wider min-h-[40px]"
          title="Tampilkan daftar teks untuk pembaca layar / layar sentuh"
        >
          {showAccessibleText ? <Eye className="w-4 h-4" /> : <ListFilter className="w-4 h-4" />}
          {showAccessibleText ? 'Graph View' : 'Text Mode'}
        </button>
      </div>

      {showAccessibleText ? (
        <div className="p-6 space-y-4 h-[340px] sm:h-[420px] lg:h-[480px] overflow-y-auto font-mono text-xs">
          <p className="text-amber-400 font-bold uppercase tracking-wider text-xs">
            Daftar Langkah Alur Keputusan Hukum (Text Alternative):
          </p>
          <ol className="space-y-3 list-decimal list-inside text-slate-300">
            {DECISION_TREE_GRAPH.nodes.map((node) => (
              <li key={node.id} className="p-3 rounded-sm bg-dark-card border border-dark-border">
                <strong className="text-white">{node.data.label}</strong> ({node.data.badge})
                <p className="text-xs text-slate-400 mt-1">{node.data.description}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="w-full h-[340px] sm:h-[420px] lg:h-[480px] relative bg-dark-surface">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            colorMode="dark"
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
          >
            <Controls className="!bg-dark-card !border-dark-border !fill-slate-200 shadow-xl !rounded-sm !p-1" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={16}
              size={1}
              color={isDev ? '#1e293b' : '#451a03'}
            />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}
