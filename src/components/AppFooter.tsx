import React from "react";
import { Terminal, Cpu, Building, Heart, Github } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t-2 border-[#1A1A1A] mt-16 px-6 md:px-12 py-12 font-mono text-[10px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left">
        
        {/* Left Info columns */}
        <div className="space-y-2">
          <h4 className="text-[#FF4D00] font-black tracking-tighter text-sm uppercase">obrero.</h4>
          <p className="leading-relaxed text-zinc-350 text-[11px] font-sans">
            Estúdio independente focado na desconstrução de templates genéricos e na fabricação de arquiteturas digitais robustas, de alta performance e apelo estético impecável.
          </p>
        </div>

        {/* Center credits info columns */}
        <div className="space-y-2 md:text-center text-[10.5px]">
          <p className="flex items-center md:justify-center gap-1.5 text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-[#FF4D00]" />
            Empilhado com React 19 + Tailwind + p5.js
          </p>
          <p className="text-zinc-400 font-sans">
            Análise Visual inspirada no template <span className="text-white underline cursor-pointer">Gordian Portfolio</span> parceiro da Framer.
          </p>
        </div>

        {/* Right licensing & contacts column */}
        <div className="space-y-1 md:text-right">
          <p className="text-[#FF4D00] font-bold text-xs uppercase tracking-wider">[CONTATO & LABOR]</p>
          <p className="text-white text-xs font-bold font-mono">contato@estudioobrero.com</p>
          <p className="text-[9px] text-zinc-500 font-sans">© {new Date().getFullYear()} Obrero Studio. Todos os direitos reservados de código.</p>
        </div>

      </div>
    </footer>
  );
}
