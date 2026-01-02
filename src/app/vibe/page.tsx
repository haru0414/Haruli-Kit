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
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic 官方 CLI 工具，讓 Claude 直接在終端機協助你寫程式",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    tags: ["cli", "anthropic", "terminal"],
    featured: true,
    installCommand: "npm install -g @anthropic-ai/claude-code",
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
    description: "Google Labs 推出的 AI 設計原型工具，快速生成 UI 概念",
    url: "https://labs.google.com/pomelli/about/",
    tags: ["google", "prototyping", "design"],
    featured: true,
  },
  {
    id: "lingyun-vibe-coding",
    name: "LingYun Vibe Coding Style Generator",
    description: "Vibe Coding 風格生成器，根據描述自動生成程式碼風格",
    url: "https://github.com/akseolabs-seo/LingYun-Vibe-Coding-Style-Generator",
    tags: ["code-style", "generator", "open-source"],
    featured: true,
  },
  {
    id: "v0-dev",
    name: "v0.dev",
    description: "Vercel 推出的 AI UI 生成工具，用自然語言描述生成 React 元件",
    url: "https://v0.dev/",
    tags: ["vercel", "react", "generator"],
    featured: true,
  },
  {
    id: "bolt-new",
    name: "bolt.new",
    description: "StackBlitz 推出的 AI 全端開發環境，在瀏覽器中即時預覽",
    url: "https://bolt.new/",
    tags: ["fullstack", "browser-ide", "stackblitz"],
    featured: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first 程式碼編輯器，基於 VSCode 內建強大 AI 助手",
    url: "https://cursor.sh/",
    tags: ["editor", "ide", "vscode"],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Codeium 推出的 AI 編輯器，強調流暢的開發體驗",
    url: "https://codeium.com/windsurf",
    tags: ["editor", "ide", "codeium"],
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
