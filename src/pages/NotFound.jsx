import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineFaceFrown, HiOutlineHome } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md p-10 text-center"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
          <HiOutlineFaceFrown className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-display text-5xl font-800 text-slate-50">404</h1>
        <p className="mt-2 text-lg font-600 text-slate-200">Page not found</p>
        <p className="mt-1 text-sm text-slate-400">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/dashboard" className="btn-primary mt-6">
          <HiOutlineHome className="h-4 w-4" /> Back to dashboard
        </Link>
      </motion.div>
    </div>
  );
}
