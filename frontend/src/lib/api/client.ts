import { firebaseAuth } from "@/lib/auth/firebase-client";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
export async function apiRequest<T>(
  path: string,
  method = "GET",
  body?: unknown,
  authenticated = true,
): Promise<T> {
  const user = authenticated ? firebaseAuth().currentUser : null;
  if (authenticated && !user)
    throw new ApiError(401, "UNAUTHENTICATED", "Please sign in again.");
  for (let attempt = 0; attempt < 2; attempt++) {
    const token = user ? await user.getIdToken(attempt > 0) : null;
    const response = await fetch(`/api${path}`, {
      method,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 401 && user && attempt === 0) continue;
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success)
      throw new ApiError(
        response.status,
        result?.code ?? "API_UNAVAILABLE",
        result?.message ?? "Service unavailable. Please retry.",
      );
    return result.data as T;
  }
  throw new ApiError(401, "UNAUTHENTICATED", "Please sign in again.");
}
export const apiGet = <T>(path: string) => apiRequest<T>(path);
export const apiSend = <T>(path: string, method: string, body?: unknown) =>
  apiRequest<T>(path, method, body);
