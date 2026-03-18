# AVA MVP Picker

Gameday MVP voting app for a sports team. After each game the coach passes their phone around the huddle — every present player votes for the MVP directly on that one device. No accounts, no per-player phones required.

## Features

- **Player roster** — manage players with name and optional jersey number
- **Attendance** — mark who is present before each game day
- **Pass-the-phone voting** — each player votes in turn; a handoff screen between voters prevents peeking at the ballot; no running tally is shown during the session
- **Results** — winner banner with full vote counts; tie-aware
- **Crash recovery** — if the browser is closed mid-session, a "Resume voting" banner appears on the home screen

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, static export)
- [Tailwind CSS v4](https://tailwindcss.com)
- `localStorage` — all data persisted client-side, no backend needed
- [Playwright](https://playwright.dev) — e2e test suite

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/ava-mvp-picker](http://localhost:3000/ava-mvp-picker) in your browser.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | Run ESLint |
| `npx playwright test` | Run all e2e tests (requires dev server running) |

## Deployment

The app is deployed to **GitHub Pages** at:
`https://berniwittmann.github.io/ava-mvp-picker/`

Two GitHub Actions workflows are included:

- **`e2e.yml`** — runs Playwright tests on every push and pull request
- **`deploy.yml`** — runs e2e tests, then builds and deploys to Pages on every push to `main`

To enable GitHub Pages: go to _Settings → Pages_ and set the source to **GitHub Actions**.
