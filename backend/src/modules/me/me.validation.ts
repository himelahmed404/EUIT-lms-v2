import { ApiError } from '../../utils/ApiError.js';
export function invalid(message = 'Invalid or unsupported fields.'): never {
  throw new ApiError(400, 'VALIDATION_ERROR', message);
}
export function objectBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return invalid();
  return body as Record<string, unknown>;
}
export const uuid = (value: unknown): value is string => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const textLimits = { fullName: 120, phone: 24, emergencyContact: 24, address: 500, education: 200,
  occupation: 120, jobTitle: 120, bio: 2000, portfolioUrl: 2048 };
const mentorFields = ['jobTitle', 'bio', 'skills', 'yearsOfExperience', 'portfolioUrl', 'showOnWebsite'];
export function parseProfile(body: unknown, role: string) {
  const input = objectBody(body);
  const output: Record<string, string | number | boolean | string[] | null> = {};
  if (!Object.keys(input).length) return invalid('Provide at least one profile field.');
  for (const [key, value] of Object.entries(input)) {
    if (mentorFields.includes(key) && role === 'STUDENT') return invalid('Staff profile fields are unavailable to students.');
    if (Object.hasOwn(textLimits, key)) {
      const limit = textLimits[key as keyof typeof textLimits];
      if (value === null && key !== 'fullName') { output[key] = null; continue; }
      if (typeof value !== 'string' || value.includes('\0')) return invalid();
      const text = value.trim();
      if (text.length > limit || (key === 'fullName' && !text)) return invalid();
      if (['phone', 'emergencyContact'].includes(key) && text && !/^\+?[0-9 ()-]{7,24}$/.test(text)) return invalid('Invalid contact phone number.');
      if (key === 'portfolioUrl' && text) {
        try { const url = new URL(text); if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return invalid(); }
        catch { return invalid('Portfolio must be an HTTP or HTTPS URL.'); }
      }
      output[key] = text || null;
    } else if (key === 'skills') {
      if (!Array.isArray(value) || value.length > 20 || value.some(v => typeof v !== 'string' || !v.trim() || v.trim().length > 60 || v.includes('\0'))) return invalid();
      output.skills = [...new Set((value as string[]).map(s => s.trim()))];
    } else if (key === 'yearsOfExperience') {
      if (value !== null && (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 80)) return invalid();
      output[key] = value;
    } else if (key === 'showOnWebsite') {
      if (typeof value !== 'boolean') return invalid();
      output[key] = value;
    } else return invalid();
  }
  return output;
}
export const preferenceDefaults = {
  emailNotifications: true, smsNotifications: true, leaderboardVisible: true,
  classReminders: true, paymentReminders: true, learningUpdates: true, marketingEmails: false,
  projectSubmissions: true, studentQuestions: true, recordingReminders: true, courseReviewUpdates: true,
};
export function parsePreferences(body: unknown) {
  const input = objectBody(body);
  if (!Object.keys(input).length) return invalid('Provide at least one preference.');
  for (const [key, value] of Object.entries(input)) {
    if (!Object.hasOwn(preferenceDefaults, key) || typeof value !== 'boolean') return invalid();
  }
  return input as Partial<typeof preferenceDefaults>;
}
