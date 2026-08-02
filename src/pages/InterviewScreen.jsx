import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineFlag,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlinePlayCircle,
} from 'react-icons/hi2';
import { questions as allQuestions } from '../data/questions';
import { categories } from '../data/categories';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import { useCountdown } from '../hooks/useCountdown';
import { pickRandom, uid } from '../utils/helpers';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

export default function InterviewScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recordInterview, toggleBookmark, state } = useInterview();
  const { toast } = useToast();

  const cfg = location.state || {};
  const pool = useMemo(() => {
    let qs = allQuestions;
    if (cfg.category && cfg.category !== 'all') qs = qs.filter((q) => q.category === cfg.category);
    if (cfg.difficulty && cfg.difficulty !== 'all') qs = qs.filter((q) => q.difficulty === cfg.difficulty);
    return qs.length ? qs : allQuestions;
  }, [cfg.category, cfg.difficulty]);

  const count = Math.min(cfg.count || 5, pool.length);
  const [questions] = useState(() => pickRandom(pool, count));
  const [idx, setIdx] = useState(0);
  const [notes, setNotes] = useState(() => ({}));
  const [answers, setAnswers] = useState(() => ({}));
  const [flags, setFlags] = useState(() => ({}));
  const [confirmFinish, setConfirmFinish] = useState(false);

  const totalSeconds = (cfg.duration || 30) * 60;
  const onExpire = () => {
    toast("Time's up — finishing your interview.", 'info');
    finish();
  };
  const { seconds, pause } = useCountdown(totalSeconds, onExpire);

  useEffect(() => {
    if (!cfg.category && !cfg.count) {
      navigate('/interviews');
    }
  }, [cfg, navigate]);

  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions available"
        message="We couldn't build an interview from those filters."
        action={
          <button onClick={() => navigate('/interviews')} className="btn-primary">
            Choose again
          </button>
        }
      />
    );
  }

  const q = questions[idx];
  const progress = ((idx + 1) / questions.length) * 100;

  const goNext = () => setIdx((i) => Math.min(i + 1, questions.length - 1));
  const goPrev = () => setIdx((i) => Math.max(i - 1, 0));

  function finish() {
    pause();
    const answered = Object.keys(answers).length;
    const coverage = Math.round((answered / questions.length) * 100);
    const diffBonus =
      cfg.difficulty === 'hard' ? 12 : cfg.difficulty === 'medium' ? 6 : 0;
    const base = Math.min(100, coverage + diffBonus + Math.floor(Math.random() * 8));
    const score = Math.max(35, Math.min(100, base));
    const session = {
      id: uid(),
      category: cfg.category,
      categoryName: categories.find((c) => c.id === cfg.category)?.name || 'Mixed',
      difficulty: cfg.difficulty || 'mixed',
      duration: cfg.duration || 30,
      count: questions.length,
      answered,
      score,
      coverage,
      questions: questions.map((qq) => ({
        id: qq.id,
        question: qq.question,
        difficulty: qq.difficulty,
        tags: qq.tags,
        flagged: !!flags[qq.id],
        bookmarked: state.bookmarks.includes(qq.id),
        answered: !!answers[qq.id],
      })),
      breakdown: {
        Communication: Math.min(100, score + Math.floor(Math.random() * 8) - 4),
        'Problem Solving': Math.min(100, score + Math.floor(Math.random() * 10) - 5),
        'Technical Depth': Math.min(100, score + Math.floor(Math.random() * 10) - 5),
        Confidence: Math.min(100, score + Math.floor(Math.random() * 6) - 3),
        Structure: Math.min(100, score + Math.floor(Math.random() * 8) - 4),
      },
      date: new Date().toISOString(),
    };
    recordInterview(session);
    navigate(`/results/${session.id}`, { state: { session, isNew: true } });
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/interviews')} className="btn-ghost">
            <HiOutlineArrowLeft className="h-4 w-4" />
            Exit
          </button>
          <span className="chip bg-brand-500/15 text-brand-300">
            {categories.find((c) => c.id === cfg.category)?.name || 'Mixed'}
          </span>
          <span className="chip bg-white/5 text-slate-400 capitalize">{cfg.difficulty || 'mixed'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Timer seconds={seconds} />
          <button onClick={() => setConfirmFinish(true)} className="btn-primary">
            <HiOutlineCheckCircle className="h-4 w-4" />
            Finish
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="font-700 text-slate-200">{idx + 1} / {questions.length}</span>
        </div>
        <ProgressBar value={progress} className="mt-2" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Question */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <QuestionCard key={q.id} question={q} index={idx} total={questions.length} />
          </AnimatePresence>

          {q.type === 'coding' && (
            <div className="card mt-4 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-600 text-slate-200">
                <HiOutlinePencilSquare className="h-4 w-4" /> Code your solution
              </p>
              <textarea
                value={answers[q.id]?.code || ''}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q.id]: { ...a[q.id], code: e.target.value } }))
                }
                placeholder="// Write your code here…"
                className="h-56 w-full resize-none rounded-xl bg-slate-900/80 p-3 font-mono text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-brand-400/50"
              />
            </div>
          )}

          {q.type !== 'coding' && (
            <div className="card mt-4 p-4">
              <p className="mb-2 text-sm font-600 text-slate-200">Your answer</p>
              <textarea
                value={answers[q.id]?.text || ''}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q.id]: { ...a[q.id], text: e.target.value } }))
                }
                placeholder="Type your answer or notes here…"
                className="h-32 w-full resize-none rounded-xl bg-white/5 p-3 text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-brand-400/50"
              />
            </div>
          )}

          {/* Nav */}
          <div className="mt-4 flex items-center justify-between">
            <button onClick={goPrev} disabled={idx === 0} className="btn-outline">
              <HiOutlineArrowLeft className="h-4 w-4" />
              Previous
            </button>
            {idx < questions.length - 1 ? (
              <button onClick={goNext} className="btn-primary">
                Next
                <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setConfirmFinish(true)} className="btn-primary">
                <HiOutlineCheckCircle className="h-4 w-4" />
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Notes / flagged */}
        <div className="space-y-4">
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-sm font-600 text-slate-200">
              <HiOutlinePencilSquare className="h-4 w-4" /> Notes
            </p>
            <textarea
              value={notes[q.id] || ''}
              onChange={(e) => setNotes((n) => ({ ...n, [q.id]: e.target.value }))}
              placeholder="Jot down thoughts for this question…"
              className="mt-2 h-40 w-full resize-none rounded-xl bg-white/5 p-3 text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-brand-400/50"
            />
          </div>

          <div className="card p-4">
            <p className="text-sm font-600 text-slate-200">Question tools</p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => toggleBookmark(q.id)}
                className="btn-outline w-full justify-start"
              >
                {state.bookmarks.includes(q.id) ? 'Bookmarked' : 'Bookmark question'}
              </button>
              <button
                onClick={() => {
                  setFlags((f) => ({ ...f, [q.id]: !f[q.id] }));
                  toast(flags[q.id] ? 'Unflagged' : 'Flagged for review', 'info');
                }}
                className={`btn-outline w-full justify-start ${flags[q.id] ? 'text-warning-400 ring-warning-500/40' : ''}`}
              >
                <HiOutlineFlag className="h-4 w-4" />
                {flags[q.id] ? 'Flagged' : 'Flag for review'}
              </button>
            </div>
          </div>

          <div className="card p-4">
            <p className="text-sm font-600 text-slate-200">Question list</p>
            <div className="mt-3 grid max-h-56 grid-cols-5 gap-1.5 overflow-y-auto">
              {questions.map((qq, i) => (
                <button
                  key={qq.id}
                  onClick={() => setIdx(i)}
                  className={`grid h-8 place-items-center rounded-lg text-xs font-600 transition ${
                    i === idx
                      ? 'bg-brand-500 text-white'
                      : flags[qq.id]
                      ? 'bg-warning-500/20 text-warning-400'
                      : answers[qq.id]
                      ? 'bg-success-500/20 text-success-400'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={confirmFinish}
        onClose={() => setConfirmFinish(false)}
        title="Finish interview?"
        footer={
          <>
            <button onClick={() => setConfirmFinish(false)} className="btn-outline">
              Keep going
            </button>
            <button onClick={finish} className="btn-primary">
              <HiOutlinePlayCircle className="h-4 w-4" />
              Submit now
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-400">
          You've answered {Object.keys(answers).length} of {questions.length} questions. Submitting will
          generate your score and performance report.
        </p>
      </Modal>
    </div>
  );
}
