# Course catalog, batches and public pricing

The backend implements API-map milestone 2. The public course picker, checkout review, admin catalog, course editor, batch editor/detail and mentor directory call these endpoints through the Next.js same-origin proxy.

## Setup

From the repository root:

```sh
npm --prefix backend run build
cd backend
npx prisma migrate deploy
npm run db:seed
npm run dev
```

In another terminal, run `npm --prefix frontend run dev` from the repository root. Use the existing backend Firebase/DB configuration and frontend `.env.local`; `API_SERVER_URL` must point to the API server. Account configuration is covered in [the account integration guide](frontend-api-integration.md).

The additive migration creates `courses`, `batches`, `rooms` and `batch_classes`; it does not create public demo offerings in the configured database. New courses are **DRAFT**. Publishing and modifying published courses require the later curriculum review workflow. A fresh catalog therefore correctly displays an empty state until approved published data exists. Automated checks seed published records only into a disposable database.

Rooms are existing facility data, not demo fixtures. To load actual rooms, create a local JSON file containing an array like:

```json
[{"name":"Your actual room name","location":"Your actual campus","capacity":25,"active":true}]
```

Run `npm run catalog:import-rooms -- /absolute/path/to/rooms.json` inside `backend/`. This trusted operational command validates all rows, upserts by name, retains IDs, never deletes rooms and rejects deactivation/capacity reduction that conflicts with a non-closed batch. It does not publish courses. Mentor choices come from active profiles with role `MENTOR`.

## HTTP contract

All paths are under `/api`. Responses retain `{ success, statusCode, message, data }`; errors add `code`. List `data` is `{ items, page, limit, total }`. Default page size is 20; maximum 100. Catalog responses are `no-store`.

| Method and path | Authorization and purpose |
|---|---|
| `GET /catalog/courses` | Public published courses, open visible admission batches, formats, schedule, seats and prices. Supports `q`, `track`, `format=ONLINE/OFFLINE`, `page`, `limit`. |
| `GET /catalog/courses/:id` | Public published course detail and valid batch/plan combinations. Draft, archived or unknown course: 404. |
| `GET /admin/courses` / `GET /admin/courses/:id` | `courses.read`; course visibility restricted to assigned batches unless scope is ALL. List supports `q`, `track`, pagination. |
| `POST /admin/courses` | `courses.write`, `pricing.write`, ALL scope; creates a draft. |
| `PATCH /admin/courses/:id` | `courses.write`, ALL scope, matching `version`; pricing changes additionally need `pricing.write`. Only drafts can be edited. |
| `GET /admin/batches` / `GET /admin/batches/:id` | `batches.read` plus batch scope. List supports `courseId`, `format`, `q`, pagination. |
| `POST /admin/batches` | `batches.write`, `pricing.write`, ALL scope. |
| `PATCH /admin/batches/:id` | `batches.write`, batch scope and matching `version`; fee/plan changes additionally require `pricing.write`. |
| `GET /admin/mentors` | `mentors.read` or `batches.write`; active mentors, restricted by assigned scope. Supports `q`, pagination. Returns ID, name, job title, skills. |
| `GET /admin/rooms` | `batches.write`; active rooms, restricted by assigned scope. Supports `q`, pagination; returns capacity. |

Staff requests use a verified Firebase bearer token and an active LMS profile. Selecting a lead/assistant mentor does not rewrite their Owner-managed access scope. Use the existing Owner access API to assign real batch IDs; nonexistent batch IDs are now rejected.

Create a course:

```json
{
  "title": "Course title",
  "summary": "Course description",
  "track": "Development",
  "offerings": [
    {"format":"ONLINE","fee":12000,"installmentCounts":[1,3]},
    {"format":"OFFLINE","fee":18000,"installmentCounts":[1,2,3]}
  ]
}
```

Fees are **integer whole BDT**, between 0 and 10,000,000, not floating-point amounts or paisa. Plans support 1–12 parts; full payment (`1`) is required. Each positive-fee installment must be at least BDT 1. A free offering only allows full payment. Unknown/duplicate fields or formats, invalid numbers, invalid plans and client-supplied publication status are rejected.

Create a batch (replace the UUID placeholders with real IDs):

```json
{
  "courseId":"COURSE_UUID",
  "name":"Batch name",
  "format":"ONLINE",
  "status":"DRAFT",
  "leadMentorId":"MENTOR_PROFILE_UUID",
  "assistantMentorId":null,
  "roomId":null,
  "onlineLocation":"https://your-meeting-provider.example/meeting",
  "startDate":"2027-01-04",
  "repeatDays":[1,4],
  "startTime":"18:00",
  "endTime":"20:00",
  "classCount":24,
  "seats":25,
  "fee":12000,
  "installmentCounts":[1,3],
  "admissionOpen":false,
  "websiteVisible":false
}
```

- Repeat days use Sunday=0 through Saturday=6. The first class date must match a repeat day. Times use Asia/Dhaka, with an end time later on the same day. The API generates 1–200 UTC class records and stable UUIDs; schedule edits retain IDs by sequence for retained classes.
- Offline batches require an active room and no online link. Online batches require an HTTPS URL and no room. Private meeting URLs are never included in public responses.
- Lead and optional assistant must be distinct active mentor profiles. Seats cannot exceed room capacity or fall below already occupied seats.
- Batch plans must be allowed by their course format. Batch fees can override the course's default fee. Future edits to a course default do not silently reprice existing batches.
- Open batches cannot overlap another open batch for the same room, lead or assistant mentor. Serializable database transactions also reject competing concurrent bookings.
- `status` is DRAFT, OPEN or CLOSED. Admission can be enabled only for OPEN. Public batches also require `websiteVisible=true` and a PUBLISHED course. Sold-out batches can be displayed but cannot be selected at checkout.
- PATCH needs the latest integer `version` and at least one changed field. Stale versions return 409. A batch cannot move courses. Batches with allocated seats cannot change price, plans, format or schedule through this API.
- Public mentor identity is returned only when the mentor opts into `showOnWebsite`; contact details and private links are not public. All successful catalog mutations record an audit event in the same transaction.
- Installment arrays distribute whole-BDT remainders across the first installments, so amounts always sum exactly to the total. These are published prices, **not enrollment quotes**; coupons, referral adjustments, due dates, seat reservations and payment collection belong to milestone 3.

## Validate in the browser

1. Sign in as Owner/Admin with the necessary permissions. Open `/admin/courses`, create a course with online/offline pricing and allowed plans, save, refresh, and confirm the draft persists.
2. Open a course to edit it. Save and reload. Published records show a read-only explanation until the review workflow exists.
3. Open `/admin/batch-edit`. Choose a course, active mentor, format, room/meeting URL, repeat days, first date, times, class count, seats, fee and allowed plans. Save a draft; refresh and verify the data remains.
4. Open batch detail and confirm scheduled dates/classes. Edit the batch and check retained class IDs through the API. Invalid room capacity, time order or overlapping open schedules should produce a visible error.
5. Use the Owner access screen to assign a staff account only the required batch IDs. Verify it cannot read/edit unrelated batches; Students must receive 403 for staff endpoints.
6. Open `/enroll/course` signed out. Only approved published data appears. Filter/search, select a non-full batch and a plan, then continue. Checkout must show the API price and schedule after a refresh.
7. Change `batch`, `format` or `plan` in the checkout URL to an unsupported value. Checkout must show an unavailable-selection state. Adding a fake `total=1` must not change the server-sourced price. Full/hidden/closed batches are not valid selections.
8. Account creation/contact updates still work, but no payment or reservation is made. A saved course choice is revalidated against the API on return.

## Validate using Postman and automated checks

Import [the manual collection](../postman/collections/course-catalog.manual.postman_collection.json) and [blank environment](../postman/environments/course-catalog.template.postman_environment.json). Set `baseUrl`, `staffToken` and relevant course/batch/mentor/room IDs locally. Use only a test account/database for POST/PATCH requests. Never commit a populated environment; name local exports `*.local.json`.

```sh
npm --prefix backend run test:catalog
npm --prefix backend run test:access
npm --prefix frontend run build
npm --prefix backend run test:browser
```

`test:catalog` uses the same isolated harness as `test:postman`: temporary PostgreSQL, migrations, six role seeds, official Firebase Auth emulator, account regression, catalog Postman checks, concurrent-write checks and signup compensation regression. `test:browser` additionally exercises real Next/Express/Prisma flows with Playwright. No application API mocks are used for the catalog browser flows. Test fixtures and raw outputs never go into production data.

Local prerequisites are Node dependencies, PostgreSQL binaries (`PG_BIN` override supported), Firebase CLI/Auth emulator, Postman CLI, and Playwright Chromium. Local Postman collection runs do not require publishing to a workspace. These checks do not establish live Firebase delivery, payment behavior or production deployment.
