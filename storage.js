/** Local-first persistence for MAC. Cloud sync/teacher tools need a backend later. */
const STORAGE_KEY = 'macAppV2';

const DEFAULT_STATE = {
  profile: { name: 'Local student', email: '', leaderboardOptIn: false },
  prefs: { theme: 'dark', reducedMotion: false },
  practicePoints: 0,
  mockBest: 0,
  streak: 0,
  lastDaily: '',
  dailyDone: false,
  recentIds: [],
  bookmarks: [],
  missed: {}, // id -> { count, reasons: [], lastAt }
  history: [], // { id, at, correct, ms, mode, difficulty, type }
  mocks: [], // { at, exam, score, correct, blank, wrong, answers }
  reports: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // migrate old macStats if present
      const old = JSON.parse(localStorage.getItem('macStats') || 'null');
      const state = structuredClone(DEFAULT_STATE);
      if (old) {
        state.practicePoints = old.points || 0;
        state.streak = old.streak || 0;
      }
      return state;
    }
    return { ...structuredClone(DEFAULT_STATE), ...JSON.parse(raw) };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function exportCsv(state, problems) {
  const byId = Object.fromEntries(problems.map((p) => [p.id, p]));
  const rows = [['timestamp', 'problemId', 'exam', 'type', 'difficulty', 'correct', 'seconds', 'mode']];
  for (const h of state.history) {
    const p = byId[h.id] || {};
    rows.push([
      h.at,
      h.id,
      p.exam || '',
      p.type || h.type || '',
      h.difficulty ?? p.difficulty ?? '',
      h.correct ? '1' : '0',
      Math.round((h.ms || 0) / 1000),
      h.mode || 'practice',
    ]);
  }
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}
