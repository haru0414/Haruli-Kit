"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Github, Book, Copy, Check, Code, ChevronDown, ChevronUp } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import packagesData from "@/data/packages.json";

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPackages = useMemo(() => {
    return packagesData.packages.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.description.toLowerCase().includes(search.toLowerCase()) ||
        pkg.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = !selectedCategory || pkg.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Arsenal <span className="text-orange-400">//</span> 套件庫
        </h1>
        <p className="text-slate-400 font-mono">
          npm install your weapons. One click deploy. {packagesData.packages.length} 個精選套件。
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋套件..."
            className="w-full bg-slate-800 border-2 border-slate-700 px-4 py-3 font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-400 transition-colors"
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
          {packagesData.categories.map((category) => (
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

      {/* Package Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start stagger-children">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 cut-corners group hover:border-orange-400 transition-all overflow-hidden"
          >
            {/* Package Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">
                  {pkg.name}
                </h3>
                <div className="flex gap-1">
                  {pkg.documentation && (
                    <a
                      href={pkg.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-orange-400 transition-colors"
                      title="文件"
                    >
                      <Book className="w-4 h-4" />
                    </a>
                  )}
                  {pkg.github && (
                    <a
                      href={pkg.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-orange-400 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {pkg.npm && (
                    <a
                      href={pkg.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-orange-400 transition-colors"
                      title="NPM"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-4">{pkg.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {pkg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Install Command */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-3">
                <code className="flex-1 text-sm font-mono text-cyan-400 truncate">
                  {pkg.installCommand}
                </code>
                <button
                  onClick={() => handleCopy(`install-${pkg.id}`, pkg.installCommand)}
                  className="p-1.5 text-slate-500 hover:text-orange-400 hover:bg-slate-800 transition-colors cursor-pointer rounded"
                  title="複製安裝指令"
                >
                  {copiedId === `install-${pkg.id}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Demo Toggle Button */}
              {"demo" in pkg && pkg.demo && (
                <button
                  onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm font-mono text-orange-400 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  {expandedId === pkg.id ? "隱藏範例" : "查看範例"}
                  {expandedId === pkg.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Demo Code Block */}
            {"demo" in pkg && pkg.demo && expandedId === pkg.id && (
              <div className="border-t border-slate-700 relative">
                <button
                  onClick={() => handleCopy(`demo-${pkg.id}`, pkg.demo)}
                  className="absolute top-4 right-4 z-10 p-2 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer rounded"
                  title="複製程式碼"
                >
                  {copiedId === `demo-${pkg.id}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <Highlight
                  theme={themes.nightOwl}
                  code={pkg.demo.trim()}
                  language="tsx"
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={`${className} p-6 pr-16 overflow-x-auto text-sm border-l-4 border-orange-400 max-h-80`}
                      style={{ ...style, background: "#0F172A" }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          <span className="inline-block w-8 text-slate-600 select-none text-right mr-4 font-mono text-xs">
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

      {filteredPackages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono">// 找不到符合的套件</p>
        </div>
      )}
    </div>
  );
}
