# Frontend API integration

The frontend uses Firebase email/password authentication and the Express account APIs. Browser calls go to same-origin `/api/*`; a Next.js route forwards only the implemented account endpoints to the server-only `API_SERVER_URL`. Firebase Admin credentials never enter the frontend. ID tokens come from the Firebase SDK and are refreshed for a single retry on HTTP 401.

## Run locally

1. Prepare `backend/.env` as described in `backend/README.md`. The profile/permissions migration and six role definitions have been applied to the configured database during this task.
2. Start the backend from `backend/`: `npm run dev` (or `npm run build && npm start`).
3. Copy `frontend/.env.example` to `frontend/.env.local` if it does not exist. Set `API_SERVER_URL` to the backend origin, and the public Firebase web API key/project ID/auth domain to the same Firebase project. This task created an ignored local config using the existing backend project's public configuration. Keep the emulator setting unset for real Firebase. Restart/rebuild Next.js after changing public environment variables.
4. From `frontend/`, run `npm run dev`. Open the shown localhost URL, create a student account, verify the email, then sign in. The stored backend role selects the portal; there is no client-side role picker.
5. In My profile, edit details/preferences and reload to verify persistence. Password changes require the current password and Firebase reauthentication. Sign out ends the current Firebase session.
6. For staff, bootstrap the initial Owner using the existing backend operator command, then sign in as Owner. `/admin/roles` lists the role definitions and permission catalog and submits access changes using the target internal profile UUID. The backend enforces Owner-only access changes.

## Connected behavior

- Signup: `POST /api/auth/student/signup`, followed by verification and Firebase sign-in.
- Login/logout, persistence checkbox, email recovery, verification resend and token refresh: Firebase web SDK.
- Profile/session state: `GET /api/me`; missing application profiles and disabled accounts get explicit recovery/error UI.
- Personal and mentor/staff fields: `PATCH /api/me/profile`.
- Notification/leaderboard choices: `GET/PATCH /api/me/preferences`.
- Current photo display/removal: `GET /api/me` and `PUT /api/me/photo` with null. New photos use `POST /api/me/photo/upload` from all three profile panels; see [Cloudinary configuration](cloudinary-profile-photos.md).
- Effective permissions and scope: `GET /api/me/permissions`.
- Staff permission/role catalogs: `GET /api/permissions`, `GET /api/admin/roles`.
- Owner access changes: `PATCH /api/admin/profiles/:id/access`.
- Checkout creates an account or saves signed-in contact details. It stores only the course selection in session storage; it does not charge a card or mark an enrollment paid.

## Verification

Run `npm run check` from `frontend/` for a production build plus isolated Postman/browser verification. `npm run check:accounts` skips the production build and runs the integrated harness. The harness uses disposable PostgreSQL, the real Express application, official Firebase Auth emulator and a Next.js development server configured for the emulator. It never changes the frontend's local config or uses real test-account credentials. The existing Postman regression remains runnable from `backend/` with `npm run test:postman`.

Course, dashboard, payment and notification records remain sample data until their domain APIs are implemented. Client route guards improve navigation; Express still makes the security decision on every protected request. Per-device logout and the full custom-role editor are not implemented. Profile uploads require configured backend Cloudinary credentials.

References: [Firebase password auth](https://firebase.google.com/docs/auth/web/password-auth), [user management](https://firebase.google.com/docs/auth/web/manage-users), [persistence](https://firebase.google.com/docs/auth/web/auth-state-persistence).
