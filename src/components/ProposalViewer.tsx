import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Send, 
  Building, 
  User, 
  FileCheck, 
  Calendar, 
  Briefcase,
  Layers,
  Code
} from "lucide-react";
import { CalculatedInvoice, CalculatorInput, ServiceClass } from "../types";

interface ProposalViewerProps {
  calculatedInvoice: CalculatedInvoice;
  calculatorInput: CalculatorInput;
  selectedClass: ServiceClass | null;
}

export default function ProposalViewer({ 
  calculatedInvoice, 
  calculatorInput, 
  selectedClass 
}: ProposalViewerProps) {
  // Client details
  const [clientName, setClientName] = useState<string>("Marllus Bisceglia");
  const [clientCompany, setClientCompany] = useState<string>("Vanguard Digital");
  const [projectTitle, setProjectTitle] = useState<string>("Website Institucional Imersivo");
  const [customNotes, setCustomNotes] = useState<string>(
    "Desenvolver interface baseada na estética suíça com micro-interações fluidas. Integrar sandbox p5.js interativo na página principal para demonstração de portfólio criativo de forma lúdica."
  );
  const [validityDays, setValidityDays] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto compile markdown text for copy actions
  const generateMarkdownProposal = () => {
    const today = new Date().toLocaleDateString("pt-BR");
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);
    const expiryStr = expiryDate.toLocaleDateString("pt-BR");

    return `
# PROPOSTA COMERCIAL: ESTÚDIO OBRERO

**Emitido em:** ${today}  
**Validade da Proposta:** ${validityDays} dias (Até ${expiryStr})  
**Preparado para:** ${clientName} (${clientCompany})  
**Projeto:** ${projectTitle}  

---

## 🛠️ 1. ESCOPO DO PROJETO e CLASSE DIGITAL
O projeto será desenvolvido sob a arquitetura de classe do Estúdio Obrero:

**Classe Principal:** ${selectedClass?.code || "Customizado"} - ${selectedClass?.title || "Arquitetura Customizada"}  
*Páginas Contratadas:* ${calculatorInput.pagesCount} página(s)  
*Gestão de Conteúdo:* ${calculatorInput.cmsRequired ? "Sim (Database & Painel CMS de Administração Inclusos)" : "Não (Conteúdo estático codificado diretamente)"}  
*Interações p5.js:* ${
      calculatorInput.p5InteractiveComplexity === "none" ? "Sem p5.js (Interatividades padrão HTML/CSS)" :
      calculatorInput.p5InteractiveComplexity === "subtle" ? "Fundo abstrato math canvas dinâmico" :
      "Imersão Total (Física de partículas, interações ricas ao mover mouse no canvas)"
    }  
*Refinamento de Arte:* ${
      calculatorInput.designComplexity === "minimalist" ? "Direct Line (Foco em tipografia e texto)" :
      calculatorInput.designComplexity === "standard" ? "Padrão Obrero (Proporções de design Gordian, grids de 1px)" :
      "Nível Obras Premium (Arte direcionada, grids suíços altamente complexos e tipografia avançada)"
    }

### Principais Funcionalidades Inclusas:
${selectedClass?.features.map(f => `- [x] ${f}`).join("\n") || "- [x] Layout responsivo profissional e otimizado\n- [x] Otimização máxima de performance"}
${calculatorInput.cmsRequired ? "- [x] Painel administrativo seguro com logins dedicados\n- [x] Conexão com banco de dados rápido para alimentação dinâmica" : ""}
${calculatorInput.p5InteractiveComplexity !== "none" ? "- [x] Renderização de arte gerada por equações matemáticas em tempo real\n- [x] Controles de depuração criativos" : ""}

---

## 💻 2. PILHA TECNOLÓGICA (TECH STACK)
O projeto receberá matéria-prima digital de ponta, completamente customizada:
${(selectedClass?.stack || ["HTML5", "CSS3", "JavaScript", "React", "Motion"]).map(tech => `- ${tech}`).join("\n")}
${calculatorInput.cmsRequired ? "- Headless CMS / Coleções Estruturadas" : ""}
${calculatorInput.p5InteractiveComplexity !== "none" ? "- p5.js Core Physics Lib" : ""}

---

## ⏱️ 3. CRONOGRAMA, INVESTIMENTO E HORAS ESTIMADAS

### Distribuição Financeira:
- **Esforço Base:** R$ ${calculatedInvoice.subtotal.toLocaleString("pt-BR")}  
${calculatedInvoice.cmsIntegrationCost > 0 ? `- **Módulo CMS Integrado:** R$ ${calculatedInvoice.cmsIntegrationCost.toLocaleString("pt-BR")}` : ""}  
${calculatedInvoice.p5Cost > 0 ? `- **Programação Criativa p5.js:** R$ ${calculatedInvoice.p5Cost.toLocaleString("pt-BR")}` : ""}  
${calculatedInvoice.maintenanceCost > 0 ? `- **Garantia de Manutenção (${calculatorInput.maintenanceMonths} Meses):** R$ ${calculatedInvoice.maintenanceCost.toLocaleString("pt-BR")}` : ""}  
${calculatedInvoice.urgencyFee > 0 ? `- **Taxa Dedicação Exclu siva (Urgência):** R$ ${calculatedInvoice.urgencyFee.toLocaleString("pt-BR")}` : ""}  

**VALOR GLOBAL INVESTIDO: R$ ${calculatedInvoice.totalPrice.toLocaleString("pt-BR")}**  

### Cronograma de Produção:
* **Prazo Estimado:** ${
      selectedClass?.deliveryDays ? `${Math.ceil(selectedClass.deliveryDays * (calculatorInput.urgentDelivery ? 0.55 : 1))} a ${Math.ceil(selectedClass.deliveryDays * (calculatorInput.urgentDelivery ? 0.55 : 1) + 4)} dias úteis` : "A combinar"
    }  
* **Quantidade de Horas Laborais:** ~${calculatedInvoice.baseHours} horas de design e engenharia aplicada.  
* **Urgência para Entrega:** ${calculatorInput.urgentDelivery ? "✓ SOLICITADA (Prioridade Máxima no Pipeline de Code)" : "Não solicitada (Entrega cronograma regular)"}

---

## 📌 4. MARCOS DE PAGAMENTO (SUGESTÃO)
* **Sinal de entrada (Aprovação):** 40% (R$ ${(calculatedInvoice.totalPrice * 0.4).toLocaleString("pt-BR")})  
* **Entrega do protótipo estático (Review):** 30% (R$ ${(calculatedInvoice.totalPrice * 0.3).toLocaleString("pt-BR")})  
* **Entrega final do código (Live):** 30% (R$ ${(calculatedInvoice.totalPrice * 0.3).toLocaleString("pt-BR")})  

**Contato Técnico Estúdio Obrero:**
📧 contato@estudioobrero.com  
💻 obrero.studio  
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownProposal().trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="proposal-generator-container" className="my-8 animate-fadeIn">
      {/* Editor top header */}
      <div className="bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] border-b-0 p-5 rounded-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <span className="font-mono text-[9px] text-[#FF4D00] uppercase tracking-widest font-extrabold">[FASE DE ACORDO]</span>
          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mt-0.5 animate-pulse">
            <FileText className="w-4 h-4 text-[#FF4D00]" />
            Emissor de Proposta Comercial Customizável
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleCopy}
            id="proposal-btn-copy"
            className="p-2 px-4 text-[10.5px] font-mono text-white hover:bg-[#FF4D00] hover:text-white border-2 border-white hover:border-[#1A1A1A] bg-transparent rounded-none flex items-center gap-1.5 font-bold cursor-pointer transition-all uppercase"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#FF4D00]" />
                Copiar Markdown
              </>
            )}
          </button>
          
          <button 
            onClick={handlePrint}
            id="proposal-btn-print"
            className="p-2 px-4 text-[10.5px] font-mono text-white hover:bg-[#FF4D00] hover:text-white border-2 border-white hover:border-[#1A1A1A] bg-transparent rounded-none flex items-center gap-1.5 font-bold cursor-pointer transition-all uppercase"
          >
            <Printer className="w-3.5 h-3.5 text-[#FF4D00]" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Grid container splitting Input configuration & Visual printed Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
        
        {/* Editor sidebar inputs (4 columns) */}
        <div className="lg:col-span-4 p-5 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-[#1A1A1A] space-y-4 text-left">
          <span className="font-mono text-[9.5px] text-[#1A1A1A]/50 uppercase block font-black tracking-widest">[DADOS DO CLIENTE]</span>
          
          {/* Client Name */}
          <div className="space-y-1">
            <label className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase block">Nome do Cliente</label>
            <div className="relative">
              <User className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#1A1A1A]/50" />
              <input 
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex Marllus Bisceglia"
                className="w-full bg-[#FAF9F6] border-2 border-[#1A1A1A] rounded-none py-2 pl-8 pr-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF4D00] font-sans font-medium"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase block">Empresa / Segmento</label>
            <div className="relative">
              <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#1A1A1A]/50" />
              <input 
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="Ex Vanguard Digital"
                className="w-full bg-[#FAF9F6] border-2 border-[#1A1A1A] rounded-none py-2 pl-8 pr-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF4D00] font-sans font-medium"
              />
            </div>
          </div>

          {/* Project Title */}
          <div className="space-y-1">
            <label className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase block">Nome do Projeto</label>
            <div className="relative">
              <Briefcase className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#1A1A1A]/50" />
              <input 
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Ex Website Institucional"
                className="w-full bg-[#FAF9F6] border-2 border-[#1A1A1A] rounded-none py-2 pl-8 pr-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF4D00] font-sans font-medium"
              />
            </div>
          </div>

          {/* Validity Slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase">
              <span>Validade (Dias)</span>
              <span className="text-[#FF4D00] font-extrabold">{validityDays} dias</span>
            </div>
            <input 
              type="range"
              min={5}
              max={30}
              step={5}
              value={validityDays}
              onChange={(e) => setValidityDays(parseInt(e.target.value))}
              className="w-full accent-[#FF4D00] bg-zinc-200 h-1.5 rounded-none cursor-pointer"
            />
          </div>

          {/* Custom Notes / Scopes */}
          <div className="space-y-1">
            <label className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase block">Observações de Escopo</label>
            <textarea 
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              rows={4}
              placeholder="Descreva detalhes específicos urgentes..."
              className="w-full bg-[#FAF9F6] border-2 border-[#1A1A1A] rounded-none p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF4D00] leading-relaxed font-sans font-medium text-left"
            />
          </div>

          {/* Help box */}
          <div className="bg-[#FAF9F6] border-2 border-[#1A1A1A] p-4 rounded-none leading-relaxed text-[11px] text-[#1A1A1A]/90 text-left">
            <p className="font-mono uppercase font-black text-[#FF4D00] flex items-center gap-1 mb-1">
              <FileCheck className="w-3.5 h-3.5" />
              Workflow Obrero
            </p>
            Copie o texto em Markdown estruturado para colar no seu WhatsApp/Email ou imprima em PDF para enviar formalmente. Nosso design de folhas segue o layout da escola minimalista internacional.
          </div>
        </div>

        {/* Printed proposal document layout (8 columns) */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-y-auto max-h-[600px] lg:max-h-[700px] text-left">
          <div className="max-w-xl mx-auto space-y-6 print:max-w-full">
            
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-[#1A1A1A]">
              <div>
                <h1 className="font-mono text-2xl font-black tracking-tight text-[#1A1A1A]">obrero<span className="text-[#FF4D00]">.</span></h1>
                <p className="font-mono text-[9px] text-[#1A1A1A]/70 uppercase font-black tracking-widest mt-0.5">ESTÚDIO DE ARQUITETURA WEB E DESIGN BRUT</p>
              </div>
              <div className="text-left sm:text-right mt-3 sm:mt-0 font-mono text-[10px] text-[#1A1A1A]/80 space-y-0.5">
                <p><span className="text-[#1A1A1A]/40 font-bold uppercase">ID DA OBRA:</span> OB-{Math.floor(Math.random() * 8000) + 1200}</p>
                <p><span className="text-[#1A1A1A]/40 font-bold uppercase">EMISSÃO:</span> {new Date().toLocaleDateString("pt-BR")}</p>
                <p><span className="text-[#1A1A1A]/40 font-bold uppercase">VALIDADE:</span> {validityDays} dias</p>
              </div>
            </div>

            {/* Entity roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                <span className="text-[9px] text-[#1A1A1A]/50 block uppercase font-black mb-1.5">[PROPRIETÁRIO DO PROJETO]</span>
                <p className="font-black text-[#1A1A1A] text-sm uppercase">{clientName}</p>
                <p className="text-[#1A1A1A]/80 font-bold">{clientCompany}</p>
                <p className="text-[10px] text-[#1A1A1A]/70 mt-2 block border-t border-[#1A1A1A]/10 pt-1">Requerimento: {projectTitle}</p>
              </div>
              <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                <span className="text-[9px] text-[#1A1A1A]/50 block uppercase font-black mb-1.5">[FORNECEDOR TECNOLÓGICO]</span>
                <p className="font-black text-[#1A1A1A] text-sm uppercase">Obrero Studio S/A</p>
                <p className="text-[#1A1A1A]/80 font-bold">Estúdio de Código & p5.js</p>
                <p className="text-[10px] text-[#1A1A1A]/70 mt-2 block border-t border-[#1A1A1A]/10 pt-1">contato@estudioobrero.com</p>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-black text-[#1A1A1A] uppercase tracking-widest pb-1.5 border-b-2 border-[#1A1A1A]">
                1. Especificações Técnicas Selecionadas
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-mono">Classe Base</span>
                  <span className="font-mono text-[#1A1A1A] font-black uppercase text-right">
                    {selectedClass ? `${selectedClass.code} - ${selectedClass.title}` : "Customizada"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-mono">Volume de Telas</span>
                  <span className="font-mono text-[#1A1A1A] font-black uppercase text-right">
                    {calculatorInput.pagesCount} {calculatorInput.pagesCount === 1 ? "Página estruturada" : "Páginas funcionais integradas"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-mono">Painel Database CMS</span>
                  <span className="font-mono text-[#1A1A1A] font-black uppercase text-right">
                    {calculatorInput.cmsRequired ? "Incluso (Autonomia total do cliente)" : "Não requisitado"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-mono">Codificação Criativa p5.js</span>
                  <span className="font-mono text-[#1A1A1A] font-black uppercase text-right">
                    {calculatorInput.p5InteractiveComplexity === "none" && "Sem Canvas p5"}
                    {calculatorInput.p5InteractiveComplexity === "subtle" && "Abstrato Paramétrico"}
                    {calculatorInput.p5InteractiveComplexity === "immersive" && "Sandbox Interativo Total"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1A1A1A]/10">
                  <span className="text-[#1A1A1A]/60 font-mono">Direção de Arte</span>
                  <span className="font-mono text-[#1A1A1A] font-black uppercase text-right">
                    {calculatorInput.designComplexity === "minimalist" && "Estilo Direto Suíço (0.9x)"}
                    {calculatorInput.designComplexity === "standard" && "Clássico Obrero (1.0x)"}
                    {calculatorInput.designComplexity === "ultra_premium" && "Estátuas Premium (1.25x)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Notes Section */}
            {customNotes.trim() && (
              <div className="space-y-1.5 p-4 bg-white border-2 border-[#1A1A1A] rounded-none">
                <span className="font-mono text-[9px] text-[#FF4D00] uppercase block tracking-widest font-black">[NOTAS ADICIONAIS DE ARQUITETURA]</span>
                <p className="text-xs text-[#1A1A1A]/90 leading-relaxed font-sans italic">
                  "{customNotes}"
                </p>
              </div>
            )}

            {/* Tecnology section */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-black text-[#1A1A1A] uppercase tracking-widest pb-1.5 border-b-2 border-[#1A1A1A]">
                2. Pilha Tecnológica Garantida
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(selectedClass?.stack || ["HTML5", "CSS3", "JavaScript", "React", "Motion"]).map((tech, i) => (
                  <span 
                    key={i} 
                    className="font-mono text-[9.5px] px-2 py-0.5 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] font-bold uppercase rounded-none"
                  >
                    {tech}
                  </span>
                ))}
                {calculatorInput.cmsRequired && (
                  <span className="font-mono text-[9.5px] px-2 py-0.5 border-2 border-[#1A1A1A] bg-[#FF4D00]/10 text-[#FF4D00] font-black uppercase rounded-none">
                    Database CMS Engine
                  </span>
                )}
                {calculatorInput.p5InteractiveComplexity !== "none" && (
                  <span className="font-mono text-[9.5px] px-2 py-0.5 border-2 border-[#1A1A1A] bg-amber-500/10 text-amber-600 font-bold uppercase rounded-none">
                    p5.js Physics Core
                  </span>
                )}
              </div>
            </div>

            {/* Cost Ledger table */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-black text-[#1A1A1A] uppercase tracking-widest pb-1.5 border-b-2 border-[#1A1A1A]">
                3. Orçamento de Horas & Faturamento de Labor
              </h4>
              
              <div className="space-y-2 text-xs">
                {/* Cost lines */}
                <div className="flex justify-between font-mono text-[#1A1A1A]/70">
                  <span>Esforço Estrutural Base ({selectedClass?.code || "Custom"})</span>
                  <span className="font-bold">R$ {(selectedClass?.basePrice || 3000).toLocaleString("pt-BR")},00</span>
                </div>

                {/* Extra pages cost if any */}
                {calculatorInput.pagesCount > (selectedClass?.id === "cl-01" ? 1 : selectedClass?.id === "cl-02" ? 5 : selectedClass?.id === "cl-03" ? 8 : 1) && (
                  <div className="flex justify-between font-mono text-[#1A1A1A]/70">
                    <span>Acréscimo Páginas Extras (x{calculatorInput.pagesCount - (selectedClass?.id === "cl-01" ? 1 : selectedClass?.id === "cl-02" ? 5 : selectedClass?.id === "cl-03" ? 8 : 1)})</span>
                    <span className="font-bold">R$ {((calculatorInput.pagesCount - (selectedClass?.id === "cl-01" ? 1 : selectedClass?.id === "cl-02" ? 5 : selectedClass?.id === "cl-03" ? 8 : 1)) * 500).toLocaleString("pt-BR")},00</span>
                  </div>
                )}

                {/* CMS details cost if any */}
                {calculatedInvoice.cmsIntegrationCost > 0 && (
                  <div className="flex justify-between font-mono text-[#1A1A1A]/70">
                    <span>Integração de Database CMS Autônomo</span>
                    <span className="font-bold">R$ {calculatedInvoice.cmsIntegrationCost.toLocaleString("pt-BR")},00</span>
                  </div>
                )}

                {/* p5 canvas cost if any */}
                {calculatorInput.p5InteractiveComplexity !== "none" && selectedClass?.id !== "cl-04" && (
                  <div className="flex justify-between font-mono text-[#1A1A1A]/70">
                    <span>Módulo p5.js de Física e Canvas</span>
                    <span className="font-bold">R$ {calculatedInvoice.p5Cost.toLocaleString("pt-BR")},00</span>
                  </div>
                )}

                {/* Support contract */}
                {calculatedInvoice.maintenanceCost > 0 && (
                  <div className="flex justify-between font-mono text-[#1A1A1A]/70">
                    <span>Acordo de Retenção e Suporte ({calculatorInput.maintenanceMonths} Meses)</span>
                    <span className="font-bold">R$ {calculatedInvoice.maintenanceCost.toLocaleString("pt-BR")},00</span>
                  </div>
                )}

                {/* Urgencies */}
                {calculatedInvoice.urgencyFee > 0 && (
                  <div className="flex justify-between font-mono text-[#FF4D00] font-black">
                    <span>Taxa Licença Urgência (Dedicação Exclusiva 45%)</span>
                    <span>R$ {calculatedInvoice.urgencyFee.toLocaleString("pt-BR")},00</span>
                  </div>
                )}

                {/* Settle line */}
                <div className="flex justify-between font-mono text-sm font-black text-[#1A1A1A] pt-3 mt-1.5 border-t-2 border-[#1A1A1A]">
                  <span>INVESTIMENTO FINAL CONTRATADO</span>
                  <span className="text-[#FF4D00] font-sans font-black text-lg">
                    R$ {calculatedInvoice.totalPrice.toLocaleString("pt-BR")},00
                  </span>
                </div>
              </div>
            </div>

            {/* Timelines and terms */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-black text-[#1A1A1A] uppercase tracking-widest pb-1.5 border-b-2 border-[#1A1A1A]">
                4. Cronograma de Entrega e Metodologia
              </h4>
              <div className="text-xs text-[#1A1A1A]/80 leading-relaxed space-y-1.5 font-sans">
                <p>
                  * O projeto exige um total de aproximadamente <strong className="text-[#1A1A1A]">{calculatedInvoice.baseHours} horas de labor</strong>.
                </p>
                <p>
                  * O tempo estimado de finalização é de <strong className="text-[#1A1A1A]">{selectedClass?.deliveryDays ? Math.ceil(selectedClass.deliveryDays * (calculatorInput.urgentDelivery ? 0.55 : 1)) : 8} dias úteis</strong> a partir do envio dos textos estruturais e assinatura do acordo.
                </p>
                <p>
                  * Pagamento parcelamento sugerido: <strong>40% entrada, 30% na revisão do protótipo funcional, 30% no deploy live</strong>.
                </p>
              </div>
            </div>

            {/* Industrial footer signature */}
            <div className="pt-8 border-t-2 border-[#1A1A1A] flex justify-between items-center text-[9px] font-mono text-[#1A1A1A]/50 font-bold">
              <p>PROPOSTA PROCESSADA EM VETOR MATEMÁTICO</p>
              <p className="text-right">ESTÚDIO OBRERO © 2026</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
