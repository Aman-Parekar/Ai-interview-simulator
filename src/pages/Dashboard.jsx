import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineFire,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineTrophy,
  HiOutlineSparkles,
  HiOutlinePlayCircle,
} from 'react-icons/hi2';
import { useInterview } from '../context/InterviewContext';
import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';
import InterviewCard from '../components/InterviewCard';
import EmptyState from '../components/EmptyState';
import { categories } from '../data/categories';
import DynamicIcon from '../components/DynamicIcon';
import { formatDate } from '../utils/helpers';

export default function Dashboard() {
  const { state } = useInterview();
  const avgScore = state.history.length
    ? Math.round(state.history.reduce((a, s) => a + s.score, 0) / state.history.length)
    : 0;
  const recent = state.history.slice(0, 3);

  const dailyCategory = categories[new Date().getDate() % categories.length];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card relative overflow-hidden p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="chip bg-brand-500/15 text-brand-300">
              <HiOutlineSparkles className="h-3.5 w-3.5" />
              Welcome back
            </span>
            <h1 className="mt-3 font-display text-3xl font-800 text-slate-50">
              Hi, {state.profile.name.split(' ')[0]} 👋
            </h1>
            <p className="mt-1 max-w-md text-slate-400">
              {state.history.length === 0
                ? "Let's get you warmed up — your first mock interview is one click away."
                : `You've completed ${state.history.length} interviews with an average score of ${avgScore}.`}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/interviews" className="btn-primary">
                <HiOutlinePlayCircle className="h-5 w-5" />
                Quick Start
              </Link>
              <Link to="/coding" className="btn-outline">
                Practice Coding
              </Link>
            </div>
          </div>

          <div className="flex shrink-0 gap-4">
            <div className="card p-4 text-center">
              <HiOutlineFire className="mx-auto h-7 w-7 text-orange-400" />
              <p className="mt-2 text-2xl font-800 text-slate-50">{state.streak.count}</p>
              <p className="text-xs text-slate-500">day streak</p>
            </div>
            <div className="card p-4 text-center">
              <HiOutlineTrophy className="mx-auto h-7 w-7 text-warning-400" />
              <p className="mt-2 text-2xl font-800 text-slate-50">{state.streak.longestStreak}</p>
              <p className="text-xs text-slate-500">longest</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard icon="HiOutlineCheckCircle" label="Interviews completed" value={state.history.length} color="from-brand-500 to-accent-500" delay={0} />
        <StatsCard icon="HiOutlineChartBar" label="Average score" value={avgScore || '—'} color="from-emerald-500 to-teal-600" delay={0.05} />
        <StatsCard icon="HiOutlineBookmark" label="Bookmarked" value={state.bookmarks.length} color="from-violet-500 to-fuchsia-600" delay={0.1} />
        <StatsCard icon="HiOutlineCodeBracket" label="Coding solved" value={state.codingSolved.length} color="from-orange-500 to-red-600" delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent interviews */}
        <div className="lg:col-span-2">
          <SectionTitle title="Recent interviews" to="/results" />
          {recent.length === 0 ? (
            <EmptyState
              title="No interviews yet"
              message="Start your first mock interview to see your history and scores here."
              action={
                <Link to="/interviews" className="btn-primary">
                  Start Interview
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {recent.map((s, i) => (
                <InterviewCard key={s.id} session={s} index={i} />
              ))}
            </div>
          )}

          {/* Progress */}
          <div className="mt-6">
            <SectionTitle title="Interview progress" />
            <div className="card p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Goal: 10 interviews this month</span>
                <span className="font-700 text-slate-200">
                  {Math.min(state.history.length, 10)} / 10
                </span>
              </div>
              <ProgressBar value={state.history.length} max={10} className="mt-3" />
            </div>
          </div>
        </div>

        {/* Daily challenge */}
        <div className="space-y-6">
          <div>
            <SectionTitle title="Daily challenge" />
            <div className="card relative overflow-hidden p-5">
              <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${dailyCategory.color} text-white`}>
                <DynamicIcon name={dailyCategory.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-700 text-slate-100">{dailyCategory.name} challenge</h3>
              <p className="mt-1 text-sm text-slate-400">
                A fresh {dailyCategory.name.toLowerCase()} question every day. Keep your streak alive!
              </p>
              <Link
                to={`/interviews?category=${dailyCategory.id}&daily=1`}
                className="btn-primary mt-4 w-full"
              >
                Take today's challenge
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <SectionTitle title="Upcoming practice" />
            <div className="card divide-y divide-white/5">
              {categories.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/interviews?category=${c.id}`}
                  className="flex items-center gap-3 p-4 hover:bg-white/5"
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${c.color} text-white`}>
                    <DynamicIcon name={c.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-600 text-slate-100">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">{c.topics.slice(0, 2).join(', ')}</p>
                  </div>
                  <HiOutlineClock className="h-4 w-4 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, to }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-700 text-slate-100">{title}</h2>
      {to && (
        <Link to={to} className="text-sm text-brand-300 hover:text-brand-200">
          View all
        </Link>
      )}
    </div>
  );
}
