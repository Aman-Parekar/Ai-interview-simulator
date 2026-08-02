import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineCodeBracket,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineTrophy,
  HiOutlineBookmark,
  HiXMark,
  HiOutlineFire,
} from 'react-icons/hi2';
import { useInterview } from '../context/InterviewContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { to: '/interviews', label: 'Choose Interview', icon: HiOutlineSquare3Stack3D },
  { to: '/coding', label: 'Coding Challenges', icon: HiOutlineCodeBracket },
  { to: '/behavioral', label: 'Behavioral Round', icon: HiOutlineChatBubbleLeftRight },
  { to: '/results', label: 'My Results', icon: HiOutlineChartBar },
  { to: '/bookmarks', label: 'Bookmarks', icon: HiOutlineBookmark },
  { to: '/leaderboard', label: 'Leaderboard', icon: HiOutlineTrophy },
  { to: '/profile', label: 'Profile', icon: HiOutlineUser },
  { to: '/settings', label: 'Settings', icon: HiOutlineCog6Tooth },
];

export default function Sidebar({ open, onClose }) {
  const { state } = useInterview();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pt-5 lg:hidden">
        <span className="font-display text-base font-700 text-slate-100">Menu</span>
        <button onClick={onClose} className="btn-ghost" aria-label="Close menu">
          <HiXMark className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-brand-500/20 to-accent-500/10 text-white ring-1 ring-brand-400/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`
            }
          >
            <l.icon className="h-5 w-5 shrink-0" />
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 p-4 ring-1 ring-brand-400/20">
        <div className="flex items-center gap-2 text-brand-300">
          <HiOutlineFire className="h-5 w-5" />
          <span className="text-sm font-semibold">Daily Streak</span>
        </div>
        <p className="mt-1 text-2xl font-700 text-white">{state.streak.count} days</p>
        <p className="text-xs text-slate-400">Longest: {state.streak.longestStreak} days</p>
        <NavLink
          to="/interviews"
          onClick={onClose}
          className="btn-primary mt-3 w-full"
        >
          Start Today's Practice
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950/40 lg:block">
        <div className="sticky top-16 h-[calc(100vh-4rem)]">{content}</div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-slate-950 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
