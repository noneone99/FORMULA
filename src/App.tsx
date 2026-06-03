import React, { useState, useRef } from "react";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import GordianAnalysis from "./components/GordianAnalysis";
import ServiceClasses from "./components/ServiceClasses";
import PatcherCanvas from "./components/PatcherCanvas";
import ObreroCalculator from "./components/Calculator";
import ProposalViewer from "./components/ProposalViewer";
import { ObreroManifesto } from "./data";
import { CalculatedInvoice, CalculatorInput, ServiceClass } from "./types";
import { 
  Building, 
  ChevronDown, 
  Terminal, 
  Award, 
  HelpCircle, 
  ExternalLink,
  CheckCircle,
  FileText,
  MousePointer,
  Sparkles
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("manifesto");
  
  // Cross-component states
  const [activeClassPreset, setActiveClassPreset] = useState<ServiceClass | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Proposal synced states
  const [syncedInvoice, setSyncedInvoice] = useState<CalculatedInvoice>({
    baseHours: 40,
    designerHours: 12,
    developerHours: 28,
    cmsIntegrationCost: 0,
    p5Cost: 0,
    complexityMultiplier: 1.0,
    subtotal: 3200,
    urgencyFee: 0,
    maintenanceCost: 0,
    totalPrice: 3200,
    hourlyAverage: 120
  });

  const [syncedInput, setSyncedInput] = useState<CalculatorInput>({
    pagesCount: 1,
    cmsRequired: false,
    p5InteractiveComplexity: "none",
    designComplexity: "standard",
    urgentDelivery: false,
    maintenanceMonths: 0
  });

  const [selectedClass, setSelectedClass] = useState<ServiceClass | null>({
    id: "cl-01",
    code: "CLASS-01",
    title: "Lander de Alta Conversão",
    description: "Micro-arquitetura de uma única página para impacto imediato e máxima velocidade.",
    detailedDescription: "Desenvolvida com HTML/CSS sintético extremamente otimizado ou React limpo.",
    stack: ["HTML5", "CSS3 / Tailwind", "JS Vanilla", "React Lite"],
    basePrice: 3200,
    deliveryDays: 8,
    idealFor: "Lançamento de produtos, portfólios individuais objetivos.",
    features: ["Layout Responsivo", "Animações motion", "Otimização PageSpeed"],
    proportions: { uxUi: 30, development: 50, optimization: 15, animation: 5 }
  });

  // Action to change active section with browser animation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId === "manifesto" ? "manifesto-hero-intro" : `${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Callback when user selects a model category card to simulate
  const handleSelectPresetClassOfService = (cls: ServiceClass) => {
    setActiveClassPreset(cls);
    setSelectedClass(cls);
    
    // Auto populate synced states
    setSyncedInput({
      pagesCount: cls.id === "cl-01" ? 1 : cls.id === "cl-02" ? 5 : cls.id === "cl-03" ? 8 : 1,
      cmsRequired: cls.id === "cl-03",
      p5InteractiveComplexity: cls.id === "cl-04" ? "immersive" : "none",
      designComplexity: "standard",
      urgentDelivery: false,
      maintenanceMonths: 0
    });

    setSyncedInvoice({
      baseHours: Math.round(cls.basePrice / 120),
      designerHours: Math.round((cls.basePrice / 120) * (cls.proportions.uxUi / 100)),
      developerHours: Math.round((cls.basePrice / 120) * ((cls.proportions.development + cls.proportions.animation) / 100)),
      cmsIntegrationCost: 0,
      p5Cost: cls.id === "cl-04" ? 3800 : 0,
      complexityMultiplier: 1.0,
      subtotal: cls.basePrice,
      urgencyFee: 0,
      maintenanceCost: 0,
      totalPrice: cls.basePrice,
      hourlyAverage: 120
    });

    // Fire toast
    showToast(`Preset "${cls.title}" carregado com sucesso na calculadora!`);
    
    // Scroll to calculator
    setTimeout(() => {
      const calcElement = document.getElementById("calculator-section");
      if (calcElement) {
        calcElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  };

  // Callback when user clicks "Prosseguir com este Escopo" in the Calculator
  const handleAddProposalFromInvoice = (
    invoice: CalculatedInvoice, 
    input: CalculatorInput, 
    baseClass: ServiceClass | null
  ) => {
    setSyncedInvoice(invoice);
    setSyncedInput(input);
    setSelectedClass(baseClass);
    
    showToast(`Escopo consolidado! Proposta comercial gerada com sucesso.`);
    
    // Scroll to proposal viewer
    setTimeout(() => {
      const propElement = document.getElementById("proposal-generator-container");
      if (propElement) {
        propElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const showToast = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans selection:bg-[#FF4D00] selection:text-white border-[12px] border-[#1A1A1A] relative">
      
      {/* Header and Floating navigation controllers */}
      <AppHeader activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Main Single-Screen presentation content */}
      <main className="max-w-7xl mx-auto px-5 md:px-12 py-12 space-y-16">
        
        {/* Animated Banner notifications */}
        {alertMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#FF4D00] text-white font-mono text-xs font-bold px-5 py-4 rounded-none border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {alertMessage}
          </div>
        )}

        {/* 1. Hero / Manifesto / Portfolio Manifesto Section */}
        <section id="manifesto-hero-intro" className="relative pt-6 pb-8 border-b-2 border-[#1A1A1A]">
          
          {/* Main heading typography layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            <div className="lg:col-span-8 space-y-6 flex flex-col justify-center">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] bg-[#1A1A1A] text-[#FF4D00] px-2.5 py-1 font-bold uppercase tracking-wider">
                  Estúdio Digital Ativo
                </span>
                <span className="font-mono text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest font-bold">
                  BRUTALIST GRAPHICS & CÓDIGO CRU // EST. 2024
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black text-[#1A1A1A] leading-[0.85] tracking-tight uppercase italic">
                  OBRERO <span className="text-[#FF4D00]">STUDIO</span>
                </h1>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-[1.0] tracking-tighter uppercase">
                  SITES NÃO CONTAM HISTÓRIAS, CONSTRUEM PAREDES DIGITAIS.
                </h2>
                <p className="font-mono text-[#1A1A1A]/70 text-xs tracking-wide">
                  [RETRATO]: Proposta de Negócio para o Estúdio <span className="text-[#FF4D00] font-bold">Obrero</span> baseada em React, p5.js, Micro-páginação e CMS Dinâmico.
                </p>
              </div>

              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans max-w-2xl">
                {ObreroManifesto.philosophy}
              </p>

              {/* Action buttons triggers */}
              <div className="flex flex-wrap gap-4 pt-2 font-mono text-[11px]">
                <button 
                  onClick={() => handleNavigate("classes")} 
                  id="hero-btn-classes"
                  className="px-5 py-3 bg-[#FF4D00] text-white font-bold border-2 border-[#1A1A1A] hover:bg-[#e44500] hover:translate-x-[2px] hover:-translate-y-[2px] transition-all text-left uppercase tracking-wider shadow-[4px_4px_0px_#1A1A1A] flex items-center gap-1.5"
                >
                  Ver Nossas Classes de Sites
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleNavigate("calculator")} 
                  id="hero-btn-calculator"
                  className="px-5 py-3 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all uppercase tracking-wider"
                >
                  Acessar Calculadora de Grade
                </button>
              </div>
            </div>

            {/* Industrial info grid boxes (4 columns) */}
            <div className="lg:col-span-4 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] p-6 flex flex-col justify-between shadow-[6px_6px_0px_#FF4D00]">
              <span className="font-mono text-[9px] text-[#FF4D00] font-bold uppercase tracking-widest block pb-4 border-b border-[#FAF9F6]/20">
                [OBRERO ATRIBUTOS CORE]
              </span>
              
              <div className="space-y-5 font-mono text-xs text-left py-4">
                {[
                  { id: "[01]", label: "CMS Autônomo Injetável", desc: "Banco de dados estruturado permitindo ao cliente gerenciar coleções no ar." },
                  { id: "[02]", label: "Matemática p5.js Aplicada", desc: "Intervênção artística paramétrica no cursor dando vida ao design." },
                  { id: "[03]", label: "Rigidez do Grid Gordian", desc: "Uso drástico de espaçamentos tipográficos, pesos, contrastes e cercas 1px." }
                ].map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                       <span className="text-[#FF4D00] font-bold text-[10px]">{item.id}</span>
                       <h5 className="font-bold text-white uppercase tracking-tight">{item.label}</h5>
                    </div>
                    <p className="text-[10.5px] text-[#FAF9F6]/75 font-sans leading-relaxed pl-5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#FAF9F6]/10 text-right">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Estúdio de Construção</span>
              </div>
            </div>
          </div>

          {/* Pillars explanation boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-6">
            {ObreroManifesto.pillars.map((p, idx) => (
              <div key={idx} className="bg-white border-2 border-[#1A1A1A] border-l-8 border-l-[#FF4D00] p-5 space-y-2 text-left shadow-[4px_4px_0px_rgba(26,26,26,0.05)]">
                <span className="font-mono text-[10px] text-[#FF4D00] font-black uppercase block">Pilar 0{idx + 1}</span>
                <h4 className="font-mono font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">{p.title}</h4>
                <p className="text-[12px] text-[#1A1A1A]/80 leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Proportions Analysis section */}
        <section id="analysis-section" className="pt-4">
          <GordianAnalysis />
        </section>

        {/* 3. Core Service tiers offering catalog */}
        <section id="classes-section" className="pt-4">
          <ServiceClasses onSelectClass={handleSelectPresetClassOfService} />
        </section>

        {/* 4. Creative Coding Live Sandbox (p5.js preview) */}
        <section id="p5js-section" className="space-y-6 pt-4 text-left">
          <div className="pb-2 border-b-2 border-[#1A1A1A]">
            <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[DEMONSTRADOR P5.JS]</span>
            <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mt-0.5 font-mono uppercase">
              O Ponto de Expressão p5.js
            </h3>
            <p className="text-xs text-[#1A1A1A]/85 mt-1 max-w-2xl">
              Nossos sites não utilizam mídias pesadas ou animações pré-renderizadas desnecessárias em MP4. Programamos mecânicas ricas de partículas diretamente na GPU com funções senoidais e detecção de cursor vetorial. Altere as variáveis físicas para testar.
            </p>
          </div>
          
          <PatcherCanvas />
        </section>

        {/* 5. Pricing calculator section */}
        <section id="calculator-section" className="pt-4 text-left">
          <div className="pb-2 border-b-2 border-[#1A1A1A] mb-6">
            <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[SISTEMA OPERACIONAL FINANCEIRO]</span>
            <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mt-0.5 font-mono uppercase">
              Engrenagem de Custos & Prazos
            </h3>
          </div>

          <ObreroCalculator onAddProposal={handleAddProposalFromInvoice} />
        </section>

        {/* 6. Formal Printable/copyable commercial proposal document compilation */}
        <section id="proposal-section" className="pt-4 text-left">
          <div className="pb-2 border-b-2 border-[#1A1A1A] mb-6">
            <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[PROPOSTA FINAL]</span>
            <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mt-0.5 font-mono uppercase">
              Contratos & Acordo Tecnológico
            </h3>
          </div>

          <ProposalViewer 
            calculatedInvoice={syncedInvoice}
            calculatorInput={syncedInput}
            selectedClass={selectedClass}
          />
        </section>

      </main>

      {/* Styled Footer */}
      <AppFooter />
    </div>
  );
}
