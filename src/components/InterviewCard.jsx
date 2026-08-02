import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi2';
import { formatDate, scoreColor, scoreLabel } from '../utils/helpers';

export default function InterviewCard({ session, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="card p-4"
    >
      <div className="flex items-center justify-between">
        <span className="chip bg-brand-500/15 text-brand-300">{session.categoryName}</span>
        <span className="chip bg-white/5 text-slate-400 capitalize">{session.difficulty}</span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className={`text-2xl font-700 ${scoreColor(session.score)}`}>{session.score}</p>
          <p className="text-xs text-slate-500">{scoreLabel(session.score)}</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p className="flex items-center justify-end gap-1">
            <HiOutlineClock className="h-3.5 w-3.5" />
            {session.duration} min
          </p>
          <p>{formatDate(session.date)}</p>
        </div>
      </div>
      <Link
        to={`/results/${session.id}`}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-300 hover:text-brand-200"
      >
        View report <HiOutlineArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}
