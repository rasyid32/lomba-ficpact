"use client";

import React, { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, ChevronLeft, BookOpen, Star, HelpCircle, AlertCircle, TimerReset, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { chaptersAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { getChapterData } from "./content";

const CHAPTER_ORDER: Record<string, string[]> = {
  KELAS_10: ['Pertidaksamaan Linear', 'Sistem Persamaan Linear', 'Persamaan Garis Lurus'],
  KELAS_11: ['Logika Matematika', 'Induksi Matematika'],
  KELAS_12: ['Geometri Bidang Datar', 'Geometri Bidang Ruang'],
};

export default function ChapterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const chapterId = unwrappedParams.id;
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [chapter, setChapter] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cooldown states
  const [canAttempt, setCanAttempt] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0); // in ms

  // Next chapter state
  const [nextChapterId, setNextChapterId] = useState<string | null>(null);

  // Reward tracking
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    chaptersAPI.get(chapterId).then(setChapter).catch(console.error);
    fetchQuizStatus();
  }, [chapterId]);

  // Resolve next chapter ID when chapter data is available
  useEffect(() => {
    if (!chapter) return;
    const order = CHAPTER_ORDER[chapter.category];
    if (!order) return;
    const currentIndex = order.indexOf(chapter.title);
    if (currentIndex === -1 || currentIndex >= order.length - 1) {
      setNextChapterId(null);
      return;
    }
    const nextTitle = order[currentIndex + 1];
    chaptersAPI.list(chapter.category).then(siblings => {
      const next = siblings.find((s: any) => s.title === nextTitle);
      setNextChapterId(next ? next.id : null);
    }).catch(() => setNextChapterId(null));
  }, [chapter]);

  const fetchQuizStatus = () => {
    chaptersAPI.getQuizStatus(chapterId).then((res: any) => {
      setCanAttempt(res.canAttempt);
      setCooldownTime(res.cooldownRemaining);
      if (res.rewardClaimed !== undefined) setRewardClaimed(res.rewardClaimed);
    }).catch(console.error);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldownTime(prev => {
        if (prev <= 0) return 0;
        if (prev <= 1000) {
          setCanAttempt(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!chapter) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></div>;

  const { SECTIONS, QUIZ_QUESTIONS, renderContent } = getChapterData(chapter.title);

  const handleNext = () => {
    if (activeStep < SECTIONS.length - 1) setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleQuizSelect = (qIdx: number, oIdx: number) => {
    if (quizSubmitted || !canAttempt) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const submitQuiz = async () => {
    if (Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length) {
      alert("Harap jawab semua soal terlebih dahulu!");
      return;
    }
    setIsSubmitting(true);

    // Evaluate locally first
    let rawScore = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIdx) rawScore += 20;
    });

    try {
      const res = await chaptersAPI.submitQuiz(chapterId, rawScore);
      setQuizScore(rawScore);
      setQuizSubmitted(true);

      if (!res.success) {
        // Triggers cooldown
        setCanAttempt(false);
        setCooldownTime(res.cooldownRemaining);
      }
      if (res.rewardClaimed !== undefined) setRewardClaimed(res.rewardClaimed);

      // Refresh user data to update XP/coins in sidebar
      await refreshUser();
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard/chapters" className="inline-flex items-center font-semibold text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft size={18} className="mr-2" /> Kembali ke Daftar Chapters
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 flex flex-col min-h-[600px]">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 lg:p-10 flex-1 relative flex flex-col">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                {activeStep === 5 ? <HelpCircle size={32} /> : <BookOpen size={32} />}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{chapter.title}</h1>
                <p className="text-slate-500 font-medium">Pembahasan Bab, Logika, Serta Kaidah Dasar</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeStep < 5 && renderContent(activeStep)}

                {/* QUIZ RENDERER */}
                {activeStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Quiz Mastery 🏆</h2>
                      <p className="text-slate-600 text-lg">Pecahkan semua soal dengan benar (100) untuk mendapatkan <strong className="text-amber-500">1000 XP & 500 Coins!</strong></p>
                    </div>

                    {!canAttempt && (
                      <div className="p-8 rounded-2xl mb-8 flex flex-col items-center bg-red-50 border-2 border-red-300 shadow-inner">
                        <TimerReset size={48} className="text-red-500 mb-4 animate-pulse" />
                        <h3 className="text-2xl font-bold text-red-800">Coba Lagi Nanti</h3>
                        <p className="text-red-600 font-medium my-2 text-center">Kamu sedang dalam masa cooldown karena menjawab salah. Pelajari materinya lagi sambil menunggu.</p>
                        <div className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl text-3xl font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                          {formatTime(cooldownTime)}
                        </div>
                      </div>
                    )}

                    {quizSubmitted && (
                      <div className={`p-6 rounded-2xl mb-8 flex flex-col items-center border-2 ${quizScore === 100 ? 'bg-green-50 border-green-500' : 'bg-amber-50 border-amber-400'}`}>
                        {quizScore === 100 ? <Star size={48} className="text-green-500 mb-2 fill-green-500" /> : <AlertCircle size={48} className="text-amber-500 mb-2" />}
                        <h3 className="text-2xl font-bold text-slate-800">Skor: {quizScore}/100</h3>
                        <p className="text-slate-600 mt-2 font-medium text-center">
                          {quizScore === 100
                            ? (rewardClaimed
                                ? "Skor sempurna! Anda sudah mendapatkan reward ini sebelumnya."
                                : "Luar Biasa! Kamu mendapatkan 1000 XP & 500 Coins!")
                            : `Skor belum sempurna. Cooldown telah aktif selama 30 menit!`}
                        </p>
                      </div>
                    )}

                    {(canAttempt || quizSubmitted) && (
                      <div className="space-y-8">
                        {QUIZ_QUESTIONS.map((q, qIdx) => {
                          const isCorrect = quizAnswers[qIdx] === q.correctIdx;
                          const showResult = quizSubmitted;

                          return (
                            <div key={qIdx} className={`p-6 rounded-xl border-2 transition-all ${showResult
                                ? isCorrect ? 'border-green-300 bg-green-50/30' : 'border-red-300 bg-red-50/30'
                                : 'border-slate-200 bg-white hover:border-blue-300'
                              }`}>
                              <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">{qIdx + 1}</div>
                                <div className="w-full text-lg">
                                  <div className="font-semibold text-slate-800 mb-6 w-full flex justify-between items-start">
                                    <span>
                                      {q.question.split('\\(').map((text, i) => {
                                        if (i === 0) return text;
                                        const parts = text.split('\\)');
                                        return <span key={i}><InlineMath math={parts[0]} />{parts[1]}</span>;
                                      })}
                                    </span>
                                    {showResult && (
                                      isCorrect ? <CheckCircle className="text-green-600 ml-2" /> : <XCircle className="text-red-500 ml-2" />
                                    )}
                                  </div>
                                  <div className="space-y-3">
                                    {q.options.map((opt, oIdx) => {
                                      const isSelected = quizAnswers[qIdx] === oIdx;
                                      let btnStyle = "border-slate-200 text-slate-700 hover:bg-slate-50";
                                      if (isSelected && !showResult) btnStyle = "border-blue-500 bg-blue-50 text-blue-800 ring-1 ring-blue-500";
                                      if (showResult && isSelected) {
                                        if (quizAnswers[qIdx] === q.correctIdx) btnStyle = "border-green-500 bg-green-100 text-green-800 font-semibold";
                                        else btnStyle = "border-red-500 bg-red-100 text-red-800";
                                      }
                                      return (
                                        <button
                                          key={oIdx}
                                          onClick={() => handleQuizSelect(qIdx, oIdx)}
                                          disabled={showResult}
                                          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${btnStyle}`}
                                        >
                                          {opt}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {!quizSubmitted && canAttempt && (
                      <button
                        onClick={submitQuiz}
                        disabled={isSubmitting}
                        className="w-full py-5 mt-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xl shadow-lg transition-all"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Kumpulkan Jawaban"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${activeStep === 0 ? "opacity-0 invisible" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
              >
                <ChevronLeft size={20} className="mr-2" /> Sebelumnya
              </button>

              {/* Next Chapter button — shown after quiz submitted on the last step */}
              {activeStep === SECTIONS.length - 1 && quizSubmitted && nextChapterId ? (
                <button
                  onClick={() => quizScore === 100 && router.push(`/dashboard/chapters/${nextChapterId}`)}
                  disabled={quizScore !== 100}
                  className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all ${
                    quizScore === 100
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 hover:scale-[1.03] active:scale-100 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  Chapter Selanjutnya <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all shadow-md ${activeStep === SECTIONS.length - 1 ? "opacity-0 invisible" : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  Selanjutnya <ChevronRight size={20} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 flex-shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-8">
            <h3 className="font-extrabold text-slate-800 text-lg mb-6 flex items-center">🧭 Navigasi Materi</h3>
            <ul className="space-y-2 relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100 -z-10" />
              {SECTIONS.map((section, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx || (idx === 5 && quizSubmitted);
                return (
                  <li key={idx}>
                    <button
                      onClick={() => setActiveStep(idx)}
                      className={`w-full text-left relative flex items-center p-3 rounded-xl transition-all group ${isActive ? "bg-blue-50" : "hover:bg-slate-50"}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 shadow-sm flex-shrink-0 transition-colors z-10 ${isActive ? "bg-blue-600 text-white ring-4 ring-blue-100" : isCompleted ? "bg-green-500 text-white" : "bg-white border text-slate-500"
                        }`}>
                        {isCompleted && !isActive ? <CheckCircle size={16} /> : <span className="text-sm font-bold">{idx + 1}</span>}
                      </div>
                      <span className={`font-medium pr-2 transition-colors ${isActive ? "text-blue-800 font-bold" : "text-slate-600"}`}>
                        {section.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 p-5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white shadow-lg relative">
              <h4 className="font-bold text-lg mb-1 relative z-10">Progres Belajar</h4>
              <p className="text-sm text-blue-100 font-medium mb-3 relative z-10">
                {activeStep === 5 && quizSubmitted ? "Selesai 100%" : `${Math.round((activeStep / SECTIONS.length) * 100)}% Terselesaikan`}
              </p>
              <div className="w-full h-2.5 bg-blue-900/30 rounded-full overflow-hidden relative z-10">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(activeStep / (SECTIONS.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
