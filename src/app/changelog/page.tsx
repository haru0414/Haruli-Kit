import { GitCommit, Calendar, Tag, Sparkles, Bug, Zap, Wrench } from "lucide-react";

const changelog = [
  {
    version: "1.1.0",
    date: "2025-01-02",
    type: "feature",
    changes: [
      "新增深色/淺色主題切換功能",
      "新增 PWA 支援，可安裝至桌面",
      "新增 Changelog 頁面",
      "新增套件收藏功能 (localStorage 持久化)",
      "新增 Toast 通知系統",
      "新增回到頂部按鈕",
      "新增手機版漢堡選單",
      "新增客製化 404 頁面",
      "新增 sitemap.xml 與 robots.txt",
      "新增 Design Resources 設計資源區塊",
    ],
  },
  {
    version: "1.0.0",
    date: "2025-01-01",
    type: "release",
    changes: [
      "正式發布 Haruli Kit 網站",
      "Arsenal 套件庫：20+ 精選 NPM 套件",
      "Scrolls 程式碼片段：常用 Hooks 與工具函式",
      "Dojo 元件庫：16 個 Tailwind UI 元件",
      "Vibe 專區：19 個 AI 開發工具推薦",
      "Sensei 教學資源頁面",
      "全域搜尋功能 (⌘K)",
      "haruli CLI 工具發布至 npm",
    ],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Sparkles className="w-5 h-5 text-cyan-400" />;
    case "bugfix":
      return <Bug className="w-5 h-5 text-green-400" />;
    case "improvement":
      return <Zap className="w-5 h-5 text-yellow-400" />;
    case "release":
      return <Tag className="w-5 h-5 text-orange-400" />;
    default:
      return <Wrench className="w-5 h-5 text-slate-400" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "feature":
      return "新功能";
    case "bugfix":
      return "錯誤修復";
    case "improvement":
      return "改進";
    case "release":
      return "正式發布";
    default:
      return "更新";
  }
};

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          Changelog <span className="text-orange-400">//</span> 更新紀錄
        </h1>
        <p className="text-slate-400 font-mono">
          追蹤 Haruli Kit 的所有更新與改進。
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-700" />

        {changelog.map((release, index) => (
          <div key={release.version} className="relative pl-12 pb-12">
            {/* Timeline dot */}
            <div className="absolute left-0 w-10 h-10 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center">
              {getTypeIcon(release.type)}
            </div>

            {/* Content */}
            <div className="bg-slate-800/50 border border-slate-700 cut-corners p-6 hover:border-orange-400 transition-colors">
              {/* Version & Date Header */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-orange-400 font-mono">
                  v{release.version}
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-slate-700 text-slate-300 rounded-full">
                  {getTypeLabel(release.type)}
                </span>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                  <Calendar className="w-4 h-4" />
                  {release.date}
                </div>
              </div>

              {/* Changes List */}
              <ul className="space-y-2">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <GitCommit className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
