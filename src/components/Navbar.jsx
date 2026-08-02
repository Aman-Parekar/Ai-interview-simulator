import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
} from 'react-icons/hi2';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useInterview } from '../context/InterviewContext';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/interviews', label: 'Practice' },
  { to: '/coding', label: 'Coding' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

export default function Navbar({ onMenu }) {
  const { theme, toggleTheme } = useTheme();
  const { state } = useInterview();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/interviews?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onMenu}
          className="btn-ghost -ml-2 lg:hidden"
          aria-label="Open menu"
        >
          <HiOutlineBars3 className="h-5 w-5" />
        </button>
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden sm:block">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="input w-44 pl-9 lg:w-64"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:ml-2">
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <HiOutlineSun className="h-5 w-5" />
            ) : (
              <HiOutlineMoon className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setOpenNotif((v) => !v);
                setOpenProfile(false);
              }}
              className="btn-ghost relative"
              aria-label="Notifications"
            >
              <HiOutlineBell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
            </button>
            <AnimatePresence>
              {openNotif && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenNotif(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="card absolute right-0 z-20 mt-2 w-72 p-2"
                  >
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Notifications
                    </p>
                    {state.settings.notifications ? (
                      <>
                        <NotifItem
                          title="Daily challenge ready"
                          body="A new React challenge is waiting for you."
                        />
                        <NotifItem
                          title="Streak reminder"
                          body={`You're on a ${state.streak.count}-day streak. Keep it up!`}
                        />
                      </>
                    ) : (
                      <p className="px-3 py-6 text-center text-sm text-slate-500">
                        Notifications are off.
                      </p>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setOpenProfile((v) => !v);
                setOpenNotif(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-white/5"
            >
              <img
                src={state.profile.avatar}
                alt={state.profile.name}
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="hidden text-sm font-medium text-slate-200 sm:block">
                {state.profile.name.split(' ')[0]}
              </span>
            </button>
            <AnimatePresence>
              {openProfile && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenProfile(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="card absolute right-0 z-20 mt-2 w-56 p-2"
                  >
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img
                        src={state.profile.avatar}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-100">
                          {state.profile.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {state.profile.title}
                        </p>
                      </div>
                    </div>
                    <div className="my-1 h-px bg-white/10" />
                    <DropdownLink to="/profile" icon={<HiOutlineUser className="h-4 w-4" />} label="Profile" onClick={() => setOpenProfile(false)} />
                    <DropdownLink to="/settings" icon={<HiOutlineCog6Tooth className="h-4 w-4" />} label="Settings" onClick={() => setOpenProfile(false)} />
                    <DropdownLink to="/" icon={<HiOutlineArrowRightOnRectangle className="h-4 w-4" />} label="Sign out" onClick={() => setOpenProfile(false)} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotifItem({ title, body }) {
  return (
    <div className="rounded-lg px-3 py-2.5 hover:bg-white/5">
      <p className="text-sm font-medium text-slate-100">{title}</p>
      <p className="text-xs text-slate-400">{body}</p>
    </div>
  );
}

function DropdownLink({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
