"use client";

import { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Star,
  Terminal,
  Zap,
} from "lucide-react";

const vibeTools = [
  // === AI Coding Assistants ===
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic 官方 CLI 工具，讓 Claude 直接在終端機協助你寫程式、重構、除錯",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    tags: ["cli", "anthropic", "terminal"],
    featured: true,
    installCommand: "npm install -g @anthropic-ai/claude-code",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "GitHub 與 OpenAI 合作的 AI 程式碼補全工具，支援多種 IDE",
    url: "https://github.com/features/copilot",
    tags: ["github", "autocomplete", "ide"],
    featured: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first 程式碼編輯器，基於 VSCode 內建強大 AI 助手，支援多模型",
    url: "https://cursor.sh/",
    tags: ["editor", "ide", "vscode"],
    featured: true,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Codeium 推出的 AI 編輯器，強調 Flow 模式的流暢開發體驗",
    url: "https://codeium.com/windsurf",
    tags: ["editor", "ide", "codeium"],
  },
  {
    id: "zed",
    name: "Zed",
    description: "高效能程式碼編輯器，內建 AI 助手與即時協作功能",
    url: "https://zed.dev/",
    tags: ["editor", "rust", "collaboration"],
  },
  // === AI UI Generators ===
  {
    id: "v0-dev",
    name: "v0.dev",
    description: "Vercel 推出的 AI UI 生成工具，用自然語言描述生成 React + Tailwind 元件",
    url: "https://v0.dev/",
    tags: ["vercel", "react", "generator"],
    featured: true,
  },
  {
    id: "ui-ux-pro-max",
    name: "UI/UX Pro Max",
    description: "AI 驅動的 UI/UX 設計智能工具，提供 50+ 設計風格、21 配色方案、50 字體配對",
    url: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/",
    tags: ["design", "ui-ux", "claude-skill"],
    featured: true,
  },
  {
    id: "google-pomelli",
    name: "Google Pomelli",
    description: "Google Labs 推出的 AI 設計原型工具，快速生成 UI 概念與視覺設計",
    url: "https://labs.google.com/pomelli/about/",
    tags: ["google", "prototyping", "design"],
  },
  {
    id: "galileo-ai",
    name: "Galileo AI",
    description: "從文字描述生成高品質 UI 設計，支援 Figma 匯出",
    url: "https://www.usegalileo.ai/",
    tags: ["design", "figma", "generator"],
  },
  // === AI Full-Stack Platforms ===
  {
    id: "bolt-new",
    name: "bolt.new",
    description: "StackBlitz 推出的 AI 全端開發環境，在瀏覽器中即時預覽與部署",
    url: "https://bolt.new/",
    tags: ["fullstack", "browser-ide", "stackblitz"],
    featured: true,
  },
  {
    id: "replit-agent",
    name: "Replit Agent",
    description: "Replit 的 AI 代理，可以自主建立、除錯、部署完整應用程式",
    url: "https://replit.com/",
    tags: ["fullstack", "agent", "deployment"],
  },
  {
    id: "lovable",
    name: "Lovable",
    description: "前身為 GPT Engineer，用對話生成完整的網頁應用程式",
    url: "https://lovable.dev/",
    tags: ["fullstack", "no-code", "deployment"],
  },
  {
    id: "create-xyz",
    name: "Create.xyz",
    description: "用自然語言描述建立網站、App、遊戲，即時預覽與發布",
    url: "https://www.create.xyz/",
    tags: ["no-code", "generator", "apps"],
  },
  // === AI Coding Tools ===
  {
    id: "lingyun-vibe-coding",
    name: "LingYun Vibe Coding",
    description: "Vibe Coding 風格生成器，根據描述自動生成程式碼風格規範",
    url: "https://github.com/akseolabs-seo/LingYun-Vibe-Coding-Style-Generator",
    tags: ["code-style", "generator", "open-source"],
  },
  {
    id: "codeium",
    name: "Codeium",
    description: "免費的 AI 程式碼補全工具，支援 70+ 程式語言",
    url: "https://codeium.com/",
    tags: ["autocomplete", "free", "multi-language"],
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "企業級 AI 程式碼助手，支援本地部署與隱私保護",
    url: "https://www.tabnine.com/",
    tags: ["enterprise", "privacy", "autocomplete"],
  },
  {
    id: "aider",
    name: "Aider",
    description: "終端機中的 AI 結對程式設計工具，支援多種 LLM",
    url: "https://aider.chat/",
    tags: ["cli", "open-source", "pair-programming"],
    installCommand: "pip install aider-chat",
  },
  // === AI Design Tools ===
  {
    id: "figma-ai",
    name: "Figma AI",
    description: "Figma 內建的 AI 功能，自動生成設計、重命名圖層、移除背景",
    url: "https://www.figma.com/ai/",
    tags: ["figma", "design", "official"],
  },
  {
    id: "magician",
    name: "Magician for Figma",
    description: "Figma 的 AI 設計助手外掛，生成圖示、文案、圖片",
    url: "https://magician.design/",
    tags: ["figma", "plugin", "design"],
  },
  {
    id: "uizard",
    name: "Uizard",
    description: "將手繪草圖或截圖轉換成可編輯的 UI 設計",
    url: "https://uizard.io/",
    tags: ["sketch-to-ui", "prototyping", "design"],
  },
];

export default function VibePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const featuredTools = vibeTools.filter((t) => t.featured);
  const otherTools = vibeTools.filter((t) => !t.featured);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="relative border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/80 cut-corners p-12 mb-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-orange-400" />
            <span className="text-orange-400 font-mono text-sm uppercase tracking-widest">
              // VIBE ZONE
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-wider mb-4">
            Vibe <span className="text-orange-400">Coding</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            AI 驅動的開發工具精選。用自然語言寫程式，讓 AI 成為你的結對夥伴。
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 font-mono text-sm">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>{vibeTools.length} AI 工具</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-5 h-5 text-orange-400" />
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            Featured <span className="text-orange-400">//</span> 精選推薦
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-800/50 border-2 border-orange-400/30 hover:border-orange-400 cut-corners overflow-hidden transition-all hover:shadow-lg hover:shadow-orange-400/10"
            >
              <div className="p-6">
                <div className="absolute top-3 right-3">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-slate-700/50 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Install Command */}
                {tool.installCommand && (
                  <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-700 mb-4">
                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                    <code className="flex-1 text-xs text-cyan-400 font-mono truncate">
                      {tool.installCommand}
                    </code>
                    <button
                      onClick={() => handleCopy(tool.id, tool.installCommand!)}
                      className="p-1.5 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                      title="複製指令"
                    >
                      {copiedId === tool.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                )}

                {/* Action Button */}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  前往網站
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Tools */}
      {otherTools.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold uppercase tracking-wider">
              More Tools <span className="text-orange-400">//</span> 更多工具
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {otherTools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-slate-800/50 border border-slate-700 hover:border-orange-400 cut-corners overflow-hidden transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-slate-700/50 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    前往網站
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
