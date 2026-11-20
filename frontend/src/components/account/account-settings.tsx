"use client";
import { StudentProfile } from "../student/profile/student-profile";
import { StaffProfile } from "./profile/staff-profile";
import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import {
  accountApi,
  errorMessage,
  type Preferences,
  type Profile,
} from "@/lib/api/account";
import { useAccount } from "./auth-provider";

const labels: Record<string, string> = {
  emailNotifications: "Email notifications",
  smsNotifications: "SMS notifications",
  leaderboardVisible: "Show me on the leaderboard",
  classReminders: "Class reminders",
  paymentReminders: "Payment reminders",
  learningUpdates: "Learning updates",
  marketingEmails: "Marketing emails",
  projectSubmissions: "Project submissions",
  studentQuestions: "Student questions",
  recordingReminders: "Recording reminders",
  courseReviewUpdates: "Course review updates",
};
export function AccountSettings({ student = false }: { student?: boolean }) {
  const { profile, user, refresh } = useAccount();
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [, setPermissionInfo] = useState<Pick<
    Profile,
    "permissions" | "roleName" | "batchScope"
  > | null>(null);
  const canReadPreferences =
    !!profile?.permissions.includes("preferences.read");
  const permissionKey = profile?.permissions.join("|");
  useEffect(() => {
    let active = true;
    if (canReadPreferences)
      accountApi
        .preferences()
        .then((data) => {
          if (active) setPreferences(data);
        })
        .catch((e) => {
          if (active) setError(errorMessage(e));
        });
    accountApi
      .permissions()
      .then((data) => {
        if (active) setPermissionInfo(data);
      })
      .catch((e) => {
        if (active) setError(errorMessage(e));
      });
    return () => {
      active = false;
    };
  }, [profile?.id, permissionKey, canReadPreferences]);
  if (!profile) return null;
  async function action(work: () => Promise<unknown>, success: string) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await work();
      setMessage(success);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body: Record<string, unknown> = {};
    for (const [key, value] of data.entries())
      body[key] = String(value).trim() || null;
    if (profile!.role !== "STUDENT") {
      body.skills = String(data.get("skills") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      body.yearsOfExperience = data.get("yearsOfExperience")
        ? Number(data.get("yearsOfExperience"))
        : null;
      body.showOnWebsite = data.get("showOnWebsite") === "on";
    }
    void action(async () => {
      await accountApi.updateProfile(body);
      await refresh();
    }, "Profile saved.");
  }
  function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("newPassword") !== data.get("confirmPassword")) {
      setError("New passwords must match.");
      return;
    }
    void action(async () => {
      if (!user?.email)
        throw new Error("Sign in again before changing your password.");
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(
          user.email,
          String(data.get("currentPassword")),
        ),
      );
      await updatePassword(user, String(data.get("newPassword")));
      form.reset();
    }, "Password updated.");
  }
  const Presentation = student ? StudentProfile : StaffProfile;
  return (
    <Presentation
      profile={profile}
      busy={busy}
      error={error}
      message={message}
      preferences={preferences}
      labels={labels}
      setPreferences={setPreferences}
      saveProfile={saveProfile}
      changePassword={changePassword}
      savePreferences={() =>
        void action(async () => {
          if (preferences)
            setPreferences(await accountApi.updatePreferences(preferences));
        }, "Preferences saved.")
      }
      removePhoto={() =>
        void action(async () => {
          await accountApi.photo(null);
          await refresh();
        }, "Photo removed.")
      }
    />
  );
}
