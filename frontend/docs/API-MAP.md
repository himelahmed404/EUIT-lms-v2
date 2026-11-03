# API integration map

The frontend is design-only. Demo data lives in `src/data/demo/`. Set `NEXT_PUBLIC_API_BASE_URL` when the backend in `../backend` is ready, and swap demo loaders for `src/lib/api/client.ts`.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Origin for REST calls (e.g. `https://api.example.com`) |

## Route → endpoint (planned)

| UI route | Method | Endpoint | Notes |
|----------|--------|----------|-------|
| `POST` login (public `/`) | POST | `/auth/login` | Mobile + password; returns role + session |
| `/forgot-password` | POST | `/auth/password-reset/*` | phone → code → reset |
| `/enroll/course` | GET | `/catalog/courses/:id` | Formats, batches, plans |
| `/enroll/checkout` | POST | `/enrollments` | Account + payment intent |
| Checkout coupon | POST | `/coupons/validate` | One code per enrollment |
| `/student/dashboard` | GET | `/me/dashboard` | Continue watching, stats |
| `/student/courses` | GET | `/me/courses` | Online / offline |
| `/student/course-player` | GET | `/me/courses/:id/lessons` | Progress, bookmarks |
| `/student/quizzes` | GET | `/me/quizzes` | Open / locked |
| `/student/projects` | GET | `/me/projects` | Status + marks |
| `/student/routine` | GET | `/me/routine` | Classes + recordings |
| `/student/payments` | GET | `/me/payments` | Installments + referral |
| `/student/questions` | GET/POST | `/me/questions` | Thread with mentor |
| `/student/notifications` | GET | `/me/notifications` | Mark read |
| `/mentor/review` | GET/PATCH | `/mentor/reviews` | Queue + rubric |
| `/mentor/questions` | GET/POST | `/mentor/questions` | Answer inbox |
| `/mentor/batch` | GET | `/mentor/batches/:id` | Roster, attendance |
| `/admin/overview` | GET | `/admin/metrics` | Month KPIs |
| `/admin/students` | GET | `/admin/students` | Payments filter |
| `/admin/announcements` | GET/POST | `/admin/announcements` | SMS count |
| `/admin/coupons` | GET/PATCH | `/admin/coupons` | Disable / renew |
| `/admin/activity` | GET | `/admin/activity` | Append-only log |
| `/admin/roles` | GET/PATCH | `/admin/roles` | Access matrix |

## Demo boundaries

Keep using `@/data/demo` until the matching endpoint returns 200 in staging. Do not invent proof stats beyond the cast in `docs` of the static prototype (Nusrat, Kamrul, Sharmin; today = 2026-10-15).
