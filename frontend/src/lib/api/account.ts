import { apiRequest } from "./client";
export type Profile = {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  role: string;
  roleName: string;
  permissions: string[];
  batchScope: { mode: "ALL" | "ASSIGNED"; batchIds: string[] };
  phone: string | null;
  emergencyContact: string | null;
  address: string | null;
  education: string | null;
  occupation: string | null;
  jobTitle: string | null;
  bio: string | null;
  skills: string[];
  yearsOfExperience: number | null;
  portfolioUrl: string | null;
  showOnWebsite: boolean;
  photo: { id: string; url: string } | null;
};
export type Preferences = Record<string, boolean>;
export type RoleDefinition = {
  id: string;
  key: string;
  name: string;
  system: boolean;
  permissions: string[];
  defaultBatchScope: string;
};
export const accountApi = {
  me: () => apiRequest<Profile>("/me"),
  updateProfile: (data: object) => apiRequest("/me/profile", "PATCH", data),
  preferences: () => apiRequest<Preferences>("/me/preferences"),
  updatePreferences: (data: Preferences) =>
    apiRequest<Preferences>("/me/preferences", "PATCH", data),
  photo: (assetId: string | null) =>
    apiRequest("/me/photo", "PUT", { assetId }),
  permissions: () =>
    apiRequest<
      Pick<Profile, "role" | "roleName" | "permissions" | "batchScope">
    >("/me/permissions"),
  roles: () => apiRequest<RoleDefinition[]>("/admin/roles"),
  catalog: () => apiRequest<string[]>("/permissions"),
  updateAccess: (id: string, data: object) =>
    apiRequest(
      `/admin/profiles/${encodeURIComponent(id)}/access`,
      "PATCH",
      data,
    ),
  signup: (fullName: string, email: string, password: string) =>
    apiRequest(
      "/auth/student/signup",
      "POST",
      { fullName, email, password },
      false,
    ),
};
export function portalHome(profile: Profile) {
  return profile.role === "STUDENT"
    ? "/student/dashboard"
    : profile.role === "MENTOR"
      ? "/mentor/dashboard"
      : "/admin/overview";
}
export function errorMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code?.startsWith("auth/")) {
    if (code === "auth/too-many-requests")
      return "Too many attempts. Please try again later.";
    if (code === "auth/network-request-failed")
      return "Connection failed. Check your network and retry.";
    if (code === "auth/weak-password")
      return "Choose a stronger password with at least eight characters.";
    return "Unable to complete authentication. Check your credentials or sign in again.";
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please retry.";
}
