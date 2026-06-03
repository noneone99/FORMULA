import React, { useState } from "react";
import { 
  Plus, 
  Minus, 
  Check, 
  Cpu, 
  Database, 
  Layout, 
  Sparkles, 
  ExternalLink,
  Hourglass,
  ArrowRight,
  Layers
} from "lucide-react";
import { ServiceClass } from "../types";
import { ObreroServiceClasses } from "../data";

interface ServiceClassesProps {
  onSelectClass: (cls: ServiceClass) => void;
}

export default function ServiceClasses({ onSelectClass }: ServiceClassesProps) {
  const [expandedId, setExpandedId] = useState<string | null>("cl-01");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getIconForClass = (id: string) => {
    switch (id) {
      case "cl-01":
        return <Layout className="w-5 h-5 text-[#FF4D00]" />;
      case "cl-02":
        return <Layers className="w-5 h-5 text-[#FF4D00]" />;
      case "cl-03":
        return <Database className="w-5 h-5 text-[#FF4D00]" />;
      case "cl-04":
      default:
        return <Cpu className="w-5 h-5 text-[#FF4D00]" />;
    }
  };

  const getBorderColorForClass = (id: string, isExpanded: boolean) => {
    if (!isExpanded) return "border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]";
    return "border-[#1A1A1A] shadow-[6px_6px_0px_#FF4D00]";
  };

  return (
    <div id="service-classes-section" className="space-y-6 my-8">
      <div>
        <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[CATEGORIAS DE SITES]</span>
        <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight mt-0.5 font-mono uppercase">
          As 4 Classes Digitais Obrero
        </h3>
        <p className="text-xs text-[#1A1A1A]/80 mt-1 max-w-2xl text-left">
          Dividimos nossos serviços de labor em quatro categorias ricas baseadas no volume de dados, interações com física de tela e controle administrativo autônomo do cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ObreroServiceClasses.map((cls) => {
          const isExpanded = expandedId === cls.id;
          return (
            <div
              key={cls.id}
              className={`bg-white border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-none ${
                getBorderColorForClass(cls.id, isExpanded)
              }`}
            >
              <div className="p-5 md:p-6 space-y-4">
                {/* Header Row */}
                <div 
                  onClick={() => toggleExpand(cls.id)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="p-2 bg-[#FAF9F6] border-2 border-[#1A1A1A] rounded-none">
                      {getIconForClass(cls.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase tracking-wider">{cls.code}</span>
                        {isExpanded && <span className="w-2 h-2 bg-[#FF4D00] rounded-none animate-pulse" />}
                      </div>
                      <h4 className="text-sm font-extrabold text-[#1A1A1A] tracking-tight leading-snug uppercase font-mono">{cls.title}</h4>
                    </div>
                  </div>
                  <button 
                    title={isExpanded ? "Fechar detalhes" : "Expandir detalhes"}
                    className="p-1 px-1.5 rounded-none border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
                  >
                    {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed text-left font-sans">
                  {cls.description}
                </p>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cls.stack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[8.5px] px-1.5 py-0.5 border border-[#1A1A1A]/15 rounded-none bg-[#FAF9F6] text-[#1A1A1A]/70 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Extandable detailed sheets */}
                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t-2 border-[#1A1A1A]/10 animate-fadeIn text-left">
                    {/* Deep explanation */}
                    <div className="space-y-1">
                      <span className="font-mono text-[8.5px] text-[#FF4D00] uppercase block tracking-wider font-extrabold">Aprofundamento Técnico</span>
                      <p className="text-[11.5px] text-[#1A1A1A]/80 leading-relaxed font-sans">
                        {cls.detailedDescription}
                      </p>
                    </div>

                    {/* Ideal profile target */}
                    <div className="space-y-1">
                      <span className="font-mono text-[8.5px] text-[#1A1A1A]/60 uppercase block tracking-wider font-bold">Adequação de Cliente</span>
                      <p className="text-[11px] text-[#1A1A1A] font-sans font-bold">
                        Ideal para: {cls.idealFor}
                      </p>
                    </div>

                    {/* Proportions metrics list */}
                    <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-none border-2 border-[#1A1A1A]">
                      <span className="font-mono text-[8.5px] text-[#1A1A1A]/60 uppercase block tracking-widest font-black">Peso Proporcional de Labor</span>
                      
                      <div className="grid grid-cols-2 gap-3 font-mono text-[9.5px]">
                        {/* Box 1 UX */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[#1A1A1A]/75 font-semibold">
                            <span>Direção de Design</span>
                            <span>{cls.proportions.uxUi}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-200 rounded-none overflow-hidden">
                            <div className="h-full bg-[#1A1A1A]" style={{ width: `${cls.proportions.uxUi}%` }} />
                          </div>
                        </div>

                        {/* Box 2 React Core */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[#1A1A1A]/75 font-semibold">
                            <span>Código React</span>
                            <span>{cls.proportions.development}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-200 rounded-none overflow-hidden">
                            <div className="h-full bg-[#FF4D00]" style={{ width: `${cls.proportions.development}%` }} />
                          </div>
                        </div>

                        {/* Box 3 Perf SEO */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[#1A1A1A]/75 font-semibold">
                            <span>Otimização / SEO</span>
                            <span>{cls.proportions.optimization}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-200 rounded-none overflow-hidden">
                            <div className="h-full bg-emerald-600" style={{ width: `${cls.proportions.optimization}%` }} />
                          </div>
                        </div>

                        {/* Box 4 Animations */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[#1A1A1A]/75 font-semibold">
                            <span>Dinâmica p5.js</span>
                            <span>{cls.proportions.animation}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-200 rounded-none overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: `${cls.proportions.animation}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features breakdown bullet points */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[8.5px] text-[#FF4D00] uppercase block tracking-wider font-extrabold font-mono">Entregáveis Garantidos</span>
                      <ul className="space-y-1.5">
                        {cls.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-[11.5px] text-[#1A1A1A]/90">
                            <span className="bg-[#FF4D00]/10 p-0.5 rounded-none border border-[#FF4D00]/30 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-[#FF4D00]" aria-hidden="true" />
                            </span>
                            <span className="leading-tight font-sans">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Settle bar containing price metrics and instant anchor simulation CTA */}
              <div className="p-4 bg-[#1A1A1A] text-white border-t-2 border-[#1A1A1A] flex items-center justify-between font-mono">
                <div>
                  <span className="text-[9px] text-[#FAF9F6]/60 uppercase block">Obra de Entrada</span>
                  <span className="text-sm font-bold text-white">R$ {cls.basePrice.toLocaleString("pt-BR")}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/80 flex items-center gap-1 font-bold">
                    <Hourglass className="w-3 h-3 text-[#FF4D00]" />
                    {cls.deliveryDays} DIAS
                  </span>
                  
                  <button 
                    onClick={() => onSelectClass(cls)}
                    className="p-1.5 px-3 bg-[#FF4D00] hover:bg-white hover:text-[#1A1A1A] hover:border-white border-2 border-transparent text-white text-[10px] font-bold rounded-none tracking-wider flex items-center gap-1.5 transition-all uppercase cursor-pointer"
                  >
                    Simular
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
