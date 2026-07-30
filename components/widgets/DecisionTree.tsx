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
    if (data.badge?.includes('Trigger')) return <ShieldAlert className="w-4.5 h-4.5 text-amber-400" />;
    if (data.badge?.includes('Celah')) return <Cpu className="w-4.5 h-4.5 text-cyan-400" />;
    if (data.badge?.includes('Prinsip')) return <Scale className="w-4.5 h-4.5 text-emerald-400" />;
    if (data.badge?.includes('Yurisprudensi')) return <FileCode className="w-4.5 h-4.5 text-violet-400" />;
    return <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-xl border max-w-xs transition-all duration-300 ${
        isDev
          ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 backdrop-blur-md hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
          : 'bg-white border-blue-200 text-slate-900 shadow-md hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500 !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isDev ? 'bg-slate-800 text-amber-300 border border-slate-700' : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}
        >
          {data.badge}
        </span>
      </div>
      <h4 className="font-bold text-xs md:text-sm mb-1 leading-snug">{data.label}</h4>
      <p className={`text-xs leading-relaxed ${isDev ? 'text-slate-300 font-mono' : 'text-slate-700'}`}>
        {data.description}
      </p>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500 !w-3 !h-3" />
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
      className={`w-full rounded-2xl border overflow-hidden relative flex flex-col ${
        isDev
          ? 'bg-slate-950 border-slate-800 shadow-2xl'
          : 'bg-slate-50 border-blue-200 shadow-xl'
      }`}
    >
      {/* Header Info & Screen Reader Toggle */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-white">
          <Scale className="w-4.5 h-4.5 text-amber-400" />
          <span className="font-bold text-xs md:text-sm">Legal &amp; Deepfake AI Flow Simulator</span>
        </div>
        <button
          onClick={() => setShowAccessibleText(!showAccessibleText)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
          title="Tampilkan daftar teks untuk pembaca layar / layar sentuh"
        >
          {showAccessibleText ? <Eye className="w-3.5 h-3.5" /> : <ListFilter className="w-3.5 h-3.5" />}
          {showAccessibleText ? 'Tampilan Flow Graph' : 'Mode Teks Aksesibel'}
        </button>
      </div>

      {showAccessibleText ? (
        <div className="p-6 space-y-4 h-[360px] sm:h-[440px] lg:h-[520px] overflow-y-auto font-sans text-xs md:text-sm">
          <p className="text-amber-400 font-bold uppercase tracking-wider text-xs">
            Daftar Langkah Alur Keputusan Hukum (Text Alternative):
          </p>
          <ol className="space-y-3 list-decimal list-inside text-slate-300">
            {DECISION_TREE_GRAPH.nodes.map((node) => (
              <li key={node.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">{node.data.label}</strong> ({node.data.badge})
                <p className="text-xs text-slate-400 mt-1">{node.data.description}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="w-full h-[360px] sm:h-[440px] lg:h-[520px] relative">
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
      )}
    </div>
  );
}
