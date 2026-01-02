"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Code } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import componentsData from "@/data/components.json";

export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredComponents = useMemo(() => {
    return componentsData.components.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(search.toLowerCase()) ||
        component.description.toLowerCase().includes(search.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = !selectedCategory || component.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleCopy = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Dojo <span className="text-orange-400">//</span> 元件展示
        </h1>
        <p className="text-slate-400 font-mono">
          UI components forged in battle. Preview. Copy. Deploy.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋元件..."
            className="w-full input-katana font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 font-mono text-sm transition-all cursor-pointer cut-corners-sm ${
              !selectedCategory
                ? "bg-orange-400 text-slate-900"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
            }`}
          >
            ALL
          </button>
          {componentsData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 font-mono text-sm transition-all cursor-pointer cut-corners-sm ${
                selectedCategory === category.id
                  ? "bg-orange-400 text-slate-900"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 cut-corners overflow-hidden group hover:border-orange-400 transition-colors"
          >
            {/* Preview Area */}
            {component.preview && (
              <div className="p-8 bg-slate-900/50 border-b border-slate-700 flex items-center justify-center min-h-[140px]">
                <ComponentPreview componentId={component.id} />
              </div>
            )}

            {/* Component Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">
                  {component.name}
                </h3>
                <button
                  onClick={() =>
                    setExpandedComponent(
                      expandedComponent === component.id ? null : component.id
                    )
                  }
                  className="flex items-center gap-2 text-sm text-orange-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  {expandedComponent === component.id ? "HIDE" : "CODE"}
                </button>
              </div>
              <p className="text-sm text-slate-400 mb-3">{component.description}</p>
              <div className="flex flex-wrap gap-1">
                {component.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Block */}
            {expandedComponent === component.id && (
              <div className="border-t border-slate-700 relative">
                <button
                  onClick={() => handleCopy(component.id, component.code)}
                  className="absolute top-4 right-4 z-10 p-2 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer"
                  title="複製"
                >
                  {copiedId === component.id ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <Highlight
                  theme={themes.nightOwl}
                  code={component.code.trim()}
                  language="tsx"
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={`${className} p-6 overflow-x-auto text-sm border-l-4 border-orange-400 max-h-96`}
                      style={{ ...style, background: "#0F172A" }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          <span className="inline-block w-8 text-slate-600 select-none text-right mr-4 font-mono">
                            {i + 1}
                          </span>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono">// 找不到符合的元件</p>
        </div>
      )}
    </div>
  );
}

// Preview Component
function ComponentPreview({ componentId }: { componentId: string }) {
  switch (componentId) {
    case "button-primary":
      return (
        <div className="flex flex-wrap gap-3">
          <button className="bg-orange-400 text-slate-900 px-6 py-2 font-bold shadow-[4px_4px_0px_#FFF] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#FFF] transition-all cursor-pointer">
            Primary
          </button>
          <button className="bg-slate-700 text-white px-6 py-2 font-bold border border-slate-600 hover:border-orange-400 transition-colors cursor-pointer">
            Secondary
          </button>
          <button className="text-slate-400 px-6 py-2 font-bold hover:text-orange-400 transition-colors cursor-pointer">
            Ghost
          </button>
          <button className="bg-red-500 text-white px-6 py-2 font-bold shadow-[4px_4px_0px_#FFF] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#FFF] transition-all cursor-pointer">
            Danger
          </button>
        </div>
      );
    case "button-icon":
      return (
        <div className="flex gap-2">
          <button className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all cursor-pointer">
            <Copy className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-800 transition-all cursor-pointer">
            <Code className="w-5 h-5" />
          </button>
          <button className="p-2 bg-slate-800 border border-slate-700 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer">
            <Check className="w-5 h-5" />
          </button>
        </div>
      );
    case "input-text":
      return (
        <div className="w-full max-w-xs">
          <label className="block text-xs font-mono uppercase text-slate-500 mb-2">
            Label
          </label>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full bg-slate-800 border-2 border-slate-700 px-4 py-3 font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-400"
          />
        </div>
      );
    case "input-search":
      return (
        <div className="w-full max-w-sm relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-16 py-3 font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-400"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-700 text-slate-400 text-xs font-mono rounded">
            ⌘K
          </kbd>
        </div>
      );
    case "input-textarea":
      return (
        <div className="w-full max-w-xs">
          <label className="block text-xs font-mono uppercase text-slate-500 mb-2">
            Message
          </label>
          <textarea
            placeholder="Type your message..."
            rows={3}
            className="w-full bg-slate-800 border-2 border-slate-700 px-4 py-3 font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-400 resize-none"
          />
        </div>
      );
    case "card-basic":
      return (
        <div className="w-full max-w-xs bg-slate-800/50 border border-slate-700 p-4 cut-corners hover:border-orange-400 transition-colors">
          <h4 className="font-bold mb-2">Ronin Card</h4>
          <p className="text-sm text-slate-400">
            武士風格卡片，帶有切角效果。
          </p>
        </div>
      );
    case "card-feature":
      return (
        <div className="w-full max-w-xs bg-slate-800/50 border border-slate-700 p-6 cut-corners group hover:border-orange-400 transition-colors">
          <div className="w-12 h-12 bg-slate-700/50 flex items-center justify-center mb-4 group-hover:bg-orange-400/20 transition-colors">
            <Code className="w-6 h-6 text-orange-400" />
          </div>
          <h3 className="font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
            Feature Title
          </h3>
          <p className="text-sm text-slate-400">功能展示卡片，帶有圖示與標題。</p>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-slate-300">Default</span>
          <span className="px-2 py-0.5 text-xs font-mono bg-orange-400/20 text-orange-400 border border-orange-400/30">Primary</span>
          <span className="px-2 py-0.5 text-xs font-mono bg-green-400/20 text-green-400 border border-green-400/30">Success</span>
          <span className="px-2 py-0.5 text-xs font-mono bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">Warning</span>
          <span className="px-2 py-0.5 text-xs font-mono bg-red-400/20 text-red-400 border border-red-400/30">Danger</span>
        </div>
      );
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-orange-400 text-xs">
            H
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-orange-400 text-sm">
            HK
          </div>
          <div className="w-14 h-14 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-orange-400">
            Kit
          </div>
        </div>
      );
    case "alert":
      return (
        <div className="w-full max-w-sm space-y-2">
          <div className="bg-cyan-400/10 border-cyan-400/30 border p-3 flex gap-3">
            <span className="text-cyan-400">ℹ</span>
            <p className="text-sm text-slate-300">This is an info alert.</p>
          </div>
          <div className="bg-green-400/10 border-green-400/30 border p-3 flex gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-slate-300">Operation successful!</p>
          </div>
        </div>
      );
    case "toast":
      return (
        <div className="bg-slate-800 border border-slate-700 shadow-lg px-4 py-3 flex items-center gap-3">
          <span className="text-green-400">✓</span>
          <span className="flex-1 text-sm">Changes saved successfully!</span>
          <button className="text-slate-400 hover:text-white cursor-pointer">✕</button>
        </div>
      );
    case "tabs":
      return (
        <div className="w-full max-w-xs">
          <div className="flex gap-2 border-b border-slate-700 pb-2">
            <button className="px-4 py-2 font-mono text-sm bg-orange-400 text-slate-900 cursor-pointer">Tab 1</button>
            <button className="px-4 py-2 font-mono text-sm text-slate-400 hover:text-orange-400 cursor-pointer">Tab 2</button>
            <button className="px-4 py-2 font-mono text-sm text-slate-400 hover:text-orange-400 cursor-pointer">Tab 3</button>
          </div>
        </div>
      );
    case "breadcrumb":
      return (
        <nav className="flex items-center gap-2 text-sm font-mono">
          <a className="text-slate-400 hover:text-orange-400 cursor-pointer">Home</a>
          <span className="text-slate-600">›</span>
          <a className="text-slate-400 hover:text-orange-400 cursor-pointer">Docs</a>
          <span className="text-slate-600">›</span>
          <span className="text-orange-400">Components</span>
        </nav>
      );
    case "progress":
      return (
        <div className="w-full max-w-xs space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm font-mono">
              <span className="text-slate-400">Progress</span>
              <span className="text-orange-400">75%</span>
            </div>
            <div className="h-2 bg-slate-700 overflow-hidden">
              <div className="h-full bg-orange-400 w-3/4" />
            </div>
          </div>
          <div className="h-2 bg-slate-700 overflow-hidden">
            <div className="h-full bg-green-400 w-1/2" />
          </div>
        </div>
      );
    case "skeleton":
      return (
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 animate-pulse rounded w-3/4" />
              <div className="h-3 bg-slate-700 animate-pulse rounded w-1/2" />
            </div>
          </div>
          <div className="h-24 bg-slate-700 animate-pulse rounded" />
        </div>
      );
    case "tooltip":
      return (
        <div className="relative inline-block group">
          <button className="px-4 py-2 bg-slate-700 text-slate-300 font-mono text-sm cursor-pointer">
            Hover me
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 border border-slate-700 text-sm text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Tooltip content
          </div>
        </div>
      );
    default:
      return <span className="text-slate-500 font-mono">// Preview unavailable</span>;
  }
}
