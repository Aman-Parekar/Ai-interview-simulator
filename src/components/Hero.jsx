import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlinePlayCircle } from 'react-icons/hi2';
import { features } from '../data/content';
import DynamicIcon from './DynamicIcon';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark [background-size:48px_48px] opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip mx-auto bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            10+ categories · Timed · Instant scoring
          </span>
          <h1 className="mt-6 font-display text-4xl font-800 leading-[1.05] tracking-tight text-slate-50 sm:text-6xl">
            Master <span className="text-gradient">Technical Interviews</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Practice realistic mock interviews across frontend, backend, system design, and behavioral rounds — with a live timer, coding challenges, and instant AI-style feedback.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/interviews" className="btn-primary px-6 py-3 text-base">
              <HiOutlinePlayCircle className="h-5 w-5" />
              Start Interview
            </Link>
            <Link to="/dashboard" className="btn-outline px-6 py-3 text-base">
              View Dashboard
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            No sign-up required · Runs entirely in your browser
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="card overflow-hidden p-2">
            <div className="grid gap-3 sm:grid-cols-3">
              {features.slice(0, 3).map((f, i) => (
                <div key={f.title} className="rounded-xl bg-white/5 p-5">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white`}>
                    <DynamicIcon name={f.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-700 text-slate-100">{f.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
