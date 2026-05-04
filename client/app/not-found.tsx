import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00d4ff]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-6">
          <Dumbbell className="w-8 h-8 text-[#00d4ff]" />
        </div>
        <h1 className="text-8xl font-black text-white mb-2">404</h1>
        <p className="text-white/50 text-lg mb-8">
          This page doesn&apos;t exist — but your fitness journey does.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
