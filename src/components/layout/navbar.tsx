"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/packages", label: "// ARSENAL" },
  { href: "/snippets", label: "// SCROLLS" },
  { href: "/components", label: "// DOJO" },
  { href: "/vibe", label: "// VIBE" },
  { href: "/sensei", label: "// SENSEI" },
  { href: "/docs", label: "// DOCS" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/haru-logo.jpg"
            alt="Haruli Kit"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-bold tracking-widest text-xl uppercase">
            Haruli<span className="text-orange-400">.Kit</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Button with Keyboard Hint */}
          <button
            onClick={() => {
              // Trigger the KatanaSearch by dispatching keyboard event
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:border-orange-400 hover:text-orange-400 transition-all cursor-pointer rounded-lg"
            aria-label="搜尋"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:flex items-center gap-1 text-xs font-mono">
              <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">K</kbd>
            </span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* CTA Button - Hidden on mobile */}
          <a
            href="https://github.com/haru0414/Haruli-Kit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-slate-800 text-orange-400 border border-slate-700 px-6 py-2 font-mono text-sm hover:bg-orange-400 hover:text-slate-900 transition-all cut-corners-sm cursor-pointer"
          >
            GitHub
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
            aria-label={isMenuOpen ? "關閉選單" : "開啟選單"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-20 bg-slate-900/95 backdrop-blur-lg z-50 md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col p-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-4 px-4 font-mono text-lg border-b border-slate-800 transition-all ${
                  isActive
                    ? "text-orange-400 bg-slate-800/50"
                    : "text-slate-300 hover:text-orange-400 hover:bg-slate-800/30"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile GitHub Link */}
          <a
            href="https://github.com/haru0414/Haruli-Kit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-orange-400 text-slate-900 py-4 font-mono font-bold uppercase tracking-wider cut-corners-sm cursor-pointer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
