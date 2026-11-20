# Cloudinary profile photos

Implemented 20 November 2026. Website student, admin and mentor profiles share the upload control. Flutter can use the same endpoint. Cloudinary credentials are not yet configured: the owner has not created the account.

## Setup (free plan)

Create a Cloudinary Free account. In its console, find your cloud name and API key/secret. Set these only in `backend/.env` or backend hosting environment, then restart the backend:

```dotenv
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

No unsigned upload preset, frontend secret, paid add-on or Firebase billing upgrade is required. The existing Firebase Authentication project continues to authenticate callers. These photos use standard public Cloudinary delivery URLs: anyone with a URL can view that image. Do not upload sensitive documents as profile pictures.

## API

`POST /api/me/photo/upload`

- Authorization: verified Firebase bearer token, active LMS profile, `profile.write`.
- Body: raw image file bytes, **not multipart or JSON/base64**.
- Content-Type: `image/jpeg`, `image/png` or `image/webp`.
- Maximum 2 MiB input, 25 million decoded pixels, non-animated image.
- Server decodes actual image bytes, applies EXIF orientation, crops to a square no larger than 512×512, flattens transparency on white, strips metadata and encodes JPEG quality 80. It uploads only that normalized file, not the original. Output size varies with image complexity.
- Signed Cloudinary calls keep the API secret backend-only. User-supplied URLs/public IDs are never accepted.
- Upload creates an owned ready asset and attaches it to the profile in a serializable database transaction.

HTTP 201:

```json
{"success":true,"statusCode":201,"message":"Profile photo uploaded.","data":{"photo":{"id":"11111111-1111-4111-8111-111111111111","url":"https://res.cloudinary.com/example/image/upload/v1/euit/profile-photos/example.jpg"}}}
```

Refresh `GET /api/me` after success. Existing `PUT /api/me/photo` (`{"assetId":null}` to remove, or an owned ready asset UUID to bind) remains supported with the same response shape.

Errors: 400 `INVALID_PHOTO` for undecodable, unsupported or oversized-dimension images; 415 `INVALID_PHOTO` for incorrect content type; 413 `INVALID_BODY` from Express for oversized bodies (website proxy may return `INVALID_PHOTO`); 503 `PHOTO_STORAGE_UNAVAILABLE` for missing configuration/provider failure; existing 401/403 account errors; 409 for a concurrent database change. Upload attempts are limited to 10 per 10 minutes per account per backend process, with 429 `PHOTO_UPLOAD_LIMIT`; parallel processing for one account returns 429 `PHOTO_UPLOAD_BUSY`. This in-memory guard resets on restart and is not a distributed quota.

Provider failure leaves the current profile binding unchanged. A successful replacement/removal retires the previous Cloudinary asset (`ready=false`) and attempts provider deletion with CDN invalidation. Failed cleanup is logged with the database asset ID; its storageKey identifies the file for retry. A failed database bind attempts deletion of the new upload. Provider timeouts can have an uncertain outcome; inspect Cloudinary for unbound files under `euit/profile-photos/` if a timeout occurs. Retired asset metadata is retained in PostgreSQL; do not mark it ready again after deletion. Existing non-Cloudinary assets are not deleted remotely.

## Flutter request example

```dart
final user = FirebaseAuth.instance.currentUser!;
final token = await user.getIdToken();
final response = await http.post(
  Uri.parse('$apiOrigin/api/me/photo/upload'),
  headers: {'Authorization': 'Bearer $token', 'Content-Type': 'image/jpeg'},
  body: await selectedFile.readAsBytes(),
).timeout(const Duration(seconds: 45));
// Use the file's actual JPEG/PNG/WebP MIME type. On 401 refresh the token
// once; do not automatically retry uncertain uploads after a timeout.
```

The website uses the existing Next.js proxy with binary forwarding and a 2 MiB cap. Upload-specific timeouts allow provider processing and cleanup. Other API requests retain their existing JSON behavior.

## Verification

The local Postman simulation under `../postman/simulations/cloudinary-photo.sim.yaml` implements Cloudinary's upload/destroy subset from [Cloudinary's upload contract](https://cloudinary.com/documentation/upload_images). It verifies multipart parameters, SHA-256 signatures and JPEG content type, supports injected 503 errors, and records deletion calls. It does not establish live Cloudinary behavior.

Run it in one terminal:

```sh
postman simulation run resources/backend/postman/simulations/cloudinary-photo.sim.yaml --port 4569 --no-history
```

In another terminal, from the repository root:

```sh
CLOUDINARY_CLOUD_NAME=test CLOUDINARY_API_KEY=test-key CLOUDINARY_API_SECRET=test-secret CLOUDINARY_TEST_BASE_URL=http://127.0.0.1:4569/cloudinary npm --prefix backend run test:browser
```

These are synthetic local credentials. The test-base override only works with NODE_ENV=test and a loopback URL. The existing harness creates disposable PostgreSQL/Firebase Auth fixtures. Tests cover validation, authorization, ownership, replacement/cleanup, provider failure and upload persistence across all three profile panels. Real uploads require account configuration and a subsequent live check.
