import React, { useRef, useEffect, useState } from "react";
import { Sliders, RefreshCw, Zap, Maximize2, Sparkles } from "lucide-react";

interface PatcherCanvasProps {
  embeddedMode?: boolean;
}

export default function PatcherCanvas({ embeddedMode = false }: PatcherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generative Art parameters controlled by state
  const [style, setStyle] = useState<"noise" | "gravity" | "constellation">("constellation");
  const [particleCount, setParticleCount] = useState<number>(180);
  const [speed, setSpeed] = useState<number>(1.5);
  const [interactiveRadius, setInteractiveRadius] = useState<number>(150);
  const [colorPalette, setColorPalette] = useState<"industrial" | "cyberpunk" | "monochrome">("industrial");
  const [connectorLineWeight, setConnectorLineWeight] = useState<number>(1);
  const [particleSize, setParticleSize] = useState<number>(3);
  const [gravityPull, setGravityPull] = useState<number>(0.15);
  
  // Stats
  const [fps, setFps] = useState<number>(60);
  const [isClicking, setIsClicking] = useState<boolean>(false);

  // Mouse position ref to avoid re-running useEffect on position state change
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  // Reset or randomize parameters helper
  const handleRandomize = () => {
    setParticleCount(Math.floor(Math.random() * 200) + 80);
    setSpeed(Number((Math.random() * 2.5 + 0.5).toFixed(1)));
    setInteractiveRadius(Math.floor(Math.random() * 150) + 80);
    const styles: Array<"noise" | "gravity" | "constellation"> = ["noise", "gravity", "constellation"];
    setStyle(styles[Math.floor(Math.random() * styles.length)]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    // Resize handler
    const updateSize = () => {
      if (containerRef.current && canvas) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = Math.max(rect.height, embeddedMode ? 350 : 500);
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);

    // Color mapper
    const getColors = (palette: string, alphaFactor = 1) => {
      switch (palette) {
        case "industrial":
          return {
            background: "rgba(10, 10, 11, " + alphaFactor + ")",
            primary: "rgba(229, 193, 88, 1)",      // Industrial yellow-gold #E5C158
            secondary: "rgba(180, 180, 180, 0.4)",  // Muted steel 
            accent: "rgba(235, 94, 85, 0.8)",       // Rust orange
            primaryRaw: [229, 193, 88],
            accentRaw: [235, 94, 85]
          };
        case "cyberpunk":
          return {
            background: "rgba(8, 8, 10, " + alphaFactor + ")",
            primary: "rgba(255, 0, 127, 1)",        // Neon Hot Pink
            secondary: "rgba(0, 240, 255, 0.5)",    // Neon Cyan
            accent: "rgba(180, 0, 255, 0.8)",       // Electric Purple
            primaryRaw: [255, 0, 127],
            accentRaw: [0, 240, 255]
          };
        case "monochrome":
        default:
          return {
            background: "rgba(11, 11, 11, " + alphaFactor + ")",
            primary: "rgba(243, 244, 246, 1)",      // Elegant Off white
            secondary: "rgba(90, 90, 92, 0.3)",     // Dark Grey
            accent: "rgba(255, 255, 255, 0.7)",     // Bright white
            primaryRaw: [243, 244, 246],
            accentRaw: [255, 255, 255]
          };
      }
    };

    // Initialize particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      speed: number;
      baseSize: number;
      hueOffset: number;
    }

    const particles: Particle[] = [];
    const initParticles = () => {
      particles.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.7 + 0.3,
          baseSize: Math.random() * particleSize + 1,
          hueOffset: Math.random() * 40 - 20
        });
      }
    };

    initParticles();

    // Loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const c = getColors(colorPalette);

      // Smooth mouse follow
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Handle transparent background for trail/fade effects
      if (style === "noise") {
        ctx.fillStyle = getColors(colorPalette, 0.08).background; 
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = "#0A0A0B"; // Pitch dark background
        ctx.fillRect(0, 0, w, h);
      }

      // Border guidelines simulating architectural board
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      // Grid cells
      const gridSpacing = 40;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw active interactive radius around mouse if nearby
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactiveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.accentRaw[0]}, ${c.accentRaw[1]}, ${c.accentRaw[2]}, 0.06)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactiveRadius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.primaryRaw[0]}, ${c.primaryRaw[1]}, ${c.primaryRaw[2]}, 0.08)`;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw custom indicators
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillText(`CANVAS ARQUITETURA [P5.JS SIMULATOR]`, 15, h - 35);
      ctx.fillText(`ELEMENTS: ${particles.length} | STYLE: ${style.toUpperCase()} | FORCE: ${speed}x`, 15, h - 20);

      // Render styles
      if (style === "constellation") {
        // Line-based connector
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Physics movement
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          // Boundary bounce
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          // Mouse Gravitational push/pull if active
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < interactiveRadius) {
              const force = (interactiveRadius - dist) / interactiveRadius;
              // Push particles away as cursor acts as a core grid
              p.x -= (dx / dist) * force * 3;
              p.y -= (dy / dist) * force * 3;
            }
          }

          // Draw Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = c.primary;
          ctx.fill();

          // Connective lines (constellations)
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If close, draw line
            if (dist < 85) {
              const alpha = (1 - dist / 85) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${c.primaryRaw[0]}, ${c.primaryRaw[1]}, ${c.primaryRaw[2]}, ${alpha})`;
              ctx.lineWidth = connectorLineWeight;
              ctx.stroke();
            }
          }
        }
      } else if (style === "gravity") {
        // Particles orbit pointing to cursor with connection bands
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Orbit Center
          const cx = mouse.active ? mouse.x : w / 2;
          const cy = mouse.active ? mouse.y : h / 2;

          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Force equations (Gravity simulation)
          const gForce = gravityPull * 4;
          if (dist > 5) {
            // Accelerate towards center
            p.vx += (dx / dist) * gForce;
            p.vy += (dy / dist) * gForce;
          }

          // Friction damping
          p.vx *= 0.94;
          p.vy *= 0.94;

          // Velocity caps
          const maxVel = speed * 4;
          const currentVel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentVel > maxVel) {
            p.vx = (p.vx / currentVel) * maxVel;
            p.vy = (p.vy / currentVel) * maxVel;
          }

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Draw orbital lines (drawing a vector connection to orbit)
          if (dist < interactiveRadius && i % 3 === 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = `rgba(${c.accentRaw[0]}, ${c.accentRaw[1]}, ${c.accentRaw[2]}, ${(1 - dist/interactiveRadius) * 0.12})`;
            ctx.stroke();
          }

          // Render node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = i % 4 === 0 ? c.accent : c.primary;
          ctx.fill();
        }
      } else if (style === "noise") {
        // Noise flow field representation using vector sine fields
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Compute angle based on mathematical coordinate
          const noiseScale = 0.005;
          const pFreqX = p.x * noiseScale;
          const pFreqY = p.y * noiseScale;
          
          // Generative Noise Approximation
          p.angle = Math.sin(pFreqX * Math.PI) * Math.cos(pFreqY * Math.PI) * 4 * Math.PI;

          // If mouse is active, alter flow field around mouse index
          if (mouse.active) {
            const mDx = mouse.x - p.x;
            const mDy = mouse.y - p.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            if (mDist < interactiveRadius) {
              p.angle += (1 - mDist/interactiveRadius) * Math.PI * 1.5;
            }
          }

          // Apply forces
          p.vx += Math.cos(p.angle) * 0.12 * speed;
          p.vy += Math.sin(p.angle) * 0.12 * speed;

          // Friction
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Update
          p.x += p.vx;
          p.y += p.vy;

          // Screen wraps (for flow fields wrap is awesome)
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          // Render trace
          ctx.fillStyle = `rgba(${c.primaryRaw[0]}, ${c.primaryRaw[1]}, ${c.primaryRaw[2]}, 0.8)`;
          ctx.fillRect(p.x, p.y, p.baseSize, p.baseSize);
        }
      }

      // Compute FPS
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [style, particleCount, speed, colorPalette, particleSize, connectorLineWeight, gravityPull, interactiveRadius]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouse = mouseRef.current;
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const mouse = mouseRef.current;
    mouse.targetX = e.touches[0].clientX - rect.left;
    mouse.targetY = e.touches[0].clientY - rect.top;
    mouse.active = true;
  };

  return (
    <div 
      id="p5-demo-module" 
      ref={containerRef}
      className={`relative grid grid-cols-1 ${embeddedMode ? "" : "lg:grid-cols-4"} bg-[#0A0A0B] border border-zinc-800 rounded-sm overflow-hidden`}
    >
      {/* Visual Canvas Block */}
      <div 
        className={`relative ${embeddedMode ? "h-80" : "lg:col-span-3 h-96 lg:h-[500px]"} cursor-crosshair overflow-hidden`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-[#0A0A0B]" />
        
        {/* Floating Metrics */}
        <div className="absolute top-4 left-4 bg-zinc-950/85 border border-zinc-800 px-3 py-1.5 rounded-sm flex items-center space-x-3 pointer-events-none">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">LIVE CORE: ON</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[10px] text-zinc-400">FPS: {fps}</span>
        </div>

        {/* Dynamic prompt on Canvas */}
        <div className="absolute bottom-4 right-4 bg-zinc-950/90 border border-zinc-800/80 p-2 rounded-sm max-w-xs pointer-events-none hidden sm:block">
          <p className="font-mono text-[9px] text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Clique / Arraste o mouse
          </p>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-sans">
            Cada coordenada altera o campo vetorial p5.js simulado.
          </p>
        </div>
      </div>

      {/* Control Panel Block */}
      <div className={`p-5 md:p-6 bg-zinc-950 border-t ${embeddedMode ? "" : "lg:border-t-0 lg:border-l"} border-zinc-800 min-h-full flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h4 className="font-mono text-xs font-bold text-zinc-200 uppercase tracking-wider">Depurador Criativo</h4>
            </div>
            <button 
              onClick={handleRandomize}
              id="p5-btn-random"
              title="Aleatorizar algoritmos"
              className="p-1 px-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900 rounded-sm hover:scale-105 transition-all text-[9.5px] font-mono flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3 rounded" />
              RAND
            </button>
          </div>

          {/* Algorithm Type selector */}
          <div className="mt-4 space-y-1.5">
            <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Algoritmo Ativo</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setStyle("constellation")}
                className={`py-1.5 text-[10px] font-mono rounded-sm border transition-all ${
                  style === "constellation" 
                    ? "bg-amber-400/10 border-amber-400 text-amber-400 font-bold" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                Grade
              </button>
              <button
                onClick={() => setStyle("gravity")}
                className={`py-1.5 text-[10px] font-mono rounded-sm border transition-all ${
                  style === "gravity" 
                    ? "bg-amber-400/10 border-amber-400 text-amber-400 font-bold" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                Gravidade
              </button>
              <button
                onClick={() => setStyle("noise")}
                className={`py-1.5 text-[10px] font-mono rounded-sm border transition-all ${
                  style === "noise" 
                    ? "bg-amber-400/10 border-amber-400 text-amber-400 font-bold" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                Vetor
              </button>
            </div>
          </div>

          {/* Slider list */}
          <div className="mt-5 space-y-4">
            {/* Particle counts */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Partículas</span>
                <span className="text-zinc-300 font-bold">{particleCount}</span>
              </div>
              <input 
                type="range"
                min={40}
                max={300}
                step={10}
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-zinc-850 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Speeds */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Aceleração</span>
                <span className="text-zinc-300 font-bold">{speed}x</span>
              </div>
              <input 
                type="range"
                min={0.2}
                max={4.0}
                step={0.1}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-amber-400 bg-zinc-850 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sizing of drawing nodes */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Tamanho Node</span>
                <span className="text-zinc-300 font-bold">{particleSize}px</span>
              </div>
              <input 
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={particleSize}
                onChange={(e) => setParticleSize(parseFloat(e.target.value))}
                className="w-full accent-amber-400 bg-zinc-850 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Distance magnet radius */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Raio Interativo</span>
                <span className="text-zinc-300 font-bold">{interactiveRadius}px</span>
              </div>
              <input 
                type="range"
                min={50}
                max={250}
                value={interactiveRadius}
                onChange={(e) => setInteractiveRadius(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-zinc-850 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Gravity friction (only active for orbit mode) */}
            {style === "gravity" && (
              <div className="space-y-1 bg-zinc-900 p-2.5 rounded-sm border border-zinc-800 animate-fadeIn">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 uppercase">Força de Gravidade</span>
                  <span className="text-emerald-300 font-bold">{gravityPull}</span>
                </div>
                <input 
                  type="range"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={gravityPull}
                  onChange={(e) => setGravityPull(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {style === "constellation" && (
              <div className="space-y-1 bg-zinc-900 p-2.5 rounded-sm border border-zinc-800 animate-fadeIn">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-blue-400 uppercase">Espessura Teias</span>
                  <span className="text-blue-300 font-bold">{connectorLineWeight}px</span>
                </div>
                <input 
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.5}
                  value={connectorLineWeight}
                  onChange={(e) => setConnectorLineWeight(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Palette selector */}
          <div className="mt-5 space-y-1.5">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Paleta de Cores</span>
            <div className="grid grid-cols-1 gap-1">
              {[
                { id: "industrial", label: "Obrero Ouro [Bruto]", color: "bg-amber-400" },
                { id: "cyberpunk", label: "Neon Fluid [Cyber]", color: "bg-pink-500" },
                { id: "monochrome", label: "Preto & Branco [Suíço]", color: "bg-gray-100" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setColorPalette(item.id as "industrial" | "cyberpunk" | "monochrome")}
                  className={`px-3 py-1.5 text-[9.5px] font-mono rounded-sm border flex items-center justify-between transition-all ${
                    colorPalette === item.id 
                      ? "bg-zinc-850 border-zinc-700 text-zinc-200" 
                      : "bg-zinc-900/50 border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    {item.label}
                  </span>
                  {colorPalette === item.id && <span className="text-[8px] text-emerald-400 font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 leading-relaxed">
          <p className="flex items-center gap-1.5 text-zinc-400 uppercase">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Engenharia Matemática:
          </p>
          <span className="text-[9px]">Calculado via CanvasRenderingContext2D no vetor modular da GPU, sem bibliotecas pesadas. Otimizado para telas retina de alta taxa de atualização.</span>
        </div>
      </div>
    </div>
  );
}
