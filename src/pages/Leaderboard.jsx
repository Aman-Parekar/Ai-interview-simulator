import { motion } from 'framer-motion';
import { HiOutlineTrophy, HiOutlineFire, HiOutlineCheckCircle } from 'react-icons/hi2';
import { leaderboard } from '../data/content';
import { useInterview } from '../context/InterviewContext';

const medal = ['from-yellow-400 to-amber-500', 'from-slate-300 to-slate-400', 'from-orange-400 to-amber-600'];

export default function Leaderboard() {
  const { state } = useInterview();
  const rows = leaderboard.map((r) =>
    r.isYou ? { ...r, score: state.history.reduce((a, s) => a + s.score, 0), interviews: state.history.length, streak: state.streak.count } : r,
  );
  rows.sort((a, b) => b.score - a.score);
  rows.forEach((r, i) => (r.rank = i + 1));

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">Leaderboard</h1>
        <p className="mt-1 text-slate-400">See how you stack up against other engineers this week. (Mock data.)</p>
      </div>

      {/* Podium */}
      <div className="grid gap-4 sm:grid-cols-3">
        {top3.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`card relative overflow-hidden p-6 text-center ${i === 0 ? 'sm:-mt-4' : ''}`}
          >
            {i === 0 && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent" />}
            <div className="relative">
              <span className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${medal[i]} text-white text-2xl font-800`}>
                {r.rank}
              </span>
              <img src={r.avatar} alt={r.name} className="mx-auto mt-3 h-14 w-14 rounded-xl object-cover" />
              <p className="mt-2 font-700 text-slate-100">{r.name}</p>
              <p className="text-2xl font-800 text-gradient">{r.score.toLocaleString()}</p>
              <div className="mt-2 flex justify-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><HiOutlineCheckCircle className="h-3.5 w-3.5" /> {r.interviews}</span>
                <span className="flex items-center gap-1"><HiOutlineFire className="h-3.5 w-3.5" /> {r.streak}d</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-2 border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span className="col-span-1">#</span>
          <span className="col-span-5">Engineer</span>
          <span className="col-span-2 text-right">Score</span>
          <span className="col-span-2 text-right">Interviews</span>
          <span className="col-span-2 text-right">Streak</span>
        </div>
        {rest.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`grid grid-cols-12 items-center gap-2 px-5 py-3 text-sm ${r.isYou ? 'bg-brand-500/10 ring-1 ring-brand-400/20' : 'hover:bg-white/5'}`}
          >
            <span className="col-span-1 font-700 text-slate-400">{r.rank}</span>
            <span className="col-span-5 flex items-center gap-3">
              <img src={r.avatar} alt="" className="h-8 w-8 rounded-lg object-cover" />
              <span className={`font-600 ${r.isYou ? 'text-brand-300' : 'text-slate-100'}`}>
                {r.name}{r.isYou && <span className="ml-1 text-xs text-slate-500">(you)</span>}
              </span>
            </span>
            <span className="col-span-2 text-right font-700 text-slate-100">{r.score.toLocaleString()}</span>
            <span className="col-span-2 text-right text-slate-400">{r.interviews}</span>
            <span className="col-span-2 text-right text-slate-400">{r.streak}d</span>
          </motion.div>
        ))}
      </div>

      <div className="card flex items-center gap-3 p-4 text-sm text-slate-400">
        <HiOutlineTrophy className="h-5 w-5 text-warning-400" />
        Complete more interviews to climb the ranks. Your score updates automatically.
      </div>
    </div>
  );
}
