s"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ConsentPage() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    if (isChecked) {
      router.push("/camera");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-center pt-8 pb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center">
            <span className="font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl tracking-tight">FaceFrame AI</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4 text-center leading-tight">
          Gözlüğünüzü Birlikte Bulalım
        </h1>
        <p className="text-gray-400 text-center mb-10 text-lg px-2">
          Size en uygun çerçeveyi önermek için yüzünüzü analiz edeceğiz.
        </p>

        {/* Checklist */}
        <div className="bg-white/5 rounded-2xl p-6 mb-10 space-y-5 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#6C63FF] shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-gray-300 text-base">
              Fotoğrafınız yalnızca analiz için kullanılır
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#6C63FF] shrink-0">
              <ShieldCheck size={24} />
            </div>
            <p className="text-gray-300 text-base">
              Hiçbir görsel sunucularımızda saklanmaz
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pb-8 pt-4 max-w-md mx-auto w-full">
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <div className="relative flex items-center justify-center w-6 h-6 rounded border border-gray-500 overflow-hidden shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <div className="absolute inset-0 bg-[#6C63FF] opacity-0 peer-checked:opacity-100 transition-opacity" />
            <Check size={16} className="text-white relative z-10 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
          </div>
          <span className="text-gray-300 font-medium select-none">
            Okudum, onaylıyorum
          </span>
        </label>

        <button
          onClick={handleStart}
          disabled={!isChecked}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
            isChecked
              ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/30 hover:bg-[#5b54e6]"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          Başla
        </button>
      </div>
    </div>
  );
}
