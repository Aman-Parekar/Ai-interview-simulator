import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlinePlayCircle, HiOutlineClock, HiOutlineFunnel } from 'react-icons/hi2';
import { categories, difficulties, durations } from '../data/categories';
import { questions as allQuestions } from '../data/questions';
import CategoryCard from '../components/CategoryCard';
import EmptyState from '../components/EmptyState';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';

export default function ChooseInterview() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || 'all');
  const [difficulty, setDifficulty] = useState(params.get('difficulty') || 'all');
  const [duration, setDuration] = useState(Number(params.get('duration')) || 30);

  useEffect(() => {
    const next = {};
    if (category !== 'all') next.category = category;
    if (difficulty !== 'all') next.difficulty = difficulty;
    if (duration !== 30) next.duration = duration;
    if (query) next.q = query;
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, difficulty, duration, query]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      if (category !== 'all' && q.category !== category) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      if (query) {
        const hay = `${q.question} ${q.tags?.join(' ')}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [category, difficulty, query]);

  const start = () => {
    const pool = filtered.length ? filtered : allQuestions;
    const selected = pool[0]?.category || category;
    if (pool.length === 0) {
      toast('No questions match your filters. Try widening them.', 'error');
      return;
    }
    const dur = durations.find((d) => d.id === duration) || durations[1];
    navigate('/interview/run', {
      state: {
        category: selected,
        difficulty,
        duration: dur.id,
        count: dur.questions,
        daily: params.get('daily') === '1',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">Choose your interview</h1>
        <p className="mt-1 text-slate-400">Pick a category, difficulty, and duration — then start your timed mock.</p>
      </div>

      {/* Search + filters */}
      <div className="card p-4">
        <div className="relative">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions or tags…"
            className="input pl-9"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <FilterGroup label="Difficulty" icon={<HiOutlineFunnel className="h-4 w-4" />}>
            <Chip active={difficulty === 'all'} onClick={() => setDifficulty('all')}>All</Chip>
            {difficulties.map((d) => (
              <Chip key={d.id} active={difficulty === d.id} onClick={() => setDifficulty(d.id)} className={difficulty === d.id ? d.color : ''}>
                {d.name}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Duration" icon={<HiOutlineClock className="h-4 w-4" />}>
            {durations.map((d) => (
              <Chip key={d.id} active={duration === d.id} onClick={() => setDuration(d.id)}>
                {d.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Quick filters">
            <Chip active={category === 'all'} onClick={() => setCategory('all')}>All topics</Chip>
            <Chip active={category === 'react'} onClick={() => setCategory('react')}>React</Chip>
            <Chip active={category === 'system-design'} onClick={() => setCategory('system-design')}>System Design</Chip>
          </FilterGroup>
        </div>
      </div>

      {/* Categories grid */}
      <div>
        <h2 className="mb-3 text-base font-700 text-slate-100">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <button
            onClick={() => setCategory('all')}
            className={`card p-5 text-left transition hover:ring-1 hover:ring-brand-400/40 ${category === 'all' ? 'ring-1 ring-brand-400/50' : ''}`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 text-white">
              <HiOutlineFunnel className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-700 text-slate-100">All topics</h3>
            <p className="mt-1 text-sm text-slate-400">Mix questions from every category.</p>
          </button>
          {categories.map((c, i) => (
            <div key={c.id} className={category === c.id ? 'rounded-2xl ring-1 ring-brand-400/50' : ''}>
              <CategoryCard category={c} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Matching questions preview */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-700 text-slate-100">Matching questions</h2>
            <p className="text-sm text-slate-500">
              {filtered.length} question{filtered.length === 1 ? '' : 's'} match your filters.
            </p>
          </div>
          <button onClick={start} className="btn-primary">
            <HiOutlinePlayCircle className="h-5 w-5" />
            Start {durations.find((d) => d.id === duration)?.label} interview
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <EmptyState title="No questions found" message="Try removing a filter or searching for something broader." />
          ) : (
            filtered.slice(0, 6).map((q) => (
              <div key={q.id} className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="line-clamp-1 text-sm text-slate-200">{q.question}</p>
                  <span className="chip shrink-0 bg-white/5 text-slate-400 capitalize">{q.difficulty}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{q.tags?.map((t) => `#${t}`).join(' ')}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, icon, children }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, className = '', children }) {
  return (
    <button
      onClick={onClick}
      className={`chip transition ${
        active ? 'bg-brand-500/20 text-white ring-1 ring-brand-400/40' : 'bg-white/5 text-slate-400 hover:bg-white/10'
      } ${className}`}
    >
      {children}
    </button>
  );
}
