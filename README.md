# MAC — AMC Practice

**Live:** https://khushisolanki19.github.io/mac-amc-practice/  
**Repo:** https://github.com/khushisolanki19/mac-amc-practice

Local-first AMC 10/12 trainer with practice modes, mock exams, hints, progress charts, and a full official-contest link archive.

> **Not affiliated with the MAA.** Official AMC problem text is © MAA. The Official tab links to [AoPS Wiki](https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions) and [MAA AMC](https://maa.org/student-programs/amc/) instead of republishing contest wording.

## Features (shipped)

- 120+ original practice problems with hints, step-by-step solutions, alt checks
- Official archive links: AMC 10/12 A & B, **2000–2024** (~2,500 problem links)
- Modes: random, topic, adaptive, incorrect-only, bookmarks, daily challenge + streaks
- Timed 25-question mock exams with official-style scoring (6 / 1.5 / 0)
- Scratchpad, progressive hints, miss-reason logging, bookmarks, report
- Stats: topic & difficulty accuracy, avg time, 14-day chart, review queue, readiness estimate
- CSV export · light/dark theme · mobile filter drawer · KaTeX · A–E / Enter / N / H keys · reduced motion

## Not yet (needs backend)

- Real cloud sign-in / sync across devices
- Teacher class codes, assignments, class dashboards
- True multi-user private leaderboards
- PDF export

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell |
| `style.css` / `fixes.css` | Themes & layout |
| `problems.js` | Original practice bank |
| `official.js` | Official contest link catalog |
| `storage.js` | Local persistence |
| `script.js` | App logic |
