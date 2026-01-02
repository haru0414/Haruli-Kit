import Link from "next/link";
import { ArrowRight, Check, Link2, Layers, ScrollText, Terminal } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-2 gap-12 items-center min-h-[90vh]">
        {/* Left: Content */}
        <div className="space-y-8 z-10">
          <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            v1.0.0 Stable Release
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            斬斷重複工作，
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
              專注創造價值
            </span>
            。
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg leading-relaxed">
            專為現代開發者打造的個人軍火庫。收集最常用的套件、Hooks 與 UI
            元件，讓每次新專案的建置如拔刀般快速精準。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/packages"
              className="bg-orange-400 text-slate-900 px-8 py-4 font-bold uppercase tracking-wide shadow-[4px_4px_0px_#FFF] hover:translate-y-1 hover:shadow-[2px_2px_0px_#FFF] transition-all cut-corners text-center cursor-pointer"
            >
              立即裝備 Toolkit
            </Link>
            <button className="bg-slate-800 text-slate-300 border-2 border-slate-700 px-8 py-4 font-bold uppercase tracking-wide hover:border-orange-400 hover:text-white transition-colors cut-corners cursor-pointer">
              $ npm install
            </button>
          </div>
        </div>

        {/* Right: Code Visual */}
        <div className="relative z-10 animate-float hidden md:block">
          {/* Back card for depth */}
          <div className="absolute -inset-4 bg-orange-400/20 cut-corners transform rotate-3" />

          {/* Code Window */}
          <div className="bg-slate-900 border border-slate-700 cut-corners p-6 shadow-2xl relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 font-mono text-xs text-slate-500">
                useKatana.ts
              </span>
            </div>
            <pre className="font-mono text-sm leading-6 overflow-x-auto">
              <code>
                <span className="token-keyword">import</span> {"{ "}
                <span className="token-function">usePrecision</span>
                {" }"} <span className="token-keyword">from</span>{" "}
                <span className="token-string">&apos;@haruli/hooks&apos;</span>;
                {"\n\n"}
                <span className="token-keyword">export const</span>{" "}
                <span className="token-function">ProjectInit</span> = () =&gt;{" {"}
                {"\n"}
                {"  "}
                <span className="token-keyword">const</span> {"{ "}speed,
                efficiency{"} "} ={" "}
                <span className="token-function">usePrecision</span>();{"\n\n"}
                {"  "}
                <span className="token-comment">
                  // Eliminate boilerplates instantly
                </span>
                {"\n"}
                {"  "}
                <span className="token-keyword">if</span> (speed {">"}{" "}
                <span className="token-number">9000</span>) {"{"}
                {"\n"}
                {"    "}
                <span className="token-keyword">return</span>{" "}
                <span className="token-string">&quot;Build Successful&quot;</span>;{"\n"}
                {"  }"}\n\n{"  "}
                <span className="token-keyword">return</span>{" "}
                <span className="token-keyword">null</span>;{"\n"}
                {"}"};
              </code>
            </pre>
          </div>

          {/* Floating Stats */}
          <div className="absolute -bottom-10 -right-10 bg-slate-800 border border-slate-700 p-4 cut-corners-sm shadow-xl flex items-center gap-3">
            <div className="bg-green-500/20 text-green-400 p-2 rounded-sm">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold">
                Build Time
              </div>
              <div className="text-xl font-mono font-bold">-45%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="bg-slate-900 border-y border-slate-800 overflow-hidden py-6">
        <div className="relative flex overflow-x-hidden">
          <div className="py-2 animate-marquee whitespace-nowrap flex gap-16 items-center opacity-50 hover:opacity-100 transition-opacity">
            {[
              "React",
              "Vue",
              "TypeScript",
              "Tailwind",
              "Node.js",
              "Next.js",
              "Vite",
              "React",
              "Vue",
              "TypeScript",
              "Tailwind",
              "Node.js",
            ].map((tech, i) => (
              <span key={i} className="text-2xl font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The Arsenal (Features Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-wider mb-2">
              The Arsenal <span className="text-orange-400">//</span> 武器庫
            </h2>
            <p className="text-slate-400 font-mono">
              Select your weapon. Deploy instantly.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="w-3 h-3 bg-slate-700" />
            <div className="w-3 h-3 bg-slate-700" />
            <div className="w-3 h-3 bg-orange-400" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {/* Feature 1: Packages */}
          <Link
            href="/packages"
            className="md:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Link2 className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Link2 className="w-6 h-6 text-cyan-500" /> NPM Packages
              </h3>
              <p className="text-slate-400 mb-6 max-w-md">
                超過 10
                個經過實戰驗證的常用套件。一鍵複製安裝指令，快速整合到你的專案中。
              </p>
              <div className="bg-slate-900 p-4 border border-slate-700 font-mono text-sm text-slate-300">
                <span className="text-purple-400">npm</span> install{" "}
                <span className="text-green-400">zustand framer-motion</span>
              </div>
            </div>
          </Link>

          {/* Feature 2: UI Components */}
          <Link
            href="/components"
            className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Layers className="w-6 h-6 text-orange-400" /> UI Kits
            </h3>
            <p className="text-slate-400 mb-4">
              基於 Tailwind 的元件。無樣式約束，完全可客製化。
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="h-8 bg-slate-700 rounded-sm" />
              <div className="h-8 bg-slate-600 rounded-sm" />
              <div className="col-span-2 h-20 bg-slate-700/50 rounded-sm" />
            </div>
          </Link>

          {/* Feature 3: Snippets */}
          <Link
            href="/snippets"
            className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ScrollText className="w-6 h-6 text-pink-500" /> Smart Snippets
            </h3>
            <p className="text-slate-400 mb-6">
              常用的 Custom Hooks 與工具函式。即複即用。
            </p>
            <ul className="space-y-2 font-mono text-sm">
              <li className="flex justify-between border-b border-slate-700 pb-1">
                <span>useLocalStorage</span>
                <span className="text-slate-500">Hook</span>
              </li>
              <li className="flex justify-between border-b border-slate-700 pb-1">
                <span>useDebounce</span>
                <span className="text-slate-500">Hook</span>
              </li>
              <li className="flex justify-between">
                <span>cn()</span>
                <span className="text-slate-500">Util</span>
              </li>
            </ul>
          </Link>

          {/* Feature 4: Quick Start */}
          <div className="md:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-green-500" /> Quick Start
                </h3>
                <p className="text-slate-400 mb-6">
                  快速開始使用 Haruli Kit。瀏覽套件庫、複製程式碼、部署專案。
                </p>
                <Link
                  href="/packages"
                  className="inline-flex items-center text-orange-400 font-bold hover:text-white transition-colors cursor-pointer"
                >
                  開始使用 <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs border border-slate-800 shadow-inner">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <div className="text-green-400">$ haruli init my-app</div>
                  <div className="text-slate-400 mt-1">
                    &gt; Detecting framework... Next.js 15
                  </div>
                  <div className="text-slate-400">
                    &gt; Installing dependencies...
                  </div>
                  <div className="text-cyan-400 mt-1">
                    [====================] 100%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer className="relative pt-32 pb-12 bg-slate-950 overflow-hidden">
        {/* Jagged Top Border SVG */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
              className="fill-slate-900"
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            準備好拔刀了嗎？
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            使用 Haruli Kit 加速你的開發流程，專注在真正重要的事情上。
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link
              href="/packages"
              className="bg-orange-400 text-slate-900 px-8 py-3 font-bold uppercase hover:bg-white transition-colors cursor-pointer"
            >
              開始使用
            </Link>
          </div>

          <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-slate-800 flex items-center justify-center border border-slate-700">
                <span className="text-orange-400 font-bold text-xs">H</span>
              </div>
              <span className="font-mono text-sm text-slate-500">
                © 2025 Haruli Kit. MIT License.
              </span>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                className="text-slate-500 hover:text-orange-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
