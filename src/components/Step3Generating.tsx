"use client";

export default function Step3Generating() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-navy-mid rounded-full" />
        <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-display font-bold text-ivory">Crafting your proposal...</h2>
        <p className="text-sm text-slate font-mono">
          AI is writing a professional proposal tailored to your project
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
