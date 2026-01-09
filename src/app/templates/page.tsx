"use client";

import { useState } from "react";
import { Palette, ExternalLink, Copy, Check, Eye, Sparkles } from "lucide-react";

interface DesignTemplate {
  id: string;
  name: string;
  nameJp: string;
  description: string;
  vibe: string;
  demoUrl: string;
  colors: {
    name: string;
    hex: string;
    tailwind: string;
    usage: string;
  }[];
  typography: {
    heading: string;
    body: string;
  };
  uiFeatures: string[];
  tags: string[];
  featured?: boolean;
}

const designTemplates: DesignTemplate[] = [
  {
    id: "ronin-samurai",
    name: "Ronin Toolkit",
    nameJp: "武士",
    description: "賽璐珞向量美學遇見代碼紀律——一種銳利、高對比度、帶有東方史詩感的現代開發者儀表板",
    vibe: "將武士的專注與程式碼的精確性結合，打造極具風格的 UI 系統",
    demoUrl: "/templates/ronin.html",
    colors: [
      { name: "夜幕深藍", hex: "#0F172A", tailwind: "slate-900", usage: "主背景" },
      { name: "武士服青", hex: "#1E293B", tailwind: "slate-800", usage: "卡片與側邊欄" },
      { name: "落日橘", hex: "#FB923C", tailwind: "orange-400", usage: "CTA 按鈕、Logo" },
      { name: "刀光藍", hex: "#38BDF8", tailwind: "sky-400", usage: "程式碼高亮" },
    ],
    typography: {
      heading: "Space Grotesk / Chakra Petch",
      body: "JetBrains Mono / Fira Code",
    },
    uiFeatures: [
      "完全不圓角或極小圓角",
      "硬邊陰影 (Hard Shadow)",
      "clip-path 切角設計",
      "斬擊式進入動畫",
      "Command Palette (⌘+K)",
    ],
    tags: ["dark-mode", "developer", "brutalism", "japanese"],
    featured: true,
  },
  {
    id: "retro-manga",
    name: "Retro Manga Pop",
    nameJp: "日系復古配色",
    description: "熱血復古漫畫風遇見懷舊質感敘事，像是一本正在翻閱的動漫設定集",
    vibe: "充滿紙張紋理、鮮明的青春色彩與動態的分鏡感",
    demoUrl: "/templates/retro-manga.html",
    colors: [
      { name: "暖紙米黃", hex: "#F2EAD3", tailwind: "stone-100", usage: "背景畫布" },
      { name: "深墨藍", hex: "#1A2332", tailwind: "slate-900", usage: "主要文字" },
      { name: "Nekoma Red", hex: "#C83E34", tailwind: "red-700", usage: "按鈕、標籤" },
      { name: "活力黃", hex: "#FFC845", tailwind: "amber-400", usage: "大標題裝飾" },
      { name: "復古青綠", hex: "#2F5C68", tailwind: "cyan-900", usage: "深色區塊" },
    ],
    typography: {
      heading: "Oswald / Anton / Dela Gothic One",
      body: "Noto Sans JP / Shippori Mincho",
    },
    uiFeatures: [
      "漫畫格卡片設計",
      "粗黑邊框 + 硬陰影",
      "網點 (Halftone) 裝飾",
      "橫向捲動選集佈局",
      "翻頁/墨水暈染轉場",
    ],
    tags: ["light-mode", "portfolio", "manga", "storytelling"],
    featured: true,
  },
  {
    id: "neko-stencil",
    name: "Neko Stencil Art",
    nameJp: "貓貓",
    description: "日系粗獷主義遇上復古昭和海報，強烈的紅黑對比與版畫塗鴉質感",
    vibe: "充滿野性與敘事感的數位捲軸，結合舊紙張的溫潤質感與高對比視覺衝擊",
    demoUrl: "/templates/neko.html",
    colors: [
      { name: "陳舊宣紙", hex: "#F2EFE9", tailwind: "stone-100", usage: "背景質感" },
      { name: "主視覺紅", hex: "#D92525", tailwind: "red-600", usage: "強調色、按鈕" },
      { name: "墨色黑", hex: "#1A1A1A", tailwind: "neutral-900", usage: "文字與框線" },
    ],
    typography: {
      heading: "Noto Sans JP Black (粗壯無襯線)",
      body: "Noto Serif JP (高可讀性襯線體)",
    },
    uiFeatures: [
      "不使用圓角 + 硬陰影",
      "粗黑邊框卡片",
      "Noise 噪點紋理覆蓋",
      "捲軸敘事視覺引導線",
      "蓋章式進場動畫",
      "直排文字裝飾",
    ],
    tags: ["light-mode", "blog", "stencil-art", "neo-brutalism"],
    featured: true,
  },
];

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handleCopyColor = async (id: string, hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="relative border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/80 cut-corners p-12 mb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-8 h-8 text-orange-400" />
            <span className="text-orange-400 font-mono text-sm uppercase tracking-widest">
              // DESIGN TEMPLATES
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-wider mb-4">
            Design <span className="text-orange-400">Templates</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            精選設計風格模板。從日系武士風到復古漫畫風，為你的下一個專案找到靈感。
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 font-mono text-sm">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{designTemplates.length} 設計模板</span>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-12">
        {designTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative bg-slate-800/50 border-2 border-slate-700 hover:border-orange-400 cut-corners overflow-hidden transition-all"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold group-hover:text-orange-400 transition-colors">
                      {template.name}
                    </h2>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 font-mono text-sm">
                      {template.nameJp}
                    </span>
                  </div>
                  <p className="text-slate-400 max-w-2xl">{template.description}</p>
                </div>
                <div className="flex gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono bg-slate-700/50 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vibe */}
              <div className="mb-8 p-4 bg-slate-900/50 border-l-4 border-orange-400">
                <p className="text-sm text-slate-300 italic">&ldquo;{template.vibe}&rdquo;</p>
              </div>

              {/* Color Palette */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-orange-400" />
                  Color Palette
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {template.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="group/color relative bg-slate-900 border border-slate-700 overflow-hidden hover:border-orange-400 transition-colors"
                    >
                      <div
                        className="h-20 w-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold truncate">{color.name}</span>
                          <button
                            onClick={() => handleCopyColor(`${template.id}-${idx}`, color.hex)}
                            className="p-1 hover:bg-slate-700 transition-colors cursor-pointer"
                            title="複製色碼"
                          >
                            {copiedId === `${template.id}-${idx}` ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <code className="text-xs text-cyan-400 font-mono block">{color.hex}</code>
                        <code className="text-xs text-slate-500 font-mono block">{color.tailwind}</code>
                        <span className="text-xs text-slate-400 block mt-1">{color.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & UI Features */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Typography */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Typography</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900 border border-slate-700">
                      <span className="text-xs text-slate-500 uppercase block mb-1">Heading</span>
                      <span className="text-sm font-mono text-slate-300">{template.typography.heading}</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-700">
                      <span className="text-xs text-slate-500 uppercase block mb-1">Body / Code</span>
                      <span className="text-sm font-mono text-slate-300">{template.typography.body}</span>
                    </div>
                  </div>
                </div>

                {/* UI Features */}
                <div>
                  <h3 className="text-lg font-bold mb-4">UI Features</h3>
                  <ul className="space-y-2">
                    {template.uiFeatures.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 bg-orange-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setPreviewTemplate(previewTemplate === template.id ? null : template.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-orange-400 hover:text-slate-900 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  {previewTemplate === template.id ? "隱藏預覽" : "查看 DEMO"}
                </button>
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-slate-900 hover:bg-orange-300 font-mono text-sm uppercase tracking-wide transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  新分頁開啟
                </a>
              </div>

              {/* Preview Embed */}
              {previewTemplate === template.id && (
                <div className="mt-6 border border-slate-700 overflow-hidden">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                    <span className="text-sm text-slate-400 font-mono">
                      Live Preview — {template.name}
                    </span>
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      全螢幕
                    </a>
                  </div>
                  <iframe
                    src={template.demoUrl}
                    className="w-full h-[600px] bg-white"
                    title={`${template.name} Preview`}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
