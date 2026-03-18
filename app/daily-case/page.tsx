"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Lightbulb } from "lucide-react";

export default function DailyCasePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex flex-col p-6 lg:p-12">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-900 hover:text-black transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="text-xl font-bold">Daily Case</span>
        </button>

        <span className="rounded-full border border-gray-400/60 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          Misi : Stage 2/5
        </span>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-gray-400/60 bg-transparent px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 shadow-sm"
        >
          Hint
          <Lightbulb size={18} />
        </button>
      </div>

      {/* Main Heading */}
      <div className="w-full max-w-6xl mx-auto mt-12 mb-10">
          <h1 className="text-center text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Bibendum amet at molestie mattis.
          </h1>
      </div>

      {/* Investigation Area (2 Columns) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Card (Image/Clue) */}
        <div className="flex flex-col rounded-3xl border border-gray-400/50 bg-[#d1d1d1] p-0 overflow-hidden shadow-sm aspect-4/3">
          <div className="flex flex-1 items-center justify-center bg-transparent w-full h-full">     
            {/* Image Placeholder */}
            <span className="text-gray-500 font-medium tracking-wide">Image Area</span>
          </div>
        </div>

        {/* Right Card (Description) */}
        <div className="flex flex-col rounded-3xl border border-gray-400/50 bg-[#d1d1d1] shadow-sm p-8 aspect-4/3">
          <div className="prose prose-sm md:prose-base text-gray-800 space-y-4">
              <p>
                 Sebuah kasus yang tak terpecahkan selama berbulan-bulan kembali dibuka. Beberapa petunjuk telah ditemukan di TKP yang merujuk pada sebuah brankas tersembunyi.
              </p>
              <p>
                  Perhatikan baik-baik gambar dokumen di samping. Terdapat serangkaian angka dan simbol yang jika digabungkan dengan benar akan membentuk kombinasi brankas yang terkunci.
              </p>
              <p className="font-bold text-gray-900 mt-6">
                  Pertanyaan: Berapakah kode sandi untuk membuka brankas tersebut?
              </p>
          </div>
        </div>
      </div>

      {/* Answer Input */}
      <div className="mx-auto mt-16 w-full max-w-100">
        <input
            type="text"
            placeholder="Enter Answer :"
            className="w-full rounded-2xl border border-gray-400/80 bg-transparent px-6 py-4 text-sm text-gray-900 placeholder:text-gray-700 outline-none transition focus:border-gray-500 focus:bg-[#d1d1d1] focus:ring-1 focus:ring-gray-500 text-center font-medium shadow-sm hover:bg-[#d1d1d1]"
        />
      </div>
    </div>
  );
}