import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number with Katana Cut Effect */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 select-none">
            404
          </h1>
          {/* Slash overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -rotate-12" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold text-orange-400 font-mono">
              //
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
          迷失在虛空之中
        </h2>
        <p className="text-slate-400 mb-8 font-mono">
          ERROR: 這條路徑不存在，浪人。讓我們帶你回到正軌。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange-400 text-slate-900 px-8 py-4 font-bold uppercase tracking-wide shadow-[4px_4px_0px_#FFF] hover:translate-y-1 hover:shadow-[2px_2px_0px_#FFF] transition-all cut-corners cursor-pointer"
          >
            <Home className="w-5 h-5" />
            返回首頁
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 text-slate-300 border-2 border-slate-700 px-8 py-4 font-bold uppercase tracking-wide hover:border-orange-400 hover:text-white transition-colors cut-corners cursor-pointer"
          >
            <Search className="w-5 h-5" />
            瀏覽套件庫
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex items-center justify-center gap-2 text-slate-600 font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>或使用瀏覽器的返回鍵</span>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-slate-800 rotate-45 opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-orange-400/20 rotate-12" />
      </div>
    </div>
  );
}
