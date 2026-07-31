'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { RAG_PIPELINE_GRAPH, RagPipelineNodeData, getLocalizedDesc } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import {
  MessageSquare,
  FileUp,
  Code2,
  Scissors,
  Sparkles,
  Database,
  FileSpreadsheet,
  MessageSquareText,
  Bot,
  Send,
  UserCheck,
  Eye,
  ListFilter,
  X,
  Info,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import { useViewMode } from '@/context/ViewModeContext';
import { motion, AnimatePresence } from 'framer-motion';

function CustomNode({ data }: { data: RagPipelineNodeData & { onSelectNode?: () => void } }) {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';

  // Sticky Note node (special yellow card from screenshot)
  if (data.category === 'note') {
    return (
      <motion.div
        whileHover={{ scale: 1.03, rotate: -1 }}
        className="p-3.5 rounded-sm bg-yellow-300 text-slate-900 border-2 border-yellow-500 shadow-xl w-60 font-sans select-none cursor-pointer"
        onClick={data.onSelectNode}
      >
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-yellow-500/40">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-yellow-400/80 px-1.5 py-0.5 rounded text-yellow-950 font-mono">
            {data.badge}
          </span>
          <UserCheck className="w-3.5 h-3.5 text-yellow-800" />
        </div>
        <div className="font-bold text-[11px] space-y-0.5 font-mono">
          <p><span className="text-yellow-800">NAMA:</span> {data.params?.NAMA}</p>
          <p><span className="text-yellow-800">ASAL:</span> {data.params?.ASAL}</p>
        </div>
      </motion.div>
    );
  }

  const getIcon = () => {
    switch (data.category) {
      case 'input': return <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'loader': return <FileUp className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
      case 'parser': return <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'chunker': return <Scissors className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'embedding': return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'vectorstore': return <Database className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />;
      case 'converter': return <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400 shrink-0" />;
      case 'template': return <MessageSquareText className="w-3.5 h-3.5 text-violet-400 shrink-0" />;
      case 'llm': return <Bot className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'output': return <Send className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default: return <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  const getCategoryColor = () => {
    switch (data.category) {
      case 'input': return 'border-cyan-500/60 bg-cyan-950/30 hover:border-cyan-400';
      case 'loader': return 'border-indigo-500/60 bg-indigo-950/30 hover:border-indigo-400';
      case 'parser': return 'border-blue-500/60 bg-blue-950/30 hover:border-blue-400';
      case 'chunker': return 'border-emerald-500/60 bg-emerald-950/30 hover:border-emerald-400';
      case 'embedding': return 'border-amber-500/60 bg-amber-950/30 hover:border-amber-400';
      case 'vectorstore': return 'border-fuchsia-500/60 bg-fuchsia-950/30 hover:border-fuchsia-400';
      case 'converter': return 'border-teal-500/60 bg-teal-950/30 hover:border-teal-400';
      case 'template': return 'border-violet-500/60 bg-violet-950/30 hover:border-violet-400';
      case 'llm': return 'border-rose-500/60 bg-rose-950/30 hover:border-rose-400';
      case 'output': return 'border-emerald-500/60 bg-emerald-950/30 hover:border-emerald-400';
      default: return 'border-slate-500/60 bg-slate-950/30';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={data.onSelectNode}
      className={`p-3 rounded-md border w-[210px] transition-all duration-300 font-mono shadow-xl backdrop-blur-md cursor-pointer ${getCategoryColor()} ${
        isDev ? 'bg-dark-card/95 text-slate-100' : 'bg-dark-card/95 text-slate-100'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`!w-2.5 !h-2.5 ${isDev ? '!bg-blue-400' : '!bg-amber-400'}`}
      />

      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <div className="flex items-center gap-1.5">
          {getIcon()}
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-dark-base border border-dark-border text-slate-300">
            {data.badge}
          </span>
        </div>
      </div>

      <h4 className="font-bold text-xs mb-1 text-white font-sans truncate">
        {data.label}
      </h4>

      {/* Embedded File pill if any */}
      {data.files && data.files.length > 0 && (
        <div className="mt-1.5 space-y-1">
          {data.files.map((file, i) => (
            <p key={i} className="text-[9px] text-amber-300 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-800/60 truncate">
              📄 {file}
            </p>
          ))}
        </div>
      )}

      {/* Embedded params if any */}
      {data.params && !data.files && (
        <div className="mt-1.5 text-[9px] text-slate-400 space-y-0.5 bg-dark-base/90 p-1.5 rounded border border-dark-border/80 font-mono">
          {Object.entries(data.params).map(([k, v]) => (
            <p key={k} className="truncate">
              <span className="text-slate-500 font-bold">{k}:</span> <span className="text-slate-300">{v}</span>
            </p>
          ))}
        </div>
      )}

      <p className="text-[10px] text-slate-300 leading-snug font-sans font-light mt-1.5 line-clamp-2">
        {typeof (isDev ? data.developerDesc : data.legalDesc) === 'object'
          ? (isDev ? data.developerDesc : data.legalDesc)?.[language] || (isDev ? data.developerDesc : data.legalDesc)?.id
          : (isDev ? data.developerDesc : data.legalDesc)}
      </p>

      <Handle
        type="source"
        position={Position.Right}
        className={`!w-2.5 !h-2.5 ${isDev ? '!bg-blue-400' : '!bg-amber-400'}`}
      />
    </motion.div>
  );
}

function FlowInner() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';
  const { fitView } = useReactFlow();
  const [showAccessibleText, setShowAccessibleText] = useState(false);
  const [selectedNode, setSelectedNode] = useState<RagPipelineNodeData | null>(null);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const handleResetZoom = useCallback(() => {
    fitView({ padding: 0.15, duration: 400 });
  }, [fitView]);

  const nodesWithHandlers = useMemo(
    () =>
      RAG_PIPELINE_GRAPH.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onSelectNode: () => setSelectedNode(node.data as RagPipelineNodeData),
        },
      })),
    []
  );

  const [nodes] = useNodesState(nodesWithHandlers);
  const [edges] = useEdgesState(
    RAG_PIPELINE_GRAPH.edges.map((e) => ({
      ...e,
      style: { strokeWidth: 2, stroke: isDev ? '#3b82f6' : '#f59e0b' },
      labelStyle: { fill: '#cbd5e1', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#090d16', fillOpacity: 0.9, rx: 3 },
      labelBgPadding: [4, 2] as [number, number],
    }))
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-md border border-dark-border bg-dark-base overflow-hidden relative shadow-xl">
      {/* ── Header Toolbar ── */}
      <div className="p-4 border-b border-dark-border bg-dark-surface flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {UI_TRANSLATIONS.playground.flowTitle[language]}
            </h3>
          </div>
          <p className="text-[11px] font-sans text-slate-400 font-light">
            {UI_TRANSLATIONS.playground.flowSub[language]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetZoom}
            className="px-2.5 py-1.5 rounded-sm bg-dark-card border border-dark-border hover:border-slate-500 text-xs text-slate-300 font-mono transition-colors flex items-center gap-1 min-h-[36px]"
            title="Reset tampilan grafik"
            aria-label="Reset zoom grafik"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> {UI_TRANSLATIONS.playground.resetFit[language]}
          </button>
          <button
            onClick={() => setShowAccessibleText(!showAccessibleText)}
            className="px-3 py-1.5 rounded-sm bg-dark-card border border-dark-border hover:border-slate-500 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors uppercase tracking-wider min-h-[36px]"
            title="Tampilkan daftar teks untuk pembaca layar"
            aria-label={showAccessibleText ? 'Beralih ke grafik RAG' : 'Beralih ke versi teks RAG'}
            aria-pressed={showAccessibleText}
          >
            {showAccessibleText ? <Eye className="w-4 h-4" /> : <ListFilter className="w-4 h-4" />}
            {showAccessibleText ? UI_TRANSLATIONS.playground.graphView[language] : UI_TRANSLATIONS.playground.textMode[language]}
          </button>
        </div>
      </div>

      {showAccessibleText ? (
        <div className="p-6 space-y-4 h-[380px] sm:h-[460px] lg:h-[520px] overflow-y-auto font-mono text-xs">
          <p className="text-amber-400 font-bold uppercase tracking-wider text-xs">
            {UI_TRANSLATIONS.playground.textAltTitle[language]}
          </p>
          <ol className="space-y-3 list-decimal list-inside text-slate-300">
            {RAG_PIPELINE_GRAPH.nodes.map((node) => (
              <li key={node.id} className="p-3 rounded-sm bg-dark-card border border-dark-border">
                <strong className="text-white">{node.data.label}</strong> ({node.data.badge})
                <p className="text-xs text-blue-400 mt-1 font-mono">
                  Dev: {typeof node.data.developerDesc === 'object' ? node.data.developerDesc[language] || node.data.developerDesc.id : node.data.developerDesc}
                </p>
                <p className="text-xs text-amber-300 mt-0.5 font-sans">
                  Legal: {typeof node.data.legalDesc === 'object' ? node.data.legalDesc[language] || node.data.legalDesc.id : node.data.legalDesc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div
          className="w-full h-[380px] sm:h-[460px] lg:h-[520px] relative bg-dark-surface"
          role="img"
          aria-label="Diagram alur arsitektur RAG Langflow 9 Node untuk AI Assistant"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            colorMode="dark"
            minZoom={0.25}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
            className={isDev ? 'bg-flowchart-grid' : 'bg-flowchart-grid-legal'}
          >
            <Background
              color={isDev ? '#0066FF' : '#D97706'}
              variant={isDev ? BackgroundVariant.Lines : BackgroundVariant.Dots}
              gap={24}
              size={1}
              className="opacity-15"
            />
            <Controls
              showInteractive={false}
              className="bg-dark-card border border-dark-border text-white rounded fill-white overflow-hidden shadow-lg"
            />
          </ReactFlow>

          {/* Mobile hint overlay */}
          <div className="absolute bottom-3 left-3 bg-dark-card/90 border border-dark-border px-3 py-1.5 rounded text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none">
            <Maximize2 className="w-3 h-3 text-amber-400" />
            <span>{UI_TRANSLATIONS.playground.mobileHint[language]}</span>
          </div>
        </div>
      )}

      {/* ── Node Detail Modal (Rendered via React Portal onto document.body) ── */}
      {mounted && selectedNode && createPortal(
        <AnimatePresence>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedNode(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Detail modul RAG: ${selectedNode.label}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-surface border border-dark-border rounded-md max-w-lg w-full p-6 text-white relative shadow-2xl font-mono"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-5 right-5 p-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-slate-400 hover:text-white transition-colors"
                aria-label="Tutup detail modul"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {selectedNode.badge}
                </span>
                <h3 className="text-lg font-bold font-sans">{selectedNode.label}</h3>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-300">
                <div className="p-3 rounded bg-dark-card border border-dark-border">
                  <strong className="text-blue-400 block font-mono text-[11px] uppercase mb-1">
                    {UI_TRANSLATIONS.playground.devViewHeader[language]}
                  </strong>
                  <p className="font-mono text-slate-200">
                    {typeof selectedNode.developerDesc === 'object'
                      ? selectedNode.developerDesc[language] || selectedNode.developerDesc.id
                      : selectedNode.developerDesc}
                  </p>
                </div>

                <div className="p-3 rounded bg-dark-card border border-dark-border">
                  <strong className="text-amber-400 block font-mono text-[11px] uppercase mb-1">
                    {UI_TRANSLATIONS.playground.legalViewHeader[language]}
                  </strong>
                  <p className="font-light leading-relaxed text-slate-200">
                    {typeof selectedNode.legalDesc === 'object'
                      ? selectedNode.legalDesc[language] || selectedNode.legalDesc.id
                      : selectedNode.legalDesc}
                  </p>
                </div>

                {selectedNode.params && (
                  <div className="p-3 rounded bg-dark-base border border-dark-border font-mono text-[11px]">
                    <strong className="text-slate-400 block uppercase mb-1">{UI_TRANSLATIONS.playground.paramsHeader[language]}</strong>
                    <div className="space-y-1 text-slate-300">
                      {Object.entries(selectedNode.params).map(([k, v]) => (
                        <p key={k}>
                          <span className="text-slate-500 font-bold">{k}:</span> {v}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 rounded-sm bg-dark-card border border-dark-border hover:bg-dark-border text-xs font-mono text-slate-200"
                >
                  {UI_TRANSLATIONS.playground.closeBtn[language]}
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

export function DecisionTree() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
