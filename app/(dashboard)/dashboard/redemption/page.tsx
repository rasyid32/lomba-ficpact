"use client";

import { Info, Lock, Key, Sparkles, Diamond, ArrowRight, User } from "lucide-react";

export default function RedemptionPage() {
  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Redemption Reward</h1>
        <p className="text-gray-600">Exchange your EXP and Mystery Coins for exclusive perks and titles.</p>
      </div>

      <div className="bg-linear-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
           <Diamond size={300} />
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Your Current Balance</h2>
            <div className="flex gap-8 mb-6 mt-6">
                <div>
                   <span className="block text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Total EXP</span>
                   <span className="text-4xl font-black">12,450</span>
                </div>
                <div className="w-px bg-white/20 h-16"></div>
                <div>
                  <span className="block text-yellow-200 text-sm font-medium uppercase tracking-wider mb-1">Mystery Coins</span>
                  <span className="text-4xl font-black text-yellow-400">450</span>
                </div>
            </div>
            <button className="bg-white text-blue-900 font-bold py-2.5 px-6 rounded-full hover:bg-gray-100 transition shadow-sm flex gap-2 items-center text-sm">
                Get More Coins <ArrowRight size={16} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4 border border-amber-200">
               <Sparkles className="text-amber-500" size={36} />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-1">Special Title</h3>
             <p className="text-sm text-gray-500 mb-4 h-10">Unlock the "Grand Master" display tag.</p>
             <div className="flex bg-gray-50 rounded-lg p-3 w-full justify-between items-center mb-4">
                 <span className="text-xs font-bold text-gray-500 uppercase">Cost</span>
                 <span className="font-black text-blue-600">5,000 EXP</span>
             </div>
             <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition">
                 Redeem Title
             </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-4 right-4 text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-md">RARE</div>
             <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center mb-4 border border-purple-200">
               <Key className="text-purple-500" size={36} />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-1">Secret Case</h3>
             <p className="text-sm text-gray-500 mb-4 h-10">Access a hidden legendary mystery case.</p>
             <div className="flex bg-gray-50 rounded-lg p-3 w-full justify-between items-center mb-4">
                 <span className="text-xs font-bold text-gray-500 uppercase">Cost</span>
                 <span className="font-black text-yellow-500 flex items-center gap-1"><Diamond size={16}/> 1,000</span>
             </div>
             <button className="w-full bg-gray-100 text-gray-400 cursor-not-allowed font-bold py-2.5 rounded-xl transition flex justify-center gap-2 items-center">
                 <Lock size={18} /> Insufficient Coins
             </button>
          </div>

           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-100 to-cyan-100 flex items-center justify-center mb-4 border border-indigo-200">
               <User className="text-indigo-500" size={36} />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-1">Exclusive Avatar</h3>
             <p className="text-sm text-gray-500 mb-4 h-10">A custom animated detective profile picture.</p>
             <div className="flex bg-gray-50 rounded-lg p-3 w-full justify-between items-center mb-4">
                 <span className="text-xs font-bold text-gray-500 uppercase">Cost</span>
                  <span className="font-black text-yellow-500 flex items-center gap-1"><Diamond size={16}/> 300</span>
             </div>
             <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition">
                 Redeem Avatar
             </button>
          </div>
      </div>
    </div>
  );
}
