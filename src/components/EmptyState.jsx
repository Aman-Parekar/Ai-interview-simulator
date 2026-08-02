import { motion } from 'framer-motion';
import { HiOutlineInbox } from 'react-icons/hi2';

export default function EmptyState({ title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex flex-col items-center justify-center px-6 py-14 text-center"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-slate-500">
        <HiOutlineInbox className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-700 text-slate-200">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
