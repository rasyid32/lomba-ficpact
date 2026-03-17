"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Lightbulb, SendHorizontal } from "lucide-react";

export default function DailyCasePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* ─── Top Status Bar ─── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-lg font-bold">Daily Case</span>
        </button>

        <span className="rounded-full border border-gray-300 bg-gray-50 px-5 py-1.5 text-sm font-medium text-gray-700">
          Misi : Stage 2/5
        </span>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Hint
          <Lightbulb size={16} />
        </button>
      </div>

      {/* ─── Main Heading ─── */}
      <h1 className="mt-8 text-center text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl lg:text-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <br />
        Bibendum amet at molestie mattis.
      </h1>

      {/* ─── Investigation Area (2 Columns) ─── */}
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="mb-4 text-sm text-gray-500">
            Clue #1 — Analyze the evidence below and identify the key details.
          </p>
          <div className="flex flex-1 items-center justify-center rounded-xl bg-gray-100 min-h-[200px]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              className="text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="4" width="56" height="56" rx="4" />
              <line x1="4" y1="4" x2="60" y2="60" />
              <line x1="60" y1="4" x2="4" y2="60" />
            </svg>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="mb-4 text-sm text-gray-500">
            Clue #2 — Cross-reference the documents and find the connection.
          </p>
          <div className="flex flex-1 items-center justify-center rounded-xl bg-gray-100 min-h-[200px]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              className="text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="4" width="56" height="56" rx="4" />
              <line x1="4" y1="4" x2="60" y2="60" />
              <line x1="60" y1="4" x2="4" y2="60" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Answer Input ─── */}
      <div className="mx-auto mt-8 w-full max-w-lg pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Answer :"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Submit answer"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
