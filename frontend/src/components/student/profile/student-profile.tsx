"use client";
import {
  useState,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Bell, LockKeyhole, Ticket, User2 } from "lucide-react";
import { AccountPhoto } from "@/components/account/account-identity";
import { SignOutButton } from "@/components/account/auth-provider";
import { PendingEnrollment } from "@/components/account/pending-enrollment";
import type { Profile, Preferences } from "@/lib/api/account";
import styles from "./profile.module.css";
import { ProfilePhotoUpload } from "@/components/account/profile-photo-upload";
import { ProfileCard } from "./profile-card";

type Props = {
  profile: Profile;
  busy: boolean;
  error: string;
  message: string;
  preferences: Preferences | null;
  labels: Record<string, string>;
  setPreferences: Dispatch<SetStateAction<Preferences | null>>;
  saveProfile: (event: FormEvent<HTMLFormElement>) => void;
  changePassword: (event: FormEvent<HTMLFormElement>) => void;
  savePreferences: () => void;
  removePhoto: () => void;
};
const tabs = [
  ["pf-account", "Personal details", User2],
  ["notifications", "Notifications", Bell],
  ["pf-refer", "Referrals & coupons", Ticket],
  ["pf-security", "Security", LockKeyhole],
] as const;
export function StudentProfile(props: Props) {
  const { profile, busy, preferences } = props;
  const [tab, setTab] = useState("pf-account");
  const canEdit = profile.permissions.includes("profile.write");
  return (
    <div className={`pf-room ${styles.root}`}>
      <h1>My profile</h1>
      <div className="pf-layout">
        <aside className="pf-side">
          <section className="pf-id" aria-labelledby="pf-name">
            <div className="pf-picture">
              <AccountPhoto />
            </div>
            <h2 id="pf-name">{profile.fullName}</h2>
            <p>Student ID · {profile.id}</p>
          </section>
          <nav className="pf-nav" aria-label="Profile settings">
            {tabs.map(([id, label, Icon]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={tab === id ? "location" : undefined}
                onClick={() => setTab(id)}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </a>
            ))}
            <SignOutButton />
          </nav>
        </aside>
        <div className="pf-panels">
          {props.error && <p role="alert">{props.error}</p>}
          {props.message && (
            <p className="pf-status" role="status">
              {props.message}
            </p>
          )}
          <div id="pf-account" hidden={tab !== "pf-account"}>
            <ProfileCard title="Personal details">
              <form key={profile.id} onSubmit={props.saveProfile}>
                <div className="pf-grid">
                  {(
                    [
                      ["fullName", "Full name", 120],
                      ["phone", "Contact phone", 24],
                      ["emergencyContact", "Emergency contact", 24],
                      ["address", "Address", 500],
                      ["education", "Education", 200],
                      ["occupation", "Occupation", 120],
                    ] as const
                  ).map(([key, label, maxLength]) => (
                    <label className="pf-field" key={key}>
                      <span>{label}</span>
                      <input
                        name={key}
                        defaultValue={profile[key] ?? ""}
                        maxLength={maxLength}
                        required={key === "fullName"}
                        disabled={!canEdit}
                      />
                    </label>
                  ))}
                  <label className="pf-field">
                    <span>Login email</span>
                    <input value={profile.email} readOnly />
                    <small>
                      Contact the office to change your login email.
                    </small>
                  </label>
                </div>
                <div className="pf-actions">
                  <button className="pf-primary" disabled={busy || !canEdit}>
                    Save profile
                  </button>
                </div>
              </form>
            </ProfileCard>
            <ProfileCard title="Profile photo">
              <ProfilePhotoUpload className="pf-secondary" />
              {profile.photo && (
                <button
                  className="pf-secondary"
                  disabled={busy || !canEdit}
                  onClick={props.removePhoto}
                >
                  Remove photo
                </button>
              )}
            </ProfileCard>
            <ProfileCard title="Active courses">
              <p className="pf-note">
                Your enrolled courses will appear here when enrollment is
                connected.
              </p>
            </ProfileCard>
            <PendingEnrollment />
          </div>
          <div id="notifications" hidden={tab !== "notifications"}>
            <ProfileCard title="Notification preferences">
              {preferences ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.savePreferences();
                  }}
                >
                  {Object.entries(preferences).map(([key, value]) => (
                    <label className="pf-setting" key={key}>
                      <span>
                        <b>{props.labels[key] ?? key}</b>
                      </span>
                      <input
                        type="checkbox"
                        role="switch"
                        checked={value}
                        disabled={
                          busy ||
                          !profile.permissions.includes("preferences.write")
                        }
                        onChange={(e) =>
                          props.setPreferences({
                            ...preferences,
                            [key]: e.target.checked,
                          })
                        }
                      />
                    </label>
                  ))}
                  <div className="pf-actions">
                    <button
                      className="pf-primary"
                      disabled={
                        busy ||
                        !profile.permissions.includes("preferences.write")
                      }
                    >
                      Save preferences
                    </button>
                  </div>
                </form>
              ) : (
                <p className="pf-note">
                  {profile.permissions.includes("preferences.read")
                    ? "Loading preferences…"
                    : "Your role cannot view preferences."}
                </p>
              )}
            </ProfileCard>
          </div>
          <div id="pf-refer" hidden={tab !== "pf-refer"}>
            <ProfileCard title="Your referral code">
              <p className="pf-note">Referrals are not available yet.</p>
            </ProfileCard>
            <ProfileCard title="Referral activity">
              <p className="pf-note">No referral activity is available.</p>
            </ProfileCard>
            <ProfileCard title="Redeem a coupon">
              <form className="pf-redeem">
                <label htmlFor="pf-coupon">Coupon code</label>
                <div>
                  <input id="pf-coupon" disabled />
                  <button className="pf-primary" disabled>
                    Apply
                  </button>
                </div>
                <p className="pf-note">
                  Coupon redemption is not available yet.
                </p>
              </form>
            </ProfileCard>
          </div>
          <div id="pf-security" hidden={tab !== "pf-security"}>
            <ProfileCard title="Password">
              <form onSubmit={props.changePassword}>
                <div className="pf-grid">
                  {(
                    [
                      ["currentPassword", "Current password"],
                      ["newPassword", "New password"],
                      ["confirmPassword", "Confirm new password"],
                    ] as const
                  ).map(([name, label]) => (
                    <label className="pf-field" key={name}>
                      <span>{label}</span>
                      <input
                        type="password"
                        name={name}
                        autoComplete={
                          name === "currentPassword"
                            ? "current-password"
                            : "new-password"
                        }
                        minLength={name === "currentPassword" ? undefined : 8}
                        required
                      />
                    </label>
                  ))}
                </div>
                <div className="pf-actions">
                  <button className="pf-primary" disabled={busy}>
                    Update password
                  </button>
                </div>
              </form>
            </ProfileCard>
            <ProfileCard title="Signed-in devices">
              <p className="pf-note">
                Individual device management is not available yet.
              </p>
            </ProfileCard>
            <ProfileCard title="My permissions">
              <p>{profile.roleName}</p>
              <ul>
                {profile.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </ProfileCard>
          </div>
        </div>
      </div>
    </div>
  );
}
