import { motion } from 'framer-motion';
import DynamicIcon from './DynamicIcon';

export default function StatsCard({ icon, label, value, sub, color = 'from-brand-500 to-accent-500', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card p-5"
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${color} text-white`}>
          <DynamicIcon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-700 text-slate-100">{value}</p>
      <p className="text-sm font-medium text-slate-400">{label}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </motion.div>
  );
}
