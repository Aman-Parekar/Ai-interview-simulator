import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { questions as allQuestions, codingChallenges } from '../data/questions';
import { categories } from '../data/categories';

const InterviewContext = createContext(null);

const STORAGE_KEY = 'is.state';

const defaultState = {
  profile: {
    name: 'Alex Rivera',
    title: 'Mid-level Engineer',
    experience: '3-5 years',
    avatar: 'https://i.pravatar.cc/160?img=64',
    email: 'alex@example.com',
  },
  history: [],
  bookmarks: [],
  favorites: [],
  streak: {
    count: 0,
    lastActivity: null,
    longestStreak: 0,
  },
  settings: {
    notifications: true,
    language: 'English',
    keyboardShortcuts: true,
  },
  codingSolved: [],
  achievements: [],
};

function loadState() {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      profile: { ...defaultState.profile, ...parsed.profile },
      streak: { ...defaultState.streak, ...parsed.streak },
      settings: { ...defaultState.settings, ...parsed.settings },
    };
  } catch {
    return defaultState;
  }
}

export function InterviewProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const todayStr = () => new Date().toISOString().slice(0, 10);

  const recordInterview = (session) => {
    setState((s) => {
      const today = todayStr();
      const lastActivity = s.streak.lastActivity;
      let streakCount = s.streak.count;
      if (lastActivity !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        streakCount = lastActivity === yesterday ? streakCount + 1 : 1;
      }
      const longestStreak = Math.max(s.streak.longestStreak, streakCount);
      const newAchievements = [...s.achievements];
      const addAch = (id) => {
        if (!newAchievements.includes(id)) newAchievements.push(id);
      };
      if (s.history.length === 0) addAch('first-interview');
      if (streakCount >= 3) addAch('streak-3');
      if (streakCount >= 7) addAch('streak-7');
      if (session.score >= 90) addAch('score-90');
      if (s.history.length + 1 >= 10) addAch('complete-10');
      return {
        ...s,
        history: [
          { ...session, id: `s-${Date.now()}`, date: new Date().toISOString() },
          ...s.history,
        ].slice(0, 50),
        streak: {
          ...s.streak,
          count: streakCount,
          lastActivity: today,
          longestStreak,
        },
        achievements: newAchievements,
      };
    });
  };

  const toggleBookmark = (questionId) => {
    setState((s) => ({
      ...s,
      bookmarks: s.bookmarks.includes(questionId)
        ? s.bookmarks.filter((b) => b !== questionId)
        : [...s.bookmarks, questionId],
    }));
  };

  const toggleFavorite = (questionId) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(questionId)
        ? s.favorites.filter((b) => b !== questionId)
        : [...s.favorites, questionId],
    }));
  };

  const markCodingSolved = (challengeId) => {
    setState((s) => {
      const codingSolved = s.codingSolved.includes(challengeId)
        ? s.codingSolved
        : [...s.codingSolved, challengeId];
      const newAchievements = [...s.achievements];
      if (codingSolved.length >= 5 && !newAchievements.includes('coding-master')) {
        newAchievements.push('coding-master');
      }
      return { ...s, codingSolved, achievements: newAchievements };
    });
  };

  const updateProfile = (profile) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...profile } }));
  };

  const updateSettings = (settings) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...settings } }));
  };

  const resetProgress = () => {
    setState((s) => ({ ...defaultState, profile: s.profile }));
  };

  const value = useMemo(
    () => ({
      state,
      recordInterview,
      toggleBookmark,
      toggleFavorite,
      markCodingSolved,
      updateProfile,
      updateSettings,
      resetProgress,
      allQuestions,
      codingChallenges,
      categories,
    }),
    [state],
  );

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
}

export function useInterview() {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error('useInterview must be used within InterviewProvider');
  return ctx;
}
