# EUIT Student Mobile API Guide

This document provides simple descriptions and reference examples for all student-facing endpoints in the EUIT API. It is tailored for Flutter and mobile application developers.

---

## 1. Base URL & Environments

- **Live Production URL**: `https://euit-lms-api.vercel.app`
- **Local Development URL**: `http://localhost:5000` (or `http://10.0.2.2:5000` on Android emulator)
- All endpoints are prefixed with `/api`.

---

## 2. Authentication Flow

Authentication uses **Firebase Auth** combined with the backend database.

```text
[Mobile App] 
     │
     ├─ 1. POST /api/auth/student/signup ──► Backend creates student profile & Firebase account
     ├─ 2. Firebase SDK Sign-in ──────────► Verifies password & gets Firebase ID Token
     ├─ 3. Verify Email Link ─────────────► User clicks verification email in inbox
     └─ 4. API Requests ──────────────────► Send 'Authorization: Bearer <ID_TOKEN>'
```

### Flow Steps:
1. **Register**: Call `POST /api/auth/student/signup`.
2. **Sign In**: Use Firebase Auth SDK (`signInWithEmailAndPassword`) on mobile.
3. **Verify Email**: Ensure user verifies their email before accessing protected endpoints.
4. **Authorize**: On every protected request, pass the Firebase ID token in the header:
   ```http
   Authorization: Bearer <FIREBASE_ID_TOKEN>
   ```

---

## 3. Endpoints Overview

| Category | Method & Path | Auth Required | Description |
|---|---|---|---|
| **Auth** | `POST /api/auth/student/signup` | No | Register a new student account |
| **Profile** | `GET /api/me` | Yes | Get the logged-in student's full profile |
| **Profile** | `PATCH /api/me/profile` | Yes | Update personal information |
| **Profile Photo** | `POST /api/me/photo/upload` | Yes | Upload and set a new profile picture |
| **Profile Photo** | `PUT /api/me/photo` | Yes | Bind or remove a photo asset |
| **Preferences** | `GET /api/me/preferences` | Yes | Get notification & app preferences |
| **Preferences** | `PATCH /api/me/preferences` | Yes | Update notification & app preferences |
| **Permissions** | `GET /api/me/permissions` | Yes | Check role and permissions (`STUDENT`) |
| **Catalog** | `GET /api/catalog/courses` | No | List published courses and open batches |
| **Catalog** | `GET /api/catalog/courses/:id` | No | Get course details, batch schedules & fees |

---

## 4. Student API Details

### 4.1. Student Sign Up
Create a new student account and LMS database profile.

- **Method**: `POST`
- **Path**: `/api/auth/student/signup`
- **Auth**: None

#### Request Body
```json
{
  "fullName": "Rahim Ahmed",
  "email": "rahim@example.com",
  "password": "StrongPassword123"
}
```
- `fullName`: 1–120 characters.
- `email`: Valid email address (max 254 chars).
- `password`: At least 8 characters (max 72 bytes).

#### Response (`202 Accepted`)
```json
{
  "success": true,
  "statusCode": 202,
  "message": "Signup request accepted. If your credentials are valid and your email is unverified, check your inbox for a verification link."
}
```

---

### 4.2. Get Student Profile
Retrieve the authenticated student's profile information.

- **Method**: `GET`
- **Path**: `/api/me`
- **Auth**: Bearer Token (Verified Email Required)

#### Response (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile loaded.",
  "data": {
    "id": "c4b8e21a-6d34-4a25-9ef0-e01e23a45678",
    "fullName": "Rahim Ahmed",
    "email": "rahim@example.com",
    "emailVerified": true,
    "role": "STUDENT",
    "roleName": "Student",
    "phone": "+8801700000000",
    "emergencyContact": "+8801800000000",
    "address": "Dhaka, Bangladesh",
    "education": "B.Sc in CSE",
    "occupation": "Student",
    "photoAssetId": "8f2a1b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    "photo": {
      "id": "8f2a1b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "createdAt": "2026-11-20T10:00:00.000Z",
    "updatedAt": "2026-11-20T12:00:00.000Z",
    "permissions": ["profile.read", "profile.write", "preferences.read", "preferences.write"]
  }
}
```

---

### 4.3. Update Student Profile
Update personal information for the logged-in student.

- **Method**: `PATCH`
- **Path**: `/api/me/profile`
- **Auth**: Bearer Token

#### Request Body
Send only the fields you wish to update:
```json
{
  "fullName": "Rahim Ahmed",
  "phone": "+8801712345678",
  "emergencyContact": "+8801812345678",
  "address": "Banani, Dhaka",
  "education": "Diploma in Engineering",
  "occupation": "Junior Developer"
}
```

| Field | Type | Description |
|---|---|---|
| `fullName` | String (optional) | 1–120 characters |
| `phone` | String / null (optional) | Phone number (7–24 characters) |
| `emergencyContact` | String / null (optional) | Emergency contact number (7–24 characters) |
| `address` | String / null (optional) | Home/mailing address (max 500 chars) |
| `education` | String / null (optional) | Educational background (max 200 chars) |
| `occupation` | String / null (optional) | Current occupation (max 120 chars) |

#### Response (`200 OK`)
Returns the updated profile data.

---

### 4.4. Upload Profile Photo
Directly upload and attach a new profile picture.

- **Method**: `POST`
- **Path**: `/api/me/photo/upload`
- **Auth**: Bearer Token
- **Headers**:
  - `Content-Type`: `image/jpeg`, `image/png`, or `image/webp`
- **Body**: Raw image binary data (Maximum **2 MB**).

#### Response (`201 Created`)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Profile photo updated.",
  "data": {
    "photo": {
      "id": "8f2a1b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "url": "https://res.cloudinary.com/..."
    }
  }
}
```

---

### 4.5. Remove Profile Photo
Remove the current profile photo.

- **Method**: `PUT`
- **Path**: `/api/me/photo`
- **Auth**: Bearer Token
- **Request Body**:
  ```json
  {
    "assetId": null
  }
  ```

#### Response (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile photo updated.",
  "data": {
    "photo": null
  }
}
```

---

### 4.6. Get Student Preferences
Retrieve notification and reminder settings.

- **Method**: `GET`
- **Path**: `/api/me/preferences`
- **Auth**: Bearer Token

#### Response (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Preferences loaded.",
  "data": {
    "emailNotifications": true,
    "smsNotifications": true,
    "leaderboardVisible": true,
    "classReminders": true,
    "paymentReminders": true,
    "learningUpdates": true,
    "marketingEmails": false,
    "projectSubmissions": true,
    "studentQuestions": true,
    "recordingReminders": true,
    "courseReviewUpdates": true
  }
}
```

---

### 4.7. Update Student Preferences
Toggle specific notification and preference flags.

- **Method**: `PATCH`
- **Path**: `/api/me/preferences`
- **Auth**: Bearer Token

#### Request Body
Send any subset of boolean preferences:
```json
{
  "emailNotifications": true,
  "smsNotifications": false,
  "classReminders": true
}
```

#### Response (`200 OK`)
Returns the complete updated preferences object.

---

### 4.8. Get Student Permissions
Check the student's assigned permissions and role.

- **Method**: `GET`
- **Path**: `/api/me/permissions`
- **Auth**: Bearer Token

#### Response (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Permissions loaded.",
  "data": {
    "role": "STUDENT",
    "roleName": "Student",
    "permissions": [
      "profile.read",
      "profile.write",
      "preferences.read",
      "preferences.write"
    ],
    "batchScope": {
      "mode": "ASSIGNED",
      "batchIds": []
    }
  }
}
```

---

### 4.9. Browse Public Course Catalog
List all published courses and available batches.

- **Method**: `GET`
- **Path**: `/api/catalog/courses`
- **Auth**: None
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `20`, max: `100`)
  - `q`: Search keyword (course title or summary)
  - `track`: Filter by category track (e.g. `Development`, `Design`)
  - `format`: Filter by delivery format (`ONLINE` or `OFFLINE`)

#### Response (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Catalog request completed.",
  "data": {
    "items": [
      {
        "id": "33333333-3333-4333-8333-333333333333",
        "title": "Flutter & Mobile App Development",
        "summary": "Master cross-platform mobile development with Flutter and Dart.",
        "track": "Development",
        "currency": "BDT",
        "offerings": [
          {
            "format": "ONLINE",
            "fee": 15000,
            "installmentCounts": [1, 3]
          }
        ],
        "batches": [
          {
            "id": "22222222-2222-4222-8222-222222222222",
            "name": "Batch 01 - Online Evening",
            "format": "ONLINE",
            "startDate": "2027-01-10",
            "repeatDays": [0, 2, 4],
            "startTime": "20:00",
            "endTime": "22:00",
            "timeZone": "Asia/Dhaka",
            "classCount": 24,
            "seats": 30,
            "seatsAvailable": 12,
            "fee": 15000,
            "currency": "BDT",
            "plans": [
              {
                "id": "1",
                "label": "Full payment",
                "count": 1,
                "total": 15000,
                "amounts": [15000]
              },
              {
                "id": "3",
                "label": "3 installments",
                "count": 3,
                "total": 15000,
                "amounts": [5000, 5000, 5000]
              }
            ],
            "location": "Live Online",
            "mentor": {
              "id": "44444444-4444-4444-8444-444444444444",
              "name": "Lead Instructor"
            }
          }
        ]
      }
    ],
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

---

### 4.10. Get Course Details
Get comprehensive details of a single course including all scheduled classes and batch details.

- **Method**: `GET`
- **Path**: `/api/catalog/courses/:id`
- **Auth**: None

#### Response (`200 OK`)
Returns the complete course object with batches, installment plans, and class schedules.

---

## 5. Common Error Codes

All errors return a standard JSON envelope:
```json
{
  "success": false,
  "statusCode": 403,
  "code": "EMAIL_NOT_VERIFIED",
  "message": "Verify your email address before continuing."
}
```

| HTTP Status | Error Code | Meaning / Action Needed |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Required fields missing or invalid format in request body. |
| `401` | `UNAUTHENTICATED` | Missing or expired Firebase ID token. Refresh token or sign in again. |
| `403` | `EMAIL_NOT_VERIFIED` | Email address is not verified yet. Ask student to check their inbox. |
| `403` | `ACCOUNT_DISABLED` | Student account has been deactivated. |
| `404` | `PROFILE_NOT_FOUND` | Firebase account exists but has no LMS profile. Contact support. |
| `404` | `NOT_FOUND` | Requested course or resource does not exist. |
| `413` | `INVALID_PHOTO` | Uploaded image exceeds 2 MB limit. |
| `429` | None / `RATE_LIMITED` | Too many requests. Wait a moment and retry. |
| `503` | `API_UNAVAILABLE` | Database or service temporarily unavailable. |

---

## 6. Flutter Quick Integration Example

### Sign In & Fetch Profile

```dart
import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

const String baseUrl = 'https://euit-lms-api.vercel.app/api';

Future<Map<String, dynamic>?> fetchStudentProfile() async {
  final user = FirebaseAuth.instance.currentUser;
  if (user == null) {
    throw Exception('User is not signed in.');
  }

  // Get current Firebase ID token
  final idToken = await user.getIdToken();

  final response = await http.get(
    Uri.parse('$baseUrl/me'),
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer $idToken',
    },
  );

  final data = jsonDecode(response.body);

  if (response.statusCode == 200 && data['success'] == true) {
    return data['data'] as Map<String, dynamic>;
  } else {
    throw Exception(data['message'] ?? 'Failed to load profile.');
  }
}
```
