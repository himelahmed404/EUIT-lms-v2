# Frontend API integration verification — 18 November 2026

## Results

- Postman: **76 requests, 223 assertions, zero failures** against the real Express API and disposable PostgreSQL/Firebase Auth emulator fixtures.
- Browser: **49 authenticated student/mentor/admin routes at 360px and 1280px**, plus local link checks; no page errors or horizontal-overflow failures.
- Verified through the UI: signed-out guards, Firebase login/logout, role-based portal selection, profile edits and persistence after reload, notification/leaderboard preference persistence, password reauthentication/change, permission catalogs, Owner role assignment and the target's new portal, verification resend/refresh, missing-profile recovery, password-reset email requests, student signup, checkout signup/retained course choice, and unavailable-payment result handling.
- Existing signup compensation/provider-failure regression passed after the browser suite.
- Button contrast checked in Chromium with the real account and student styles: white button text retained.
- Final Next.js 15.5.29 production build: passed, exit 0. Backend build and six authorization/middleware tests: passed, exit 0. The frontend build retains two existing non-blocking `@next/next/no-css-tags` warnings in `StudentPage.tsx`.

The browser tests run Next.js with real Firebase SDK authentication against the official Auth emulator and the real backend; API responses are not intercepted or mocked by Playwright. The signup failure-injection regression separately uses its HTTP stand-in. Test accounts/database/processes were removed afterward. The optional detailed component/motion checks were adapted to authenticated fixtures but were not included in this run.

## Configured environment

The additive `20261118010000_profiles_permissions` migration was applied successfully to the configured Prisma database. The six-role seed completed and preserved existing definitions. The frontend's ignored local environment was configured with the existing project's public Firebase configuration and backend origin. Firebase Admin private keys remain backend-only. No real account password or sign-in token was requested or copied into source control.

Live browser sign-in and inbox delivery against the configured Firebase project still require validation with an actual account. Emulator results do not prove production Firebase signature validation or email delivery.

## Dependency review

The original frontend audit reported 21 findings, including one critical Next.js advisory. Next.js and its matching ESLint configuration were updated to 15.5.29. Compatible `npm audit fix` updates were applied without forcing major upgrades or downgrades.

The remaining audit result is **19 findings: 18 high, 1 moderate, 0 critical**. Remaining dependency chains include Firebase/Firestore's gRPC packages, lint/glob tooling and Next.js's PostCSS dependency. The suggested forced changes include a Firebase downgrade and a Next.js major upgrade; these were not applied. This is an unresolved dependency-maintenance item, not a claim that the application has passed a full security audit.

## Remaining scope

Course/payment/schedule/notification domain records remain sample data. Normal photo uploads, per-device sessions, full custom-role editing and audit viewing still need their backend milestones. Existing photos can be displayed/removed, and current role/permission data and Owner access changes are connected.

See [configuration and manual checks](../docs/frontend-api-integration.md) and the [project record](../../../record.md).
