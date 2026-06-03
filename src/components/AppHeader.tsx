import React, { useEffect, useState } from "react";
import { Hammer, Terminal, Clock, AppWindow } from "lucide-react";

interface AppHeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function AppHeader({ activeSection, setActiveSection }: AppHeaderProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "manifesto", label: "01. Manifesto" },
    { id: "analysis", label: "02. Proporções DNA" },
    { id: "classes", label: "03. Classes de Site" },
    { id: "p5js", label: "04. Módulo p5.js" },
    { id: "calculator", label: "05. Calculadora" },
    { id: "proposal", label: "06. Fechar Proposta" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b-2 border-[#1A1A1A] px-5 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Logo and structural subtitle */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-none">
            <Hammer className="w-4 h-4 text-[#FF4D00]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <h1 className="font-mono text-lg font-black tracking-tighter text-[#1A1A1A] uppercase sm:lowercase">
                obrero<span className="text-[#FF4D00]">.</span>
              </h1>
              <span className="font-mono text-[8px] bg-[#1A1A1A] border border-[#1A1A1A] text-white px-1 sm:inline-block">v1.0.4</span>
            </div>
            <p className="font-mono text-[8.5px] text-[#1A1A1A]/60 uppercase tracking-widest leading-none font-bold">ESTÚDIO DE CONSTRUÇÃO DIGITAL</p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="w-full md:w-auto overflow-x-auto scrollbar-none py-1 md:py-0">
          <ul className="flex space-x-1.5 font-mono text-[10.5px]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    onClick={() => setActiveSection(item.id)}
                    id={`nav-tab-${item.id}`}
                    className={`px-3 py-1.5 rounded-none border-2 transition-all font-bold ${
                      isActive 
                        ? "bg-[#FF4D00] text-white border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]" 
                        : "bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Live physical machine status logs */}
        <div className="hidden lg:flex items-center space-x-4 font-mono text-[9px] text-[#1A1A1A]/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF4D00]" />
            <span className="font-bold text-[#1A1A1A]">{timeStr || "2026-06-03 16:45:45 UTC"}</span>
          </div>
          <span className="text-[#1A1A1A]/30">|</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-[#1A1A1A] font-bold">OBRA: STANDBY</span>
          </div>
        </div>

      </div>
    </header>
  );
}
