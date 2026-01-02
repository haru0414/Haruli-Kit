"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code } from "lucide-react";

const navItems = [
  { href: "/packages", label: "// ARSENAL" },
  { href: "/snippets", label: "// SCROLLS" },
  { href: "/components", label: "// DOJO" },
  { href: "/docs", label: "// DOCS" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-400 cut-corners-sm flex items-center justify-center">
            <Code className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-bold tracking-widest text-xl uppercase">
            Haruli<span className="text-orange-400">.Kit</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-sm transition-colors ${
                  isActive
                    ? "text-orange-400"
                    : "text-slate-400 hover:text-orange-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-800 text-orange-400 border border-slate-700 px-6 py-2 font-mono text-sm hover:bg-orange-400 hover:text-slate-900 transition-all cut-corners-sm cursor-pointer"
        >
          GitHub Repo
        </a>
      </div>
    </header>
  );
}
