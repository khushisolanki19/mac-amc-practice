const problems = typeof PROBLEMS !== 'undefined' ? PROBLEMS : [];
const $ = (id) => document.getElementById(id);
const state = loadState();

let current = null;
let selected = null;
let locked = false;
let hintLevel = 0;
let startedAt = 0;
let mode = 'random';
let mock = null;
let mockTimerId = null;
let scratchCtx = null;
let drawing = false;

const RECENT_LIMIT = 18;
const MOCK_SECONDS = 75 * 60;
const DEMO_BOARD = [
  { name: 'Aarna', practice: 840, mock: 136.5 },
  { name: 'MathWhiz', practice: 620, mock: 129 },
  { name: 'EuclidFan', practice: 516, mock: 121.5 },
];

function persist() {
  saveState(state);
}

function applyTheme() {
  document.documentElement.dataset.theme = state.prefs.theme || 'dark';
  document.documentElement.classList.toggle('reduce-motion', !!state.prefs.reducedMotion);
  $('themeBtn').textContent = state.prefs.theme === 'light' ? 'Dark' : 'Light';
}

function renderMath(el) {
  if (!el || typeof renderMathInElement !== 'function') return;
  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
    throwOnError: false,
  });
}

function basePool() {
  const lo = +$('minDifficulty').value;
  const hi = +$('maxDifficulty').value;
  const type = $('typeFilter').value;
  const q = ($('practiceSearch')?.value || '').trim().toLowerCase();
  return problems.filter((p) => {
    if (p.difficulty < lo || p.difficulty > hi) return false;
    if (type !== 'All types' && p.type !== type) return false;
    if (!(p.exam === 'AMC 10' && $('amc10').checked) && !(p.exam === 'AMC 12' && $('amc12').checked)) return false;
    if (q) {
      const hay = `${p.exam} ${p.year} ${p.num} ${p.type} ${p.q} ${p.difficulty}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function weakTopics() {
  const stats = {};
  for (const h of state.history) {
    const p = problems.find((x) => x.id === h.id);
    const t = h.type || p?.type;
    if (!t) continue;
    stats[t] ??= { a: 0, c: 0 };
    stats[t].a++;
    if (h.correct) stats[t].c++;
  }
  return Object.entries(stats)
    .map(([t, v]) => ({ t, acc: v.a ? v.c / v.a : 1 }))
    .sort((a, b) => a.acc - b.acc);
}

function modePool() {
  mode = $('modeSelect').value;
  let list = basePool();
  if (mode === 'incorrect') {
    const ids = new Set(Object.keys(state.missed));
    list = list.filter((p) => ids.has(p.id));
  } else if (mode === 'bookmarks') {
    const ids = new Set(state.bookmarks);
    list = list.filter((p) => ids.has(p.id));
  } else if (mode === 'adaptive') {
    const weak = weakTopics();
    if (weak.length) {
      const focus = new Set(weak.slice(0, 2).map((w) => w.t));
      const focused = list.filter((p) => focus.has(p.type));
      if (focused.length) list = focused;
    }
  } else if (mode === 'topic' && $('typeFilter').value === 'All types') {
    // keep all; topic filter is the focus control
  } else if (mode === 'daily') {
    list = [dailyProblem()].filter(Boolean);
  }
  return list;
}

function dailyProblem() {
  const key = todayKey();
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  if (!problems.length) return null;
  return problems[hash % problems.length];
}

function updateFilters(e) {
  let lo = +$('minDifficulty').value;
  let hi = +$('maxDifficulty').value;
  if (lo > hi) {
    if (e?.target?.id === 'minDifficulty') $('maxDifficulty').value = lo;
    else $('minDifficulty').value = hi;
    lo = +$('minDifficulty').value;
    hi = +$('maxDifficulty').value;
  }
  $('rangeLabel').textContent = `${lo} – ${hi}`;
  const n = modePool().length;
  $('poolCount').textContent = `${n} problem${n === 1 ? '' : 's'} in pool · mode: ${$('modeSelect').selectedOptions[0].text}`;
  if (!$('browseView').hidden) renderBrowse();
}

function remember(id) {
  state.recentIds = state.recentIds.filter((x) => x !== id);
  state.recentIds.push(id);
  if (state.recentIds.length > RECENT_LIMIT) state.recentIds.shift();
  persist();
}

function pickProblem(list) {
  const fresh = list.filter((p) => !state.recentIds.includes(p.id));
  const source = fresh.length ? fresh : list;
  return source[Math.floor(Math.random() * source.length)];
}

function isBookmarked(id) {
  return state.bookmarks.includes(id);
}

function showProblem(p) {
  current = p;
  selected = null;
  locked = false;
  hintLevel = 0;
  startedAt = Date.now();
  remember(p.id);
  $('emptyState').hidden = true;
  $('problemState').hidden = false;
  $('feedback').hidden = true;
  $('recap').hidden = true;
  $('hintBox').hidden = true;
  $('hintBox').textContent = '';
  $('submitBtn').disabled = true;
  $('solutionBtn').disabled = false;
  $('solutionBtn').textContent = 'Show solution';
  $('hintBtn').disabled = false;
  $('bookmarkBtn').textContent = isBookmarked(p.id) ? 'Bookmarked' : 'Bookmark';
  $('timerLive').hidden = false;
  tickLiveTimer();
  $('problemMeta').innerHTML = `
    <span>${p.exam}</span><span>#${p.num}</span><span>${p.type}</span>
    <span>${p.year}</span><span>Diff ${p.difficulty}</span><span>${mode}</span>`;
  $('question').innerHTML = p.q;
  renderMath($('question'));
  $('answers').innerHTML = p.a
    .map((ans, i) => `<button class="answer" data-i="${i}" type="button"><b>${'ABCDE'[i]}</b>&nbsp;&nbsp;<span class="ans-tex">${ans}</span></button>`)
    .join('');
  renderMath($('answers'));
  document.querySelectorAll('#answers .answer').forEach((b) => {
    b.onclick = () => choose(+b.dataset.i);
  });
  clearScratch();
}

function tickLiveTimer() {
  if (!startedAt || locked || !current) {
    $('timerLive').textContent = '';
    return;
  }
  const s = Math.floor((Date.now() - startedAt) / 1000);
  $('timerLive').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  if (!$('practiceView').hidden) requestAnimationFrame(tickLiveTimer);
}

function randomize() {
  closeDrawer();
  if ($('modeSelect').value === 'daily') {
    startDaily();
    return;
  }
  const list = modePool();
  if (!list.length) {
    $('problemState').hidden = true;
    $('emptyState').hidden = false;
    $('emptyState').innerHTML = `
      <p class="hero-brand">MAC</p>
      <h2>No matching problems</h2>
      <p>Widen filters or switch mode (Incorrect / Bookmarks need prior data).</p>
      <button id="startBtn" class="primary">Try again</button>`;
    $('startBtn').onclick = () => $('modeSelect').focus();
    return;
  }
  showView('practice');
  showProblem(pickProblem(list));
}

function choose(i) {
  if (locked || !current) return;
  selected = i;
  document.querySelectorAll('#answers .answer').forEach((b, n) => b.classList.toggle('selected', n === i));
  $('submitBtn').disabled = false;
}

function recordAttempt({ correct, showOnly, ms }) {
  const entry = {
    id: current.id,
    at: new Date().toISOString(),
    correct: !!correct,
    ms,
    mode,
    difficulty: current.difficulty,
    type: current.type,
  };
  state.history.push(entry);
  if (state.history.length > 2000) state.history.shift();

  if (!showOnly) {
    if (correct) {
      const earned = Math.max(1, 10 - current.difficulty);
      state.practicePoints += earned;
      if (mode === 'daily') {
        if (state.lastDaily !== todayKey()) {
          state.streak = (state.lastDaily && daysBetween(state.lastDaily, todayKey()) === 1) ? state.streak + 1 : 1;
        }
        state.lastDaily = todayKey();
        state.dailyDone = true;
      } else {
        state.streak = (state.streak || 0) + 1;
      }
      if (state.missed[current.id]) {
        // keep in missed until they get it right twice? remove on correct
        delete state.missed[current.id];
      }
    } else {
      state.streak = mode === 'daily' ? state.streak : 0;
      const m = state.missed[current.id] || { count: 0, reasons: [], lastAt: '' };
      m.count++;
      m.lastAt = entry.at;
      state.missed[current.id] = m;
    }
  }
  persist();
  return entry;
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function showHint() {
  if (!current || locked) return;
  const hints = current.hints || ['Look for structure before computing.'];
  if (hintLevel >= hints.length) {
    $('hintBox').hidden = false;
    $('hintBox').textContent = 'No more hints — try the full solution.';
    return;
  }
  $('hintBox').hidden = false;
  $('hintBox').textContent = hints[hintLevel];
  hintLevel++;
  renderMath($('hintBox'));
}

function finish(showOnly = false) {
  if (locked || !current) return;
  if (!showOnly && selected === null) return;
  locked = true;
  const ms = Date.now() - startedAt;
  document.querySelectorAll('#answers .answer').forEach((b, i) => {
    b.disabled = true;
    if (i === current.correct) b.classList.add('correct');
    if (!showOnly && i === selected && i !== current.correct) b.classList.add('wrong');
  });
  $('submitBtn').disabled = true;
  $('solutionBtn').disabled = true;
  $('hintBtn').disabled = true;
  $('solutionBtn').textContent = 'Solution shown';

  const right = !showOnly && selected === current.correct;
  recordAttempt({ correct: right, showOnly, ms });

  const letter = 'ABCDE'[current.correct];
  const title = right ? 'Correct!' : showOnly ? 'Solution revealed' : 'Not quite.';
  const steps = (current.steps || [current.solution || ''])
    .map((s, i) => `<li><span class="step-n">Step ${i + 1}</span> ${s}</li>`)
    .join('');
  const missForm =
    !right && !showOnly
      ? `<div class="miss-form">
          <label for="missReason">Why did you miss this?</label>
          <select id="missReason">
            <option value="">Choose a reason…</option>
            <option>Careless error</option>
            <option>Misread the problem</option>
            <option>Concept gap</option>
            <option>Ran out of time / guessed</option>
            <option>Arithmetic mistake</option>
          </select>
          <button id="saveMissReason" class="secondary" type="button">Save reason</button>
        </div>`
      : '';

  $('feedback').hidden = false;
  $('feedback').innerHTML = `
    <strong>${title}</strong> Correct answer: <b>${letter}</b>
    <ol class="steps">${steps}</ol>
    <p class="solution-text"><b>Alternative check:</b> ${current.alt || ''}</p>
    ${missForm}`;
  renderMath($('feedback'));

  const saveBtn = $('saveMissReason');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const reason = $('missReason').value;
      if (!reason) return;
      state.missed[current.id] ??= { count: 1, reasons: [], lastAt: new Date().toISOString() };
      state.missed[current.id].reasons.push(reason);
      persist();
      saveBtn.textContent = 'Saved';
      saveBtn.disabled = true;
    };
  }
  renderRecap(ms, right, showOnly);
}

function renderRecap(ms, right, showOnly) {
  const attempts = state.history.length;
  const correct = state.history.filter((h) => h.correct).length;
  const acc = attempts ? Math.round((correct / attempts) * 100) : 0;
  $('recap').hidden = false;
  $('recap').innerHTML = `
    <h2>Session recap</h2>
    <div class="recap-grid">
      <div class="metric"><span>Attempts</span><strong>${attempts}</strong></div>
      <div class="metric"><span>Accuracy</span><strong>${acc}%</strong></div>
      <div class="metric"><span>Practice pts / streak</span><strong>${state.practicePoints} · ${state.streak}</strong></div>
      <div class="metric"><span>This problem</span><strong>${showOnly ? '—' : right ? '✓' : '✗'} · ${Math.round(ms / 1000)}s</strong></div>
    </div>`;
}

/* —— Mock exam —— */
function startMock() {
  const exam = $('mockExam').value;
  const bank = problems.filter((p) => p.exam === exam);
  if (bank.length < 10) {
    alert('Not enough practice problems for that exam yet.');
    return;
  }
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  const set = [];
  // prefer spread of difficulties
  for (let d = 1; d <= 9 && set.length < 25; d++) {
    for (const p of shuffled) {
      if (p.difficulty === d && !set.includes(p)) {
        set.push(p);
        if (set.length >= 25) break;
      }
    }
  }
  while (set.length < 25 && shuffled.length) {
    const p = shuffled.pop();
    if (!set.includes(p)) set.push(p);
  }

  mock = {
    exam,
    items: set.slice(0, 25),
    answers: Array(25).fill(null), // null blank, 0-4 choice
    index: 0,
    endsAt: Date.now() + MOCK_SECONDS * 1000,
  };
  $('mockPanel').hidden = false;
  $('mockResults').hidden = true;
  $('mockTitle').textContent = `${exam} timed mock · 25 questions`;
  renderMock();
  if (mockTimerId) clearInterval(mockTimerId);
  mockTimerId = setInterval(tickMock, 250);
  tickMock();
}

function tickMock() {
  if (!mock) return;
  const left = Math.max(0, mock.endsAt - Date.now());
  const m = Math.floor(left / 60000);
  const s = Math.floor((left % 60000) / 1000);
  $('mockTimer').textContent = `${m}:${String(s).padStart(2, '0')}`;
  if (left <= 0) finishMock();
}

function renderMock() {
  if (!mock) return;
  const i = mock.index;
  const p = mock.items[i];
  $('mockProgress').innerHTML = mock.items
    .map((_, n) => {
      const ans = mock.answers[n];
      const cls = n === i ? 'on' : ans === null ? '' : 'filled';
      return `<button type="button" class="mock-dot ${cls}" data-i="${n}">${n + 1}</button>`;
    })
    .join('');
  document.querySelectorAll('.mock-dot').forEach((b) => {
    b.onclick = () => {
      mock.index = +b.dataset.i;
      renderMock();
    };
  });
  $('mockQuestion').innerHTML = `<span class="mock-qnum">Q${i + 1}.</span> ${p.q}`;
  renderMath($('mockQuestion'));
  $('mockAnswers').innerHTML = p.a
    .map((ans, ai) => {
      const sel = mock.answers[i] === ai ? 'selected' : '';
      return `<button class="answer ${sel}" data-i="${ai}" type="button"><b>${'ABCDE'[ai]}</b>&nbsp;&nbsp;${ans}</button>`;
    })
    .join('');
  renderMath($('mockAnswers'));
  document.querySelectorAll('#mockAnswers .answer').forEach((b) => {
    b.onclick = () => {
      mock.answers[i] = +b.dataset.i;
      renderMock();
    };
  });
}

function finishMock() {
  if (!mock) return;
  if (mockTimerId) clearInterval(mockTimerId);
  mockTimerId = null;
  let correct = 0;
  let wrong = 0;
  let blank = 0;
  mock.items.forEach((p, i) => {
    const a = mock.answers[i];
    if (a === null) blank++;
    else if (a === p.correct) correct++;
    else wrong++;
  });
  // Official AMC 10/12: 6 correct, 1.5 blank, 0 wrong
  const score = correct * 6 + blank * 1.5;
  const row = {
    at: new Date().toISOString(),
    exam: mock.exam,
    score,
    correct,
    blank,
    wrong,
  };
  state.mocks.push(row);
  state.mockBest = Math.max(state.mockBest || 0, score);
  persist();

  $('mockPanel').hidden = true;
  $('mockResults').hidden = false;
  $('mockResults').innerHTML = `
    <p class="eyebrow">Mock complete</p>
    <h3>${mock.exam} score: ${score}</h3>
    <p class="lede">Official-style scoring: <b>6</b> per correct · <b>1.5</b> per blank · <b>0</b> per wrong.
      Calculation: ${correct}×6 + ${blank}×1.5 + ${wrong}×0 = <b>${score}</b>.</p>
    <div class="recap-grid">
      <div class="metric"><span>Correct</span><strong>${correct}</strong></div>
      <div class="metric"><span>Blank</span><strong>${blank}</strong></div>
      <div class="metric"><span>Wrong</span><strong>${wrong}</strong></div>
      <div class="metric"><span>Best mock</span><strong>${state.mockBest}</strong></div>
    </div>
    <p class="lede">Practice points (${state.practicePoints}) are separate from mock scores.</p>
    <button id="closeMockResults" class="secondary" type="button">Back to modes</button>`;
  $('closeMockResults').onclick = () => {
    $('mockResults').hidden = true;
    mock = null;
  };
  mock = null;
}

/* —— Official —— */
function officialPool() {
  const list = typeof OFFICIAL_PROBLEMS !== 'undefined' ? OFFICIAL_PROBLEMS : [];
  let lo = +$('offMinNum').value;
  let hi = +$('offMaxNum').value;
  if (lo > hi) [lo, hi] = [hi, lo];
  const year = $('offYear').value;
  const version = $('offVersion').value;
  const q = ($('offSearch')?.value || '').trim().toLowerCase();
  return list.filter((p) => {
    if (p.num < lo || p.num > hi) return false;
    if (year !== 'all' && String(p.year) !== year) return false;
    if (version !== 'all' && p.version !== version) return false;
    if (!(p.exam === 'AMC 10' && $('offAmc10').checked) && !(p.exam === 'AMC 12' && $('offAmc12').checked)) return false;
    if (q) {
      const hay = `${p.year} ${p.label} ${p.num} ${p.exam}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function updateOfficialFilters(e) {
  let lo = +$('offMinNum').value;
  let hi = +$('offMaxNum').value;
  if (lo > hi) {
    if (e?.target?.id === 'offMinNum') $('offMaxNum').value = lo;
    else $('offMinNum').value = hi;
    lo = +$('offMinNum').value;
    hi = +$('offMaxNum').value;
  }
  $('offRangeLabel').textContent = `${lo} – ${hi}`;
  $('offPoolCount').textContent = `${officialPool().length.toLocaleString()} official links in pool`;
  renderOfficialContests();
}

function openRandomOfficial() {
  const list = officialPool();
  if (!list.length) return;
  const recent = state.recentIds;
  const fresh = list.filter((p) => !recent.includes(p.id));
  const p = (fresh.length ? fresh : list)[Math.floor(Math.random() * (fresh.length || list.length))];
  remember(p.id);
  window.open(p.problemUrl, '_blank', 'noopener');
}

function renderOfficialResources() {
  const resources = typeof OFFICIAL_RESOURCES !== 'undefined' ? OFFICIAL_RESOURCES : [];
  $('officialResources').innerHTML = resources
    .map(
      (r) => `<a class="resource-card card" href="${r.url}" target="_blank" rel="noopener">
        <h3>${r.title}</h3><p>${r.blurb}</p><span>Open ↗</span></a>`
    )
    .join('');
}

function renderOfficialContests() {
  const pool = officialPool();
  const byContest = new Map();
  for (const p of pool) {
    const key = `${p.year}-${p.label}`;
    if (!byContest.has(key)) {
      byContest.set(key, { year: p.year, label: p.label, contestUrl: p.contestUrl, count: 0, min: p.num, max: p.num });
    }
    const row = byContest.get(key);
    row.count++;
    row.min = Math.min(row.min, p.num);
    row.max = Math.max(row.max, p.num);
  }
  const contests = [...byContest.values()].sort((a, b) => b.year - a.year || a.label.localeCompare(b.label));
  $('officialContestList').innerHTML = contests.length
    ? contests
        .slice(0, 80)
        .map(
          (c) => `<a class="browse-item card" href="${c.contestUrl}" target="_blank" rel="noopener">
            <div class="browse-meta"><span>${c.label}</span><span>${c.year}</span><span>#${c.min}–${c.max}</span><span>${c.count}</span></div>
            <p>${c.year} ${c.label} on AoPS Wiki</p></a>`
        )
        .join('') + (contests.length > 80 ? `<p class="lede">Showing 80 of ${contests.length} contests — narrow year filter to see more.</p>` : '')
    : '<p class="empty-browse">No contests match.</p>';
}

function initOfficialUi() {
  const years = typeof OFFICIAL_YEARS !== 'undefined' ? OFFICIAL_YEARS : [];
  $('offYear').innerHTML =
    `<option value="all">All years (${years[years.length - 1]}–${years[0]})</option>` +
    years.map((y) => `<option value="${y}">${y}</option>`).join('');
  renderOfficialResources();
  ['offAmc10', 'offAmc12', 'offYear', 'offVersion', 'offMinNum', 'offMaxNum', 'offSearch'].forEach((id) => {
    $(id).oninput = updateOfficialFilters;
    $(id).onchange = updateOfficialFilters;
  });
  $('offRandomBtn').onclick = openRandomOfficial;
  updateOfficialFilters();
}

/* —— Browse / stats —— */
function browsePool() {
  const q = ($('browseSearch')?.value || '').trim().toLowerCase();
  return basePool().filter((p) => {
    if (!q) return true;
    return `${p.exam} ${p.year} ${p.num} ${p.type} ${p.q}`.toLowerCase().includes(q);
  });
}

function renderBrowse() {
  const list = browsePool();
  $('browseCount').textContent = `${list.length} shown`;
  $('browseList').innerHTML = list.length
    ? list
        .map(
          (p) => `<button class="browse-item card" data-id="${p.id}" type="button">
            <div class="browse-meta"><span>${p.exam}</span><span>${p.year} · #${p.num}</span><span>${p.type}</span><span>Diff ${p.difficulty}</span></div>
            <p>${p.q}</p></button>`
        )
        .join('')
    : '<p class="empty-browse">No problems match.</p>';
  document.querySelectorAll('#browseList .browse-item').forEach((btn) => {
    btn.onclick = () => {
      const p = problems.find((x) => x.id === btn.dataset.id);
      if (!p) return;
      showView('practice');
      showProblem(p);
    };
  });
}

function avgTime(filterFn) {
  const rows = state.history.filter(filterFn);
  if (!rows.length) return null;
  return Math.round(rows.reduce((s, h) => s + (h.ms || 0), 0) / rows.length / 1000);
}

function estimatedScore() {
  const recent = state.history.slice(-40);
  if (recent.length < 5) return null;
  const acc = recent.filter((h) => h.correct).length / recent.length;
  // Map practice accuracy roughly onto AMC 0–150 scale with blanks assumed low
  const correctEst = Math.round(acc * 25);
  const blankEst = Math.max(0, Math.round((1 - acc) * 8));
  const wrongEst = 25 - correctEst - blankEst;
  return correctEst * 6 + blankEst * 1.5 + wrongEst * 0;
}

function readinessLabel(score) {
  if (score == null) return 'Need more attempts';
  if (score >= 120) return 'AIME-ready pace';
  if (score >= 100) return 'Strong AMC form';
  if (score >= 80) return 'Solid — keep drilling hard problems';
  if (score >= 60) return 'Building foundations';
  return 'Focus on accuracy in easier problems';
}

function drawChart() {
  const canvas = $('chartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const counts = days.map((day) => state.history.filter((x) => x.at.slice(0, 10) === day).length);
  const max = Math.max(1, ...counts);
  const style = getComputedStyle(document.documentElement);
  const bar = style.getPropertyValue('--blue').trim() || '#7192f5';
  const muted = style.getPropertyValue('--muted').trim() || '#969fb3';
  ctx.strokeStyle = muted;
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.moveTo(30, h - 24);
  ctx.lineTo(w - 10, h - 24);
  ctx.stroke();
  ctx.globalAlpha = 1;
  const bw = (w - 50) / days.length;
  counts.forEach((c, i) => {
    const bh = ((h - 40) * c) / max;
    ctx.fillStyle = bar;
    ctx.fillRect(36 + i * bw, h - 24 - bh, Math.max(4, bw - 6), bh);
  });
}

function renderStats() {
  const attempts = state.history.length;
  const correct = state.history.filter((h) => h.correct).length;
  const acc = attempts ? Math.round((correct / attempts) * 100) : 0;
  const avg = avgTime(() => true);
  const est = estimatedScore();
  $('statsGrid').innerHTML = `
    <div class="metric"><span>Attempts</span><strong>${attempts}</strong></div>
    <div class="metric"><span>Accuracy</span><strong>${acc}%</strong></div>
    <div class="metric"><span>Avg time</span><strong>${avg == null ? '—' : avg + 's'}</strong></div>
    <div class="metric"><span>Practice pts</span><strong>${state.practicePoints}</strong></div>
    <div class="metric"><span>Streak</span><strong>${state.streak}</strong></div>
    <div class="metric"><span>Best mock</span><strong>${state.mockBest || '—'}</strong></div>`;

  const topicMap = {};
  const diffMap = {};
  for (const h of state.history) {
    topicMap[h.type] ??= { a: 0, c: 0 };
    topicMap[h.type].a++;
    if (h.correct) topicMap[h.type].c++;
    const d = h.difficulty || '?';
    diffMap[d] ??= { a: 0, c: 0 };
    diffMap[d].a++;
    if (h.correct) diffMap[d].c++;
  }
  const rowHtml = (entries) =>
    entries.length
      ? entries
          .map(([t, v]) => {
            const x = Math.round((v.c / v.a) * 100);
            return `<div class="topic-row"><span>${t}</span><div class="bar"><i style="width:${x}%"></i></div><strong>${x}%</strong></div>`;
          })
          .join('')
      : '<p>No data yet.</p>';
  $('topicStats').innerHTML = rowHtml(Object.entries(topicMap));
  $('diffStats').innerHTML = rowHtml(Object.entries(diffMap).sort((a, b) => a[0] - b[0]));

  $('readinessBox').innerHTML = `
    <p><strong>Estimated AMC score:</strong> ${est == null ? '—' : est.toFixed(1)}</p>
    <p>${readinessLabel(est)}</p>
    <p class="lede">Estimate from recent practice accuracy mapped to 25-question AMC scoring — not an official prediction.</p>`;

  const reviewIds = [...new Set([...Object.keys(state.missed), ...state.bookmarks])].slice(0, 12);
  $('reviewList').innerHTML = reviewIds.length
    ? reviewIds
        .map((id) => {
          const p = problems.find((x) => x.id === id);
          if (!p) return '';
          return `<button class="browse-item card" data-id="${id}" type="button">
            <div class="browse-meta"><span>${p.type}</span><span>${state.missed[id] ? 'Missed' : 'Bookmark'}</span></div>
            <p>${p.q}</p></button>`;
        })
        .join('')
    : '<p class="empty-browse">Missed and bookmarked problems will appear here.</p>';
  document.querySelectorAll('#reviewList .browse-item').forEach((btn) => {
    btn.onclick = () => {
      const p = problems.find((x) => x.id === btn.dataset.id);
      showView('practice');
      showProblem(p);
    };
  });
  drawChart();
}

function renderLeaderboard() {
  $('leaderboardOptIn').checked = !!state.profile.leaderboardOptIn;
  const people = [...DEMO_BOARD];
  if (state.profile.leaderboardOptIn) {
    people.push({
      name: state.profile.name || 'You',
      practice: state.practicePoints,
      mock: state.mockBest || 0,
    });
  }
  const practice = [...people].sort((a, b) => b.practice - a.practice);
  const mocks = [...people].sort((a, b) => b.mock - a.mock);
  const ol = (rows, key) =>
    rows
      .map((r, i) => `<li><span><b>${i + 1}</b> ${r.name}</span><strong>${r[key]}</strong></li>`)
      .join('');
  $('practiceBoard').innerHTML = ol(practice, 'practice');
  $('mockBoard').innerHTML = ol(mocks, 'mock');
}

function updateDailyStatus() {
  const done = state.lastDaily === todayKey() && state.dailyDone;
  $('dailyStatus').textContent = done
    ? `Done for today · streak ${state.streak}`
    : `Not completed · streak ${state.streak}`;
}

function startDaily() {
  $('modeSelect').value = 'daily';
  const p = dailyProblem();
  if (!p) return;
  showView('practice');
  showProblem(p);
  updateFilters();
}

function showView(name) {
  document.querySelectorAll('.view').forEach((v) => (v.hidden = true));
  $(`${name}View`).hidden = false;
  document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  closeDrawer();
  if (name === 'stats') renderStats();
  if (name === 'leaderboard') renderLeaderboard();
  if (name === 'browse') renderBrowse();
  if (name === 'official') updateOfficialFilters();
  if (name === 'modes') updateDailyStatus();
  if (name === 'practice' && current && !locked) tickLiveTimer();
}

/* —— Scratchpad —— */
function initScratch() {
  const canvas = $('scratchpad');
  scratchCtx = canvas.getContext('2d');
  const style = () => {
    scratchCtx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#edf0f8';
    scratchCtx.lineWidth = 2;
    scratchCtx.lineCap = 'round';
  };
  style();
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const x = (('touches' in e ? e.touches[0].clientX : e.clientX) - r.left) * (canvas.width / r.width);
    const y = (('touches' in e ? e.touches[0].clientY : e.clientY) - r.top) * (canvas.height / r.height);
    return { x, y };
  };
  const start = (e) => {
    drawing = true;
    style();
    const { x, y } = pos(e);
    scratchCtx.beginPath();
    scratchCtx.moveTo(x, y);
    e.preventDefault();
  };
  const move = (e) => {
    if (!drawing) return;
    const { x, y } = pos(e);
    scratchCtx.lineTo(x, y);
    scratchCtx.stroke();
    e.preventDefault();
  };
  const end = () => {
    drawing = false;
  };
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);
}

function clearScratch() {
  if (!scratchCtx) return;
  const canvas = $('scratchpad');
  scratchCtx.clearRect(0, 0, canvas.width, canvas.height);
}

/* —— Drawer / theme —— */
function openDrawer() {
  document.body.classList.add('drawer-open');
  $('drawerBackdrop').hidden = false;
  $('drawerToggle').setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  document.body.classList.remove('drawer-open');
  $('drawerBackdrop').hidden = true;
  $('drawerToggle').setAttribute('aria-expanded', 'false');
}

/* —— Wire up —— */
document.querySelectorAll('[data-view]').forEach((b) => {
  b.onclick = (e) => {
    e.preventDefault();
    showView(b.dataset.view);
  };
});

['amc10', 'amc12', 'minDifficulty', 'maxDifficulty', 'typeFilter', 'modeSelect', 'practiceSearch'].forEach((id) => {
  $(id).oninput = updateFilters;
  $(id).onchange = updateFilters;
});

$('randomizeBtn').onclick = randomize;
$('startBtn').onclick = randomize;
$('anotherBtn').onclick = randomize;
$('submitBtn').onclick = () => finish(false);
$('solutionBtn').onclick = () => finish(true);
$('hintBtn').onclick = showHint;
$('browseSearch').oninput = renderBrowse;
$('goModesBtn')?.addEventListener('click', () => showView('modes'));

$('bookmarkBtn').onclick = () => {
  if (!current) return;
  if (isBookmarked(current.id)) state.bookmarks = state.bookmarks.filter((id) => id !== current.id);
  else state.bookmarks.push(current.id);
  persist();
  $('bookmarkBtn').textContent = isBookmarked(current.id) ? 'Bookmarked' : 'Bookmark';
};

$('reportBtn').onclick = () => {
  if (!current) return;
  const note = prompt('What is wrong with this problem? (typo, wrong answer, unclear)');
  if (!note) return;
  state.reports.push({ id: current.id, note, at: new Date().toISOString() });
  persist();
  alert('Thanks — report saved locally.');
};

$('scratchToggle').onclick = () => {
  $('scratchWrap').hidden = !$('scratchWrap').hidden;
};
$('scratchClear').onclick = clearScratch;

$('startMockBtn').onclick = startMock;
$('endMockBtn').onclick = finishMock;
$('mockPrev').onclick = () => {
  if (!mock) return;
  mock.index = Math.max(0, mock.index - 1);
  renderMock();
};
$('mockNext').onclick = () => {
  if (!mock) return;
  mock.index = Math.min(mock.items.length - 1, mock.index + 1);
  renderMock();
};
$('mockBlank').onclick = () => {
  if (!mock) return;
  mock.answers[mock.index] = null;
  renderMock();
};
$('dailyBtn').onclick = startDaily;
$('adaptiveBtn').onclick = () => {
  $('modeSelect').value = 'adaptive';
  updateFilters();
  randomize();
};
$('reviewBtn').onclick = () => {
  $('modeSelect').value = state.bookmarks.length && !Object.keys(state.missed).length ? 'bookmarks' : 'incorrect';
  if (!Object.keys(state.missed).length && state.bookmarks.length) $('modeSelect').value = 'bookmarks';
  updateFilters();
  showView('practice');
  randomize();
};

$('themeBtn').onclick = () => {
  state.prefs.theme = state.prefs.theme === 'light' ? 'dark' : 'light';
  persist();
  applyTheme();
  drawChart();
};

$('drawerToggle').onclick = () => {
  if (document.body.classList.contains('drawer-open')) closeDrawer();
  else openDrawer();
};
$('drawerClose').onclick = closeDrawer;
$('drawerBackdrop').onclick = closeDrawer;

$('signInBtn').onclick = () => {
  $('profileName').value = state.profile.name || '';
  $('email').value = state.profile.email || '';
  $('prefMotion').checked = !!state.prefs.reducedMotion;
  $('authDialog').showModal();
};
$('closeDialog').onclick = () => $('authDialog').close();
$('authSubmit').onclick = () => {
  state.profile.name = $('profileName').value.trim() || 'Local student';
  state.profile.email = $('email').value.trim();
  state.prefs.reducedMotion = $('prefMotion').checked;
  persist();
  applyTheme();
  $('signInBtn').textContent = state.profile.name.split(' ')[0] || 'Profile';
  $('authMessage').textContent = 'Profile saved on this device.';
  setTimeout(() => $('authDialog').close(), 500);
};

$('leaderboardOptIn').onchange = () => {
  state.profile.leaderboardOptIn = $('leaderboardOptIn').checked;
  persist();
  renderLeaderboard();
};

$('exportCsvBtn').onclick = () => {
  const csv = exportCsv(state, problems);
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mac-practice-${todayKey()}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

$('clearStats').onclick = () => {
  if (!confirm('Reset all local MAC data on this browser?')) return;
  Object.assign(state, structuredClone(DEFAULT_STATE));
  persist();
  renderStats();
};

document.addEventListener('keydown', (e) => {
  if ($('authDialog').open) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

  if (!$('modesView').hidden && mock) {
    const k = e.key.toLowerCase();
    if ('abcde'.includes(k)) {
      mock.answers[mock.index] = 'abcde'.indexOf(k);
      renderMock();
    }
    if (e.key === 'ArrowRight' || k === 'n') {
      mock.index = Math.min(mock.items.length - 1, mock.index + 1);
      renderMock();
    }
    if (e.key === 'ArrowLeft') {
      mock.index = Math.max(0, mock.index - 1);
      renderMock();
    }
    return;
  }

  if ($('practiceView').hidden) return;
  const k = e.key.toLowerCase();
  if ('abcde'.includes(k) && !locked && current) choose('abcde'.indexOf(k));
  if (e.key >= '1' && e.key <= '5' && !locked && current) choose(+e.key - 1);
  if (e.key === 'Enter' && !locked && selected !== null) finish(false);
  if (k === 'h') showHint();
  if (k === 'n' && !e.metaKey && !e.ctrlKey) randomize();
});

$('totalCount').textContent = String(problems.length);
$('signInBtn').textContent = (state.profile.name || 'Profile').split(' ')[0];
applyTheme();
updateFilters();
initOfficialUi();
initScratch();
updateDailyStatus();

$('repoLink').innerHTML =
  '<a href="https://github.com/khushisolanki19/mac-amc-practice" target="_blank" rel="noopener">github.com/khushisolanki19/mac-amc-practice</a>';
