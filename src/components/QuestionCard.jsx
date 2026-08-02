import { motion } from 'framer-motion';
import { HiOutlineBookmark, HiOutlineFlag, HiOutlineLightBulb } from 'react-icons/hi2';
import { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';

export default function QuestionCard({ question, index, total }) {
  const { state, toggleBookmark } = useInterview();
  const { toast } = useToast();
  const [showHint, setShowHint] = useState(false);
  const bookmarked = state.bookmarks.includes(question.id);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between">
        <span className="chip bg-white/5 text-slate-400">
          Question {index + 1} of {total}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              toggleBookmark(question.id);
              toast(bookmarked ? 'Removed bookmark' : 'Bookmarked question', 'info');
            }}
            className={`btn-ghost px-2 py-1.5 ${bookmarked ? 'text-brand-300' : ''}`}
            aria-label="Bookmark"
            title="Bookmark"
          >
            <HiOutlineBookmark className="h-4 w-4" />
          </button>
          <button
            onClick={() => toast('Question flagged for review', 'info')}
            className="btn-ghost px-2 py-1.5"
            aria-label="Flag"
            title="Flag for review"
          >
            <HiOutlineFlag className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="chip bg-white/5 text-slate-300 capitalize">{question.difficulty}</span>
        {question.tags?.map((t) => (
          <span key={t} className="chip bg-brand-500/10 text-brand-300">
            #{t}
          </span>
        ))}
      </div>

      <h2 className="mt-4 text-xl font-600 leading-snug text-slate-100 sm:text-2xl">
        {question.question}
      </h2>

      {question.hints?.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-warning-400 hover:text-warning-300"
          >
            <HiOutlineLightBulb className="h-4 w-4" />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          {showHint && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 space-y-1 text-sm text-slate-400"
            >
              {question.hints.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-warning-400">•</span>
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      )}
    </motion.div>
  );
}
