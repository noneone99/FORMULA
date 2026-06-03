import React, { useState } from "react";
import { Layers, ChevronRight, Eye, Grid, Sparkles, Sliders } from "lucide-react";
import { GordianAnalysisData } from "../data";

export default function GordianAnalysis() {
  const [activeAspect, setActiveAspect] = useState<string>("g-grid");
  
  // Interactive CSS sandbox values
  const [useGordianRules, setUseGordianRules] = useState<boolean>(true);
  const [gridOpacity, setGridOpacity] = useState<number>(30);
  const [letterSpacing, setLetterSpacing] = useState<"normal" | "tighter" | "widest">("tighter");

  const currentAspect = GordianAnalysisData.find(a => a.id === activeAspect) || GordianAnalysisData[0];

  return (
    <div id="gordian-analysis-section" className="bg-white border-2 border-[#1A1A1A] rounded-none p-6 space-y-8 my-8 shadow-[6px_6px_0px_#1A1A1A]">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 border-[#1A1A1A] gap-4">
        <div>
          <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[ANÁLISE DE PROPORÇÕES]</span>
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight mt-0.5 font-mono uppercase">
            Estudo do DNA Visual Gordian & Tradução Obrero
          </h3>
          <p className="text-xs text-[#1A1A1A]/80 mt-1 max-w-2xl">
            Analisamos a estrutura de pesos do template <strong>Gordian</strong> da Framer, mapeando como suas cercas de 1px, tipografia polarizada e compensação de padding podem ser aplicadas no estúdio Obrero.
          </p>
        </div>
        <button
          onClick={() => setUseGordianRules(!useGordianRules)}
          id="btn-toggle-rules"
          className={`px-4 py-2 rounded-none text-xs font-mono border-2 transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
            useGordianRules 
              ? "bg-[#FF4D00] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]" 
              : "bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-zinc-100"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {useGordianRules ? "REGRAS GORDIAN: ATIVAS" : "REGRAS ATIVAS: PADRÃO COMMODITY"}
        </button>
      </div>

      {/* Grid comparing Standard Template vs Gordian Rule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Commodity layout Block */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-[9.5px] text-[#1A1A1A]/70 uppercase font-black">
            <span className="w-2 h-2 rounded-full bg-red-650"></span>
            A. Template Genérico de Mercado (Commodity)
          </div>
          
          <div className="bg-[#FAF9F6] border-2 border-dashed border-[#1A1A1A]/20 rounded-none p-5 space-y-4 shadow-sm text-left">
            {/* Generic Floating shadow header */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-none border border-[#1A1A1A]/20">
              <span className="text-[11px] font-bold text-indigo-600">🔥 StartupFlow Agency</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Menu</span>
            </div>
            
            <div className="text-center py-6 space-y-2 text-[#1A1A1A]">
              <h4 className="text-xl font-extrabold text-[#1A1A1A] font-sans">
                Nós Criamos Sites Modernos Para Sua Empresa Crescer Muito
              </h4>
              <p className="text-[11px] text-[#1A1A1A]/70 max-w-sm mx-auto leading-relaxed">
                Nossa agência de marketing digital altamente focada em vendas cria páginas e funis de funis para capturar leads rápidos.
              </p>
              <div className="pt-2">
                <button className="px-4 py-2 bg-indigo-600 text-white text-[10.5px] rounded-sm font-bold">
                  Agendar Reunião Agora Grátis
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-2.5 rounded-none text-center border border-[#1A1A1A]/10 text-[#1A1A1A]">
                  <span className="text-xs font-bold text-[#1A1A1A] block">Feature {i}</span>
                  <span className="text-[9px] text-[#1A1A1A]/60 block mt-0.5">Lorem ipsum dolor sit.</span>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9.5px] text-[#1A1A1A]/60 block leading-relaxed italic">
            * Características do commodity: Gradiantes roxos/azuis arbitrários, sombras difusas flutuantes, cantos extremamente arredondados, falta de contraste tipográfico estrutural, poluição visual (ruído).
          </span>
        </div>

        {/* Obrero/Gordian translation layout Block */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-[9.5px] text-[#FF4D00] uppercase font-black">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse"></span>
            B. Arquitetura Estrutural Obrero (Inspirado no Gordian)
          </div>

          <div className={`p-0 bg-[#1A1A1A] text-white border-2 transition-all duration-500 text-left ${
            useGordianRules ? "border-[#1A1A1A] rounded-none shadow-[4px_4px_0px_#FF4D00]" : "border-[#1A1A1A]/30 rounded-none"
          }`}>
            
            {/* Nav Row with strict borders */}
            <div className={`flex items-center justify-between p-3 px-4 font-mono text-[10px] ${
              useGordianRules ? "border-b border-white/20 text-white" : "border-none text-zinc-500"
            }`}>
              <span className={`font-extrabold uppercase tracking-widest ${useGordianRules ? "text-[#FF4D00]" : "text-zinc-500"}`}>[OBRERO.]</span>
              <div className="flex gap-4">
                <span className={useGordianRules ? "text-white font-bold" : "text-zinc-650"}>[01. MANIFESTO]</span>
                <span>[02. LABOR]</span>
              </div>
            </div>

            {/* Core Display Body */}
            <div className={`p-6 ${useGordianRules ? "space-y-4" : "space-y-1"}`}>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[9px] px-1.5 py-0.5 border rounded-none ${
                  useGordianRules ? "bg-[#1A1A1A] border-white/30 text-[#FF4D00] font-bold" : "bg-transparent border-transparent text-zinc-650"
                }`}>
                  CL-01
                </span>
                <span className="font-mono text-[9px] text-[#FF4D00]/70 uppercase tracking-widest font-bold">ARQUITETURA BRUTALISTA</span>
              </div>
              
              <div className="space-y-2">
                <h4 className={`font-mono flex flex-col font-black text-white ${
                  useGordianRules 
                    ? `text-3xl tracking-tighter uppercase leading-[0.95]` 
                    : `text-xl tracking-normal`
                }`}>
                  <span>LINHAS DE CÓDIGO.</span>
                  <span className="text-white/40">PAREDES DIGITAIS.</span>
                </h4>
                <p className="text-[11px] text-zinc-300 font-sans max-w-sm leading-relaxed">
                  Não decoramos layouts com sombras virtuais. Erguemos cercas sólidas de dados e arte generativa aplicada sobre a tela. Esse é o verdadeiro rigor da web artesanal.
                </p>
              </div>

              {/* Strict architectural board cells */}
              <div className={`grid grid-cols-3 gap-0 border-t ${
                useGordianRules ? "border-white/25 mt-6" : "border-transparent mt-2"
              }`}>
                {[
                  { tag: "[HTML]", val: "95% Craft" },
                  { tag: "[REACT]", val: "SPA Fluido" },
                  { tag: "[P5.JS]", val: "Generativo" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 font-mono ${
                      useGordianRules 
                        ? `border-r border-white/20 last:border-r-0 text-left` 
                        : "border-none text-center"
                    }`}
                  >
                    <span className="text-[9px] text-[#FF4D00] block uppercase font-bold">{item.tag}</span>
                    <span className="text-[10px] text-white block font-bold mt-0.5">{item.val}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
          <span className="text-[9.5px] text-[#1A1A1A]/60 block leading-relaxed italic">
            * Características do Obrero: Cercas metálicas de 1px, absoluto foco tipográfico, labels de metadados em JetBrains Mono, divisórias simétricas, sem decorações supérfluas.
          </span>
        </div>

      </div>

      {/* Tabbed Interactive list of gordian aspect descriptions */}
      <div className="pt-6 border-t-2 border-[#1A1A1A]">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Scollable tabs (1/3 width) */}
          <div className="lg:w-1/3 flex flex-col space-y-1.5 shrink-0">
            <span className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest font-black block mb-2">Aspectos Analisados</span>
            {GordianAnalysisData.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveAspect(a.id)}
                className={`p-3.5 text-left border-2 rounded-none transition-all flex items-center justify-between font-bold cursor-pointer ${
                  activeAspect === a.id 
                    ? "bg-[#FF4D00] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]" 
                    : "bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Grid className={`w-3.5 h-3.5 ${activeAspect === a.id ? "text-white" : "text-[#1A1A1A]/40"}`} />
                  <span className="font-mono text-xs truncate uppercase tracking-tight">{a.title.split(".")[1].trim()}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* Tab contents (2/3 width) */}
          <div className="lg:w-2/3 bg-[#FAF9F6] border-2 border-[#1A1A1A] p-6 rounded-none text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#FF4D00] uppercase font-black">[VETOR: {currentAspect.title.split(".")[0]}]</span>
                <span className="font-mono text-[9px] text-[#1A1A1A]/60 uppercase font-bold text-right">ESTÚDIO OBRERO MANUAL</span>
              </div>
              <h4 className="font-mono text-base font-extrabold text-[#1A1A1A] uppercase tracking-tight">{currentAspect.title}</h4>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                {currentAspect.description}
              </p>

              {/* Sub metrics render */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {currentAspect.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white p-4 border-2 border-[#1A1A1A] rounded-none space-y-3 shadow-[2px_2px_0px_#1A1A1A]">
                    <div className="flex justify-between items-center pb-1.5 border-b border-[#1A1A1A]/10">
                      <span className="font-mono text-[10px] text-[#1A1A1A] font-bold">{m.title}</span>
                      <span className="font-mono text-[9px] text-white font-bold bg-[#FF4D00] px-1.5 py-0.5 rounded-none">{m.impactLabel}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#1A1A1A]/50 block uppercase">No Gordian Framer:</span>
                      <p className="text-[11px] text-[#1A1A1A] mt-0.5 font-sans leading-relaxed">{m.gordianValue}</p>
                    </div>
                    <div className="pt-1.5 border-t border-[#1A1A1A]/5">
                      <span className="font-mono text-[9px] text-[#FF4D00] block uppercase font-bold">No Estúdio Obrero:</span>
                      <p className="text-[11px] text-[#1A1A1A] mt-0.5 font-semibold font-sans leading-relaxed">{m.translationToObrero}</p>
                    </div>
                    
                    {/* Visual Meter bar */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[8.5px] font-mono text-[#1A1A1A]/50 uppercase">
                        <span>Peso do Critério</span>
                        <span>{m.visualPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-200 rounded-none overflow-hidden">
                        <div className="h-full bg-[#FF4D00]" style={{ width: `${m.visualPercent}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
