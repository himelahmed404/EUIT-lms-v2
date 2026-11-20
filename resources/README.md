# Project resources

Supporting development files live here so the application directories stay focused on runtime code and configuration. Package dependencies remain installed in their owning application; resource scripts resolve them there.

| Location | Purpose |
|---|---|
| `backend/tests/` | Authorization, Firebase middleware, signup integration and isolated Postman regression runners |
| `backend/postman/collections/` | Manual account API collection and automated profiles/permissions regression collection |
| `backend/postman/environments/` | Blank environment templates; populated exports must use `*.local.json` (ignored) |
| `backend/docs/api-validation.md` | Endpoint contract, setup, manual verification and automated test commands |
| `backend/reports/` | Dated, sanitized verification summaries |
| `frontend/checks/` | Responsive smoke, route, internal-link, component and motion checks |
| `frontend/tools/capture-screenshot.mjs` | Screenshot utility |
| `frontend/docs/` | Local API/component maps and interface notes (gitignored) |
| `frontend/plans/` | Local milestone plans (gitignored) |
| `design/` | Design references not served by the application |

Use lowercase kebab-case names. Test names identify their subject and type, for example `firebase-email.middleware.test.mjs` and `student-signup.integration.mjs`. Verification summaries use `YYYY-MM-DD-topic.md`. Keep generated screenshots/raw reports under an ignored `output/` directory or the OS temporary directory.

## Backend commands

Run from `backend/`:

```sh
npm run test:access
npm run test:postman
```

`test:postman` runs the full isolated suite, including the signup regression, against disposable PostgreSQL and the official Firebase Auth emulator. `test:integration` alone uses the configured development database and its existing Firebase HTTP stand-in; prefer `test:postman` for isolated verification.

For manual validation, see [the guide](backend/docs/api-validation.md), [collection](backend/postman/collections/account-api.manual.postman_collection.json), and [blank environment](backend/postman/environments/account-api.template.postman_environment.json).

## Frontend commands

Run from `frontend/`:

```sh
npm run check
npm run check:pages
```

`check` builds the frontend and runs Postman plus authenticated browser tests with disposable PostgreSQL and Firebase Auth emulator. `check:pages`, `check:links` and `check:accounts` run that isolated harness without rebuilding the frontend production bundle. `check:components` and `check:motion` add the detailed student component or motion checks to the authenticated fixture session. Capture a screenshot with `npm run screenshot -- URL /tmp/page.png` (optional third argument: viewport height).

The [root work record](../record.md) tracks completed changes and verification. The organization rules live in [AGENTS.md](../AGENTS.md).

Connected account setup: [frontend API integration guide](backend/docs/frontend-api-integration.md). Previous account demo code is retained under `frontend/reference/account-demo/` for design reference only.

Course catalog: [contract and validation guide](backend/docs/course-catalog-validation.md), [manual Postman collection](backend/postman/collections/course-catalog.manual.postman_collection.json), [blank environment](backend/postman/environments/course-catalog.template.postman_environment.json), and [automated regression collection](backend/postman/collections/course-catalog.regression.postman_collection.json). Catalog fixtures/concurrency checks live under `backend/tests/`; actual frontend flow checks are in `frontend/checks/catalog-integration.mjs`. Old admin catalog templates live under `frontend/reference/catalog-demo/`.

## Mobile developer handoff

See the [Flutter and shared API guide](backend/docs/mobile-api-guide.md) for authentication, every implemented endpoint, request/response contracts, Dart examples, errors and current feature limits.
