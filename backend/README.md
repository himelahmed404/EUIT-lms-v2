# EUIT-LMS backend

Node.js 24, Express 5, TypeScript, Firebase Auth, Prisma ORM 7 and Prisma Postgres.

## Local setup

1. Create a Firebase project and enable Authentication → Email/Password.
2. Save a Firebase Admin service-account JSON outside this repository.
3. Create a fresh Prisma Postgres database. Copy `.env.example` to `.env` and set:
   - `DATABASE_URL`: pooled PostgreSQL URL for application queries.
   - `DIRECT_URL`: direct PostgreSQL URL for migrations.
   - `GOOGLE_APPLICATION_CREDENTIALS`: absolute path to the service-account JSON.
   - `PORT`: HTTP port (example: 5000).
   - `FIREBASE_WEB_API_KEY`: Web API Key from Firebase Project settings → General. Required before signup can create accounts.
4. Run from `backend/`:

```sh
npm ci
npx prisma validate
npm run build
npx prisma migrate deploy
npm run db:seed
npm start
```

For development, use `npm run dev`. Startup checks database connectivity with `SELECT 1`.
Never commit `.env` or Firebase service-account files.

This migration baseline targets a fresh database. It does not migrate or delete the previous Supabase project or its accounts.

## Student signup

`POST /api/auth/student/signup` is public. Send JSON:

```json
{"fullName":"Test Student","email":"student@example.com","password":"example-password-only"}
```

Exactly these fields are accepted. Name: trimmed, 1–120 characters. Email: trimmed and lowercased, at most 254 characters. Password: at least 8 characters and at most 72 UTF-8 bytes. The client cannot choose a role.

Accepted requests and duplicate email addresses return:

```json
{"success":true,"statusCode":202,"message":"Signup request accepted. If your credentials are valid and your email is unverified, check your inbox for a verification link."}
```

Invalid fields return 400, provider rate limits return 429, and provider/database failures return 503. Responses contain no passwords or login tokens.

Firebase stores credentials. Prisma Postgres stores an internal profile UUID, unique Firebase UID, full name, role (STUDENT at signup), contact/staff profile fields, preferences, batch scope, and timestamps. Signup requests a Firebase verification email and leaves `emailVerified` false until the recipient follows the link. Firebase hosts the confirmation page. The app signs in using Firebase's client SDK; this API has no login endpoint. After clicking the link, reload the Firebase user and force-refresh the ID token (`getIdToken(true)`) before calling protected routes.

Firebase and PostgreSQL do not share a transaction. After a database write failure the service checks whether the profile committed before attempting to remove the newly created Firebase account. If verification or cleanup fails, the server logs the UID for manual reconciliation and returns 503. Never attach an existing Firebase account to a submitted name or role based only on its email address. A timeout during Firebase creation can also require reconciliation; duplicate responses alone do not prove that a profile exists.

Before giving the mobile app access, supply its developer with the Firebase client configuration and this endpoint contract. Firebase Admin credentials are backend-only. The `requireVerifiedEmail` middleware validates Firebase ID tokens with revocation/disabled-account checking. Missing or invalid tokens return 401, unverified email returns 403, and authentication infrastructure errors return 503. The decoded token is available at `res.locals.firebaseUser`. It is mounted on the profile and access APIs; signup remains public. The subsequent `requireProfile` middleware resolves the active application profile, database permissions and batch scope. Resource routers must additionally enforce permissions, scope and ownership.

```ts
router.get("/protected-resource", requireVerifiedEmail, controller);
```

For existing accounts, signup verifies the supplied password before requesting another email. Wrong credentials retain the generic accepted response and send no email. Verified users receive no additional verification email. No names or roles are updated through duplicate signup. Delivery failures return 503 while retaining the account/profile; retry the same signup credentials to resend. Provider throttling returns 429. A successful email API call proves Firebase accepted the send request, not inbox delivery. Tokens obtained internally for sending are never returned to callers.

## Integration verification

Run `npm run test:integration` against the development database only. It uses a local Firebase HTTP stand-in, creates temporary profiles in the configured PostgreSQL database, and removes them afterward. It checks validation, role assignment, duplicate responses, provider errors, and compensation after an injected database-write failure. This does not verify live Firebase configuration.

If Firebase returns `auth/configuration-not-found`, open Authentication in the Firebase console, click Get started, and enable Email/Password.

Verification of this migration: Prisma schema validation, production build, fresh-database migration, database connectivity, and real HTTP 404/400 checks via `npm start` passed. The integration check passed using a local Firebase stand-in and real temporary PostgreSQL profiles. After Firebase Authentication was enabled, live signup returned HTTP 202, created a Firebase account with emailVerified=false and exactly one STUDENT profile, and returned the same response for duplicate signup. The temporary Firebase account and database profile were removed after verification.

Email-verification checks: `npm run test:integration` covers email requests, retries after delivery failures, and no sends with incorrect credentials, using a local HTTP stand-in. `npm run test:middleware` covers verified/unverified tokens and authentication failures using an injected verifier; it does not prove live token signature validation. Live verification also passed: signup returned 202, the recipient received and followed the verification link, and Firebase subsequently reported emailVerified=true. The temporary Firebase account and PostgreSQL profile were removed afterward. Live protected-route token verification has not yet been exercised; middleware behavior was tested with an injected verifier.


## Profiles, permissions and Firebase validation

The first API-map backend milestone is implemented: `GET /api/me`, `PATCH /api/me/profile`, `PUT /api/me/photo`, `GET/PATCH /api/me/preferences`, and `GET /api/me/permissions`. Staff APIs expose `GET /api/permissions`, `GET /api/admin/roles`, and Owner-only `PATCH /api/admin/profiles/:id/access` with transactional audit records. The initial role seed includes Owner, Admin, Accounts, Admissions, Mentor and Student; custom role definitions and assignment are supported by the database and authorization layer.

After deploying the new migration, run `npm run db:seed`. To assign the first Owner to an existing verified account, run `npm run bootstrap:owner -- FIREBASE_UID`; it refuses when an Owner already exists and records an audit event. Self-service requests cannot modify role, scope, permission, active status, Firebase UID or login email.

Run `npm run test:access` and `npm run test:postman` for the isolated verification suite. It uses a disposable local PostgreSQL database and the official Firebase Auth emulator, so it does not require or change the configured development database. The Postman runner also checks persisted audit records and existing signup regression behavior.

See [the complete endpoint contract and validation steps](../resources/backend/docs/api-validation.md). Import [the manual Postman collection](../resources/backend/postman/collections/account-api.manual.postman_collection.json) and [blank environment](../resources/backend/postman/environments/account-api.template.postman_environment.json) to validate against your Firebase development project. The emulator suite verifies backend behavior but not live Firebase token signatures or email delivery.

Photo binding is implemented against an owned, completed image asset. Profile photo upload is now implemented through Cloudinary; general-purpose upload/finalization remains a later milestone. Client sign-in, persistence, verification resend, recovery and password changes remain Firebase client operations. Per-device application sessions and the full role editor/audit viewer remain the later work described in the API map.

## Connected frontend

The Next.js frontend now uses Firebase sign-in and this API through a same-origin proxy. See [frontend configuration and integration validation](../resources/backend/docs/frontend-api-integration.md). `npm run test:browser` runs the API Postman suite plus authenticated frontend checks against disposable PostgreSQL and Firebase Auth emulator fixtures.

## Course catalog, batches and public pricing

Milestone 2 is implemented: public catalog/detail, staff course drafts and format pricing, scoped batch CRUD with class schedules, and mentor/room choices. See [contracts, setup and validation](../resources/backend/docs/course-catalog-validation.md). Run `npm run test:catalog` for isolated HTTP regression or `npm run test:browser` for frontend/API checks. `npm run catalog:import-rooms -- /path/to/rooms.json` imports actual campus rooms through the trusted operational CLI. Course publication and enrollment/payment remain later milestones.

## Mobile developer handoff

See the [Flutter and shared API guide](../resources/backend/docs/mobile-api-guide.md) for authentication, every implemented endpoint, request/response contracts, Dart examples, errors and current feature limits.

## Profile photo uploads

Cloudinary-backed uploads are implemented for all profile panels. See [setup, API and Flutter instructions](../resources/backend/docs/cloudinary-profile-photos.md). Configure the three backend Cloudinary variables to enable uploads.
