"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

interface QuickLink {
  label: string;
  href: string;
  shortcut?: string;
}

const quickLinks: QuickLink[] = [
  { label: "> Browse Packages", href: "/packages", shortcut: "CMD + P" },
  { label: "> View Snippets", href: "/snippets", shortcut: "CMD + S" },
  { label: "> UI Components", href: "/components", shortcut: "CMD + C" },
  { label: "> Documentation", href: "/docs", shortcut: "CMD + D" },
];

export function KatanaSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setSearch("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleOpen]);

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const filteredLinks = quickLinks.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <button
          onClick={toggleOpen}
          className="bg-slate-800 border-2 border-slate-700 text-slate-400 px-4 py-2 font-mono text-xs rounded-full shadow-lg hover:border-orange-400 hover:text-orange-400 transition-colors cursor-pointer"
        >
          Press{" "}
          <span className="text-white border border-slate-600 rounded px-1 mx-1">
            ⌘
          </span>{" "}
          <span className="text-white border border-slate-600 rounded px-1">
            K
          </span>{" "}
          to Search
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-start justify-center pt-32"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="w-full max-w-2xl bg-slate-800 border-2 border-orange-400 shadow-[0_0_50px_rgba(251,146,60,0.2)] cut-corners animate-fade-up">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-700">
          <Search className="w-5 h-5 text-orange-400 mr-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋元件、函式庫或 snippet..."
            className="w-full bg-transparent py-4 text-white placeholder-slate-500 focus:outline-none font-mono text-lg"
            autoFocus
          />
          <span className="text-xs text-slate-500 font-mono border border-slate-700 px-2 py-1 rounded">
            ESC
          </span>
        </div>

        {/* Quick Links */}
        <div className="p-2">
          <div className="text-xs font-mono text-slate-500 px-2 py-2">
            QUICK LINKS
          </div>
          {filteredLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className="w-full text-left px-4 py-3 text-slate-300 hover:bg-orange-400 hover:text-slate-900 transition-colors font-mono flex justify-between items-center group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {link.label}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              {link.shortcut && (
                <span className="text-slate-600 group-hover:text-slate-800 text-xs">
                  {link.shortcut}
                </span>
              )}
            </button>
          ))}

          {filteredLinks.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500 font-mono">
              找不到符合的結果
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
