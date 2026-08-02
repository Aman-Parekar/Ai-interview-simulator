import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePlayCircle,
  HiOutlineArrowPath,
  HiOutlineArrowsPointingOut,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { codingChallenges } from '../data/questions';
import { difficulties } from '../data/categories';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import { fireConfetti } from '../utils/confetti';

const languages = ['JavaScript', 'Python', 'Java', 'C++'];

const starters = {
  JavaScript: 'function solve() {\n  // your code here\n}',
  Python: 'def solve():\n    # your code here\n    pass',
  Java: 'public class Solution {\n    public void solve() {\n        // your code here\n    }\n}',
  'C++': '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}',
};

export default function CodingChallenge() {
  const { state, markCodingSolved } = useInterview();
  const { toast } = useToast();
  const [active, setActive] = useState(codingChallenges[0].id);
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState(starters.JavaScript);
  const [fullscreen, setFullscreen] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const challenge = codingChallenges.find((c) => c.id === active);
  const diff = difficulties.find((d) => d.id === challenge.difficulty);

  const onLangChange = (l) => {
    setLanguage(l);
    setCode(starters[l]);
  };

  const run = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setRunning(false);
      const passed = code.trim().length > 25 && !code.includes('your code here');
      setResult({ passed, output: passed ? challenge.sampleOutput : 'No solution detected. Try writing some code!' });
      if (passed) {
        markCodingSolved(challenge.id);
        toast('Test cases passed!', 'success');
        fireConfetti();
      } else {
        toast('Test cases failed — keep trying.', 'error');
      }
    }, 900);
  };

  const reset = () => {
    setCode(starters[language]);
    setResult(null);
    toast('Code reset', 'info');
  };

  const editor = (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 p-3">
        <div className="flex items-center gap-2">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`chip ${language === l ? 'bg-brand-500/20 text-white ring-1 ring-brand-400/40' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={reset} className="btn-ghost px-2.5 py-1.5" title="Reset code">
            <HiOutlineArrowPath className="h-4 w-4" />
          </button>
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="btn-ghost px-2.5 py-1.5"
            title="Fullscreen"
          >
            <HiOutlineArrowsPointingOut className="h-4 w-4" />
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="block h-72 w-full resize-none bg-slate-900/80 p-4 font-mono text-sm text-slate-100 outline-none"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 p-3">
        <span className="text-xs text-slate-500">{language} · {code.split('\n').length} lines</span>
        <button onClick={run} disabled={running} className="btn-primary">
          <HiOutlinePlayCircle className="h-4 w-4" />
          {running ? 'Running…' : 'Run'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">Coding challenges</h1>
        <p className="mt-1 text-slate-400">Pick a problem, write your solution, and run it against the sample.</p>
      </div>

      {fullscreen ? (
        <div className="fixed inset-0 z-[70] bg-slate-950/95 p-4 backdrop-blur">
          <div className="mx-auto h-full max-w-5xl">
            <div className="mb-3 flex justify-end">
              <button onClick={() => setFullscreen(false)} className="btn-outline">
                Exit fullscreen
              </button>
            </div>
            {editor}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Problem list */}
          <div className="space-y-3">
            <h2 className="text-base font-700 text-slate-100">Problems</h2>
            {codingChallenges.map((c) => {
              const d = difficulties.find((d) => d.id === c.difficulty);
              const solved = state.codingSolved.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActive(c.id);
                    setResult(null);
                  }}
                  className={`card w-full p-4 text-left transition hover:ring-1 hover:ring-brand-400/40 ${active === c.id ? 'ring-1 ring-brand-400/50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-600 text-slate-100">{c.title}</p>
                    {solved && <HiOutlineCheckCircle className="h-4 w-4 text-success-400" />}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`chip ${d.bg} ${d.color}`}>{d.name}</span>
                    <span className="text-xs text-slate-500 capitalize">{c.category}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Problem + editor */}
          <div className="space-y-4 lg:col-span-2">
            <motion.div key={challenge.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-700 text-slate-100">{challenge.title}</h2>
                <span className={`chip ${diff.bg} ${diff.color}`}>{diff.name}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{challenge.statement}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Sample Input</p>
                  <p className="mt-1 font-mono text-sm text-slate-200">{challenge.sampleInput}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Sample Output</p>
                  <p className="mt-1 font-mono text-sm text-slate-200">{challenge.sampleOutput}</p>
                </div>
              </div>
            </motion.div>

            {editor}

            {result && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <HiOutlineCheckCircle className="h-5 w-5 text-success-400" />
                  ) : (
                    <HiOutlineXCircle className="h-5 w-5 text-error-400" />
                  )}
                  <p className={`font-700 ${result.passed ? 'text-success-400' : 'text-error-400'}`}>
                    {result.passed ? 'Accepted' : 'Wrong answer'}
                  </p>
                </div>
                <pre className="mt-3 rounded-xl bg-slate-900/80 p-3 font-mono text-sm text-slate-200">
                  {result.output}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
