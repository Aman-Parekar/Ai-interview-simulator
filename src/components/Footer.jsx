import { Link } from 'react-router-dom';
import Logo from './Logo';
import { HiOutlineCodeBracketSquare } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            Master technical interviews with realistic mock sessions, coding challenges, and instant feedback.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { to: '/interviews', label: 'Practice' },
            { to: '/coding', label: 'Coding Challenges' },
            { to: '/behavioral', label: 'Behavioral' },
            { to: '/leaderboard', label: 'Leaderboard' },
          ]}
        />
        <FooterCol
          title="Account"
          links={[
            { to: '/profile', label: 'Profile' },
            { to: '/settings', label: 'Settings' },
            { to: '/dashboard', label: 'Dashboard' },
          ]}
        />
        <div>
          <h4 className="text-sm font-700 text-slate-200">Stay in the loop</h4>
          <p className="mt-3 text-sm text-slate-400">
            New question categories and features land regularly.
          </p>
          <Link to="/interviews" className="btn-primary mt-4">
            <HiOutlineCodeBracketSquare className="h-4 w-4" />
            Start practicing
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Interview Simulator. Built for practice. All data stays in your browser.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-700 text-slate-200">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-slate-400 hover:text-slate-200">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
