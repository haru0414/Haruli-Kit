import { Clock, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

const upcomingDocs = [
  {
    title: "Next.js App Router 最佳實踐",
    description: "Server Components、Client Components 和資料獲取的使用指南",
    category: "Next.js",
  },
  {
    title: "Tailwind CSS 常用技巧",
    description: "響應式設計、動畫效果和自訂主題的實用技巧",
    category: "CSS",
  },
  {
    title: "TypeScript 型別工具",
    description: "常用的型別工具和進階型別操作",
    category: "TypeScript",
  },
  {
    title: "React Hooks 深入解析",
    description: "useState、useEffect 和自訂 Hooks 的進階使用",
    category: "React",
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          The Library <span className="text-orange-400">//</span> 文件筆記
        </h1>
        <p className="text-slate-400 font-mono">
          Knowledge scrolls. Best practices. Developer wisdom.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-orange-400/10 border-2 border-orange-400/30 p-6 mb-12 cut-corners">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-orange-400" />
          <h2 className="font-bold text-orange-400 uppercase tracking-wide">
            Under Construction
          </h2>
        </div>
        <p className="text-slate-300">
          文件筆記功能正在開發中。敬請期待！你可以先查看下方計劃中的文件主題。
        </p>
      </div>

      {/* Planned Docs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-orange-400">//</span> Planned Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {upcomingDocs.map((doc, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 cut-corners opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-700">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{doc.title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 bg-orange-400/20 text-orange-400 border border-orange-400/30">
                      SOON
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{doc.description}</p>
                  <span className="text-xs font-mono text-slate-500">
                    {doc.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 cut-corners text-center">
        <h2 className="text-2xl font-bold mb-4">想要貢獻內容？</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          這是一個個人工具庫，你可以直接編輯 content/docs 目錄下的 MDX 檔案來新增文件。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-400 text-slate-900 px-6 py-3 font-bold uppercase shadow-[4px_4px_0px_#FFF] hover:translate-y-1 hover:shadow-[2px_2px_0px_#FFF] transition-all cursor-pointer"
        >
          返回首頁
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
