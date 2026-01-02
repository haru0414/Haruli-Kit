"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Github, Book, Copy, Check } from "lucide-react";
import packagesData from "@/data/packages.json";

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Arsenal <span className="text-orange-400">//</span> 套件庫
        </h1>
        <p className="text-slate-400 font-mono">
          npm install your weapons. One click deploy.
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 cut-corners group hover:border-orange-400 transition-all"
          >
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
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-3 group/copy">
              <code className="flex-1 text-sm font-mono text-cyan-400 truncate">
                {pkg.installCommand}
              </code>
              <button
                onClick={() => handleCopy(pkg.id, pkg.installCommand)}
                className="p-1 text-slate-500 hover:text-orange-400 transition-colors cursor-pointer"
                title="複製"
              >
                {copiedId === pkg.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
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
