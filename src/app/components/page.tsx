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
        <div className="flex gap-3">
          <button className="bg-orange-400 text-slate-900 px-6 py-2 font-bold shadow-[4px_4px_0px_#FFF] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#FFF] transition-all cursor-pointer">
            Primary
          </button>
          <button className="bg-slate-700 text-white px-6 py-2 font-bold border border-slate-600 hover:border-orange-400 transition-colors cursor-pointer">
            Secondary
          </button>
          <button className="text-slate-400 px-6 py-2 font-bold hover:text-orange-400 transition-colors cursor-pointer">
            Ghost
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
            className="w-full input-katana font-mono text-sm"
          />
        </div>
      );
    case "card-basic":
      return (
        <div className="w-full max-w-xs bg-slate-800 border border-slate-700 p-4 cut-corners">
          <h4 className="font-bold mb-2">Card Title</h4>
          <p className="text-sm text-slate-400">
            This is a basic card with katana-cut corners.
          </p>
        </div>
      );
    default:
      return <span className="text-slate-500 font-mono">// Preview unavailable</span>;
  }
}
