"use client";

import { useState, useMemo } from "react";
import {
  Sparkles,
  Palette,
  Layout,
  Wrench,
  ExternalLink,
  Copy,
  Check,
  Star,
  Terminal,
} from "lucide-react";
import resourcesData from "@/data/resources.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Palette,
  Layout,
  Wrench,
};

export default function VibePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    if (!selectedCategory) return resourcesData.resources;
    return resourcesData.resources.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const featuredResources = resourcesData.resources.filter((r) => r.featured);

  const handleCopy = async (id: string, command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            AI 驅動的設計與開發工具精選。讓你的開發體驗提升到新境界。
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 font-mono text-sm">
              <Star className="w-4 h-4 text-orange-400" />
              <span>{featuredResources.length} 精選工具</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 font-mono text-sm">
              <Layout className="w-4 h-4 text-cyan-400" />
              <span>{resourcesData.categories.length} 分類</span>
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
          {featuredResources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-slate-800 to-slate-800/50 border-2 border-orange-400/30 hover:border-orange-400 cut-corners p-6 transition-all hover:shadow-lg hover:shadow-orange-400/10"
            >
              <div className="absolute top-3 right-3">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {resource.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {resource.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono bg-slate-700/50 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-orange-400 text-sm font-mono">
                <ExternalLink className="w-4 h-4" />
                <span>前往使用</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer cut-corners ${
              !selectedCategory
                ? "bg-orange-400 text-slate-900"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
            }`}
          >
            ALL
          </button>
          {resourcesData.categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Sparkles;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer cut-corners ${
                  selectedCategory === category.id
                    ? "bg-orange-400 text-slate-900"
                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-orange-400"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Description */}
      {selectedCategory && (
        <div className="mb-8 p-4 bg-slate-800/50 border-l-4 border-orange-400">
          <p className="text-slate-400 font-mono text-sm">
            {resourcesData.categories.find((c) => c.id === selectedCategory)?.description}
          </p>
        </div>
      )}

      {/* Resources Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => {
          const category = resourcesData.categories.find(
            (c) => c.id === resource.category
          );
          const IconComponent = category ? iconMap[category.icon] || Sparkles : Sparkles;

          return (
            <div
              key={resource.id}
              className="group bg-slate-800/50 border border-slate-700 hover:border-orange-400 cut-corners overflow-hidden transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-700/50 group-hover:bg-orange-400/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">
                        {resource.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono">
                        {category?.name}
                      </span>
                    </div>
                  </div>
                  {resource.featured && (
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  )}
                </div>

                <p className="text-sm text-slate-400 mb-4">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-slate-700/50 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Install Command */}
                {"installCommand" in resource && resource.installCommand && (
                  <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-700 mb-4">
                    <Terminal className="w-4 h-4 text-slate-500" />
                    <code className="flex-1 text-sm text-cyan-400 font-mono">
                      {resource.installCommand}
                    </code>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(resource.id, resource.installCommand!);
                      }}
                      className="p-1.5 hover:bg-slate-700 transition-colors cursor-pointer"
                      title="複製指令"
                    >
                      {copiedId === resource.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                )}

                {/* Action Button */}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  前往網站
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono">// 此分類暫無資源</p>
        </div>
      )}
    </div>
  );
}
