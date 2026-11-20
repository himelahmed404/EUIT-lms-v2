import type { ComponentProps, ReactNode } from "react";
import type { StudentProfile } from "@/components/student/profile/student-profile";
import { SignOutButton } from "../auth-provider";
export type ProfileProps = ComponentProps<typeof StudentProfile>;
export function StaffCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="p-card"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <h2 className="p-h3">{title}</h2>
      {children}
    </section>
  );
}
export function ProfileField({
  label,
  ...input
}: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="eit-field">
      <span className="eit-field__label">{label}</span>
      <span className="eit-field__wrap">
        <input className="eit-field__control" {...input} />
      </span>
    </label>
  );
}
export function ProfilePreferences(props: ProfileProps) {
  return (
    <StaffCard title="Notifications">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.savePreferences();
        }}
      >
        {props.preferences ? (
          Object.entries(props.preferences).map(([key, value]) => (
            <div
              className="p-row"
              key={key}
              style={{
                justifyContent: "space-between",
                gap: 16,
                padding: "12px 0",
                borderBottom: "1px solid var(--line-soft)",
              }}
            >
              <span>{props.labels[key] ?? key}</span>
              <button
                type="button"
                className="p-switch"
                role="switch"
                aria-label={props.labels[key] ?? key}
                aria-checked={value}
                disabled={
                  props.busy ||
                  !props.profile.permissions.includes("preferences.write")
                }
                onClick={(event) => {
                  event.stopPropagation();
                  props.setPreferences({
                    ...props.preferences!,
                    [key]: !value,
                  });
                }}
              />
            </div>
          ))
        ) : (
          <p className="p-small">
            {props.profile.permissions.includes("preferences.read")
              ? "Loading preferences…"
              : "Your role cannot view preferences."}
          </p>
        )}
        <button
          className="eit-btn eit-btn--primary eit-btn--md"
          disabled={
            props.busy ||
            !props.preferences ||
            !props.profile.permissions.includes("preferences.write")
          }
        >
          Save preferences
        </button>
      </form>
    </StaffCard>
  );
}
export function ProfileSecurity(props: ProfileProps) {
  return (
    <StaffCard title="Login and security">
      <p className="p-small">{props.profile.email}</p>
      <details>
        <summary className="p-link">Change password</summary>
        <form onSubmit={props.changePassword}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(220px,100%),1fr))",
              gap: 16,
            }}
          >
            {(
              [
                ["currentPassword", "Current password"],
                ["newPassword", "New password"],
                ["confirmPassword", "Confirm new password"],
              ] as const
            ).map(([name, label]) => (
              <ProfileField
                key={name}
                name={name}
                label={label}
                type="password"
                required
                minLength={name === "currentPassword" ? undefined : 8}
                autoComplete={
                  name === "currentPassword"
                    ? "current-password"
                    : "new-password"
                }
              />
            ))}
          </div>
          <button className="p-ghostbtn" disabled={props.busy}>
            Update password
          </button>
        </form>
      </details>
      <p className="p-small">
        Individual device management and SMS sign-in codes are not available
        yet.
      </p>
      <SignOutButton className="p-ghostbtn" />
    </StaffCard>
  );
}
