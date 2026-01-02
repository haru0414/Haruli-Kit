"use client";

import { useState, useMemo } from "react";
import { Copy, Check, ChevronDown, ChevronUp, MessageSquare, Settings2 } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import promptsData from "@/data/prompts.json";
import configsData from "@/data/configs.json";

type TabType = "prompts" | "configs";

export default function SenseiPage() {
  const [activeTab, setActiveTab] = useState<TabType>("prompts");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = activeTab === "prompts" ? promptsData.categories : configsData.categories;
  const items = activeTab === "prompts" ? promptsData.prompts : configsData.configs;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory]);

  const handleCopy = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedCategory(null);
    setExpandedItem(null);
    setSearch("");
  };

  const getCode = (item: typeof items[0]) => {
    if ("code" in item) return item.code;
    if ("content" in item) return item.content;
    return "";
  };

  const getLanguage = (item: typeof items[0]): "typescript" | "css" | "json" | "markdown" => {
    const lang = item.language?.toLowerCase() || "typescript";
    if (lang === "css") return "css";
    if (lang === "json") return "json";
    if (lang === "markdown") return "markdown";
    return "typescript";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Sensei <span className="text-orange-400">//</span> 師範
        </h1>
        <p className="text-slate-400 font-mono">
          AI prompts, Claude skills, and battle-tested configs. Learn from the masters.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => handleTabChange("prompts")}
          className={`flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer cut-corners ${
            activeTab === "prompts"
              ? "bg-orange-400 text-slate-900"
              : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Prompts
        </button>
        <button
          onClick={() => handleTabChange("configs")}
          className={`flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer cut-corners ${
            activeTab === "configs"
              ? "bg-orange-400 text-slate-900"
              : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
          }`}
        >
          <Settings2 className="w-4 h-4" />
          Configs
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === "prompts" ? "搜尋提示詞..." : "搜尋設定檔..."}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 px-4 py-3 font-mono focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
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
          {categories.map((category) => (
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

      {/* Items List */}
      <div className="space-y-6 stagger-children">
        {filteredItems.map((item) => {
          const code = getCode(item);
          const language = getLanguage(item);
          const prismLanguage = language === "markdown" ? "markdown" : language === "json" ? "json" : language === "css" ? "css" : "typescript";

          return (
            <div
              key={item.id}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 cut-corners overflow-hidden group hover:border-orange-400 transition-colors"
            >
              {/* Header */}
              <button
                onClick={() =>
                  setExpandedItem(expandedItem === item.id ? null : item.id)
                }
                className="w-full p-6 text-left cursor-pointer flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                    {"fileName" in item && (
                      <span className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-slate-300">
                        {item.fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {language}
                    </span>
                    {item.tags.map((tag: string) => (
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
                    {expandedItem === item.id ? "COLLAPSE" : "EXPAND"}
                  </span>
                  {expandedItem === item.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Code Block */}
              {expandedItem === item.id && (
                <div className="border-t border-slate-700 relative">
                  <button
                    onClick={() => handleCopy(item.id, code)}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 transition-colors cursor-pointer"
                    title="複製"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <Highlight
                    theme={themes.nightOwl}
                    code={code.trim()}
                    language={prismLanguage}
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
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono">
            // {activeTab === "prompts" ? "找不到符合的提示詞" : "找不到符合的設定檔"}
          </p>
        </div>
      )}
    </div>
  );
}
