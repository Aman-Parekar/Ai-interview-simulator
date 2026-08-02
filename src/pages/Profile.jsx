import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlinePencilSquare, HiOutlineChartBar } from 'react-icons/hi2';
import { useInterview } from '../context/InterviewContext';
import ProfileCard from '../components/ProfileCard';
import ChartCard from '../components/ChartCard';
import EmptyState from '../components/EmptyState';
import DynamicIcon from '../components/DynamicIcon';
import { achievements } from '../data/content';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatDate, scoreColor } from '../utils/helpers';

export default function Profile() {
  const { state } = useInterview();
  const earned = achievements.filter((a) => state.achievements.includes(a.id));
  const locked = achievements.filter((a) => !state.achievements.includes(a.id));

  const byCategory = state.history.reduce((acc, s) => {
    acc[s.categoryName] = (acc[s.categoryName] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(byCategory).map(([name, count]) => ({ name, count }));

  const avgScore = state.history.length
    ? Math.round(state.history.reduce((a, s) => a + s.score, 0) / state.history.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard profile={state.profile} />
          <Link to="/settings" className="btn-outline mt-4 w-full">
            <HiOutlinePencilSquare className="h-4 w-4" /> Edit profile
          </Link>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ChartCard title="Interviews by category" subtitle="Where you've been practicing">
            {chartData.length ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis allowDecimals tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15,23,42,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: '#e2e8f0',
                      }}
                    />
                    <Bar dataKey="count" fill="#598dff" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState title="No data yet" message="Complete an interview to see your practice breakdown." />
            )}
          </ChartCard>

          <ChartCard title="Statistics" subtitle="Your practice at a glance">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatBox label="Interviews" value={state.history.length} />
              <StatBox label="Avg score" value={avgScore || '—'} className={avgScore ? scoreColor(avgScore) : ''} />
              <StatBox label="Streak" value={`${state.streak.count}d`} />
              <StatBox label="Coding solved" value={state.codingSolved.length} />
              <StatBox label="Bookmarks" value={state.bookmarks.length} />
              <StatBox label="Favorites" value={state.favorites.length} />
              <StatBox label="Badges" value={earned.length} />
              <StatBox label="Longest streak" value={`${state.streak.longestStreak}d`} />
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="mb-3 text-base font-700 text-slate-100">Achievements</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {earned.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="card flex items-center gap-4 p-5"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white`}>
                <DynamicIcon name={a.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-700 text-slate-100">{a.name}</p>
                <p className="text-sm text-slate-400">{a.description}</p>
              </div>
            </motion.div>
          ))}
          {locked.map((a) => (
            <div key={a.id} className="card flex items-center gap-4 p-5 opacity-50">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-slate-500">
                <DynamicIcon name={a.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-700 text-slate-300">{a.name}</p>
                <p className="text-sm text-slate-500">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent history */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-base font-700 text-slate-100">
          <HiOutlineChartBar className="h-5 w-5" /> Recent interviews
        </h2>
        {state.history.length === 0 ? (
          <EmptyState title="No interviews yet" message="Your completed interviews will appear here." />
        ) : (
          <div className="card divide-y divide-white/5">
            {state.history.slice(0, 8).map((s) => (
              <Link key={s.id} to={`/results/${s.id}`} className="flex items-center justify-between p-4 hover:bg-white/5">
                <div>
                  <p className="text-sm font-600 text-slate-100">{s.categoryName}</p>
                  <p className="text-xs text-slate-500">{formatDate(s.date)} · {s.duration} min</p>
                </div>
                <span className={`text-lg font-800 ${scoreColor(s.score)}`}>{s.score}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, className = '' }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 text-center">
      <p className={`text-xl font-800 text-slate-100 ${className}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
