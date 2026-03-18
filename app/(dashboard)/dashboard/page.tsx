import Link from "next/link";
import { Flame, CircleDollarSign, Trophy } from "lucide-react";

/* ─── Feature Card ─── */
function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>

      {/* Image placeholder */}
      <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-gray-100">
        <svg
          width="64"
          height="64"
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

      <p className="mt-4 text-sm text-gray-500 leading-relaxed">{description}</p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-full bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        Let&apos;s Start &nbsp;→
      </Link>
    </div>
  );
}

/* ─── Progress Card ─── */
function ProgressCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}

/* ─── Dashboard Page ─── */
export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* ── Top: Feature Cards ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <FeatureCard
          title="Daily Case"
          description="Sharpen your skills with a new real-world case every day. Solve challenges and earn XP
 to climb the leaderboard."
          href="/daily-case"
        />
        <FeatureCard
          title="Personal Learning Path AI"
          description="Let our AI craft a personalized learning journey based on your strengths, weaknesses, and goals."
          href="/dashboard/learning-path"
        />
      </div>

      {/* ── Bottom: Progress Tracker ── */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Progress Tracker
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card A: Current Level */}
          <ProgressCard>
            <Trophy size={36} className="text-amber-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Current Level
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">Rookie</p>

            {/* XP progress bar */}
            <div className="mt-4 w-full">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>1,250 XP</span>
                <span>2,000 XP</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-100">
                <div
                  className="h-2.5 rounded-full bg-blue-600 transition-all"
                  style={{ width: "62.5%" }}
                />
              </div>
            </div>
          </ProgressCard>

          {/* Card B: Mystery Coins */}
          <ProgressCard>
            <CircleDollarSign size={36} className="text-yellow-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Mystery Coins
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900">450</p>
            <p className="text-sm text-gray-500">Coins</p>
          </ProgressCard>

          {/* Card C: Daily Streak */}
          <ProgressCard>
            <Flame size={36} className="text-orange-500 mb-3" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Daily Streak
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-500">Day Streak!</p>
          </ProgressCard>
        </div>
      </section>
    </div>
  );
}
