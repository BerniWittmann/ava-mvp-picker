# AVA MVP Picker

Gameday MVP voting app for a sports team. The coach passes a single phone around the huddle after each game so every present player can vote. No per-player login, no backend.

## Tech Stack

- **Next.js 16 App Router** with TypeScript, `src/` directory
- **Tailwind CSS v4** — mobile-first
- **localStorage** — all persistence (`ava_players`, `ava_active_session`)
- **uuid** — ID generation
- **Playwright** — e2e tests

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # static export to out/
npm run lint       # ESLint
npx playwright test              # run all e2e tests (requires dev server running)
npx playwright test e2e/foo.spec.ts  # run a single spec
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home/Dashboard
│   ├── players/page.tsx          # Player roster CRUD
│   └── game/
│       ├── setup/page.tsx        # Mark attendance for today
│       ├── vote/page.tsx         # Pass-phone voting session
│       └── results/page.tsx      # Final results
├── components/
│   ├── game/                     # AttendanceToggle, VotingBallot, HandoffScreen, ProgressBar
│   ├── players/                  # PlayerCard, PlayerForm, PlayerList
│   └── results/                  # ResultCard, WinnerBanner
├── hooks/
│   ├── useLocalStorage.ts        # SSR-safe generic localStorage primitive
│   ├── usePlayers.ts             # Player CRUD
│   └── useGameSession.ts         # Session state machine
├── lib/utils.ts                  # tallyVotes() — called only on results page
└── types/index.ts                # Player, GameSession, Vote interfaces
e2e/                              # Playwright specs (players, game-setup, voting, results)
.github/workflows/
├── e2e.yml                       # Runs on every push
└── deploy.yml                    # Runs e2e then deploys to GitHub Pages on main
```

## Key Design Decisions

- **Single phone** — no auth, no multi-device sync. localStorage is sufficient.
- **No running tally during voting** — `VotingBallot` receives only candidates, never vote counts. Results are only computed on the results page via `tallyVotes()`.
- **HandoffScreen is not a route** — keeping ballot and handoff as local UI state prevents leaking voter identity via URL.
- **Mounted guard on vote/results pages** — prevents redirect-to-home race condition before `useLocalStorage` hydrates from storage.
- **No basePath** — the app is served from the root of `https://ava-mvp.bernhardwittmann.com/`. Do not add a basePath prefix to hrefs.
- **Image src** — use `/ava-logo.png` (no prefix needed).

## Branding

AVA ecosystem color palette (CSS variables in `globals.css`):

| Variable | Value | Usage |
|---|---|---|
| `--ava-snow` | `#f6fbff` | Primary text |
| `--ava-ice` | `#76a8d3` | Accent, borders |
| `--ava-ice-bright` | `#9bc3e5` | Highlights, focus rings |
| `--ava-night` | `#0a1320` | Main background |
| `--ava-steel` | `#1a2635` | Card backgrounds |

## Deployment

Deploys to `https://ava-mvp.bernhardwittmann.com/`.

The `deploy.yml` workflow runs e2e tests first, then builds and deploys. Only triggers on pushes to `main`.
