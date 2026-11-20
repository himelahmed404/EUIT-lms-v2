# Course catalog integration verification — 20 November 2026

## Scope

API-map milestone 2: course catalog, batch scheduling, public pricing, staff course drafts, mentor/room choices and connected public/admin screens. Existing Firebase/profile/permission functionality was inherited and regression tested.

## Completed checks

- `npm --prefix backend run test:postman`: exit 0. Account collection: 76 requests / 223 assertions. Catalog collection: 80 requests / 186 assertions. Total: 156 requests / 409 assertions, zero failures.
- Real Express/Prisma/PostgreSQL plus the official Firebase Auth emulator were used. A temporary database received all three migrations and idempotent role seeds; all fixtures were removed at teardown.
- Public/draft/hidden/closed/full-batch behavior, query filters, pagination validation, role/permission/batch scope, private-link protection, mentor opt-in, integer BDT installment totals, class timestamps/IDs, invalid plans, room capacity, stale versions and audit persistence were covered.
- Concurrent course edits and concurrent overlapping mentor bookings each allowed exactly one success and one 409. Room import preserved IDs, remained idempotent and rejected capacity reduction below existing batch seats.
- Signup regression retained its independent provider-error/compensation test harness and passed.
- `npm --prefix backend run test:access`: exit 0, six tests passed.
- `npm --prefix frontend run build`: exit 0. Two inherited `@next/next/no-css-tags` warnings remain in StudentPage.tsx; no new build errors.
- `npm --prefix backend run test:browser`: exit 0 in the final resumed run. All 50 authenticated routes passed at 360px and 1280px, with no page errors or horizontal overflow failures. Real browser/API checks passed for course/batch create/edit/reload, mentor choices, class schedules, public filtering, BDT totals, full/invalid batch rejection, URL price tampering, checkout signup, and the existing Firebase/account workflows.
- The final combined browser run also reran all 409 Postman assertions, concurrent-write checks, room-import checks and signup compensation regression successfully. Temporary local services stopped and fixture databases were removed.
- Final production build, ESLint (zero errors, two inherited warnings), documentation links, Postman JSON parsing and `git diff --check` passed. Local raw logs are under gitignored `resources/backend/output/` (not a committed report).
- `npx --no-install prisma migrate deploy` against the configured database: exit 0; applied the additive catalog migration only. No demo catalog data was imported into that database.

## Issues found and corrected

- Public/private mentor assertions originally assumed opt-out despite the preceding account suite explicitly opting the mentor in. Added separate opt-in/opt-out checks.
- Dropdown labels wrapping option text were ambiguous to accessibility-based selectors. Changed the field component to explicit labels associated with IDs.
- A browser navigation check could inspect the old catalog URL before checkout navigation completed. It now waits for checkout's URL and heading before tampering with query values.
- Stabilized the batch editor's permissions dependency so account refresh does not unnecessarily reload its editing form.

## Limits

No payment provider or real Firebase email delivery was tested. Production application servers were not deployed. New courses remain drafts; publishing/approval, quotes, payment due dates, discounts, seat reservation and learning enrollment are outside milestone 2. The configured catalog can legitimately be empty.

Postman runs were local; no collection or result was published to a cloud workspace. This CLI does not support `postman status`; no account setup was required for local collection execution.

Manual steps and contracts: [catalog validation guide](../docs/course-catalog-validation.md).
