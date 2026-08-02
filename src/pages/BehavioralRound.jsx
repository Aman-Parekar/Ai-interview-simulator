import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineMicrophone,
  HiOutlineStopCircle,
  HiOutlineCheckCircle,
  HiOutlineStar,
} from 'react-icons/hi2';
import { questions as allQuestions } from '../data/questions';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import { pickRandom, uid } from '../utils/helpers';
import ProgressBar from '../components/ProgressBar';
import { categories } from '../data/categories';

export default function BehavioralRound() {
  const navigate = useNavigate();
  const { recordInterview } = useInterview();
  const { toast } = useToast();

  const questions = useMemo(
    () => pickRandom(allQuestions.filter((q) => q.type === 'behavioral'), 4),
    [],
  );
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recording, setRecording] = useState(false);
  const [started, setStarted] = useState(false);

  const q = questions[idx];
  const progress = ((idx + 1) / questions.length) * 100;

  const next = () => {
    if (idx < questions.length - 1) setIdx((i) => i + 1);
    else finish();
  };

  function finish() {
    const answered = Object.keys(answers).length;
    const coverage = Math.round((answered / questions.length) * 100);
    const score = Math.max(40, Math.min(100, coverage + 30 + Math.floor(Math.random() * 10)));
    const session = {
      id: uid(),
      category: 'behavioral',
      categoryName: 'Behavioral',
      difficulty: 'medium',
      duration: 15,
      count: questions.length,
      answered,
      score,
      coverage,
      questions: questions.map((qq) => ({
        id: qq.id,
        question: qq.question,
        difficulty: qq.difficulty,
        tags: qq.tags,
        answered: !!answers[qq.id],
      })),
      breakdown: {
        Communication: Math.min(100, score + 5),
        'Problem Solving': Math.min(100, score - 2),
        'Technical Depth': Math.min(100, score - 8),
        Confidence: Math.min(100, score + 2),
        Structure: Math.min(100, score + 6),
      },
      date: new Date().toISOString(),
    };
    recordInterview(session);
    toast('Behavioral round complete!', 'success');
    navigate(`/results/${session.id}`, { state: { session, isNew: true } });
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <HiOutlineMicrophone className="h-7 w-7" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-800 text-slate-50">Behavioral Round</h1>
          <p className="mt-2 text-slate-400">
            Practice {questions.length} STAR-format questions. You can type your answer or simulate
            recording yourself out loud. We'll score your delivery and structure at the end.
          </p>
          <div className="mt-5 rounded-xl bg-white/5 p-4 text-left text-sm text-slate-300">
            <p className="font-600 text-slate-200">Tips for a strong answer:</p>
            <ul className="mt-2 space-y-1 text-slate-400">
              <li>• Use STAR: Situation, Task, Action, Result.</li>
              <li>• Keep it to ~90 seconds, focused on <em>your</em> impact.</li>
              <li>• End with a concrete, measurable outcome.</li>
            </ul>
          </div>
          <button onClick={() => setStarted(true)} className="btn-primary mt-6 px-6 py-3 text-base">
            <HiOutlineMicrophone className="h-5 w-5" />
            Begin round
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="card flex items-center justify-between p-4">
        <button onClick={() => navigate('/interviews')} className="btn-ghost">
          <HiOutlineArrowLeft className="h-4 w-4" /> Exit
        </button>
        <span className="chip bg-purple-500/15 text-purple-300">Behavioral</span>
        <button onClick={finish} className="btn-primary">
          <HiOutlineCheckCircle className="h-4 w-4" /> Finish
        </button>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Question {idx + 1} of {questions.length}</span>
          <span className="font-700 text-slate-200">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} className="mt-2" gradient="from-purple-500 to-violet-600" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card p-6"
        >
          <div className="flex items-center gap-1.5 text-warning-400">
            <HiOutlineStar className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">STAR prompt</span>
          </div>
          <h2 className="mt-3 text-xl font-600 leading-snug text-slate-100 sm:text-2xl">{q.question}</h2>
          {q.hints?.length > 0 && (
            <p className="mt-3 text-sm text-slate-500">Hint: {q.hints[0]}</p>
          )}

          <textarea
            value={answers[q.id] || ''}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            placeholder="Outline your STAR answer here…"
            className="mt-4 h-40 w-full resize-none rounded-xl bg-white/5 p-3 text-sm text-slate-100 outline-none ring-1 ring-white/10 focus:ring-purple-400/50"
          />

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setRecording((r) => !r);
                toast(recording ? 'Recording stopped' : 'Recording answer… (simulated)', 'info');
              }}
              className={recording ? 'btn-primary bg-gradient-to-r from-error-500 to-rose-600' : 'btn-outline'}
            >
              {recording ? <HiOutlineStopCircle className="h-4 w-4" /> : <HiOutlineMicrophone className="h-4 w-4" />}
              {recording ? 'Stop recording' : 'Record answer'}
            </button>
            {recording && (
              <span className="flex items-center gap-1.5 text-sm text-error-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-error-500" /> REC
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="btn-outline">
          <HiOutlineArrowLeft className="h-4 w-4" /> Previous
        </button>
        <button onClick={next} className="btn-primary">
          {idx < questions.length - 1 ? 'Next question' : 'Finish round'}
          <HiOutlineArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
