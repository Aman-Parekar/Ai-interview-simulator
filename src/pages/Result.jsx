import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  HiOutlineArrowPath,
  HiOutlineArrowDownTray,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
  HiOutlineHome,
} from 'react-icons/hi2';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import CircularScore from '../components/CircularScore';
import ChartCard from '../components/ChartCard';
import EmptyState from '../components/EmptyState';
import { scoreColor, scoreLabel, formatDate } from '../utils/helpers';
import { fireConfetti } from '../utils/confetti';

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useInterview();
  const { toast } = useToast();

  const session = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return state.history.find((s) => s.id === id);
  }, [location.state, state.history, id]);

  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (location.state?.isNew && session) {
      fireConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return (
      <EmptyState
        title="Result not found"
        message="We couldn't find that interview report. It may have been cleared."
        action={<Link to="/interviews" className="btn-primary">Start a new interview</Link>}
      />
    );
  }

  const breakdown = session.breakdown || {};
  const radarData = Object.entries(breakdown).map(([k, v]) => ({ subject: k, value: v }));
  const sorted = [...radarData].sort((a, b) => b.value - a.value);
  const strengths = sorted.slice(0, 2);
  const weaknesses = sorted.slice(-2);

  const recommendations = useMemo(() => {
    const recs = {
      Communication: 'Practice explaining concepts aloud; record yourself and review.',
      'Problem Solving': 'Drill more algorithm problems and break problems into steps before coding.',
      'Technical Depth': 'Review core fundamentals and edge cases for your chosen stack.',
      Confidence: 'Slow down and structure answers; mock with a peer to build poise.',
      Structure: 'Use frameworks like STAR for behavioral and a clear plan for coding.',
    };
    return weaknesses.map((w) => ({ topic: w.subject, tip: recs[w.subject] || 'Keep practicing.' }));
  }, [weaknesses]);

  const downloadReport = () => {
    const lines = [
      'INTERVIEW SIMULATOR — REPORT',
      '============================',
      `Date: ${formatDate(session.date)}`,
      `Category: ${session.categoryName}`,
      `Difficulty: ${session.difficulty}`,
      `Duration: ${session.duration} min`,
      `Questions: ${session.count}`,
      `Answered: ${session.answered}`,
      `Overall Score: ${session.score}/100 (${scoreLabel(session.score)})`,
      '',
      'Performance Breakdown:',
      ...Object.entries(breakdown).map(([k, v]) => `  - ${k}: ${v}/100`),
      '',
      'Strengths:',
      ...strengths.map((s) => `  - ${s.subject}: ${s.value}`),
      '',
      'Areas to Improve:',
      ...weaknesses.map((w) => `  - ${w.subject}: ${w.value}`),
      '',
      'Recommended Topics:',
      ...recommendations.map((r) => `  - ${r.topic}: ${r.tip}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-report-${session.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    toast('Report downloaded', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card relative overflow-hidden p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <CircularScore score={session.score} />
            <div className="text-center sm:text-left">
              <span className="chip bg-brand-500/15 text-brand-300">{session.categoryName}</span>
              <h1 className="mt-2 font-display text-3xl font-800 text-slate-50">
                {scoreLabel(session.score)}
              </h1>
              <p className="text-slate-400">
                {formatDate(session.date)} · {session.duration} min · {session.answered}/{session.count} answered
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => navigate('/interviews')} className="btn-primary">
              <HiOutlineArrowPath className="h-4 w-4" /> Restart interview
            </button>
            <button onClick={downloadReport} className="btn-outline">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              {downloaded ? 'Downloaded' : 'Download report'}
            </button>
            <Link to="/dashboard" className="btn-ghost">
              <HiOutlineHome className="h-4 w-4" /> Dashboard
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Charts + breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Performance radar" subtitle="Your scores across key dimensions">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke="#598dff"
                  fill="#598dff"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Performance breakdown" subtitle="Dimension-by-dimension scores">
          <div className="space-y-3">
            {radarData.map((d) => (
              <div key={d.subject}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{d.subject}</span>
                  <span className={`font-700 ${scoreColor(d.value)}`}>{d.value}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={`h-full rounded-full ${d.value >= 75 ? 'bg-gradient-to-r from-success-500 to-emerald-400' : d.value >= 50 ? 'bg-gradient-to-r from-warning-500 to-amber-400' : 'bg-gradient-to-r from-error-500 to-rose-400'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Strengths & weaknesses */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="flex items-center gap-2 text-base font-700 text-slate-100">
            <HiOutlineCheckCircle className="h-5 w-5 text-success-400" /> Strengths
          </h3>
          <div className="mt-3 space-y-2">
            {strengths.map((s) => (
              <div key={s.subject} className="flex items-center justify-between rounded-xl bg-success-500/10 p-3">
                <span className="text-sm font-600 text-slate-100">{s.subject}</span>
                <span className={`text-sm font-700 ${scoreColor(s.value)}`}>{s.value}/100</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="flex items-center gap-2 text-base font-700 text-slate-100">
            <HiOutlineExclamationTriangle className="h-5 w-5 text-warning-400" /> Weaknesses
          </h3>
          <div className="mt-3 space-y-2">
            {weaknesses.map((w) => (
              <div key={w.subject} className="flex items-center justify-between rounded-xl bg-warning-500/10 p-3">
                <span className="text-sm font-600 text-slate-100">{w.subject}</span>
                <span className={`text-sm font-700 ${scoreColor(w.value)}`}>{w.value}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-5">
        <h3 className="flex items-center gap-2 text-base font-700 text-slate-100">
          <HiOutlineSparkles className="h-5 w-5 text-brand-400" /> Recommended topics
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {recommendations.map((r) => (
            <div key={r.topic} className="rounded-xl bg-white/5 p-4">
              <p className="text-sm font-700 text-slate-100">{r.topic}</p>
              <p className="mt-1 text-sm text-slate-400">{r.tip}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/interviews" className="btn-primary">
            <HiOutlineArrowPath className="h-4 w-4" /> Practice again
          </Link>
          <Link to="/coding" className="btn-outline">Try a coding challenge</Link>
        </div>
      </div>
    </div>
  );
}
