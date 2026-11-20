"use client";
import Link from "next/link";
import { AccountPhoto } from "../account-identity";
import {
  ProfilePreferences,
  ProfileSecurity,
  StaffCard,
  type ProfileProps,
} from "./profile-parts";
import { StaffProfileForm } from "./staff-profile-form";
export function StaffProfile(props: ProfileProps) {
  const { profile } = props;
  const mentor = profile.role === "MENTOR";
  const main = (
    <div
      style={{
        flex: "2 1 560px",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <StaffProfileForm {...props} mentor={mentor} />
      <ProfilePreferences {...props} />
      <ProfileSecurity {...props} />
      <StaffCard title="My permissions">
        <p>
          {profile.roleName} ·{" "}
          {profile.batchScope.mode === "ALL"
            ? "All batches"
            : `${profile.batchScope.batchIds.length} assigned batches`}
        </p>
        <ul>
          {profile.permissions.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </StaffCard>
    </div>
  );
  return (
    <main className="p-main">
      {props.error && <p role="alert">{props.error}</p>}
      {props.message && <p role="status">{props.message}</p>}
      <div className="p-split">
        {mentor && (
          <aside
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span className="p-mono">Preview on the website</span>
            <article className="eit-mentor">
              <div className="eit-mentor__media">
                <div className="eit-mentor__photo eit-mentor__photo--empty">
                  <AccountPhoto />
                </div>
              </div>
              <div className="eit-mentor__body">
                <h3 className="eit-mentor__name">{profile.fullName}</h3>
                <p className="eit-mentor__role">{profile.jobTitle}</p>
                <ul className="eit-mentor__tags">
                  {profile.skills.map((skill) => (
                    <li key={skill}>
                      <span className="eit-badge eit-badge--cyan">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <StaffCard title="Teaching">
              <p className="p-small">
                Courses and batches are assigned by the admin.
              </p>
              <Link className="p-link" href="/mentor/batch">
                View assigned batches
              </Link>
            </StaffCard>
          </aside>
        )}
        {main}
        {!mentor && (
          <aside style={{ flex: "1 1 320px", minWidth: 0 }}>
            <StaffCard title="Your recent activity">
              <p className="p-small">
                Your personal activity feed is not available yet.
              </p>
              <Link className="p-link" href="/admin/activity">
                Full activity log
              </Link>
            </StaffCard>
          </aside>
        )}
      </div>
    </main>
  );
}
