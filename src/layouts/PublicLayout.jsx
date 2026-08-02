import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import Footer from '../components/Footer';

export default function PublicLayout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
              <HiOutlineCommandLine className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-700 text-slate-100">
              Interview<span className="text-gradient">Sim</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-slate-400 hover:text-slate-200">Features</a>
            <a href="#testimonials" className="text-sm text-slate-400 hover:text-slate-200">Testimonials</a>
            <a href="#faq" className="text-sm text-slate-400 hover:text-slate-200">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="btn-ghost" aria-label="Toggle theme">
              {theme === 'dark' ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
            </button>
            <Link to="/dashboard" className="btn-primary">Dashboard</Link>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
