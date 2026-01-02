"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Package,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Rocket,
  ChevronRight,
} from "lucide-react";

type DocSection = "getting-started" | "cli" | "presets" | "links";

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<DocSection>("getting-started");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = async (command: string) => {
    await copyToClipboard(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const CopyButton = ({ command }: { command: string }) => (
    <button
      onClick={() => handleCopy(command)}
      className="p-2 hover:bg-slate-700 transition-colors cursor-pointer"
      title="複製"
    >
      {copiedCommand === command ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => (
    <div className="bg-slate-900 border border-slate-700 border-l-4 border-l-orange-400 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{language}</span>
        <CopyButton command={code} />
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-300">{code}</code>
      </pre>
    </div>
  );

  const navItems = [
    { id: "getting-started" as const, label: "快速開始", icon: Rocket },
    { id: "cli" as const, label: "CLI 工具", icon: Terminal },
    { id: "presets" as const, label: "Presets 套件組", icon: Package },
    { id: "links" as const, label: "延伸連結", icon: BookOpen },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Library <span className="text-orange-400">//</span> 文件
        </h1>
        <p className="text-slate-400 font-mono">
          Everything you need to master your toolkit.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 shrink-0">
          <nav className="sticky top-28 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm transition-all cursor-pointer cut-corners-sm ${
                    activeSection === item.id
                      ? "bg-orange-400 text-slate-900"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Getting Started */}
          {activeSection === "getting-started" && (
            <div className="space-y-8 stagger-children">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-orange-400" />
                  快速開始
                </h2>
                <p className="text-slate-400 mb-6">
                  Haruli Kit 是一個專為現代開發者打造的個人工具庫。收集最常用的套件、Hooks 與 UI 元件。
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">使用 CLI 初始化專案</h3>
                <p className="text-slate-400 mb-4">
                  最快的方式是使用 Haruli CLI 建立新專案：
                </p>
                <CodeBlock code="npx haruli init my-app" />
                <p className="text-slate-400 mt-4">
                  CLI 會引導你選擇模板 (Next.js / Vite) 和要安裝的 presets。
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">在現有專案中加入 Presets</h3>
                <p className="text-slate-400 mb-4">
                  如果你已經有專案，可以使用 add 命令加入套件組合：
                </p>
                <CodeBlock code="npx haruli add ui form data" />
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">網站功能</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { href: "/packages", label: "ARSENAL", desc: "瀏覽常用 NPM 套件" },
                    { href: "/snippets", label: "SCROLLS", desc: "程式碼片段與 Hooks" },
                    { href: "/components", label: "DOJO", desc: "UI 元件範例" },
                    { href: "/vibe", label: "VIBE", desc: "Vibe Coding 推薦工具" },
                    { href: "/sensei", label: "SENSEI", desc: "AI 提示詞與設定檔" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm hover:border-orange-400 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-mono text-orange-400 mb-1">// {item.label}</h4>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">全域搜尋</h3>
                <p className="text-slate-400 mb-4">
                  按下 <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm">⌘ K</kbd> 或 <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm">Ctrl K</kbd> 開啟 Katana Search，快速搜尋所有內容。
                </p>
              </section>
            </div>
          )}

          {/* CLI Documentation */}
          {activeSection === "cli" && (
            <div className="space-y-8 stagger-children">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-orange-400" />
                  Haruli CLI
                </h2>
                <p className="text-slate-400 mb-6">
                  命令列工具，快速初始化專案並安裝常用套件組合。
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">安裝</h3>
                <CodeBlock code="npm install -g haruli" />
                <p className="text-slate-400 mt-4">或使用 npx 直接執行：</p>
                <CodeBlock code="npx haruli --help" />
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">init - 初始化專案</h3>
                <p className="text-slate-400 mb-4">建立新專案並選擇要安裝的 presets。</p>
                <CodeBlock code={`haruli init my-app

# 指定模板
haruli init my-app --template next
haruli init my-app --template vite

# 使用預設 bundle
haruli init my-app --bundle frontend
haruli init my-app --bundle fullstack

# 跳過安裝
haruli init my-app --skip-install`} />
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">add - 加入 Presets</h3>
                <p className="text-slate-400 mb-4">在現有專案中加入套件組合。</p>
                <CodeBlock code={`haruli add ui form

# 加入多個 presets
haruli add base ui form data utils

# 常用組合
haruli add ui form data  # 前端基本
haruli add auth database # 後端基本`} />
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">list - 列出可用 Presets</h3>
                <p className="text-slate-400 mb-4">查看所有可用的 presets 和 bundles。</p>
                <CodeBlock code="haruli list" />
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">可用 Bundles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "minimal", desc: "base + utils", use: "最小安裝" },
                    { name: "frontend", desc: "base + ui + form + data + utils", use: "前端專案" },
                    { name: "fullstack", desc: "frontend + database + auth", use: "全端專案" },
                    { name: "dashboard", desc: "frontend + charts + dnd", use: "後台系統" },
                  ].map((bundle) => (
                    <div
                      key={bundle.name}
                      className="bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm"
                    >
                      <h4 className="font-mono text-orange-400 mb-1">{bundle.name}</h4>
                      <p className="text-xs text-slate-500 font-mono mb-2">{bundle.desc}</p>
                      <p className="text-sm text-slate-400">{bundle.use}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Presets Documentation */}
          {activeSection === "presets" && (
            <div className="space-y-8 stagger-children">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-orange-400" />
                  Presets 套件組
                </h2>
                <p className="text-slate-400 mb-6">
                  Presets 是預先定義的套件組合，讓你快速安裝常用的依賴。
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">核心 Presets</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "base",
                      desc: "基礎套件",
                      packages: ["typescript", "eslint", "prettier"],
                    },
                    {
                      name: "ui",
                      desc: "UI 相關",
                      packages: ["tailwindcss", "clsx", "tailwind-merge", "lucide-react"],
                    },
                    {
                      name: "form",
                      desc: "表單處理",
                      packages: ["react-hook-form", "zod", "@hookform/resolvers"],
                    },
                    {
                      name: "data",
                      desc: "資料請求",
                      packages: ["@tanstack/react-query", "axios"],
                    },
                    {
                      name: "utils",
                      desc: "工具函式",
                      packages: ["date-fns", "lodash-es"],
                    },
                    {
                      name: "animation",
                      desc: "動畫效果",
                      packages: ["framer-motion"],
                    },
                  ].map((preset) => (
                    <div
                      key={preset.name}
                      className="bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-mono text-orange-400">{preset.name}</h4>
                          <p className="text-sm text-slate-400">{preset.desc}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`haruli add ${preset.name}`)}
                          className="text-xs font-mono px-2 py-1 bg-slate-700 text-slate-300 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          {copiedCommand === `haruli add ${preset.name}` ? "copied!" : "copy"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {preset.packages.map((pkg) => (
                          <span
                            key={pkg}
                            className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-400 border border-slate-700"
                          >
                            {pkg}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">功能 Presets</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "auth",
                      desc: "認證授權",
                      packages: ["next-auth", "bcryptjs", "jsonwebtoken"],
                    },
                    {
                      name: "database",
                      desc: "資料庫",
                      packages: ["prisma", "@prisma/client"],
                    },
                    {
                      name: "charts",
                      desc: "圖表視覺化",
                      packages: ["recharts"],
                    },
                    {
                      name: "dnd",
                      desc: "拖放排序",
                      packages: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
                    },
                    {
                      name: "i18n",
                      desc: "國際化",
                      packages: ["next-intl"],
                    },
                    {
                      name: "testing",
                      desc: "測試工具",
                      packages: ["vitest", "@testing-library/react", "playwright"],
                    },
                  ].map((preset) => (
                    <div
                      key={preset.name}
                      className="bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-mono text-orange-400">{preset.name}</h4>
                          <p className="text-sm text-slate-400">{preset.desc}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`haruli add ${preset.name}`)}
                          className="text-xs font-mono px-2 py-1 bg-slate-700 text-slate-300 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          {copiedCommand === `haruli add ${preset.name}` ? "copied!" : "copy"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {preset.packages.map((pkg) => (
                          <span
                            key={pkg}
                            className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-400 border border-slate-700"
                          >
                            {pkg}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Haruli Theme</h3>
                <p className="text-slate-400 mb-4">
                  武士風格 Tailwind 設計系統，包含自訂配色、動畫和元件樣式。
                </p>
                <CodeBlock code="haruli add haruli-theme" />
                <div className="mt-4 bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm">
                  <p className="text-sm text-slate-400 mb-2">包含：</p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• tailwind.config.ts - Ronin 主題配置</li>
                    <li>• globals.css - CSS 變數與元件樣式</li>
                    <li>• utils.ts - cn() 工具函式</li>
                  </ul>
                </div>
              </section>
            </div>
          )}

          {/* Links */}
          {activeSection === "links" && (
            <div className="space-y-8 stagger-children">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-400" />
                  延伸連結
                </h2>
                <p className="text-slate-400 mb-6">
                  官方文件與推薦資源。
                </p>
              </section>

              {/* Vibe Zone Link */}
              <section>
                <Link
                  href="/vibe"
                  className="flex items-center justify-between bg-gradient-to-r from-orange-400/10 to-transparent border-2 border-orange-400/50 hover:border-orange-400 p-6 cut-corners transition-all group"
                >
                  <div>
                    <h3 className="text-xl font-bold text-orange-400 mb-1">// VIBE ZONE</h3>
                    <p className="text-slate-400">
                      探索 AI 驅動的 Vibe Coding 工具、圖標庫和開發資源
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">官方文件</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      title: "Tailwind CSS",
                      url: "https://tailwindcss.com/docs",
                      desc: "實用優先的 CSS 框架",
                    },
                    {
                      title: "Next.js",
                      url: "https://nextjs.org/docs",
                      desc: "React 全端框架",
                    },
                    {
                      title: "React",
                      url: "https://react.dev/",
                      desc: "用於建構使用者介面的 JavaScript 函式庫",
                    },
                    {
                      title: "TypeScript",
                      url: "https://www.typescriptlang.org/docs/",
                      desc: "JavaScript 的型別超集",
                    },
                    {
                      title: "Prisma",
                      url: "https://www.prisma.io/docs",
                      desc: "現代化的 ORM 工具",
                    },
                    {
                      title: "TanStack Query",
                      url: "https://tanstack.com/query/latest",
                      desc: "強大的資料請求與快取管理",
                    },
                  ].map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-slate-800/50 border border-slate-700 p-4 cut-corners-sm hover:border-orange-400 transition-colors cursor-pointer group"
                    >
                      <div>
                        <h4 className="font-bold group-hover:text-orange-400 transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-slate-400">{link.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
