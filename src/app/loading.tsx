export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="relative">
        {/* Katana slash loading animation */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-8 bg-orange-400 animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-12 bg-orange-400 animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-6 bg-orange-400 animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-10 bg-orange-400 animate-pulse" style={{ animationDelay: "450ms" }} />
          <div className="w-2 h-4 bg-orange-400 animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-center font-mono text-sm text-slate-500">
          // loading...
        </p>
      </div>
    </div>
  );
}
