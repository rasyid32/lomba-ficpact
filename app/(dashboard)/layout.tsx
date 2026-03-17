"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:ml-64">
        {/* ─── Mobile Header ─── */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <span className="text-base font-bold tracking-tight text-gray-900">
            EDUPLAY<span className="text-blue-600">VERSE</span>
          </span>
        </header>

        {/* ─── Content ─── */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
