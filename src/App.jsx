import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChooseInterview from './pages/ChooseInterview';
import InterviewScreen from './pages/InterviewScreen';
import CodingChallenge from './pages/CodingChallenge';
import BehavioralRound from './pages/BehavioralRound';
import Result from './pages/Result';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Bookmarks from './pages/Bookmarks';
import Leaderboard from './pages/Leaderboard';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interviews" element={<ChooseInterview />} />
        <Route path="/interview/run" element={<InterviewScreen />} />
        <Route path="/coding" element={<CodingChallenge />} />
        <Route path="/behavioral" element={<BehavioralRound />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={<Result />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
