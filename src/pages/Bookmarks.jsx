import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookmark, HiOutlineStar, HiOutlineMagnifyingGlass, HiOutlinePlayCircle } from 'react-icons/hi2';
import { questions as allQuestions } from '../data/questions';
import { categories, difficulties } from '../data/categories';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';
import DynamicIcon from '../components/DynamicIcon';

export default function Bookmarks() {
  const { state, toggleBookmark, toggleFavorite } = useInterview();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('bookmarks');

  const ids = tab === 'bookmarks' ? state.bookmarks : state.favorites;
  const items = useMemo(() => {
    return allQuestions
      .filter((q) => ids.includes(q.id))
      .filter((q) => (query ? q.question.toLowerCase().includes(query.toLowerCase()) : true));
  }, [ids, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">Saved questions</h1>
        <p className="mt-1 text-slate-400">Review your bookmarked and favorite questions before your next interview.</p>
      </div>

      <div className="card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('bookmarks')}
              className={`chip ${tab === 'bookmarks' ? 'bg-brand-500/20 text-white ring-1 ring-brand-400/40' : 'bg-white/5 text-slate-400'}`}
            >
              <HiOutlineBookmark className="h-4 w-4" /> Bookmarks ({state.bookmarks.length})
            </button>
            <button
              onClick={() => setTab('favorites')}
              className={`chip ${tab === 'favorites' ? 'bg-brand-500/20 text-white ring-1 ring-brand-400/40' : 'bg-white/5 text-slate-400'}`}
            >
              <HiOutlineStar className="h-4 w-4" /> Favorites ({state.favorites.length})
            </button>
          </div>
          <div className="relative">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter…"
              className="input w-44 pl-9"
            />
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={`No ${tab} yet`}
          message="While taking an interview, use the bookmark or favorite buttons to save questions for later."
          action={<Link to="/interviews" className="btn-primary"><HiOutlinePlayCircle className="h-4 w-4" /> Start an interview</Link>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((q, i) => {
            const cat = categories.find((c) => c.id === q.category);
            const diff = difficulties.find((d) => d.id === q.difficulty);
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    {cat && <DynamicIcon name={cat.icon} className="h-4 w-4" />}
                    {cat?.name}
                  </span>
                  <span className={`chip ${diff?.bg} ${diff?.color}`}>{diff?.name}</span>
                </div>
                <p className="mt-3 text-sm font-600 text-slate-100">{q.question}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {q.tags?.map((t) => (
                    <span key={t} className="chip bg-white/5 text-slate-400">#{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => { toggleBookmark(q.id); toast('Removed bookmark', 'info'); }}
                    className="btn-outline flex-1"
                  >
                    <HiOutlineBookmark className="h-4 w-4" /> Remove
                  </button>
                  <button
                    onClick={() => { toggleFavorite(q.id); toast(state.favorites.includes(q.id) ? 'Removed favorite' : 'Favorited', 'info'); }}
                    className={`btn-outline ${state.favorites.includes(q.id) ? 'text-warning-400 ring-warning-500/30' : ''}`}
                  >
                    <HiOutlineStar className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
