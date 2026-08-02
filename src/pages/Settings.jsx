import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineBellAlert,
  HiOutlineLanguage,
  HiOutlineSwatch,
  HiOutlineUserCircle,
  HiOutlineTrash,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';
import { useInterview } from '../context/InterviewContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';

const accents = [
  { id: 'brand', name: 'Blue', color: '#3366ff' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
  { id: 'cyan', name: 'Cyan', color: '#06b6d4' },
];

const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese'];

export default function Settings() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const { state, updateProfile, updateSettings, resetProgress } = useInterview();
  const { toast } = useToast();
  const [form, setForm] = useState(state.profile);
  const [confirmReset, setConfirmReset] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile(form);
    toast('Profile updated', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-800 text-slate-50">Settings</h1>
        <p className="mt-1 text-slate-400">Personalize your experience. Everything is saved to this browser.</p>
      </div>

      {/* Appearance */}
      <SettingsSection title="Appearance" icon={<HiOutlineSwatch className="h-5 w-5" />}>
        <Row label="Theme" hint="Switch between dark and light mode.">
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`btn-outline ${theme === 'dark' ? 'ring-1 ring-brand-400/50' : ''}`}
            >
              <HiOutlineMoon className="h-4 w-4" /> Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`btn-outline ${theme === 'light' ? 'ring-1 ring-brand-400/50' : ''}`}
            >
              <HiOutlineSun className="h-4 w-4" /> Light
            </button>
          </div>
        </Row>
        <Row label="Accent color" hint="Used for highlights and primary actions.">
          <div className="flex flex-wrap gap-2">
            {accents.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setAccent(a.id);
                  toast(`Accent set to ${a.name}`, 'info');
                }}
                className={`h-9 w-9 rounded-xl transition ${accent === a.id ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-slate-950' : ''}`}
                style={{ backgroundColor: a.color }}
                aria-label={a.name}
              />
            ))}
          </div>
        </Row>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={<HiOutlineBellAlert className="h-5 w-5" />}>
        <Row label="Enable notifications" hint="Daily challenge reminders and streak alerts.">
          <Toggle
            on={state.settings.notifications}
            onClick={() => {
              updateSettings({ notifications: !state.settings.notifications });
              toast(state.settings.notifications ? 'Notifications off' : 'Notifications on', 'info');
            }}
          />
        </Row>
        <Row label="Keyboard shortcuts" hint="Enable hotkeys for navigation and actions.">
          <Toggle
            on={state.settings.keyboardShortcuts}
            onClick={() => updateSettings({ keyboardShortcuts: !state.settings.keyboardShortcuts })}
          />
        </Row>
      </SettingsSection>

      {/* Language */}
      <SettingsSection title="Language" icon={<HiOutlineLanguage className="h-5 w-5" />}>
        <Row label="Interface language" hint="Demo only — content stays in English.">
          <select
            value={state.settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="input w-48"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-slate-900">{l}</option>
            ))}
          </select>
        </Row>
      </SettingsSection>

      {/* Profile */}
      <SettingsSection title="Profile" icon={<HiOutlineUserCircle className="h-5 w-5" />}>
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={form.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover" />
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Avatar URL</label>
              <input
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="input"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            </Field>
            <Field label="Title">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
            </Field>
            <Field label="Experience level">
              <select
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="input"
              >
                {['0-2 years', '3-5 years', '6-10 years', '10+ years'].map((x) => (
                  <option key={x} className="bg-slate-900">{x}</option>
                ))}
              </select>
            </Field>
            <Field label="Email">
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
            </Field>
          </div>
          <button type="submit" className="btn-primary">
            <HiOutlineCheckCircle className="h-4 w-4" /> Save profile
          </button>
        </form>
      </SettingsSection>

      {/* Danger zone */}
      <SettingsSection title="Data" icon={<HiOutlineTrash className="h-5 w-5" />}>
        <Row label="Reset all progress" hint="Clears history, streaks, bookmarks, and achievements. Cannot be undone.">
          <button onClick={() => setConfirmReset(true)} className="btn-outline text-error-400 ring-error-500/30">
            <HiOutlineTrash className="h-4 w-4" /> Reset
          </button>
        </Row>
      </SettingsSection>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset all progress?"
        footer={
          <>
            <button onClick={() => setConfirmReset(false)} className="btn-outline">Cancel</button>
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
                toast('All progress reset', 'info');
              }}
              className="btn-primary bg-gradient-to-r from-error-500 to-rose-600"
            >
              <HiOutlineTrash className="h-4 w-4" /> Reset everything
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-400">
          This permanently clears your interview history, streaks, bookmarks, favorites, and achievements
          in this browser. Your profile details will be kept.
        </p>
      </Modal>
    </div>
  );
}

function SettingsSection({ title, icon, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-base font-700 text-slate-100">
        <span className="text-brand-400">{icon}</span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

function Row({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-600 text-slate-100">{label}</p>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-7 w-12 rounded-full transition ${on ? 'bg-brand-500' : 'bg-white/10'}`}
      aria-pressed={on}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-1 h-5 w-5 rounded-full bg-white ${on ? 'left-6' : 'left-1'}`}
      />
    </button>
  );
}
