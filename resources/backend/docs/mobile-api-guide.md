# EUIT API handoff for Flutter and web developers

Contract reviewed: **20 November 2026**. Audience: Flutter Android/iOS developers, frontend developers and backend maintainers.

This documents the implemented Express API, not planned API-map milestones. Backend route/validation source is authoritative; this guide and the linked Postman collections must be updated when that source changes. Examples use fictional values. No production URL or credentials are included.

## 1. Can the website and Flutter app share this backend?

**Yes.** Both clients can use the same Express API, Firebase project and PostgreSQL database. A profile saved from mobile will be returned to the website on its next fetch, and vice versa. Updates are not pushed live: refetch on return, refresh or after a successful mutation. No WebSocket/subscription interface is implemented.

```text
Website ───────┐                         ┌─ Firebase Admin: verify ID token
               ├─ HTTPS Express /api ────┤
Flutter app ───┘                         └─ Prisma/PostgreSQL: shared app data
     └─ Firebase client SDK: sign-in, email verification, password operations
```

Use the **same Firebase project** configured by the backend. Firebase user UID is an authentication identity; `GET /api/me` returns a separate LMS profile UUID. Use profile UUIDs for API resource IDs. Permissions and batch scope come from the database, not client-selected roles.

Sharing a backend does not make all planned mobile features ready. Accounts/profiles, permissions, catalog and staff batch management are implemented. Learning, enrollment/payment and other features in section 10 still need APIs.

## 2. Handoff configuration and network access

The backend owner must provide:

- A reachable staging/production **API origin**, for example `https://api.your-domain.example` (placeholder only). Every path below already includes `/api`.
- The existing Firebase project identifier and platform client configuration. Register the mobile Android package/iOS bundle in that project through the Firebase setup workflow.
- Test accounts for each required role, a verified email, and appropriate database permissions/batch assignments.
- Actual course/batch IDs when testing catalog selections. A new database can legitimately have no public courses.

Mobile calls Express directly; it does not need the Next.js `/api` proxy. `API_SERVER_URL` is website/server configuration, not the URL to embed as a secret in mobile. Never ship database URLs, Firebase Admin service-account files, private keys or backend environment files in the app.

Local default example is `http://localhost:5000` on the API computer. On a phone, `localhost` means the phone. Use a reachable development host/LAN address or a platform emulator host mapping, and permit the connection in your local network setup. Production must use HTTPS. Android requires network permission; development cleartext exceptions, if needed, must stay development-only. Native Android/iOS HTTP does not use browser CORS. **Flutter Web does:** this Express app does not currently configure CORS; use an existing same-origin gateway or agree a separate CORS change before supporting cross-origin Flutter Web. No backend change is included in this documentation task.

## 3. Authentication and app startup

There is **no backend login, refresh-token, password-reset or logout endpoint**. Those operations use Firebase's Flutter SDK.

1. Create a new student with `POST /api/auth/student/signup`. Do not use Firebase client account creation alone: it would not create an LMS database profile.
2. Sign in using Firebase email/password. Signup itself returns no token and does not sign the user in.
3. Follow the verification email. Reload the Firebase user and force-refresh the ID token before requesting protected data.
4. Send `Authorization: Bearer <Firebase ID token>` on protected API calls.
5. Call `GET /api/me`; route the app using its role/permissions. Keep server errors visible for unverified, disabled or missing-profile accounts.
6. Retrieve a current token from the SDK for each request. On HTTP 401, force-refresh once and retry once. If it still fails, ask the user to sign in again. Do not retry 403 in a token-refresh loop.

Firebase client operations also cover verification resend (`sendEmailVerification`), password recovery (`sendPasswordResetEmail`), password reauthentication and `updatePassword`, and `signOut`. Signing out locally is not a server-issued per-device logout. Do not expose email-change or provider-link flows without an agreed application contract.

Official setup/auth references: [Flutter Firebase setup](https://firebase.google.com/docs/flutter/setup), [Flutter authentication](https://firebase.google.com/docs/auth/flutter/start), [user management](https://firebase.google.com/docs/auth/flutter/manage-users).

### Flutter initialization and sign-in example

Add `firebase_core`, `firebase_auth` and `http` using `flutter pub add`. Configure the app with `flutterfire configure` against the existing Firebase project; it generates `firebase_options.dart`. Follow the platform setup instructions above. These snippets are integration examples; they are not a complete Flutter application and have not been compiled in this repository.

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';

// After WidgetsFlutterBinding.ensureInitialized(), before runApp():
await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

await FirebaseAuth.instance.signInWithEmailAndPassword(
  email: email,
  password: password,
);

// After returning from the verification email link:
await FirebaseAuth.instance.currentUser!.reload();
await FirebaseAuth.instance.currentUser!.getIdToken(true);
```

### Reusable JSON API client example

`origin` must be the API origin without a path, for example `https://api.your-domain.example`. Public signup/catalog requests use `authenticated: false`. Handle network/timeouts and Firebase exceptions separately from `ApiFailure` in the UI. Never log passwords or tokens.

```dart
import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class ApiFailure implements Exception {
  final int status;
  final String? code;
  final String message;
  ApiFailure(this.status, this.code, this.message);
}

class EuitApi {
  final Uri origin;
  final http.Client client;
  EuitApi(this.origin, this.client);

  Future<Map<String, dynamic>> request(
    String method,
    String path, {
    Map<String, dynamic>? body,
    Map<String, String>? query,
    bool authenticated = true,
  }) async {
    for (var attempt = 0; attempt < 2; attempt++) {
      final headers = <String, String>{'Accept': 'application/json'};
      if (body != null) headers['Content-Type'] = 'application/json';
      if (authenticated) {
        final user = FirebaseAuth.instance.currentUser;
        if (user == null) throw ApiFailure(401, 'UNAUTHENTICATED', 'Sign in first.');
        final token = await user.getIdToken(attempt == 1);
        if (token == null) throw ApiFailure(401, 'UNAUTHENTICATED', 'Sign in again.');
        headers['Authorization'] = 'Bearer $token';
      }
      final uri = origin.resolve(path).replace(queryParameters: query);
      final req = http.Request(method, uri)..headers.addAll(headers);
      if (body != null) req.body = jsonEncode(body);
      final response = await http.Response.fromStream(
        await client.send(req).timeout(const Duration(seconds: 30)),
      ).timeout(const Duration(seconds: 30));
      if (response.statusCode == 401 && authenticated && attempt == 0) continue;
      final dynamic decoded;
      try { decoded = jsonDecode(response.body); }
      catch (_) { throw ApiFailure(response.statusCode, null, 'Unexpected server response.'); }
      if (decoded is! Map<String, dynamic>) {
        throw ApiFailure(response.statusCode, null, 'Unexpected server response.');
      }
      if (response.statusCode < 200 || response.statusCode >= 300 || decoded['success'] != true) {
        throw ApiFailure(response.statusCode, decoded['code'] as String?,
          decoded['message'] as String? ?? 'Request failed.');
      }
      return decoded; // Signup has no data; other endpoints return data.
    }
    throw StateError('Unreachable');
  }
}

// Inject one reusable http.Client; close it when its owner is disposed.
final api = EuitApi(Uri.parse('https://api.your-domain.example'), http.Client());
final meEnvelope = await api.request('GET', '/api/me');
final me = meEnvelope['data'] as Map<String, dynamic>;
await api.request('PATCH', '/api/me/profile', body: {'fullName': 'Example Student'});
await api.request('GET', '/api/catalog/courses',
  query: {'page': '1', 'limit': '20', 'format': 'ONLINE'}, authenticated: false);
```

The retry is limited to a received 401. A timeout after a write has an uncertain outcome: fetch current data before resubmitting. No idempotency-key contract is implemented. Do not automatically replay POST/PATCH after arbitrary network or 503 errors.

## 4. Shared HTTP conventions

JSON request bodies; `Content-Type: application/json`. IDs are UUID strings. JSON dates/timestamps are strings; UTC timestamps should be parsed with `DateTime.parse` and converted for display. Nullable fields must remain nullable in Dart models. Unknown body fields are rejected; send editable fields only, never an entire GET object.

Success (HTTP status matches `statusCode`):

```json
{"success":true,"statusCode":200,"message":"Profile loaded.","data":{}}
```

Error:

```json
{"success":false,"statusCode":403,"code":"EMAIL_NOT_VERIFIED","message":"Verify your email address before continuing."}
```

`code` and `data` are optional: signup errors and unknown-route responses may omit `code`; signup success omits `data`. Use HTTP status plus optional code; do not parse human messages as identifiers. Protected/catalog routes set `Cache-Control: no-store`.

Catalog lists return `data: {items: [...], page: 1, limit: 20, total: 0}`. Pagination: page 1–10000, limit 1–100, defaults 1/20. Search `q` is case-insensitive substring matching; `track` is an exact match. `q`/`track` have a maximum length of 180. Use only filters listed for the particular endpoint; additional common-parser keys may be accepted but ignored by other endpoints.

## 5. Account/profile endpoints

| Method/path | Auth/permission | Result |
|---|---|---|
| `POST /api/auth/student/signup` | Public | 202 accepted; no token/profile returned |
| `GET /api/me` | Verified active profile, `profile.read` | Full current profile/identity/access |
| `PATCH /api/me/profile` | `profile.write` | Updated editable-profile projection |
| `POST /api/me/photo/upload` | `profile.write` | 201 `{photo:{id,url}}`; raw image body |
| `PUT /api/me/photo` | `profile.write` | `{photo: {id,url}}` or `{photo:null}` |
| `GET /api/me/preferences` | `preferences.read` | All preference booleans |
| `PATCH /api/me/preferences` | `preferences.write` | All updated preference booleans |
| `GET /api/me/permissions` | Verified active profile | `{role,roleName,permissions,batchScope}` |

All protected endpoints also require the verified active profile prerequisites, not just the named permission.

### Student signup

```json
{"fullName":"Example Student","email":"student@example.com","password":"example-only-password"}
```

Exactly these three keys. Trimmed name 1–120 characters; trimmed/lowercased email max 254; password at least 8 characters and at most 72 UTF-8 bytes. The server assigns STUDENT; clients cannot choose roles. Staff provisioning is not a public signup API.

HTTP 202 response (also used for duplicate emails to avoid disclosing account existence):

```json
{"success":true,"statusCode":202,"message":"Signup request accepted. If your credentials are valid and your email is unverified, check your inbox for a verification link."}
```

202 does not prove a new account was created or an email reached the inbox. Duplicate signup never changes name/role. Invalid input/credentials can return 400, provider throttling 429, provider/database failure 503. For existing unverified users, resending through signup requires their correct password; Firebase resend after sign-in is also available. Account creation may persist even if email delivery fails. Never treat a timeout as proof of no account.

### `GET /api/me` response data example

```json
{
  "id":"11111111-1111-4111-8111-111111111111",
  "fullName":"Example Student","role":"STUDENT","roleName":"Student",
  "email":"student@example.com","emailVerified":true,
  "phone":null,"emergencyContact":null,"address":null,
  "education":null,"occupation":null,"jobTitle":null,"bio":null,
  "skills":[],"yearsOfExperience":null,"portfolioUrl":null,"showOnWebsite":false,
  "photoAssetId":null,"photo":null,
  "createdAt":"2026-11-20T00:00:00.000Z","updatedAt":"2026-11-20T00:00:00.000Z",
  "permissions":["profile.read","profile.write","preferences.read","preferences.write"],
  "batchScope":{"mode":"ASSIGNED","batchIds":[]}
}
```

The permission array above is illustrative, not a complete role grant list. Use the returned array. `photo` is null or `{id: UUID, url: string}`. Role values: OWNER, ADMIN, ACCOUNTS, ADMISSIONS, MENTOR, STUDENT, CUSTOM. Custom roles use `roleName` for their display name. `batchScope.mode` is ALL or ASSIGNED; ALL returns an empty batch ID array. Batch scope does not grant enrolled learning access by itself.

### Profile PATCH fields

Send at least one field. Omitted fields remain unchanged. Optional text can be cleared with null or an empty trimmed string. `fullName` cannot be cleared. No login email, UID, role, permissions, active flag or scope edits here.

| Field | Type / constraint | Availability |
|---|---|---|
| `fullName` | Nonempty trimmed string, max 120 | All |
| `phone`, `emergencyContact` | Nullable string max 24; nonempty phone must match optional `+`, digits/spaces/parentheses/hyphens, total 7–24 | All |
| `address` | Nullable string max 500 | All |
| `education` | Nullable string max 200 | All |
| `occupation` | Nullable string max 120 | All |
| `jobTitle` | Nullable string max 120 | Non-student |
| `bio` | Nullable string max 2000 | Non-student |
| `skills` | Array max 20; each trimmed nonempty string max 60; deduplicated | Non-student |
| `yearsOfExperience` | Integer 0–80 or null | Non-student |
| `portfolioUrl` | Nullable string max 2048; HTTP(S), no embedded credentials | Non-student |
| `showOnWebsite` | Boolean | Non-student |

Text containing a NUL character is rejected. PATCH returns profile fields including IDs/timestamps, but **not** email, roleName, permissions, batchScope or `photo`; refresh `GET /api/me` for that combined object.

```json
{"fullName":"Updated Name","phone":"+8801912345678","emergencyContact":null}
```

### Photo binding

```json
{"assetId":null}
```

This removes the current photo. To bind a photo, send an existing owned, ready JPEG/PNG/WebP asset UUID instead. Foreign/missing assets: 404 `ASSET_NOT_FOUND`; unfinished/unsupported assets: 409 `ASSET_NOT_READY`. For a new image use `POST /api/me/photo/upload` with raw JPEG/PNG/WebP bytes (maximum 2 MiB) and a Firebase bearer token. It uploads, validates and attaches the image in one operation, returning HTTP 201 `{photo:{id,url}}` in `data`. See [Cloudinary upload setup and Flutter example](cloudinary-profile-photos.md). Cloudinary credentials must first be configured on the backend. Do not send base64, arbitrary URLs or multipart data to this endpoint.

### Preferences

GET returns every key below. PATCH accepts any nonempty subset with strict boolean values and returns all keys. Saved preferences do not themselves prove an SMS/email delivery system is implemented.

```json
{
  "emailNotifications":true,"smsNotifications":true,"leaderboardVisible":true,
  "classReminders":true,"paymentReminders":true,"learningUpdates":true,
  "marketingEmails":false,"projectSubmissions":true,"studentQuestions":true,
  "recordingReminders":true,"courseReviewUpdates":true
}
```

These are the fallback defaults for a profile without preference overrides.

## 6. Public catalog and pricing

| Method/path | Filters | Result |
|---|---|---|
| `GET /api/catalog/courses` | `q`, `track`, `format=ONLINE/OFFLINE`, `page`, `limit` | Paginated public courses |
| `GET /api/catalog/courses/:id` | None | One public course |

No token required. Only PUBLISHED courses appear. Their batch lists contain OPEN, website-visible, admission-enabled batches; a published course may have no selectable batches. A format filter also filters the returned batch list. Unknown/draft/archived detail: 404. An invalid UUID: 400.

Public course data: `{id,title,summary,track,currency:"BDT",offerings,batches}`. `offerings` is an array of `{format,fee,installmentCounts}` describing course defaults. **Use the selected batch's fee/plans**, which can override defaults.

Public batch data example (inside a course's `batches`):

```json
{
  "id":"22222222-2222-4222-8222-222222222222",
  "name":"January online","courseId":"33333333-3333-4333-8333-333333333333",
  "format":"ONLINE","startDate":"2027-01-04","repeatDays":[1,4],
  "startTime":"18:00","endTime":"20:00","timeZone":"Asia/Dhaka",
  "classCount":24,"seats":25,"seatsAvailable":25,"fee":12000,"currency":"BDT",
  "plans":[
    {"id":"1","label":"Full payment","count":1,"total":12000,"amounts":[12000]},
    {"id":"3","label":"3 installments","count":3,"total":12000,"amounts":[4000,4000,4000]}
  ],
  "location":"Live online","mentor":null,"classes":[]
}
```

The empty `classes` above is abbreviated for readability; actual scheduled batches return `{id,sequence,startsAt,endsAt}` entries. `mentor` is null unless the lead mentor opts into website display, otherwise `{id,name}`. Offline location combines room name and location; private meeting URLs/contact details are omitted. Public batches omit internal `version` and `seatsTaken`.

Money is **integer whole BDT**, not paisa or floating point. Plan IDs are strings such as `"1"`/`"3"`, not UUIDs. Remainders are allocated to the first installment amounts so their sum equals total. `seatsAvailable=0` is informational: do not permit selection. Refetch course detail when returning to a selection. Prices do not reserve seats or authorize payment, and plans do not contain due dates. There is currently no server quote/checkout/payment endpoint.

## 7. Staff course/batch APIs

Paths contain `/admin` but access is determined by backend permissions and batch scope, so appropriately authorized mentors can use supported reads too. Students must not use staff APIs as an enrolled-course library.

| Method/path | Required grants/scope | Success |
|---|---|---|
| `GET /api/admin/courses` | `courses.read`; assigned course scope | 200 list; `q`, `track`, pagination |
| `GET /api/admin/courses/:id` | `courses.read`; assigned course scope | 200 course |
| `POST /api/admin/courses` | `courses.write`, `pricing.write`, ALL scope | 201 draft course |
| `PATCH /api/admin/courses/:id` | `courses.write`, ALL; `pricing.write` if offerings sent | 200 updated draft |
| `GET /api/admin/batches` | `batches.read`; batch scope | 200 list; `q`, `courseId`, `format`, pagination |
| `GET /api/admin/batches/:id` | `batches.read`; batch scope | 200 batch with relations/classes |
| `POST /api/admin/batches` | `batches.write`, `pricing.write`, ALL | 201 batch with relations/classes |
| `PATCH /api/admin/batches/:id` | `batches.write`; scope; pricing grant for fee/plans | 200 updated batch |
| `GET /api/admin/mentors` | `mentors.read` OR `batches.write`; scope | 200 list `{id,fullName,jobTitle,skills}`; `q`, pagination |
| `GET /api/admin/rooms` | `batches.write`; scope | 200 list `{id,name,location,capacity,active}`; `q`, pagination |

Course staff response: `{id,title,summary,track,status,offerings,version,createdAt,updatedAt}`. Batch staff responses include all batch fields in the body below, plus `id,timeZone,seatsTaken,version,createdAt,updatedAt`, `course:{id,title,status}`, `room` (full room or null), `leadMentor:{id,fullName,showOnWebsite}`, nullable `assistantMentor` with the same shape, and `classes:[{id,batchId,sequence,startsAt,endsAt}]`.

### Create/update courses

```json
{
  "title":"WordPress","summary":"Build and maintain websites.","track":"Development",
  "offerings":[{"format":"ONLINE","fee":12000,"installmentCounts":[1,3]}]
}
```

Required creation fields are all four keys. Title 1–180, summary 1–4000, track 1–100, trimmed, no NUL. Offerings: 1–2 entries, unique ONLINE/OFFLINE. Fee integer 0–10000000. Installment counts: nonempty unique integers 1–12, must include 1; free fees allow only `[1]`; positive installments must each be at least BDT 1. Client-supplied course status is rejected. Creation always produces DRAFT; publication is not available through these routes.

PATCH accepts a subset of those fields plus required current `version` (integer 1–2147483646) and at least one changed field. Example: `{"version":1,"title":"Updated title"}`. Only drafts can be edited. Removing a format/plan used by a non-closed batch conflicts. On 409 refetch, show the current state and resolve the change; do not overwrite blindly.

### Create/update batches

```json
{
  "courseId":"33333333-3333-4333-8333-333333333333",
  "name":"January online","format":"ONLINE","status":"DRAFT",
  "leadMentorId":"44444444-4444-4444-8444-444444444444",
  "assistantMentorId":null,"roomId":null,"onlineLocation":"https://meeting.example/class",
  "startDate":"2027-01-04","repeatDays":[1,4],"startTime":"18:00","endTime":"20:00",
  "classCount":24,"seats":25,"fee":12000,"installmentCounts":[1,3],
  "admissionOpen":false,"websiteVisible":false
}
```

Creation requires courseId, name, format, leadMentorId, startDate, repeatDays, startTime, endTime, classCount, seats, fee and installmentCounts. Optional defaults: status DRAFT, assistantMentorId/roomId/onlineLocation null, admissionOpen/websiteVisible false. Format rules still require a room or meeting link as appropriate.

- Name trimmed 1–120. UUID references must exist. Lead/assistant must be distinct active MENTOR profiles. Selecting mentors does not automatically change their access-scope assignments.
- Dates YYYY-MM-DD from 2020-01-01 to 2100-12-31. Days: unique integers 0=Sunday through 6=Saturday, nonempty; first date must match a selected day. Times HH:mm, same-day end strictly after start, Asia/Dhaka. Generated class timestamps are UTC.
- Class count 1–200; seats 1–10000; cannot exceed offline room capacity or go below occupied seats. Room must be active.
- ONLINE requires an HTTPS onlineLocation (max 2048, no embedded credentials), no room. OFFLINE requires a room and no onlineLocation.
- Fee/plan validation matches course rules; format must exist on the course and chosen counts must be allowed by its offering. Batch fee may override the course fee.
- Status DRAFT/OPEN/CLOSED. Admission may be true only when OPEN. OPEN batches cannot overlap for a room, lead or assistant; competing transactions can return a conflict.
- PATCH requires latest `version` and a changed field. A batch cannot change course. Allocated seats restrict changes to fee, plans, format and schedule. Schedule edits retain existing class IDs by retained sequence.
- Do not submit `seatsTaken`, `classes`, timestamps or relation objects from a GET response. Successful catalog writes record an audit event.

## 8. Access administration

| Method/path | Authorization | Result |
|---|---|---|
| `GET /api/permissions` | `roles.read` | `data`: array of permission strings |
| `GET /api/admin/roles` | `roles.read` | `data`: array of role definitions |
| `PATCH /api/admin/profiles/:id/access` | OWNER and `access.write` | Updated access data; audited |

Role definitions expose `{id,key,name,system,permissions,defaultBatchScope}`. Use returned IDs/names rather than assuming seed UUIDs. Full custom-role creation/editing and ownership transfer are not implemented.

Access PATCH example:

```json
{"role":"MENTOR","active":true,"batchScope":"ASSIGNED","batchIds":["22222222-2222-4222-8222-222222222222"]}
```

At least one field, no unknown keys. Assignable roles: ADMIN, ACCOUNTS, ADMISSIONS, MENTOR, STUDENT, CUSTOM; never OWNER. Optional `customRoleId` UUID/null is valid only with CUSTOM and must reference an existing non-system role. `active` boolean; `batchScope` ALL/ASSIGNED/null (null uses role default); `batchIds` array max 200 existing UUIDs, deduplicated. Students cannot have ALL scope. Role changes without an explicit scope reset to the role default (students ASSIGNED). Owners cannot change their own or another Owner's access here.

Response data: `{id,role,customRoleId,active,batchScope,batchIds}`. Here `batchScope` is a stored nullable enum, **different from** the effective `{mode,batchIds}` object in `/api/me`. After access changes, refetch `/api/me`; backend permissions are resolved per request. No real-time session notification is implemented.

## 9. Error handling

| HTTP / code | Client action |
|---|---|
| 400 `VALIDATION_ERROR` / `INVALID_BODY` | Fix body/query; never blindly retry |
| 401 `UNAUTHENTICATED` | Refresh Firebase token once; then sign in again |
| 403 `EMAIL_NOT_VERIFIED` | Verification UI; reload user and force-refresh token afterward |
| 403 `ACCOUNT_DISABLED` | Block account access; contact office |
| 403 `FORBIDDEN` / `BATCH_FORBIDDEN` | Explain unavailable permission/scope |
| 403 `OWNER_PROTECTED` | Access change not permitted |
| 404 `PROFILE_NOT_FOUND` | Missing linked profile; contact office; Firebase sign-in alone is insufficient |
| 404 `NOT_FOUND` / `ASSET_NOT_FOUND` | Resource absent/hidden/unavailable; do not assume another user's resource exists |
| 409 `CATALOG_CONFLICT` | Refetch; handle stale version, publication, schedule/capacity/reference conflict |
| 409 `CONCURRENT_CHANGE` / `DUPLICATE_RESOURCE` | Reload and resolve conflict |
| 409 `ASSET_NOT_READY` | Asset cannot be bound yet |
| 413 `INVALID_BODY` | Reduce body; Express JSON parser uses its default size limit |
| 429 (signup may omit code) | Back off and let user retry later |
| 503 `AUTH_UNAVAILABLE` / `ROLE_NOT_CONFIGURED` / `SERVICE_UNAVAILABLE` | Temporary service/configuration failure; allow deliberate retry, report persistent failure |

Not every 404 has a code. Distinguish missing-profile errors from missing content using code when present. Do not rely on a fixed `Retry-After` header or field-error array: neither is guaranteed. Keep useful form input when requests fail.

## 10. Features the mobile developer must not assume exist

No implemented API contract yet for: enrollment quotes/reservations, payment collection/receipts, coupons/referrals, enrolled student course libraries, lesson playback/access, attendance, student schedules, assignments/projects/quizzes/results, certificates, leaderboard points, learning progress, notification inbox/delivery, assistant chat, general-purpose upload/finalization (profile photo upload is implemented), device-session management, role creation/editing, audit feed or course curriculum publication/review. Existing website demo screens do not establish API support.

The staff batch schedule is real catalog-management data; it is not a student learning schedule API. Preference booleans are real saved settings; they do not provide notification content or delivery. Course creation remains draft, so a new live catalog may be empty until publication is implemented.

## 11. Developer acceptance checklist and existing tools

- Confirm API origin, Firebase project and Android/iOS client configuration with backend owner.
- Exercise signup → email verification → Firebase sign-in → `/api/me` on staging.
- Verify missing/invalid token, unverified email, missing profile, disabled account and forbidden scope states.
- Save profile/preferences from mobile and refetch them in the website; then test the reverse direction.
- Confirm token refresh once, sign-out, password recovery and recent-reauthentication password change.
- Check nullable data, empty catalog, full batches, integer BDT pricing and schedule timezone display.
- Staff: test assigned scope and stale-version conflicts, not just Owner access.
- Never validate write flows using production user data without agreed authorization.

Runnable handoff artifacts:

- [Account manual Postman collection](../postman/collections/account-api.manual.postman_collection.json) and [blank environment](../postman/environments/account-api.template.postman_environment.json).
- [Catalog manual Postman collection](../postman/collections/course-catalog.manual.postman_collection.json) and [blank environment](../postman/environments/course-catalog.template.postman_environment.json).
- [Account API validation](api-validation.md), [catalog details](course-catalog-validation.md), [website integration guide](frontend-api-integration.md).

Import collections and fill environment values locally; export populated environments only as ignored `*.local.json`. Do not share bearer tokens in documentation. Existing automated verification uses disposable PostgreSQL and Firebase Auth emulator fixtures: 156 requests/409 assertions plus authenticated browser flows. This guide was checked against the route/validation source and JSON examples; it does not establish a production deployment, physical-device integration or successful Flutter compilation. Those are the mobile handoff's next validation steps.
