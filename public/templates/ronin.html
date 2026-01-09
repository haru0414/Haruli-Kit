<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ronin Toolkit | 個人開發工具庫</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        slate: {
                            900: '#0F172A',
                            800: '#1E293B',
                            700: '#334155',
                            400: '#94A3B8',
                            50: '#F8FAFC',
                        },
                        orange: {
                            400: '#FB923C',
                        },
                        cyan: {
                            500: '#06B6D4',
                        }
                    },
                    fontFamily: {
                        sans: ['Space Grotesk', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    boxShadow: {
                        'brutal': '4px 4px 0px #FB923C',
                    },
                    animation: {
                        'marquee': 'marquee 25s linear infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'slash': 'slash 0.2s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards',
                    },
                    keyframes: {
                        marquee: {
                            '0%': { transform: 'translateX(0%)' },
                            '100%': { transform: 'translateX(-100%)' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        slash: {
                            '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
                            '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
                        }
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #0F172A;
            color: #F8FAFC;
            overflow-x: hidden;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #1E293B;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #FB923C;
        }

        /* Angled Corners Utility */
        .cut-corners {
            clip-path: polygon(
                15px 0, 100% 0,
                100% calc(100% - 15px),
                calc(100% - 15px) 100%,
                0 100%,
                0 15px
            );
        }

        .cut-corners-sm {
            clip-path: polygon(
                8px 0, 100% 0,
                100% calc(100% - 8px),
                calc(100% - 8px) 100%,
                0 100%,
                0 8px
            );
        }

        /* Background Sun */
        .ronin-sun {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 80vh;
            height: 80vh;
            background: linear-gradient(180deg, #FB923C 0%, #F43F5E 100%);
            border-radius: 50%;
            z-index: -1;
            opacity: 0.15;
            filter: blur(60px);
            pointer-events: none;
        }

        /* Syntax Highlighting Base */
        .token-keyword { color: #F472B6; }
        .token-function { color: #FB923C; }
        .token-string { color: #06B6D4; }
        .token-comment { color: #64748B; font-style: italic; }

        /* Grid Pattern Overlay */
        .grid-bg {
            background-image: linear-gradient(rgba(51, 65, 85, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(51, 65, 85, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
        }
    </style>

</head>
<body class="font-sans antialiased grid-bg selection:bg-orange-400 selection:text-slate-900">

    <!-- The Sun Background -->
    <div class="ronin-sun animate-pulse"></div>

    <!-- Floating Command Palette Hint -->
    <div class="fixed bottom-8 right-8 z-50 hidden md:block">
        <button onclick="toggleCommandPalette()" class="bg-slate-800 border-2 border-slate-700 text-slate-400 px-4 py-2 font-mono text-xs rounded-full shadow-lg hover:border-orange-400 hover:text-orange-400 transition-colors">
            Press <span class="text-white border border-slate-600 rounded px-1 mx-1">⌘</span> <span class="text-white border border-slate-600 rounded px-1">K</span> to Search
        </button>
    </div>

    <!-- Command Palette Modal (Hidden by default) -->
    <div id="command-palette" class="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm hidden flex items-start justify-center pt-32 opacity-0 transition-opacity duration-200">
        <div class="w-full max-w-2xl bg-slate-800 border-2 border-orange-400 shadow-[0_0_50px_rgba(251,146,60,0.2)] transform scale-95 transition-transform duration-200 cut-corners">
            <div class="flex items-center px-4 border-b border-slate-700">
                <i class="fas fa-search text-orange-400 mr-3"></i>
                <input type="text" placeholder="搜尋元件、函式庫或snippet..." class="w-full bg-transparent py-4 text-white placeholder-slate-500 focus:outline-none font-mono text-lg">
                <span class="text-xs text-slate-500 font-mono border border-slate-700 px-2 py-1 rounded">ESC</span>
            </div>
            <div class="p-2">
                <div class="text-xs font-mono text-slate-500 px-2 py-2">QUICK LINKS</div>
                <button class="w-full text-left px-4 py-3 text-slate-300 hover:bg-orange-400 hover:text-slate-900 transition-colors font-mono flex justify-between items-center group">
                    <span>> Install UI Kit</span>
                    <span class="text-slate-600 group-hover:text-slate-800 text-xs">CMD + I</span>
                </button>
                <button class="w-full text-left px-4 py-3 text-slate-300 hover:bg-orange-400 hover:text-slate-900 transition-colors font-mono flex justify-between items-center group">
                    <span>> Browse Snippets</span>
                    <span class="text-slate-600 group-hover:text-slate-800 text-xs">CMD + S</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Navbar -->
    <header class="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-orange-400 cut-corners-sm flex items-center justify-center">
                    <i class="fas fa-code text-slate-900 text-sm"></i>
                </div>
                <span class="font-bold tracking-widest text-xl uppercase">Ronin<span class="text-orange-400">.dev</span></span>
            </div>

            <nav class="hidden md:flex gap-8">
                <a href="#features" class="font-mono text-sm text-slate-400 hover:text-orange-400 transition-colors">// ARSENAL</a>
                <a href="#snippets" class="font-mono text-sm text-slate-400 hover:text-orange-400 transition-colors">// SCROLLS</a>
                <a href="#playground" class="font-mono text-sm text-slate-400 hover:text-orange-400 transition-colors">// DOJO</a>
            </nav>

            <a href="#" class="bg-slate-800 text-orange-400 border border-slate-700 px-6 py-2 font-mono text-sm hover:bg-orange-400 hover:text-slate-900 transition-all cut-corners-sm">
                GitHub Repo
            </a>
        </div>
    </header>

    <main class="pt-20">
        <!-- Hero Section -->
        <section class="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-2 gap-12 items-center min-h-[90vh]">
            <!-- Left: Content -->
            <div class="space-y-8 z-10">
                <div class="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
                    v2.0.4 Stable Release
                </div>
                <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                    斬斷重複工作，<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">專注創造價值</span>。
                </h1>
                <p class="text-slate-400 text-lg md:text-xl font-light max-w-lg leading-relaxed">
                    專為現代開發者打造的個人軍火庫。收集最常用的套件、Hooks 與 UI 元件，讓每次新專案的建置如拔刀般快速精準。
                </p>
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <button class="bg-orange-400 text-slate-900 px-8 py-4 font-bold uppercase tracking-wide shadow-brutal hover:translate-y-1 hover:shadow-none transition-all cut-corners">
                        立即裝備 Toolkit
                    </button>
                    <button onclick="toggleCommandPalette()" class="bg-slate-800 text-slate-300 border-2 border-slate-700 px-8 py-4 font-bold uppercase tracking-wide hover:border-orange-400 hover:text-white transition-colors cut-corners">
                        $ npm install
                    </button>
                </div>
            </div>

            <!-- Right: Code Visual -->
            <div class="relative z-10 animate-float hidden md:block">
                <!-- Back card for depth -->
                <div class="absolute -inset-4 bg-orange-400/20 cut-corners transform rotate-3"></div>

                <!-- Code Window -->
                <div class="bg-slate-900 border border-slate-700 cut-corners p-6 shadow-2xl relative">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <span class="ml-4 font-mono text-xs text-slate-500">useKatana.ts</span>
                    </div>
                    <pre class="font-mono text-sm leading-6 overflow-x-auto">

<code><span class="token-keyword">import</span> { <span class="token-function">usePrecision</span> } <span class="token-keyword">from</span> <span class="token-string">'@ronin/hooks'</span>;

<span class="token-keyword">export const</span> <span class="token-function">ProjectInit</span> = () => {
<span class="token-keyword">const</span> { speed, efficiency } = <span class="token-function">usePrecision</span>();

<span class="token-comment">// Eliminate boilerplates instantly</span>
<span class="token-keyword">if</span> (speed > <span class="text-orange-400">9000</span>) {
<span class="token-keyword">return</span> <span class="token-string">"Build Successful"</span>;
}

<span class="token-keyword">return</span> <span class="token-keyword">null</span>;
};</code></pre>

<!-- Copy Button Overlay -->
<button class="absolute top-6 right-6 p-2 text-slate-500 hover:text-orange-400 transition-colors">
<i class="far fa-copy"></i>
</button>
</div>

                <!-- Floating Elements -->
                <div class="absolute -bottom-10 -right-10 bg-slate-800 border border-slate-700 p-4 cut-corners-sm shadow-xl flex items-center gap-3">
                    <div class="bg-green-500/20 text-green-400 p-2 rounded-sm">
                        <i class="fas fa-check"></i>
                    </div>
                    <div>
                        <div class="text-xs text-slate-400 uppercase font-bold">Build Time</div>
                        <div class="text-xl font-mono font-bold">-45%</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tech Stack Marquee -->
        <div class="bg-slate-900 border-y border-slate-800 overflow-hidden py-6">
            <div class="relative flex overflow-x-hidden group">
                <div class="py-2 animate-marquee whitespace-nowrap flex gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-react"></i> React</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-vuejs"></i> Vue</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-js"></i> TypeScript</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-css3-alt"></i> Tailwind</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-node"></i> Node.js</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-docker"></i> Docker</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-git-alt"></i> Git</span>
                    <!-- Repeat -->
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-react"></i> React</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-vuejs"></i> Vue</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-js"></i> TypeScript</span>
                    <span class="text-2xl font-bold flex items-center gap-2"><i class="fab fa-css3-alt"></i> Tailwind</span>
                </div>
            </div>
        </div>

        <!-- The Arsenal (Features Grid) -->
        <section id="features" class="max-w-7xl mx-auto px-6 py-32">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
                <div>
                    <h2 class="text-4xl font-bold uppercase tracking-wider mb-2">The Arsenal <span class="text-orange-400">//</span> 武器庫</h2>
                    <p class="text-slate-400 font-mono">Select your weapon. Deploy instantly.</p>
                </div>
                <div class="hidden md:block">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 bg-slate-700"></div>
                        <div class="w-3 h-3 bg-slate-700"></div>
                        <div class="w-3 h-3 bg-orange-400"></div>
                    </div>
                </div>
            </div>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <!-- Feature 1: Hooks Library -->
                <div class="md:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fas fa-anchor text-9xl"></i>
                    </div>
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                            <i class="fas fa-link text-cyan-500"></i> Custom Hooks
                        </h3>
                        <p class="text-slate-400 mb-6 max-w-md">超過 50 個經過實戰驗證的 React/Vue Hooks。處理 API 請求、狀態管理、裝置感測，一行程式碼搞定。</p>
                        <div class="bg-slate-900 p-4 border border-slate-700 font-mono text-sm text-slate-300">
                            <span class="text-purple-400">const</span> { data, loading } = <span class="text-yellow-400">useFetch</span>(<span class="text-green-400">'/api/ronin'</span>);
                        </div>
                    </div>
                </div>

                <!-- Feature 2: UI Components -->
                <div class="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors flex flex-col justify-between">
                    <div>
                        <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                            <i class="fas fa-layer-group text-orange-400"></i> UI Kits
                        </h3>
                        <p class="text-slate-400 mb-4">基於 Tailwind 的 headless 元件。無樣式約束，完全可客製化。</p>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <div class="h-8 bg-slate-700 rounded-sm animate-pulse"></div>
                        <div class="h-8 bg-slate-600 rounded-sm"></div>
                        <div class="col-span-2 h-20 bg-slate-700/50 rounded-sm"></div>
                    </div>
                </div>

                <!-- Feature 3: Snippets Manager -->
                <div class="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors">
                    <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                        <i class="fas fa-scroll text-pink-500"></i> Smart Snippets
                    </h3>
                    <p class="text-slate-400 mb-6">VS Code 擴充套件整合。輸入 `rn-` 即可展開常用的 Config 設定檔。</p>
                    <ul class="space-y-2 font-mono text-sm">
                        <li class="flex justify-between border-b border-slate-700 pb-1">
                            <span>rn-tailwind</span>
                            <span class="text-slate-500">Config Init</span>
                        </li>
                        <li class="flex justify-between border-b border-slate-700 pb-1">
                            <span>rn-docker</span>
                            <span class="text-slate-500">Dockerfile</span>
                        </li>
                        <li class="flex justify-between">
                            <span>rn-ci</span>
                            <span class="text-slate-500">GitHub Action</span>
                        </li>
                    </ul>
                </div>

                <!-- Feature 4: CLI Tool -->
                <div class="md:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners group hover:border-orange-400 transition-colors">
                    <div class="flex flex-col md:flex-row gap-8 items-center">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                                <i class="fas fa-terminal text-green-500"></i> Ronin CLI
                            </h3>
                            <p class="text-slate-400 mb-6">最強大的終端機助手。自動偵測專案類型，推薦適合的工具包。</p>
                            <a href="#" class="inline-flex items-center text-orange-400 font-bold hover:text-white transition-colors">
                                查看 CLI 文件 <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                        <div class="w-full md:w-1/2">
                            <div class="bg-slate-950 rounded-lg p-4 font-mono text-xs border border-slate-800 shadow-inner">
                                <div class="flex gap-1.5 mb-3">
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                </div>
                                <div class="text-green-400">$ ronin init my-app</div>
                                <div class="text-slate-400 mt-1">> Detecting framework... Next.js 14</div>
                                <div class="text-slate-400">> Installing dependencies...</div>
                                <div class="text-cyan-400 mt-1 typing-cursor">[====================] 100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Interactive Component Playground (Dojo) -->
        <section id="playground" class="bg-slate-900 border-y border-slate-800 py-32 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 grid-bg opacity-30"></div>

            <div class="max-w-5xl mx-auto px-6 relative z-10">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold uppercase tracking-wider mb-4">The Dojo <span class="text-orange-400">//</span> 試煉場</h2>
                    <p class="text-slate-400">即時調整參數，預覽元件效果。</p>
                </div>

                <div class="grid md:grid-cols-3 gap-0 border border-slate-700 bg-slate-800 shadow-2xl">
                    <!-- Controls -->
                    <div class="p-8 border-b md:border-b-0 md:border-r border-slate-700 space-y-8">
                        <div>
                            <label class="text-xs font-mono uppercase text-slate-500 block mb-3">Variant</label>
                            <div class="flex gap-2">
                                <button onclick="setVariant('solid')" class="flex-1 bg-slate-700 text-xs py-2 hover:bg-orange-400 hover:text-slate-900 transition-colors active-variant">Solid</button>
                                <button onclick="setVariant('outline')" class="flex-1 bg-slate-900 border border-slate-700 text-xs py-2 hover:border-orange-400 transition-colors">Outline</button>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-mono uppercase text-slate-500 block mb-3">State</label>
                            <div class="flex items-center justify-between text-sm text-slate-300">
                                <span>Loading</span>
                                <div onclick="toggleLoading()" class="w-10 h-5 bg-slate-900 rounded-full relative cursor-pointer border border-slate-600 toggle-switch">
                                    <div class="w-3 h-3 bg-slate-400 rounded-full absolute top-1 left-1 transition-all toggle-dot"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-mono uppercase text-slate-500 block mb-3">Shadow</label>
                            <input type="range" min="0" max="10" value="4" class="w-full h-1 bg-slate-600 appearance-none rounded-lg cursor-pointer accent-orange-400" oninput="updateShadow(this.value)">
                        </div>
                    </div>

                    <!-- Preview -->
                    <div class="md:col-span-2 p-12 flex items-center justify-center bg-slate-900/50 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                             <i class="fas fa-dragon text-[200px]"></i>
                        </div>

                        <!-- The Component Being Tested -->
                        <button id="demo-btn" class="bg-orange-400 text-slate-900 px-8 py-3 font-bold uppercase tracking-wide shadow-[4px_4px_0px_#FFF] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-2">
                            <span id="btn-text">Confirm Action</span>
                            <i id="btn-icon" class="fas fa-arrow-right"></i>
                            <i id="loading-icon" class="fas fa-circle-notch fa-spin hidden"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA / Footer -->
        <footer class="relative pt-32 pb-12 bg-slate-950 overflow-hidden">
            <!-- Jagged Top Border SVG -->
            <div class="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg class="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="fill-slate-900"></path>
                </svg>
            </div>

            <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 class="text-3xl md:text-5xl font-bold mb-8">準備好拔刀了嗎？</h2>
                <p class="text-slate-400 mb-12 max-w-xl mx-auto">加入超過 5,000 名開發者的行列，使用 Ronin Toolkit 加速你的開發流程。</p>

                <div class="flex flex-col sm:flex-row justify-center gap-6 mb-20">
                    <input type="email" placeholder="輸入您的 Email" class="bg-slate-900 border-b-2 border-slate-700 px-4 py-3 w-full sm:w-80 focus:outline-none focus:border-orange-400 transition-colors text-white placeholder-slate-600">
                    <button class="bg-orange-400 text-slate-900 px-8 py-3 font-bold uppercase hover:bg-white transition-colors">
                        訂閱電子報
                    </button>
                </div>

                <div class="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center">
                    <div class="flex items-center gap-2 mb-4 md:mb-0">
                        <div class="w-6 h-6 bg-slate-800 flex items-center justify-center border border-slate-700">
                             <span class="text-orange-400 font-bold text-xs">R</span>
                        </div>
                        <span class="font-mono text-sm text-slate-500">© 2023 Ronin Toolkit. MIT License.</span>
                    </div>
                    <div class="flex gap-6">
                        <a href="#" class="text-slate-500 hover:text-orange-400 transition-colors"><i class="fab fa-github text-xl"></i></a>
                        <a href="#" class="text-slate-500 hover:text-orange-400 transition-colors"><i class="fab fa-twitter text-xl"></i></a>
                        <a href="#" class="text-slate-500 hover:text-orange-400 transition-colors"><i class="fab fa-discord text-xl"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </main>

    <script>
        // Command Palette Logic
        const palette = document.getElementById('command-palette');
        const paletteInner = palette.querySelector('div');

        function toggleCommandPalette() {
            if (palette.classList.contains('hidden')) {
                palette.classList.remove('hidden');
                // Small delay to allow display:block to apply before opacity transition
                setTimeout(() => {
                    palette.classList.remove('opacity-0');
                    paletteInner.classList.remove('scale-95');
                    paletteInner.classList.add('scale-100');
                    palette.querySelector('input').focus();
                }, 10);
            } else {
                palette.classList.add('opacity-0');
                paletteInner.classList.remove('scale-100');
                paletteInner.classList.add('scale-95');
                setTimeout(() => {
                    palette.classList.add('hidden');
                }, 200);
            }
        }

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleCommandPalette();
            }
            if (e.key === 'Escape' && !palette.classList.contains('hidden')) {
                toggleCommandPalette();
            }
        });

        // Close on click outside
        palette.addEventListener('click', (e) => {
            if (e.target === palette) toggleCommandPalette();
        });

        // Playground Logic
        const demoBtn = document.getElementById('demo-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const loadingIcon = document.getElementById('loading-icon');
        let isLoading = false;

        function setVariant(type) {
            // Reset classes
            demoBtn.className = "px-8 py-3 font-bold uppercase tracking-wide transition-all transform active:translate-y-1 flex items-center gap-2";

            if (type === 'solid') {
                demoBtn.classList.add('bg-orange-400', 'text-slate-900', 'shadow-[4px_4px_0px_#FFF]', 'active:shadow-none');
            } else {
                demoBtn.classList.add('bg-transparent', 'text-orange-400', 'border-2', 'border-orange-400', 'shadow-[4px_4px_0px_#FB923C]', 'hover:bg-orange-400/10', 'active:shadow-none');
            }
            updateShadow(document.querySelector('input[type=range]').value);
        }

        function toggleLoading() {
            isLoading = !isLoading;
            const toggleDot = document.querySelector('.toggle-dot');

            if (isLoading) {
                toggleDot.style.transform = 'translateX(20px)';
                toggleDot.classList.replace('bg-slate-400', 'bg-orange-400');
                btnText.innerText = "Processing...";
                btnIcon.classList.add('hidden');
                loadingIcon.classList.remove('hidden');
                demoBtn.classList.add('cursor-wait', 'opacity-80');
            } else {
                toggleDot.style.transform = 'translateX(0)';
                toggleDot.classList.replace('bg-orange-400', 'bg-slate-400');
                btnText.innerText = "Confirm Action";
                btnIcon.classList.remove('hidden');
                loadingIcon.classList.add('hidden');
                demoBtn.classList.remove('cursor-wait', 'opacity-80');
            }
        }

        function updateShadow(val) {
            // Only update shadow size if not active (simple logic for demo)
            if(demoBtn.classList.contains('bg-orange-400')){
                demoBtn.style.boxShadow = `${val}px ${val}px 0px #FFF`;
            } else {
                demoBtn.style.boxShadow = `${val}px ${val}px 0px #FB923C`;
            }
        }
    </script>

</body>
</html>
