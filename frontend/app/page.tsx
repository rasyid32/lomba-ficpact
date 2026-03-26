"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, Users, Gift, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Image src="/logo-eduplay.png" alt="EDUPLAYVERSE" width={64} height={64} />
            <span className="text-xl font-bold text-slate-900">EDUPLAYVERSE</span>
          </motion.div>

          {/* Desktop Menu + Auth Buttons */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-slate-600 hover:text-slate-900 transition font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection("cta")} className="text-slate-600 hover:text-slate-900 transition font-medium">
              Why Us
            </button>
            <button
              onClick={() => router.push("/auth?mode=login")}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth?mode=register")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                <button onClick={() => scrollToSection("features")} className="text-left text-slate-600 hover:text-slate-900 py-2">
                  Features
                </button>
                <button onClick={() => scrollToSection("cta")} className="text-left text-slate-600 hover:text-slate-900 py-2">
                  Why Us
                </button>
                <button
                  onClick={() => router.push("/auth?mode=login")}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth?mode=register")}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
              >
                Master Your Skills<br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Through Fun Learning
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Practice thousands of subject problems, earn rewards, compete on the leaderboard, and excel in your academic journey. Join thousands of senior high school students preparing for excellence.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button
                  onClick={() => router.push("/auth?mode=register")}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition font-semibold"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center"
            >
              <Image 
                src="/landing-page.png" 
                alt="EDUPLAYVERSE Learning" 
                width={500} 
                height={500}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="features" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose EDUPLAYVERSE?
            </h2>
            <p className="text-lg text-slate-600">
              The ultimate platform for senior high school students to excel in their studies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Problems",
                description: "Access thousands of practice problems across all subjects and difficulty levels tailored for senior high school curriculum",
              },
              {
                icon: Trophy,
                title: "Compete & Rank",
                description: "Climb the weekly leaderboard, compete with peers, and showcase your mastery across subjects",
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Connect with thousands of students, share solutions, discuss approaches, and learn together",
              },
              {
                icon: Gift,
                title: "Rewards System",
                description: "Earn coins for each problem solved and redeem them for exclusive study materials and perks",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition"
                >
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section id="cta" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 md:p-16 text-center text-white shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of senior high school students who are achieving their academic goals. Start practicing, earning rewards, and climbing the leaderboard today.
            </p>
            <button
              onClick={() => router.push("/auth?mode=register")}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-50 transition font-bold shadow-lg hover:shadow-xl"
            >
              Create Your Free Account
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo-eduplay.png" alt="EDUPLAYVERSE" width={48} height={48} />
            <span className="font-bold text-white">EDUPLAYVERSE</span>
          </div>
          <p className="text-sm">
            © 2026 EDUPLAYVERSE. Gamified Learning Platform for Students.
          </p>
          <div className="flex gap-6 text-sm">
            <button onClick={() => scrollToSection("features")} className="hover:text-white transition">
              Features
            </button>
            <button onClick={() => router.push("/auth")} className="hover:text-white transition">
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
