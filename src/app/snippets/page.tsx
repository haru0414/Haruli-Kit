"use client";

import { useState, useMemo } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import snippetsData from "@/data/snippets.json";

export default function SnippetsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSnippets = useMemo(() => {
    return snippetsData.snippets.filter((snippet) => {
      const matchesSearch =
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase()) ||
        snippet.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
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
          The Scrolls <span className="text-orange-400">//</span> 程式碼片段
        </h1>
        <p className="text-slate-400 font-mono">
          Battle-tested hooks and utilities. Copy. Paste. Win.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋片段..."
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
          {snippetsData.categories.map((category) => (
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

      {/* Snippets List */}
      <div className="space-y-6 stagger-children">
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 cut-corners overflow-hidden group hover:border-orange-400 transition-colors"
          >
            {/* Header */}
            <button
              onClick={() =>
                setExpandedSnippet(expandedSnippet === snippet.id ? null : snippet.id)
              }
              className="w-full p-6 text-left cursor-pointer flex items-start justify-between"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-400 transition-colors">
                  {snippet.title}
                </h3>
                <p className="text-sm text-slate-400 mb-3">{snippet.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 text-xs font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {snippet.language}
                  </span>
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xs font-mono">
                  {expandedSnippet === snippet.id ? "COLLAPSE" : "EXPAND"}
                </span>
                {expandedSnippet === snippet.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Code Block */}
            {expandedSnippet === snippet.id && (
              <div className="border-t border-slate-700 relative">
                <button
                  onClick={() => handleCopy(snippet.id, snippet.code)}
                  className="absolute top-4 right-4 z-10 p-2 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer"
                  title="複製"
                >
                  {copiedId === snippet.id ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <Highlight
                  theme={themes.nightOwl}
                  code={snippet.code.trim()}
                  language={snippet.language === "css" ? "css" : "typescript"}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={`${className} p-6 overflow-x-auto text-sm border-l-4 border-orange-400`}
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

      {filteredSnippets.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono">// 找不到符合的程式碼片段</p>
        </div>
      )}
    </div>
  );
}
