const problems = typeof PROBLEMS !== 'undefined' ? PROBLEMS : [];
let current = null;
let selected = null;
let locked = false;
const recentIds = [];
const RECENT_LIMIT = 12;

const saved = JSON.parse(localStorage.getItem('macStats') || '{"attempts":0,"correct":0,"points":0,"topics":{},"streak":0}');
if (typeof saved.streak !== 'number') saved.streak = 0;

const $ = (id) => document.getElementById(id);

function pool() {
  const lo = +$('minDifficulty').value;
  const hi = +$('maxDifficulty').value;
  const type = $('typeFilter').value;
  return problems.filter(
    (p) =>
      p.difficulty >= lo &&
      p.difficulty <= hi &&
      (type === 'All types' || p.type === type) &&
      ((p.exam === 'AMC 10' && $('amc10').checked) || (p.exam === 'AMC 12' && $('amc12').checked))
  );
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
  const n = pool().length;
  $('poolCount').textContent = `${n} problem${n === 1 ? '' : 's'} in pool`;
  if (!$('browseView').hidden) renderBrowse();
}

function pickProblem(list) {
  const fresh = list.filter((p) => !recentIds.includes(p.id));
  const source = fresh.length ? fresh : list;
  return source[Math.floor(Math.random() * source.length)];
}

function remember(id) {
  recentIds.push(id);
  if (recentIds.length > RECENT_LIMIT) recentIds.shift();
}

function showProblem(p) {
  current = p;
  selected = null;
  locked = false;
  remember(p.id);
  $('emptyState').hidden = true;
  $('problemState').hidden = false;
  $('feedback').hidden = true;
  $('recap').hidden = true;
  $('submitBtn').disabled = true;
  $('solutionBtn').disabled = false;
  $('solutionBtn').textContent = 'Show solution';
  $('problemMeta').innerHTML = `
    <span>${p.exam}</span>
    <span>#${p.num}</span>
    <span>${p.type}</span>
    <span>${p.year}</span>
    <span>Difficulty ${p.difficulty}</span>`;
  $('question').textContent = p.q;
  $('answers').innerHTML = p.a
    .map((ans, i) => `<button class="answer" data-i="${i}"><b>${'ABCDE'[i]}</b>&nbsp;&nbsp;${ans}</button>`)
    .join('');
  document.querySelectorAll('.answer').forEach((b) => {
    b.onclick = () => choose(+b.dataset.i);
  });
}

function randomize() {
  const list = pool();
  if (!list.length) {
    $('problemState').hidden = true;
    $('emptyState').hidden = false;
    $('emptyState').innerHTML = `
      <p class="hero-brand">MAC</p>
      <h2>No matching problems</h2>
      <p>Widen your filters to continue.</p>
      <button id="startBtn" class="primary">Adjust &amp; try again</button>`;
    $('startBtn').onclick = () => $('amc10').focus();
    return;
  }
  showProblem(pickProblem(list));
}

function choose(i) {
  if (locked) return;
  selected = i;
  document.querySelectorAll('.answer').forEach((b, n) => b.classList.toggle('selected', n === i));
  $('submitBtn').disabled = false;
}

function finish(showOnly = false) {
  if (locked) return;
  if (!showOnly && selected === null) return;
  locked = true;
  document.querySelectorAll('.answer').forEach((b, i) => {
    b.disabled = true;
    if (i === current.correct) b.classList.add('correct');
    if (!showOnly && i === selected && i !== current.correct) b.classList.add('wrong');
  });
  $('submitBtn').disabled = true;
  $('solutionBtn').disabled = true;
  $('solutionBtn').textContent = 'Solution shown';

  const right = !showOnly && selected === current.correct;
  const earned = right ? Math.max(1, 10 - current.difficulty) : 0;
  saved.attempts++;
  if (right) {
    saved.correct++;
    saved.streak = (saved.streak || 0) + 1;
  } else if (!showOnly) {
    saved.streak = 0;
  }
  saved.points += earned;
  saved.topics[current.type] ??= { attempts: 0, correct: 0 };
  saved.topics[current.type].attempts++;
  if (right) saved.topics[current.type].correct++;
  localStorage.setItem('macStats', JSON.stringify(saved));

  const letter = 'ABCDE'[current.correct];
  const title = right ? 'Correct!' : showOnly ? 'Solution revealed' : 'Not quite.';
  const tip = current.solution ? `<p class="solution-text">${current.solution}</p>` : '';
  $('feedback').hidden = false;
  $('feedback').innerHTML = `<strong>${title}</strong> The correct answer is <b>${letter}</b>.${tip}`;
  renderRecap();
}

function renderRecap() {
  const acc = saved.attempts ? Math.round((saved.correct / saved.attempts) * 100) : 0;
  $('recap').hidden = false;
  $('recap').innerHTML = `
    <h2>Session recap</h2>
    <div class="recap-grid">
      <div class="metric"><span>Problems attempted</span><strong>${saved.attempts}</strong></div>
      <div class="metric"><span>Accuracy</span><strong>${acc}%</strong></div>
      <div class="metric"><span>Points / streak</span><strong>${saved.points} · ${saved.streak || 0}</strong></div>
    </div>`;
}

function renderStats() {
  const acc = saved.attempts ? Math.round((saved.correct / saved.attempts) * 100) : 0;
  $('statsGrid').innerHTML = `
    <div class="metric"><span>Problems attempted</span><strong>${saved.attempts}</strong></div>
    <div class="metric"><span>Accuracy</span><strong>${acc}%</strong></div>
    <div class="metric"><span>Total points</span><strong>${saved.points}</strong></div>
    <div class="metric"><span>Current streak</span><strong>${saved.streak || 0}</strong></div>`;
  const rows = Object.entries(saved.topics);
  $('topicStats').innerHTML = rows.length
    ? rows
        .map(([t, v]) => {
          const x = Math.round((v.correct / v.attempts) * 100);
          return `<div class="topic-row"><span>${t}</span><div class="bar"><i style="width:${x}%"></i></div><strong>${x}%</strong></div>`;
        })
        .join('')
    : '<p>No attempts yet. Complete a practice problem to see topic insights.</p>';
}

function browsePool() {
  const q = ($('browseSearch')?.value || '').trim().toLowerCase();
  return pool().filter((p) => {
    if (!q) return true;
    const hay = `${p.exam} ${p.year} ${p.num} ${p.type} ${p.q} ${p.difficulty}`.toLowerCase();
    return hay.includes(q);
  });
}

function renderBrowse() {
  const list = browsePool();
  $('browseCount').textContent = `${list.length} shown`;
  $('browseList').innerHTML = list.length
    ? list
        .map(
          (p) => `
      <button class="browse-item card" data-id="${p.id}">
        <div class="browse-meta">
          <span>${p.exam}</span>
          <span>${p.year} · #${p.num}</span>
          <span>${p.type}</span>
          <span>Diff ${p.difficulty}</span>
        </div>
        <p>${p.q}</p>
      </button>`
        )
        .join('')
    : '<p class="empty-browse">No problems match. Try different filters or clear search.</p>';

  document.querySelectorAll('.browse-item').forEach((btn) => {
    btn.onclick = () => {
      const p = problems.find((x) => x.id === btn.dataset.id);
      if (!p) return;
      showView('practice');
      showProblem(p);
    };
  });
}

function officialPool() {
  const list = typeof OFFICIAL_PROBLEMS !== 'undefined' ? OFFICIAL_PROBLEMS : [];
  let lo = +$('offMinNum').value;
  let hi = +$('offMaxNum').value;
  if (lo > hi) [lo, hi] = [hi, lo];
  const year = $('offYear').value;
  const version = $('offVersion').value;
  return list.filter(
    (p) =>
      p.num >= lo &&
      p.num <= hi &&
      (year === 'all' || String(p.year) === year) &&
      (version === 'all' || p.version === version) &&
      ((p.exam === 'AMC 10' && $('offAmc10').checked) || (p.exam === 'AMC 12' && $('offAmc12').checked))
  );
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
  const n = officialPool().length;
  $('offPoolCount').textContent = `${n.toLocaleString()} official problem link${n === 1 ? '' : 's'} in pool`;
  renderOfficialContests();
}

function openRandomOfficial() {
  const list = officialPool();
  if (!list.length) {
    $('offPoolCount').textContent = 'No contests match — widen your filters.';
    return;
  }
  const p = list[Math.floor(Math.random() * list.length)];
  window.open(p.problemUrl, '_blank', 'noopener');
}

function renderOfficialResources() {
  const resources = typeof OFFICIAL_RESOURCES !== 'undefined' ? OFFICIAL_RESOURCES : [];
  $('officialResources').innerHTML = resources
    .map(
      (r) => `
    <a class="resource-card card" href="${r.url}" target="_blank" rel="noopener">
      <h3>${r.title}</h3>
      <p>${r.blurb}</p>
      <span>Open ↗</span>
    </a>`
    )
    .join('');
}

function renderOfficialContests() {
  const pool = officialPool();
  const byContest = new Map();
  for (const p of pool) {
    const key = `${p.year}-${p.label}`;
    if (!byContest.has(key)) {
      byContest.set(key, {
        year: p.year,
        label: p.label,
        exam: p.exam,
        contestUrl: p.contestUrl,
        count: 0,
        min: p.num,
        max: p.num,
      });
    }
    const row = byContest.get(key);
    row.count++;
    row.min = Math.min(row.min, p.num);
    row.max = Math.max(row.max, p.num);
  }

  const contests = [...byContest.values()].sort((a, b) => b.year - a.year || a.label.localeCompare(b.label));
  $('officialContestList').innerHTML = contests.length
    ? contests
        .map(
          (c) => `
      <a class="browse-item card" href="${c.contestUrl}" target="_blank" rel="noopener">
        <div class="browse-meta">
          <span>${c.label}</span>
          <span>${c.year}</span>
          <span>Problems ${c.min}–${c.max}</span>
          <span>${c.count} links</span>
        </div>
        <p>Open full ${c.year} ${c.label} contest on AoPS Wiki (official problems © MAA)</p>
      </a>`
        )
        .join('')
    : '<p class="empty-browse">No contests match. Try different filters.</p>';
}

function initOfficialUi() {
  if (!$('offYear')) return;
  const years = typeof OFFICIAL_YEARS !== 'undefined' ? OFFICIAL_YEARS : [];
  $('offYear').innerHTML =
    `<option value="all">All years (${years[years.length - 1] || ''}–${years[0] || ''})</option>` +
    years.map((y) => `<option value="${y}">${y}</option>`).join('');
  renderOfficialResources();
  ['offAmc10', 'offAmc12', 'offYear', 'offVersion', 'offMinNum', 'offMaxNum'].forEach((id) => {
    $(id).oninput = updateOfficialFilters;
    $(id).onchange = updateOfficialFilters;
  });
  $('offRandomBtn').onclick = openRandomOfficial;
  updateOfficialFilters();
}

function showView(name) {
  document.querySelectorAll('.view').forEach((v) => (v.hidden = true));
  $(`${name}View`).hidden = false;
  document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  if (name === 'stats') renderStats();
  if (name === 'leaderboard') {
    $('dailyScore').textContent = saved.points;
    $('globalScore').textContent = saved.points;
  }
  if (name === 'browse') renderBrowse();
  if (name === 'official') updateOfficialFilters();
}

document.querySelectorAll('[data-view]').forEach((b) => {
  b.onclick = (e) => {
    e.preventDefault();
    showView(b.dataset.view);
  };
});

['amc10', 'amc12', 'minDifficulty', 'maxDifficulty', 'typeFilter'].forEach((id) => {
  $(id).oninput = updateFilters;
});

$('randomizeBtn').onclick = randomize;
$('startBtn').onclick = randomize;
$('anotherBtn').onclick = randomize;
$('submitBtn').onclick = () => finish(false);
$('solutionBtn').onclick = () => finish(true);
$('browseSearch').oninput = renderBrowse;

$('signInBtn').onclick = () => $('authDialog').showModal();
$('closeDialog').onclick = () => $('authDialog').close();
document.querySelectorAll('[data-auth]').forEach((b) => {
  b.onclick = () => {
    document.querySelectorAll('[data-auth]').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    $('authSubmit').textContent = b.dataset.auth;
  };
});
$('authSubmit').onclick = () => {
  const email = $('email').value.trim();
  if (!email || !$('password').value) {
    $('authMessage').textContent = 'Enter an email and password to continue.';
    return;
  }
  $('authMessage').textContent = `Signed in locally as ${email}`;
  $('signInBtn').textContent = email.split('@')[0];
  setTimeout(() => $('authDialog').close(), 700);
};

$('clearStats').onclick = () => {
  Object.assign(saved, { attempts: 0, correct: 0, points: 0, topics: {}, streak: 0 });
  localStorage.setItem('macStats', JSON.stringify(saved));
  renderStats();
};

document.addEventListener('keydown', (e) => {
  if ($('authDialog').open) return;
  if ($('practiceView').hidden) return;
  if (e.key >= '1' && e.key <= '5' && !locked && current) choose(+e.key - 1);
  if (e.key === 'Enter' && !locked && selected !== null) finish(false);
  if ((e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey) {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') return;
    randomize();
  }
});

$('totalCount').textContent = String(problems.length);
updateFilters();
initOfficialUi();

const host = location.hostname;
if (host.includes('github.io')) {
  $('repoLink').innerHTML = `<a href="https://github.com/${host.split('.')[0]}/mac-amc-practice" target="_blank" rel="noopener">View source on GitHub</a>`;
} else {
  $('repoLink').innerHTML =
    '<a href="https://github.com/khushisolanki19/mac-amc-practice" target="_blank" rel="noopener">View source on GitHub</a>';
}
