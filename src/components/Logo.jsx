import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCommandLine } from 'react-icons/hi2';

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <motion.span
        whileHover={{ rotate: -8, scale: 1.05 }}
        className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow"
      >
        <HiOutlineCommandLine className="h-5 w-5" />
      </motion.span>
      {!compact && (
        <span className="font-display text-lg font-700 tracking-tight text-slate-100">
          Interview<span className="text-gradient">Sim</span>
        </span>
      )}
    </Link>
  );
}
