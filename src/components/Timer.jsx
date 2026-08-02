import { formatTime } from '../utils/helpers';

export default function Timer({ seconds, className = '' }) {
  const danger = seconds <= 30;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-sm font-600 ${
        danger ? 'bg-error-500/15 text-error-400' : 'bg-white/5 text-slate-200'
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${danger ? 'bg-error-400' : 'bg-brand-400'} ${danger ? 'animate-pulse' : ''}`} />
      {formatTime(seconds)}
    </span>
  );
}
