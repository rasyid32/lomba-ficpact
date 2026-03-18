"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, GraduationCap, Target, BrainCircuit, Library, Atom, Calculator, Globe, BookText, Code } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // States
  const [goal, setGoal] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [level, setLevel] = useState<string | null>(null);

  const toggleSubject = (s: string) => {
    setSubjects(prev =>
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const nextStep = () => {
    if (step === 3) {
      // Simulate profile creation and redirect
      router.push("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-12 p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100">
           <motion.div 
             className="h-full bg-blue-600"
             initial={{ width: "33%" }}
             animate={{ width: `${(step / 3) * 100}%` }}
             transition={{ duration: 0.5 }}
           />
        </div>

        <div className="p-8 flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="flex-1">
                        <div className="mb-8">
                            <Target className="text-blue-600 mb-4" size={40} />
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">What is your main goal?</h1>
                            <p className="text-slate-500">Pick the main reason you're joining EduPlayVerse.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { id: "school", title: "Improve School Grades", desc: "I want to get better scores at school.", icon: GraduationCap },
                                { id: "competition", title: "Prepare for Competition", desc: "I want to join olympiads & contests.", icon: TrophyIcon },
                                { id: "curiosity", title: "Just Curiosity", desc: "I love learning and solving mysteries.", icon: BrainCircuit }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setGoal(item.id)}
                                    className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                                        goal === item.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-200"
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${goal === item.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-semibold ${goal === item.id ? "text-blue-900" : "text-slate-900"}`}>{item.title}</p>
                                        <p className={`text-sm ${goal === item.id ? "text-blue-700/70" : "text-slate-500"}`}>{item.desc}</p>
                                    </div>
                                    {goal === item.id && <CheckCircle2 className="text-blue-600 mt-2" size={20} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="flex-1">
                        <div className="mb-8">
                            <Library className="text-blue-600 mb-4" size={40} />
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Choose your subjects</h1>
                            <p className="text-slate-500">Select what you'd like to learn. You can pick more than one.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { id: "math", title: "Mathematics", icon: Calculator },
                                { id: "science", title: "Science", icon: Atom },
                                { id: "history", title: "History", icon: Globe },
                                { id: "literature", title: "Literature", icon: BookText },
                                { id: "logic", title: "Logic & Puzzles", icon: BrainCircuit },
                                { id: "programming", title: "Computer Science", icon: Code },
                            ].map((subj) => (
                                <button
                                    key={subj.id}
                                    onClick={() => toggleSubject(subj.id)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 ${
                                        subjects.includes(subj.id) ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-200"
                                    }`}
                                >
                                    <div className={`p-3 rounded-full ${subjects.includes(subj.id) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                        <subj.icon size={24} />
                                    </div>
                                    <span className={`font-medium text-sm ${subjects.includes(subj.id) ? "text-blue-900" : "text-slate-700"}`}>{subj.title}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="flex-1">
                        <div className="mb-8">
                            <BrainCircuit className="text-blue-600 mb-4" size={40} />
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">What is your starting level?</h1>
                            <p className="text-slate-500">We'll tailor the first cases and AI learning path based on this.</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: "beginner", title: "New Learner", desc: "Just starting out. Take it easy!" },
                                { id: "intermediate", title: "Intermediate", desc: "I know the basics, ready for some challenge." },
                                { id: "advanced", title: "Expert", desc: "Give me the legendary boss cases directly." }
                            ].map((lvl) => (
                                <button
                                    key={lvl.id}
                                    onClick={() => setLevel(lvl.id)}
                                    className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                                        level === lvl.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-200"
                                    }`}
                                >
                                    <div className="text-left">
                                        <p className={`font-semibold ${level === lvl.id ? "text-blue-900" : "text-slate-900"}`}>{lvl.title}</p>
                                        <p className={`text-sm mt-1 ${level === lvl.id ? "text-blue-700/70" : "text-slate-500"}`}>{lvl.desc}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${level === lvl.id ? "border-blue-600" : "border-slate-300"}`}>
                                        {level === lvl.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-10 flex gap-4">
                {step > 1 && (
                    <button 
                       onClick={() => setStep(step - 1)}
                       className="px-6 py-3 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                        Back
                    </button>
                )}
                <button
                    onClick={nextStep}
                    disabled={(step === 1 && !goal) || (step === 2 && subjects.length === 0) || (step === 3 && !level)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {step === 3 ? "Complete Profile" : "Continue"} 
                    {step < 3 && <ChevronRight size={18} />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
