# Firebase, profiles and permissions validation

## Automated regression (no Firebase credentials or live database needed)

Prerequisites: Node.js 24, installed backend packages, PostgreSQL server tools, Firebase CLI and Postman CLI. On this device all are installed. On Linux the runner auto-detects PostgreSQL 18 or 16; elsewhere set `PG_BIN` to the PostgreSQL executable directory. Run as an ordinary user, not root. Localhost sockets must be allowed.

From `backend/`:

```sh
npm ci
npm run test:access
npm run test:postman
```

`test:postman` builds the backend, initializes a disposable PostgreSQL cluster under the OS temporary directory, applies both migrations, seeds the six built-in roles twice to verify idempotency, and starts the official Firebase Authentication emulator under a `demo-` project. It creates accounts, obtains emulator ID tokens, runs the real Express routes with the installed Postman CLI, checks persisted audit events, and runs the existing signup compensation regression. All fixture records, processes, and temporary credentials are removed when the runner finishes. It overrides database/Firebase configuration; it does not migrate or write to the database in `.env`.

The regression collection is [`profiles-permissions.regression.postman_collection.json`](../postman/collections/profiles-permissions.regression.postman_collection.json). Let the runner generate its environment rather than running it directly against your application. Its `/__tests/lessons/*` requests exercise permission and database-derived batch scope through a test-only resource router; those routes are not in the shipped API.

Postman is signed out on this device. Local collection execution works without login; results are not published to a workspace. The installed CLI may print login/update notices after a successful local run. Treat a zero exit code and zero failed assertions as the run result. Its `status` command is unavailable in this CLI build; `postman whoami` checks account state.

This verifies real Express + Prisma + PostgreSQL behavior and Admin SDK interactions with the official Auth emulator. Emulator tokens are unsigned, so this does **not** establish production signature validation, production Firebase credentials, or real email delivery. The existing signup regression separately uses its local Firebase HTTP stand-in to inject failures.

## Validate against your configured development Firebase project

1. In `backend/.env`, set `DATABASE_URL`, `DIRECT_URL`, `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_WEB_API_KEY`, and `PORT=5000`. Enable Firebase Authentication → Email/Password. Remove `FIREBASE_AUTH_EMULATOR_HOST` from the environment for a real-project run. The service-account project and Web API key must refer to the same Firebase project. Keep credentials out of Git.
2. Prepare the database and start the API:

   ```sh
   npm run build
   npx prisma migrate deploy
   npm run db:seed
   npm start
   ```

   The new migration preserves existing profiles and their internal IDs. `db:seed` creates missing built-in role definitions without overwriting existing definitions. Run it before calling protected APIs. These commands target the URLs configured in your environment; automated tests above use a separate database.

3. Import [`account-api.manual.postman_collection.json`](../postman/collections/account-api.manual.postman_collection.json) and [`account-api.template.postman_environment.json`](../postman/environments/account-api.template.postman_environment.json) into Postman. Select the imported environment. Set local values for `baseUrl`, `firebaseWebApiKey`, `email`, `password`, and `fullName`. Use a development test account. Keep password and token values local/secret; do not export populated environments into source control.
4. Send **Sign up student** once. Expect `202`. Open the verification email and follow the link. Send **Sign in with Firebase** to store the returned `idToken` in the environment. If you signed in before verifying, sign in again afterward to replace the token. In an actual Firebase client, use `reload(user)` followed by `getIdToken(user, true)`.
5. Send **Get me**. Expect `200`, your internal profile UUID, the verified Firebase email, `STUDENT`, self permissions, and `{ "mode": "ASSIGNED", "batchIds": [] }` until enrollment/batch assignment exists. The collection saves `profileId`. A Firebase account created directly in the console without an LMS profile correctly returns `404 PROFILE_NOT_FOUND`; contact the operator for reconciliation instead of creating a profile based on submitted email.
6. Send **Update my profile**, then **Get me** again. Confirm the values persisted. Send **Get preferences**, **Update preferences**, and **Get preferences** again. Confirm `smsNotifications` and `leaderboardVisible` are false while other defaults remain unchanged.
7. Send **Reject self role escalation** and **Reject missing bearer token**. Expect `400` and `401`. Try the staff catalog as a student: expect `403`. Try an unverified account: expect `403 EMAIL_NOT_VERIFIED`. To validate live revoked/disabled-user checks, revoke sessions or disable a dedicated test account in Firebase and retry its old token: expect `401`.
8. For staff validation, create and verify a separate account through signup. Copy that account's **Firebase UID** from the Firebase console (not the internal profile UUID), then run the one-time trusted operator command:

   ```sh
   npm run bootstrap:owner -- FIREBASE_UID
   ```

   It requires an existing active LMS profile and an enabled, verified Firebase account, refuses if any Owner already exists, and records `OWNER_BOOTSTRAPPED`. There is no public role-selection signup or HTTP ownership-transfer endpoint.
9. Sign in as that Owner in Postman. Send **List roles** and **Permission catalog**: expect `200`. Set `targetProfileId` to the internal UUID of a different test account and send **Assign Mentor to target profile**. To assign scope, edit `batchIds` to the relevant UUIDs and keep `batchScope: "ASSIGNED"`. No Batch model exists yet, so these UUIDs are stored assignment scopes; future batch APIs must validate them against real batches. The endpoint cannot change Owner access or grant Owner.
10. Use the target account's existing token to call `/api/me/permissions`: it should immediately show Mentor grants. Disable that target using the Owner token and retry the target token: expect `403 ACCOUNT_DISABLED`. Re-enable it afterward. Inspect the `audit_events` table to see one `PROFILE_ACCESS_UPDATED` event per successful access change, with actor, target, and before/after access values. Self-service edits cannot write these fields.
11. **Photos:** `PUT /api/me/photo` accepts only `{ "assetId": "UUID" }`, where the asset is owned by the caller, finalized (`ready=true`), and JPEG/PNG/WebP. Another user's or missing asset returns `404 ASSET_NOT_FOUND`; unfinished/non-image assets return `409 ASSET_NOT_READY`. `{ "assetId": null }` removes the photo. Do not fabricate asset ownership from a client URL. Profile photos can now be uploaded and attached through `POST /api/me/photo/upload`; see [Cloudinary setup and contract](cloudinary-profile-photos.md). General-purpose upload/finalization remains later work.

Send the manual collection's account-setup and staff-mutation requests individually. Running every folder indiscriminately would resend verification mail and change the selected target account.

## Contract

Every successful API response is `{ success: true, statusCode, message, data }`. Errors are `{ success: false, statusCode, message, code }` for the new protected routes. Protected responses use `Cache-Control: no-store`.

| Endpoint | Authorization | Result |
|---|---|---|
| `GET /api/me` | Verified token, active LMS profile, `profile.read` | Contact and public profile fields, token email, role, effective permissions, batch scope and photo |
| `PATCH /api/me/profile` | `profile.write` | Updates only caller-owned profile fields |
| `POST /api/me/photo/upload` | `profile.write`, raw JPEG/PNG/WebP up to 2 MiB | Normalizes, uploads to Cloudinary and attaches the photo |
| `PUT /api/me/photo` | `profile.write` plus owned completed image | Attaches/removes a photo asset |
| `GET /api/me/preferences` | `preferences.read` | Stored preferences with defaults |
| `PATCH /api/me/preferences` | `preferences.write` | Partial boolean updates |
| `GET /api/me/permissions` | Verified token, active LMS profile | Effective role, permissions and batch scope |
| `GET /api/permissions` | `roles.read` | Supported permission names |
| `GET /api/admin/roles` | `roles.read` | Built-in and custom role definitions |
| `PATCH /api/admin/profiles/:id/access` | Owner plus `access.write` | Atomic access update and audit event |

Profile fields: `fullName` (1–120 trimmed chars); nullable `phone`, `emergencyContact` (7–24 phone characters); nullable `address` (500), `education` (200), `occupation` (120). Staff may additionally set nullable `jobTitle` (120), `bio` (2000), `portfolioUrl` (HTTP/HTTPS, 2048), `yearsOfExperience` (integer 0–80); `skills` (up to 20 strings, each 1–60); and boolean `showOnWebsite`. Null clears nullable fields; empty optional strings normalize to null. Unknown fields, empty patches, arrays, and invalid types return `400 VALIDATION_ERROR`. Login email, UID, role, scope, permissions, and ownership are never self-editable.

Preferences: `emailNotifications`, `smsNotifications`, `leaderboardVisible`, `classReminders`, `paymentReminders`, `learningUpdates`, `projectSubmissions`, `studentQuestions`, `recordingReminders`, `courseReviewUpdates` default true; `marketingEmails` defaults false. Updates only store choices; notification dispatch is later work. Security/transactional messages should use their own mandatory-delivery policy when dispatch is implemented.

Access fields: optional `role` (`ADMIN`, `ACCOUNTS`, `ADMISSIONS`, `MENTOR`, `STUDENT`, `CUSTOM`), `customRoleId` (existing non-system role UUID for CUSTOM), `active` (boolean), `batchScope` (`ALL`, `ASSIGNED`, or null to use role default), and `batchIds` (up to 200 UUIDs). Role changes reset a previous scope override unless explicitly supplied. Student is always own-resource/assigned-scope; Owner is fixed with all permissions and all batches. `access.write` is Owner-only even if present in a custom definition. Unknown permission names grant nothing. New custom-role creation/editing and the audit viewer remain API-map step 8; the schema, lookup and assignment support them now.

Initial staff defaults are in `backend/src/modules/access/permissions.ts`: Admin edits 11 areas and views payments/settings; Accounts edits payments and views dashboard/pricing/students/batches; Admissions edits students/leads and views dashboard/courses/batches/pricing/payments; Mentor edits courses/teaching/recordings and views dashboard/batches/students within assigned batches. Only Owner can mutate account access in this milestone. A permission never bypasses resource ownership or batch-scope checks; future resource routers must call the provided helpers with ownership/scope read from the database.

Expected errors: `401 UNAUTHENTICATED`; `403 EMAIL_NOT_VERIFIED`, `ACCOUNT_DISABLED`, `FORBIDDEN`, `OWNER_PROTECTED`, `BATCH_FORBIDDEN`; `404 PROFILE_NOT_FOUND`, `ASSET_NOT_FOUND`; `400 VALIDATION_ERROR` or `INVALID_BODY`; `409 ASSET_NOT_READY` or `CONCURRENT_CHANGE` (reload and retry); `503 AUTH_UNAVAILABLE`, `ROLE_NOT_CONFIGURED`, or `SERVICE_UNAVAILABLE`.

Firebase client sign-in/sign-out, persistence, password recovery/change, and verification resend remain client SDK operations as specified by the map. Application device-session registration/list/revocation is not enabled: it needs separately enforced server-issued session credentials. Firebase all-user refresh-token revocation alone cannot implement per-device controls.

Reference: [Firebase token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens), [Auth emulator behavior and limitations](https://firebase.google.com/docs/emulator-suite/connect_auth), [Firebase user management](https://firebase.google.com/docs/auth/web/manage-users).
