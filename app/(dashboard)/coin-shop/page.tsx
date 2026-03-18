"use client";

import { CircleDollarSign, Ghost, Rabbit, HelpCircle, UserPlus, Gift } from "lucide-react";

export default function CoinShopPage() {
  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coin Shop</h1>
      </div>

      {/* Coin Exchange */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Coin Exchange
          </h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {[ 
                { q: "1x", coin: 20 },
                { q: "3x", coin: 50 },
                { q: "5x", coin: 80 },
                { q: "10x", coin: 150 },
                { q: "15x", coin: 200 }
             ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 min-w-35 shadow-sm">
                <span className="font-bold text-gray-800 mb-2">{item.q} Hint</span>
                <span className="flex items-center gap-1 font-bold text-gray-600 mb-3 text-sm">
                  <CircleDollarSign size={16} className="text-gray-400" /> {item.coin} Coin
                </span>
                <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition">
                  Exchange <span className="text-gray-400">&rarr;</span>
                </button>
              </div>
            ))}
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">More</p>
        </div>
      </div>

      {/* Change Avatar */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-800">Change Avatar</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {[
                { icon: Ghost, status: "Use", coin: null },
                { icon: Rabbit, status: "Use", coin: null },
                { icon: UserPlus, status: "Locked", coin: 80 },
                { icon: UserPlus, status: "Locked", coin: 80 },
                { icon: UserPlus, status: "Locked", coin: 80 },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
              <div key={i} className={`flex flex-col items-center justify-center ${item.coin ? 'bg-gray-100/50 opacity-70' : 'bg-gray-100'} rounded-xl p-6 min-w-35 shadow-sm`}>
                {item.coin && (
                    <span className="flex items-center gap-1 font-medium text-gray-500 mb-2 text-xs">
                        <CircleDollarSign size={14} /> {item.coin} Coin
                    </span>
                )}
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
                    <Icon size={32} className="text-gray-500" />
                </div>
                <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition">
                  {item.status} Avatar <span className="text-gray-400">&rarr;</span>
                </button>
              </div>
            )})}
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">More</p>
        </div>
      </div>
    </div>
  );
}
