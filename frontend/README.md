# EUIT-LMS frontend (Next.js)

TypeScript App Router port of the European IT Institute LMS static UI. Firebase authentication and account/profile/permission APIs are connected to `../backend`. Other domain screens still use clearly marked sample data.

## Run

```sh
npm install
npm run dev    # http://localhost:3000
```

Open `/`, sign in with a verified Firebase email/password account, and enter the portal selected by your backend role. See [configuration and validation](../resources/backend/docs/frontend-api-integration.md).

## Student panel

Sign in as a Student to open `/student/dashboard`. Student routes live in `src/app/(student)/student` as React Server Components, with interactive client components and shared navigation in `src/components/student`. The student root layout isolates the design from the public, mentor and admin layouts. Fonts, images and compiled design styles are local to `public/student-assets`.

The frontend runs independently of the original HTML design folder. Old student HTML bookmarks redirect to the corresponding App Router pages.

## Scripts

- `npm run dev` — development
- `npm run build` / `npm start` — production
- `npm run check` — production build + Postman and authenticated browser integration checks
- `npm run lint` — ESLint

## Structure

- `src/app` — routes (public, student, mentor, admin)
- `src/components/shell` — shared console components
- `src/lib/ui/interactions.js` — ported `app.js` behaviour
- `src/lib/gsap` — ScrollTrigger motion
- `src/content/*` — HTML mains ported from the static prototype
- `src/data/demo` — cast and fixtures
- `src/styles` — EIT / panel / app / console / per-page CSS (imported by `src/app/globals.css`)

Local milestone checklist: `../resources/frontend/plans/frontend-milestones.md` (gitignored).

## Student panel components

See the [student panel component map](../resources/frontend/docs/student-component-map.md) for all 25 routes, feature folders, shared components, interaction contracts and validation commands.

Checks and screenshot tools live in `../resources/frontend/`. Use `npm run check` for the full build/integration run or `npm run check:accounts` for isolated account/browser verification.

## Connected course catalog

`/enroll/course` and `/enroll/checkout` read public offerings, valid batch/plan combinations and published BDT pricing from the API. `/admin/courses`, `/admin/course-edit`, `/admin/batch-edit`, `/admin/batch-detail` and `/admin/mentors` use real catalog APIs with permission-aware controls. Production components live in `src/components/catalog/`, with typed clients in `src/lib/api/catalog.ts`. Superseded admin templates are retained in `resources/frontend/reference/catalog-demo/` at the repository root. See [manual and automated validation](../resources/backend/docs/course-catalog-validation.md).
