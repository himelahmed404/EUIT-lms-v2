# Resource relocation verification — 18 November 2026

All commands used the relocated scripts through the owning application's package scripts.

| Check | Result |
|---|---|
| Backend `npm run test:access` | Build passed; 6 tests passed; exit 0 |
| Backend `npm run test:postman` | 76 requests, 223 assertions, zero failures; exit 0 |
| Disposable database migration and role seeding | Passed |
| Owner bootstrap, audit persistence and cross-user isolation | Passed |
| Existing signup failure-injection regression | Passed |
| Frontend `npm run check` | Production build passed; 58 routes, 61 local destinations, responsive checks and student navigation passed; exit 0 |
| Local Markdown links | All resolve after relocation |
| Postman JSON parsing | All three collection/environment files parsed |
| Git ignore checks | Local frontend docs/plans and populated Postman environment exports remain ignored |
| `git diff --check` | Passed |

The frontend build emitted two existing non-blocking stylesheet-link warnings in `frontend/src/components/student/layout/StudentPage.tsx` (`@next/next/no-css-tags`).

Backend tests ran against disposable local PostgreSQL and the official Firebase Auth emulator. The signup regression used its separate local HTTP stand-in. No configured application database or live Firebase account was changed. Test infrastructure was removed afterward. This run does not establish live Firebase signature validation or email delivery.

See the [root work record](../../../record.md), [resource index](../../README.md), and [API validation guide](../docs/api-validation.md).
