interface SignInResult {
  idToken: string;
  localId: string;
}

export class FirebaseEmailError extends Error {
  constructor(public readonly code: string) { super('Firebase email request failed'); }
}

export async function firebaseAuthRequest<T>(action: string, body: object): Promise<T> {
  const key = process.env.FIREBASE_WEB_API_KEY?.trim();
  if (!key) throw new FirebaseEmailError('CONFIGURATION_MISSING');
  const emulator = process.env.FIREBASE_AUTH_EMULATOR_HOST;
  const base = emulator
    ? `http://${emulator}/identitytoolkit.googleapis.com/v1`
    : 'https://identitytoolkit.googleapis.com/v1';
  const response = await fetch(`${base}/accounts:${action}?key=${encodeURIComponent(key)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(10000),
  });
  const result = await response.json() as { error?: { message?: string } };
  if (!response.ok) throw new FirebaseEmailError(result.error?.message?.split(' : ')[0] ?? 'UPSTREAM_FAILURE');
  return result as T;
}

export function signInForVerification(email: string, password: string) {
  return firebaseAuthRequest<SignInResult>('signInWithPassword', { email, password, returnSecureToken: true });
}

export async function sendVerificationEmail(idToken: string) {
  await firebaseAuthRequest('sendOobCode', { requestType: 'VERIFY_EMAIL', idToken });
}
