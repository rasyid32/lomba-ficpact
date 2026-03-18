"use client";

import { Users, TrendingUp, Trophy, MessageSquare } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Spotlight</h1>
        <p className="text-gray-600">Discover new communities to accelerate your EXP gain and boost your reputation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
              <Users className="text-gray-400" size={32} />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">LOREM IPSUM</h2>
            <p className="text-xs text-gray-500 mb-4 uppercase">LOREM IPSUM DOLOR SIT AMET</p>
            <button className="w-full bg-gray-200 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-300 transition text-sm">
              Join Community
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Communities</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gray-100 flex items-center justify-center relative">
                    <div className="absolute -bottom-5 left-4 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <MessageSquare size={20} className="text-gray-400" />
                    </div>
                </div>
                <div className="p-4 pt-8 bg-gray-300/40">
                    <h3 className="font-bold text-gray-900 mb-1">LOREM IPSUM</h3>
                    <p className="text-xs text-gray-600 mb-4">LOREM IPSUM DOLOR SIT</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex -space-x-2">
                             <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                             <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                             <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                        </div>
                        <span>ACTIVE NOW</span>
                    </div>
                </div>
            </div>
            ))}
        </div>

        <div className="bg-gray-300/50 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <h3 className="font-bold text-gray-900 mb-2">Can't find your tribe?</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">Launch a New Headquarters. Set your goals, recruit partners, and level up as a team.</p>
          <button className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
}
