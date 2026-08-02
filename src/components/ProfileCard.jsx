import { motion } from 'framer-motion';
import DynamicIcon from './DynamicIcon';
import { achievements } from '../data/content';
import { useInterview } from '../context/InterviewContext';

export default function ProfileCard({ profile }) {
  const { state } = useInterview();
  const earned = achievements.filter((a) => state.achievements.includes(a.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="h-24 bg-gradient-to-r from-brand-500/40 to-accent-500/30" />
      <div className="-mt-12 px-6 pb-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-24 w-24 rounded-2xl border-4 border-slate-950 object-cover"
        />
        <h2 className="mt-3 text-xl font-700 text-slate-100">{profile.name}</h2>
        <p className="text-sm text-slate-400">{profile.title}</p>
        <p className="mt-1 text-xs text-slate-500">{profile.experience}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="Interviews" value={state.history.length} />
          <Stat label="Streak" value={`${state.streak.count}d`} />
          <Stat label="Badges" value={earned.length} />
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Achievements
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {earned.length === 0 && (
              <p className="text-sm text-slate-500">No badges yet — complete an interview to earn your first!</p>
            )}
            {earned.map((a) => (
              <span
                key={a.id}
                title={a.description}
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white`}
              >
                <DynamicIcon name={a.icon} className="h-5 w-5" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 py-2.5">
      <p className="text-lg font-700 text-slate-100">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
