# MAC — AMC Practice

Practice **AMC 10 / AMC 12–style** contest math with filters, instant feedback, short solutions, browse mode, and local progress tracking — plus an **Official AMC** tab that links to real contests.

> **Not affiliated with the MAA.** Official AMC problems are © Mathematical Association of America. This site does **not** republish official problem text; the Official tab links out to the [MAA AMC site](https://maa.org/student-programs/amc/) and [AoPS Wiki](https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions).

## Features

- **120+** original AMC-style problems across Algebra, Geometry, Number Theory, Combinatorics, and Probability
- **Official AMC** hub: 15 years × AMC 10/12 A/B × 25 problems ≈ **1,500 links** to AoPS Wiki + MAA resources
- Filter by exam (AMC 10 / 12), difficulty (1–9), and topic
- Random practice that avoids recent repeats
- Browse + search the original practice bank
- Local stats, streak, and topic accuracy (saved in your browser)
- Keyboard: `1`–`5` select answers, `Enter` submit, `N` next problem

## Run locally

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then Save.

Your site will be at:

`https://<your-username>.github.io/<repo-name>/`

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | App shell |
| `style.css` / `fixes.css` | Styles |
| `problems.js` | Original practice problem bank |
| `official.js` | Official contest link catalog (AoPS / MAA) |
| `script.js` | Practice UI logic |
