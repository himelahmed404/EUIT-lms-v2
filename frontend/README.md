# EUIT-LMS frontend (Next.js)

TypeScript App Router port of the European IT Institute LMS static UI. Demo data only — API later via `../backend` and [`docs/API-MAP.md`](docs/API-MAP.md).

## Run

```sh
npm install
npm run dev    # http://localhost:3000
```

Demo log in: open `/` and pick Student / Mentor / Admin.

## Scripts

- `npm run dev` — development
- `npm run build` / `npm start` — production
- `npm run check` — build + Playwright smoke at key widths
- `npm run lint` — ESLint

## Structure

- `src/app` — routes (public, student, mentor, admin)
- `src/components/shell` — StudentShell, ConsoleShell
- `src/lib/ui/interactions.js` — ported `app.js` behaviour
- `src/lib/gsap` — ScrollTrigger motion
- `src/content/*` — HTML mains ported from the static prototype
- `src/data/demo` — cast and fixtures
- `src/styles` — EIT / panel / app / console / per-page CSS (imported by `src/app/globals.css`)

Local milestone checklist: `frontend_plan.md` (gitignored).
