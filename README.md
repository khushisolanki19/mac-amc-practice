# MAC — AMC Practice

Practice **AMC 10 / AMC 12–style** contest math with filters, instant feedback, short solutions, browse mode, and local progress tracking.

> Sample practice set for learning. **Not affiliated with the MAA** and not official contest problems.

## Features

- **120+** original AMC-style problems across Algebra, Geometry, Number Theory, Combinatorics, and Probability
- Filter by exam (AMC 10 / 12), difficulty (1–9), and topic
- Random practice that avoids recent repeats
- Browse + search the full bank
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
| `problems.js` | Problem bank |
| `script.js` | Practice UI logic |
