# Verification record — 18 November 2026

- `npm run build`: passed (Prisma client generation and TypeScript compilation).
- `npx prisma validate`: passed.
- Both migrations: applied successfully to a fresh disposable PostgreSQL 18 database.
- Built-in role seed: ran twice, exactly six system role definitions remained.
- `npm run test:access`: 6 tests passed, 0 failed, exit 0.
- `npm run test:postman`: 76 Postman requests, 223 assertions, 0 failures, exit 0.
- Persistent-state checks: passed for cross-user isolation, five successful access-change audit events, and expected before/after roles.
- Owner bootstrap: successfully created and audited the first Owner; refused a second bootstrap.
- Existing signup regression: passed validation, STUDENT role assignment, duplicate handling, verification retries, provider failures and database-write compensation.

Target: real Express application, Prisma/PostgreSQL persistence, Firebase Admin SDK and the official local Firebase Auth emulator (`demo-euit-profiles`). The regression-only lesson router exercises actual middleware against database-backed accounts and assigned batch scope; it is not shipped as a production endpoint. Existing signup failure injection uses its separate local HTTP stand-in.

Postman CLI 1.73.0 ran the local collection while signed out. Results were not uploaded. `postman status` is unsupported in this installed build; `postman whoami` reports signed out. No production Firebase signature/email-delivery claim is made. The configured application database and Firebase accounts were not changed by these tests.

See [api-validation.md](../docs/api-validation.md) for repeatable commands and real-project validation steps. Disposable test services and fixture data were removed after the run.
