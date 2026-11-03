/**
 * API client stub. Demo UI reads from `@/data/demo` today.
 * When Final/backend is live, replace getDemo* calls with these helpers.
 */

export type ApiError = { status: number; message: string };

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) {
    throw new Error(`API not configured. Would GET ${path}`);
  }
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const err: ApiError = { status: res.status, message: await res.text() };
    throw err;
  }
  return res.json() as Promise<T>;
}

export async function apiSend<T>(path: string, method: string, body?: unknown): Promise<T> {
  if (!BASE) {
    throw new Error(`API not configured. Would ${method} ${path}`);
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const err: ApiError = { status: res.status, message: await res.text() };
    throw err;
  }
  return res.json() as Promise<T>;
}
