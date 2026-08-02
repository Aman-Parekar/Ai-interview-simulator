import { Link } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import InterviewCard from '../components/InterviewCard';
import EmptyState from '../components/EmptyState';
import { HiOutlinePlayCircle } from 'react-icons/hi2';

export default function Results() {
  const { state } = useInterview();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">My results</h1>
        <p className="mt-1 text-slate-400">Every interview you've completed, with full reports.</p>
      </div>
      {state.history.length === 0 ? (
        <EmptyState
          title="No results yet"
          message="Finish your first mock interview to see your scores and reports here."
          action={<Link to="/interviews" className="btn-primary"><HiOutlinePlayCircle className="h-4 w-4" /> Start an interview</Link>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.history.map((s, i) => (
            <InterviewCard key={s.id} session={s} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
