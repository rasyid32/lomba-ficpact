"use client";

import Link from "next/link";
import { Book, PlayCircle, Trophy, Award, Lock, ArrowRight } from "lucide-react";

export default function ChaptersPage() {
  const subjects = [
    { title: "Mathematics", desc: "Algebra, Calculus, and Geometry challenges", icon: Book, active: true },
    { title: "Science", desc: "Physics and Chemistry mysteries", icon: Award, active: false },
    { title: "History", desc: "Uncover historical events and artifacts", icon: Trophy, active: false },
  ];

  const chapters = [
    { title: "Chapter 1", desc: "Introduction to Calculus", locked: false },
    { title: "Chapter 2", desc: "Derivative Rules", locked: false },
    { title: "Chapter 3", desc: "Integration Applications", locked: true },
    { title: "Chapter 4", desc: "Differential Equations", locked: true },
    { title: "Chapter 5", desc: "Limits and Sequences", locked: true },
    { title: "Chapter 6", desc: "Boss Case: The Mathematician's Vault", locked: true, isBoss: true },
  ];

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chapters & Journey</h1>
        <p className="text-gray-600">Select a subject and dive into the mystery of learning.</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((s, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${s.active ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-white'} relative overflow-hidden transition-all hover:shadow-md cursor-pointer`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 mb-6">{s.desc}</p>
                </div>
                <div className={`p-3 rounded-xl ${s.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <s.icon size={24} />
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: s.active ? '45%' : '0%' }}></div>
              </div>
              <p className="text-xs text-right text-gray-500 font-medium">{s.active ? '45% Completed' : '0% Completed'}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Math Chapter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((ch, i) => (
            <div key={i} className={`rounded-2xl border ${ch.locked ? 'bg-gray-50/50 border-gray-100' : ch.isBoss ? 'bg-amber-50/30 border-amber-200' : 'bg-white border-gray-200'} p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-md`}>
              <div className={`w-full aspect-video rounded-xl mb-4 flex items-center justify-center ${ch.locked ? 'bg-gray-100' : ch.isBoss ? 'bg-amber-100/50' : 'bg-blue-50'}`}>
                {ch.locked ? (
                  <Lock className="text-gray-300" size={32} />
                ) : ch.isBoss ? (
                  <Trophy className="text-amber-500" size={40} />
                ) : (
                  <Book className="text-blue-400" size={32} />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                 <h3 className={`font-bold ${ch.isBoss ? 'text-amber-700' : 'text-gray-900'}`}>{ch.title}</h3>
                 {ch.isBoss && <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-md font-bold">BOSS</span>}
              </div>
              <p className="text-sm text-gray-500 mb-6 flex-1">{ch.desc}</p>
              
              <button 
                disabled={ch.locked}
                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors ${ch.locked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
              >
                {ch.locked ? 'Locked' : 'Let\'s Start'} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
