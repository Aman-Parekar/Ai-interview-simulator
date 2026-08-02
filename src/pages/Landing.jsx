import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineStar, HiOutlineChevronDown } from 'react-icons/hi2';
import { useState } from 'react';
import Hero from '../components/Hero';
import { features, testimonials, faqs } from '../data/content';
import DynamicIcon from '../components/DynamicIcon';

export default function Landing() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="card grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
          {[
            { v: '500+', l: 'Practice questions' },
            { v: '10+', l: 'Categories' },
            { v: '4.9/5', l: 'Avg. rating' },
            { v: '50k+', l: 'Mocks completed' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-800 text-gradient sm:text-3xl">{s.v}</p>
              <p className="text-sm text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to prep"
          subtitle="A complete interview loop — from conceptual questions to coding and behavioral practice."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-6 transition hover:ring-1 hover:ring-brand-400/30"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white`}>
                <DynamicIcon name={f.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-700 text-slate-100">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by engineers who got the offer"
          subtitle="Real stories from people who turned nervous energy into confidence."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card flex flex-col p-5"
            >
              <div className="flex gap-0.5 text-warning-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <HiOutlineStar
                    key={k}
                    className={`h-4 w-4 ${k < t.rating ? 'fill-warning-400' : 'text-slate-600'}`}
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm text-slate-300">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-700 text-slate-100">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-500/10" />
          <div className="relative">
            <h2 className="font-display text-3xl font-800 text-slate-50 sm:text-4xl">
              Ready to land your next offer?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Start a mock interview now. No account, no setup — just practice.
            </p>
            <Link to="/interviews" className="btn-primary mt-7 px-6 py-3 text-base">
              Start Interview
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      <span className="chip mx-auto bg-brand-500/15 text-brand-300">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-800 text-slate-50 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-base font-600 text-slate-100">{q}</span>
        <HiOutlineChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-slate-400">{a}</p>
      </motion.div>
    </div>
  );
}
