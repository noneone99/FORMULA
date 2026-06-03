import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  Layers, 
  Database, 
  Cpu, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  Check, 
  HelpCircle, 
  User, 
  DollarSign,
  AlertCircle
} from "lucide-react";
import { CalculatedInvoice, CalculatorInput, ServiceClass } from "../types";
import { ObreroServiceClasses, PricingCoefficients } from "../data";

interface CalculatorProps {
  onAddProposal: (invoice: CalculatedInvoice, input: CalculatorInput, baseClass: ServiceClass | null) => void;
}

export default function ObreroCalculator({ onAddProposal }: CalculatorProps) {
  // Calculator Form State
  const [selectedClassId, setSelectedClassId] = useState<string>("cl-01");
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [cmsRequired, setCmsRequired] = useState<boolean>(false);
  const [p5InteractiveComplexity, setP5InteractiveComplexity] = useState<"none" | "subtle" | "immersive">("none");
  const [designComplexity, setDesignComplexity] = useState<"minimalist" | "standard" | "ultra_premium">("standard");
  const [urgentDelivery, setUrgentDelivery] = useState<boolean>(false);
  const [maintenanceMonths, setMaintenanceMonths] = useState<number>(0);

  // Output calculated values
  const [invoice, setInvoice] = useState<CalculatedInvoice>({
    baseHours: 0,
    designerHours: 0,
    developerHours: 0,
    cmsIntegrationCost: 0,
    p5Cost: 0,
    complexityMultiplier: 1.0,
    subtotal: 0,
    urgencyFee: 0,
    maintenanceCost: 0,
    totalPrice: 0,
    hourlyAverage: 120
  });

  const [deliveryDaysProjected, setDeliveryDaysProjected] = useState<number>(8);

  // Sync state helpers when shifting pre-defined classes
  const handleSelectClass = (cls: ServiceClass) => {
    setSelectedClassId(cls.id);
    
    // Auto-adjust parameters depending on the selected Obrero Class
    if (cls.id === "cl-01") {
      setPagesCount(1);
      setCmsRequired(false);
      setP5InteractiveComplexity("none");
    } else if (cls.id === "cl-02") {
      setPagesCount(5);
      setCmsRequired(false);
      setP5InteractiveComplexity("none");
    } else if (cls.id === "cl-03") {
      setPagesCount(8);
      setCmsRequired(true);
      setP5InteractiveComplexity("none");
    } else if (cls.id === "cl-04") {
      setPagesCount(1);
      setCmsRequired(false);
      setP5InteractiveComplexity("immersive");
    }
  };

  // Perform invoice mechanics
  useEffect(() => {
    // 1. Base Prices & hours derived from inputs
    // Identify base tier
    const activeClass = ObreroServiceClasses.find(c => c.id === selectedClassId) || ObreroServiceClasses[0];
    
    let basePriceValue = activeClass.basePrice;
    let baseHoursNeeded = Math.round(basePriceValue / PricingCoefficients.hourlyRateBRL);

    // 2. Extra Pages Cost
    // Find expected default pages for tiers
    const defaultPages = selectedClassId === "cl-01" ? 1 : selectedClassId === "cl-02" ? 5 : selectedClassId === "cl-03" ? 8 : 1;
    const extraPages = Math.max(0, pagesCount - defaultPages);
    const extraPagesCost = extraPages * PricingCoefficients.pricePerPage;

    // 3. CMS Extra
    let cmsCost = 0;
    // If user toggles CMS but class was NOT natively CLASS-03 (CMS integration)
    if (cmsRequired && selectedClassId !== "cl-03") {
      cmsCost = basePriceValue * (PricingCoefficients.cmsIntegrationMultiplier - 1);
    }

    // 4. p5.js Extra
    let p5Cost = 0;
    // If user requests specialized p5.js canvas, but it wasn't CLASS-04 natively, adding it.
    if (selectedClassId !== "cl-04") {
      p5Cost = PricingCoefficients.p5ComplexityExtra[p5InteractiveComplexity];
    } else {
      // If natively CLASS-04, but user selects "none" or "subtle", decrease or keep
      if (p5InteractiveComplexity === "none") {
        p5Cost = -1500; // negative offset for simplification
      } else if (p5InteractiveComplexity === "subtle") {
        p5Cost = -500;
      }
    }

    // 5. Design Complexity Multipliers
    const layoutMultiplier = PricingCoefficients.designComplexityFactor[designComplexity];

    // Compute Subtotal
    let rawSubtotal = (basePriceValue + extraPagesCost + cmsCost + p5Cost) * layoutMultiplier;
    if (rawSubtotal < 2500) rawSubtotal = 2500; // Absolute minimum craft cap

    // 6. Support & Maintenance Monthly
    const monthlyMaintRate = 450; // Special client rate
    const maintenanceTotal = maintenanceMonths * monthlyMaintRate;

    // 7. Urgency Scheduling Core (30% increase)
    const urgencyCost = urgentDelivery ? rawSubtotal * (PricingCoefficients.urgencyMultiplier - 1) : 0;

    // Final calculations
    const finalTotal = rawSubtotal + urgencyCost + maintenanceTotal;
    
    // Hours distribution based on class properties
    const activeProps = activeClass.proportions;
    const computedTotalHours = Math.round(rawSubtotal / PricingCoefficients.hourlyRateBRL);
    const designerHours = Math.round(computedTotalHours * (activeProps.uxUi / 100));
    const developerHours = Math.round(computedTotalHours * ((activeProps.development + activeProps.animation) / 100));

    setInvoice({
      baseHours: computedTotalHours,
      designerHours,
      developerHours,
      cmsIntegrationCost: Math.round(cmsCost),
      p5Cost: Math.round(p5Cost),
      complexityMultiplier: layoutMultiplier,
      subtotal: Math.round(rawSubtotal),
      urgencyFee: Math.round(urgencyCost),
      maintenanceCost: maintenanceTotal,
      totalPrice: Math.round(finalTotal),
      hourlyAverage: PricingCoefficients.hourlyRateBRL
    });

    // 8. Timelines calculations (Business Days)
    let baseDays = activeClass.deliveryDays;
    // Add extra pages days
    baseDays += Math.ceil(extraPages * 1.2);
    // Add CMS integration scale
    if (cmsRequired && selectedClassId !== "cl-03") baseDays += 5;
    // Add p5.js setup scale
    if (p5InteractiveComplexity === "subtle") baseDays += 2;
    if (p5InteractiveComplexity === "immersive" && selectedClassId !== "cl-04") baseDays += 6;

    // Apply urgency reduction
    if (urgentDelivery) {
      baseDays = Math.max(4, Math.ceil(baseDays * 0.55)); // 45% faster delivery
    }

    setDeliveryDaysProjected(baseDays);

  }, [selectedClassId, pagesCount, cmsRequired, p5InteractiveComplexity, designComplexity, urgentDelivery, maintenanceMonths]);

  // Current active class reference
  const currentClassObj = ObreroServiceClasses.find(c => c.id === selectedClassId) || null;

  const handlePushToProposal = () => {
    onAddProposal(invoice, {
      pagesCount,
      cmsRequired,
      p5InteractiveComplexity,
      designComplexity,
      urgentDelivery,
      maintenanceMonths
    }, currentClassObj);
  };

  return (
    <div id="calculator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch my-8">
      {/* Configuration column (7 columns) */}
      <div className="lg:col-span-7 bg-white border-2 border-[#1A1A1A] p-6 rounded-none space-y-6 shadow-[5px_5px_0px_#1A1A1A]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-[#FF4D00]" />
            <h3 className="font-mono text-xs font-extrabold text-[#1A1A1A] uppercase tracking-widest">Calculadora de Grade e Obra</h3>
          </div>
          <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
            Ajuste os parâmetros estruturais para ver a distribuição de horas exigida, os esforços de programação criativa com p5.js e o custo de produção do Obrero.
          </p>
        </div>

        {/* Action Tiers Selector */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest block font-black">
            Classe Base de Arquitetura
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ObreroServiceClasses.map((cls) => {
              const isSelected = selectedClassId === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => handleSelectClass(cls)}
                  className={`p-3 text-left border-2 rounded-none transition-all flex flex-col justify-between h-24 cursor-pointer ${
                    isSelected 
                      ? "bg-[#FF4D00]/10 border-[#1A1A1A] text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] font-bold" 
                      : "bg-[#FAF9F6] border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/70"
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#FF4D00] block font-extrabold">{cls.code}</span>
                  <div>
                    <h5 className="text-[11px] font-black tracking-tight text-[#1A1A1A] leading-tight truncate uppercase font-mono">{cls.title.split(" - ")[0]}</h5>
                    <span className="font-mono text-[9.5px] text-[#1A1A1A]/80 mt-1 block font-bold">R$ {cls.basePrice.toLocaleString("pt-BR")}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Slider control */}
        <div className="space-y-2 bg-[#FAF9F6] p-4 rounded-none border-2 border-[#1A1A1A]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#1A1A1A]/65" />
              <span className="font-mono text-[10px] text-[#1A1A1A]/70 uppercase tracking-widest font-black">Quantidade de Páginas</span>
            </div>
            <span className="font-mono text-sm font-bold text-[#FF4D00]">{pagesCount} {pagesCount === 1 ? "PÁGINA" : "PÁGINAS"}</span>
          </div>
          <input 
            type="range"
            min={1}
            max={20}
            step={1}
            value={pagesCount}
            onChange={(e) => setPagesCount(parseInt(e.target.value))}
            className="w-full accent-[#FF4D00] bg-zinc-250 h-1.5 rounded-none cursor-pointer"
          />
          <span className="text-[9.5px] text-[#1A1A1A]/60 block leading-relaxed font-sans">
            Classe base inclui até {selectedClassId === "cl-01" ? 1 : selectedClassId === "cl-02" ? 5 : selectedClassId === "cl-03" ? 8 : 1} páginas. R$ {PricingCoefficients.pricePerPage} cada página incremental.
          </span>
        </div>

        {/* Double checkbox controllers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CMS Integration */}
          <div className={`p-4 rounded-none border-2 transition-all flex flex-col justify-between ${
            cmsRequired ? "bg-[#FF4D00]/10 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]" : "bg-[#FAF9F6] border-[#1A1A1A]/10"
          }`}>
            <div className="flex items-start gap-3">
              <input 
                id="chk-cms"
                type="checkbox"
                checked={cmsRequired}
                onChange={(e) => setCmsRequired(e.target.checked)}
                className="w-4 h-4 text-[#FF4D00] bg-white border-2 border-[#1A1A1A] rounded-none focus:ring-[#FF4D00] mt-0.5 accent-[#FF4D00] cursor-pointer"
              />
              <div>
                <label htmlFor="chk-cms" className="font-mono text-xs font-extrabold text-[#1A1A1A] cursor-pointer flex items-center gap-1.5 uppercase">
                  <Database className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
                  Sistema CMS
                </label>
                <p className="text-[10px] text-[#1A1A1A]/70 mt-1 leading-relaxed font-sans">
                  Painel de atualização autônoma pelo próprio cliente para posts, mídias e listas dinâmicas.
                </p>
              </div>
            </div>
            {cmsRequired && selectedClassId !== "cl-03" && (
              <span className="font-mono text-[9.5px] text-[#FF4D00] mt-2 block text-right font-black">
                +35% na Arquitetura
              </span>
            )}
          </div>

          {/* p5.js animation complexity */}
          <div className="p-4 rounded-none border-2 border-[#1A1A1A]/10 bg-[#FAF9F6] flex flex-col justify-between">
            <div className="space-y-2">
              <label className="font-mono text-xs font-black text-[#1A1A1A] flex items-center gap-1.5 uppercase">
                <Cpu className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
                Interatividade p5.js
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "none", label: "Nativa" },
                  { id: "subtle", label: "Fundo" },
                  { id: "immersive", label: "Total" }
                ].map((pt) => {
                  const isActive = p5InteractiveComplexity === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setP5InteractiveComplexity(pt.id as "none" | "subtle" | "immersive")}
                      className={`py-1 text-[9px] font-mono rounded-none transition-all border-2 cursor-pointer ${
                        isActive 
                          ? "bg-[#FF4D00] border-[#1A1A1A] text-white font-black shadow-[1px_1px_0px_#1A1A1A]" 
                          : "bg-white border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:bg-[#1A1A1A] hover:text-white"
                      }`}
                    >
                      {pt.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <p className="text-[10px] text-[#1A1A1A]/60 mt-2 leading-tight font-sans">
              {p5InteractiveComplexity === "none" && "Sem p5.js adicional."}
              {p5InteractiveComplexity === "subtle" && "Fundo interativo abstrato gerado dinamicamente (+R$ 1.500)."}
              {p5InteractiveComplexity === "immersive" && "Sandbox completo com interações físicas e controles do usuário (+R$ 3.800)."}
            </p>
          </div>
        </div>

        {/* Design refinement and support level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Design complexity scale */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest font-black block">
              Direção de Arte & Refinamento
            </label>
            <div className="grid grid-cols-3 gap-1 col-span-3">
              {[
                { id: "minimalist", label: "Direto (0.9x)" },
                { id: "standard", label: "Padrão (1.0x)" },
                { id: "ultra_premium", label: "Estátuas (1.25x)" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDesignComplexity(opt.id as any)}
                  className={`py-1.5 px-0.5 text-[9px] font-mono border-2 rounded-none transition-all cursor-pointer font-bold ${
                    designComplexity === opt.id 
                      ? "bg-[#FF4D00] border-[#1A1A1A] text-white" 
                      : "bg-[#FAF9F6] border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:bg-[#1A1A1A] hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <span className="text-[9px] text-[#1A1A1A]/60 leading-tight block font-sans">
              {designComplexity === "minimalist" && "Estilo direto e focado no texto limpo."}
              {designComplexity === "standard" && "Análise completa das proporções do Gordian."}
              {designComplexity === "ultra_premium" && "Direção de arte customizada com grids artesanais altamente complexos."}
            </span>
          </div>

          {/* Maintenance packages */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest block font-black">
              Suporte Técnico Mensal
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: "Nenhum", val: 0 },
                { label: "3 m", val: 3 },
                { label: "6 m", val: 6 },
                { label: "1 ano", val: 12 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setMaintenanceMonths(opt.val)}
                  className={`py-1.5 text-[9px] font-mono border-2 rounded-none transition-all cursor-pointer font-bold ${
                    maintenanceMonths === opt.val 
                      ? "bg-[#FF4D00] border-[#1A1A1A] text-white" 
                      : "bg-[#FAF9F6] border-[#1A1A1A]/15 text-[#1A1A1A]/60 hover:bg-[#1A1A1A] hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <span className="text-[9px] text-[#1A1A1A]/60 leading-tight block font-sans">
              Garagens semanais. {maintenanceMonths > 0 ? `R$ ${(maintenanceMonths * 450).toLocaleString("pt-BR")} inclusos contratualmente` : "Sem suporte recorrente."}
            </span>
          </div>
        </div>

        {/* Urgency Delivery schedule toggle */}
        <div className={`p-4 rounded-none border-2 transition-all flex items-center justify-between ${
          urgentDelivery ? "bg-[#FF4D00]/10 border-[#1A1A1A] shadow-[2px_2px_0px_#FF4D00]" : "border-[#1A1A1A]/10 bg-[#FAF9F6]"
        }`}>
          <div className="flex items-center gap-2.5 text-left">
            <input 
              id="chk-urgency"
              type="checkbox"
              checked={urgentDelivery}
              onChange={(e) => setUrgentDelivery(e.target.checked)}
              className="w-4 h-4 text-red-500 bg-white border-2 border-[#1A1A1A] rounded-none focus:ring-red-500 accent-red-650 cursor-pointer"
            />
            <div>
              <label htmlFor="chk-urgency" className="font-mono text-xs font-black text-[#1A1A1A] cursor-pointer flex items-center gap-1.5 uppercase">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF4D00]" />
                Entrega Extra Rápida (Urgência)
              </label>
              <p className="text-[10px] text-[#1A1A1A]/60Leading-relaxed font-sans">
                Reduz o cronograma de entrega em aproximadamente 45% com dedicação exclusiva do estúdio (+30% no total do projeto).
              </p>
            </div>
          </div>
          {urgentDelivery && (
            <span className="font-mono text-[10px] text-[#FF4D00] font-black block shrink-0 border-2 border-[#1A1A1A] px-2 py-1 bg-white">
              {deliveryDaysProjected} DIAS ÚTEIS
            </span>
          )}
        </div>
      </div>

      {/* Visual Invoice breakdown receipt (5 columns) */}
      <div className="lg:col-span-5 bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-none overflow-hidden flex flex-col h-full sticky top-4 shadow-[6px_6px_0px_#FF4D00] text-white">
        {/* Cost Header */}
        <div className="p-5 border-b-2 border-white/10 bg-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[ORÇAMENTO DE LABOR]</span>
            <span className="font-mono text-[9px] text-white/50 uppercase font-black">OBRERO PROPOSTA</span>
          </div>
          <div className="mt-3 text-left">
            <span className="text-[10px] text-zinc-400 block font-mono">VALOR GLOBAL ESTIMADO</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-mono text-xl font-bold text-[#FF4D00]">R$</span>
              <span className="font-mono text-4xl font-extrabold text-white tracking-tight">
                {invoice.totalPrice.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          {urgentDelivery && (
            <div className="mt-2 text-[10px] text-[#FF4D00] bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] px-2.5 py-1.5 font-mono font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              CRONOGRAMA ACELERADO: {deliveryDaysProjected} DIAS ÚTEIS
            </div>
          )}
        </div>

        {/* Ledger list */}
        <div className="p-5 space-y-4 flex-grow text-left">
          <span className="font-mono text-[9px] text-white/45 uppercase block tracking-widest font-black">Faturamento Detalhado</span>
          
          <div className="space-y-2.5">
            {/* Base block */}
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400 capitalize">Arquitetura Base ({currentClassObj?.code})</span>
              <span className="text-white font-bold">R$ {currentClassObj?.basePrice.toLocaleString("pt-BR")}</span>
            </div>

            {/* Extra pages */}
            {pagesCount > (selectedClassId === "cl-01" ? 1 : selectedClassId === "cl-02" ? 5 : selectedClassId === "cl-03" ? 8 : 1) && (
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Páginas Adicionais ({pagesCount - (selectedClassId === "cl-01" ? 1 : selectedClassId === "cl-02" ? 5 : selectedClassId === "cl-03" ? 8 : 1)} extra)</span>
                <span className="text-white font-bold">R$ {((pagesCount - (selectedClassId === "cl-01" ? 1 : selectedClassId === "cl-02" ? 5 : selectedClassId === "cl-03" ? 8 : 1)) * PricingCoefficients.pricePerPage).toLocaleString("pt-BR")}</span>
              </div>
            )}

            {/* CMS */}
            {invoice.cmsIntegrationCost > 0 && (
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Database & Módulo CMS</span>
                <span className="text-white font-bold">R$ {invoice.cmsIntegrationCost.toLocaleString("pt-BR")}</span>
              </div>
            )}

            {/* P5 */}
            {p5InteractiveComplexity !== "none" && selectedClassId !== "cl-04" && (
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Interações Canvas p5.js</span>
                <span className="text-white font-bold">R$ {invoice.p5Cost.toLocaleString("pt-BR")}</span>
              </div>
            )}

            {/* Design Multiplier */}
            {designComplexity !== "standard" && (
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Fator de Refinamento Estético</span>
                <span className="text-[#FF4D00] font-bold">{designComplexity === "minimalist" ? "0.9x Desconto" : "1.25x Adicional"}</span>
              </div>
            )}

            {/* Support and retention */}
            {maintenanceMonths > 0 && (
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Manutenção ({maintenanceMonths} meses)</span>
                <span className="text-white font-bold">R$ {invoice.maintenanceCost.toLocaleString("pt-BR")}</span>
              </div>
            )}

            {/* Urgency */}
            {urgentDelivery && (
              <div className="flex justify-between text-xs font-mono text-[#FF4D00] font-bold">
                <span>Taxa de Dedicação Exclusiva</span>
                <span>R$ {invoice.urgencyFee.toLocaleString("pt-BR")}</span>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-3 mt-4 space-y-4">
            <div className="flex justify-between text-xs font-mono font-bold text-white uppercase tracking-wider">
              <span>SOMA TOTAL DE LABOR</span>
              <span className="text-[#FF4D00] text-sm font-black">R$ {invoice.totalPrice.toLocaleString("pt-BR")}</span>
            </div>

            {/* Metrical Effort Bar */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest font-black block">Distribuição do Esforço da Obra</span>
              <div className="h-2 w-full bg-white/10 rounded-none overflow-hidden flex">
                <div 
                  className="h-full bg-white" 
                  style={{ width: `${currentClassObj?.proportions.development}%` }}
                  title={`Programação Web: ${currentClassObj?.proportions.development}%`}
                />
                <div 
                  className="h-full bg-[#FF4D00]" 
                  style={{ width: `${currentClassObj?.proportions.uxUi}%` }}
                  title={`UX/UI Proporcional: ${currentClassObj?.proportions.uxUi}%`}
                />
                <div 
                  className="h-full bg-emerald-600" 
                  style={{ width: `${currentClassObj?.proportions.optimization}%` }}
                  title={`Otimização & SEO: ${currentClassObj?.proportions.optimization}%`}
                />
                <div 
                  className="h-full bg-amber-500" 
                  style={{ width: `${currentClassObj?.proportions.animation || 5}%` }}
                  title={`Animação Criativa: ${currentClassObj?.proportions.animation || 5}%`}
                />
              </div>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[8.5px] font-mono text-zinc-400">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-none" />Programação React: {currentClassObj?.proportions.development}%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-none" />Direção Design UX: {currentClassObj?.proportions.uxUi}%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-600 rounded-none" />SEO / Perf: {currentClassObj?.proportions.optimization}%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-none" />Canvas / p5.js: {currentClassObj?.proportions.animation}%</span>
              </div>
            </div>

            {/* Projected Hours info */}
            <div className="bg-white/5 p-3 rounded-none border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF4D00]" />
                <div>
                  <span className="font-mono text-[9px] text-white/50 uppercase tracking-wide block">Horas Estimadas de Obra</span>
                  <span className="font-mono text-[11px] font-bold text-white">
                    ~{invoice.baseHours} horas de trabalho dedicadas
                  </span>
                </div>
              </div>
              <div className="text-right font-mono text-[9px] text-[#FF4D00] font-extrabold">
                R$ 120 / HORA
              </div>
            </div>
            
            {/* Projected Calendar timeline */}
            <div className="bg-white/5 p-3 rounded-none border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF4D00]" />
                <div>
                  <span className="font-mono text-[9px] text-white/50 uppercase tracking-wide block">Cronograma Projetado</span>
                  <span className="font-mono text-[11px] font-bold text-white">
                    Aproximadamente {deliveryDaysProjected} dias úteis
                  </span>
                </div>
              </div>
              <span className="font-[10px] text-[#FF4D00] font-black bg-white px-1.5 py-0.5 rounded-none border border-[#1A1A1A]">
                CL-{(selectedClassId || "cl-01").toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Button to push to final custom proposal */}
        <div className="p-4 bg-[#1A1A1A] border-t-2 border-white/15">
          <button
            onClick={handlePushToProposal}
            id="calc-btn-build-proposal"
            className="w-full bg-[#FF4D00] hover:bg-rose-600 text-white font-mono text-xs font-black py-3.5 px-4 rounded-none border-2 border-white flex items-center justify-center gap-2 tracking-widest transition-all duration-300 uppercase cursor-pointer shadow-[2px_2px_0px_white]"
          >
            Prosseguir com este Escopo
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
