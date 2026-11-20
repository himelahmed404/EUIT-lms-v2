import type { Role, BatchScope } from "../../../generated/prisma/client.js";

export interface ProfileResponseData {
  id: string;
  fullName: string;
  role: Role;
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
  createdAt: Date;
  updatedAt: Date;
  photoAssetId: string | null;
}

export interface PhotoResponse {
  id: string;
  url: string;
}

export interface PreferencesResponseData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  leaderboardVisible: boolean;
  classReminders: boolean;
  paymentReminders: boolean;
  learningUpdates: boolean;
  marketingEmails: boolean;
  projectSubmissions: boolean;
  studentQuestions: boolean;
  recordingReminders: boolean;
  courseReviewUpdates: boolean;
  [key: string]: boolean;
}
