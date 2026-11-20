"use client";
import { ProfilePhotoUpload } from "../profile-photo-upload";
import { useState } from "react";
import { AccountPhoto } from "../account-identity";
import { ProfileField, StaffCard, type ProfileProps } from "./profile-parts";
export function StaffProfileForm(props: ProfileProps & { mentor: boolean }) {
  const { profile, mentor } = props;
  const [skills, setSkills] = useState(profile.skills);
  const [skill, setSkill] = useState("");
  const [show, setShow] = useState(profile.showOnWebsite);
  const editable = profile.permissions.includes("profile.write");
  return (
    <StaffCard title={mentor ? "Public profile" : profile.fullName}>
      <form
        onSubmit={props.saveProfile}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <div className="p-row" style={{ gap: 16, flexWrap: "wrap" }}>
          <AccountPhoto />
          <div>
            <span className="eit-badge eit-badge--ink">{profile.roleName}</span>
            <ProfilePhotoUpload />
            {profile.photo && (
              <button
                type="button"
                className="p-link"
                disabled={props.busy || !editable}
                onClick={props.removePhoto}
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
        <fieldset
          disabled={!editable || props.busy}
          style={{
            border: 0,
            padding: 0,
            margin: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {mentor && (
            <div className="p-row" style={{ justifyContent: "space-between" }}>
              <span>Show on website</span>
              <button
                type="button"
                className="p-switch"
                role="switch"
                aria-label="Show on website"
                aria-checked={show}
                onClick={(event) => {
                  event.stopPropagation();
                  setShow(!show);
                }}
              />
            </div>
          )}
          {show && <input type="hidden" name="showOnWebsite" value="on" />}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(240px,100%),1fr))",
              gap: "16px 20px",
            }}
          >
            <ProfileField
              label="Full name"
              name="fullName"
              defaultValue={profile.fullName}
              required
              maxLength={120}
            />
            <ProfileField
              label="Mobile number"
              name="phone"
              defaultValue={profile.phone ?? ""}
              maxLength={24}
            />
            <ProfileField label="Login email" value={profile.email} readOnly />
            {mentor && (
              <>
                <ProfileField
                  label="Job title"
                  name="jobTitle"
                  defaultValue={profile.jobTitle ?? ""}
                  maxLength={120}
                />
                <ProfileField
                  label="Years of experience"
                  name="yearsOfExperience"
                  type="number"
                  min={0}
                  max={80}
                  defaultValue={profile.yearsOfExperience ?? ""}
                />
                <ProfileField
                  label="Portfolio or LinkedIn"
                  name="portfolioUrl"
                  type="url"
                  defaultValue={profile.portfolioUrl ?? ""}
                  maxLength={2048}
                />
              </>
            )}
          </div>
          {mentor ? (
            <>
              <label className="p-label">
                Short bio
                <textarea
                  className="p-textarea"
                  name="bio"
                  defaultValue={profile.bio ?? ""}
                  maxLength={2000}
                  style={{ minHeight: 100, width: "100%" }}
                />
              </label>
              <div className="eit-chips">
                {skills.map((item) => (
                  <span
                    className="p-pill"
                    key={item}
                    style={{
                      background: "var(--cyan-soft)",
                      color: "var(--cyan-deep)",
                    }}
                  >
                    {item}
                    <button
                      type="button"
                      style={{
                        width: 24,
                        height: 24,
                        border: 0,
                        borderRadius: "50%",
                        background: "transparent",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                      aria-label={`Remove ${item}`}
                      onClick={() =>
                        setSkills(skills.filter((s) => s !== item))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="p-row" style={{ gap: 12, flexWrap: "wrap" }}>
                <ProfileField
                  label="Add skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  maxLength={80}
                />
                <button
                  className="p-ghostbtn"
                  type="button"
                  disabled={!skill.trim()}
                  onClick={() => {
                    if (!skills.includes(skill.trim()))
                      setSkills([...skills, skill.trim()]);
                    setSkill("");
                  }}
                >
                  Add skill
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="hidden"
                name="yearsOfExperience"
                value={profile.yearsOfExperience ?? ""}
              />
            </>
          )}
          <input type="hidden" name="skills" value={skills.join(", ")} />
          <details>
            <summary>Additional personal details</summary>
            <div style={{ display: "grid", gap: 16 }}>
              {(
                [
                  ["emergencyContact", "Emergency contact", 24],
                  ["address", "Address", 500],
                  ["education", "Education", 200],
                  ["occupation", "Occupation", 120],
                ] as const
              ).map(([name, label, maxLength]) => (
                <ProfileField
                  key={name}
                  name={name}
                  label={label}
                  maxLength={maxLength}
                  defaultValue={profile[name] ?? ""}
                />
              ))}
            </div>
          </details>
          <div className="p-row" style={{ justifyContent: "flex-end" }}>
            <button className="eit-btn eit-btn--primary eit-btn--md">
              Save profile
            </button>
          </div>
        </fieldset>
      </form>
    </StaffCard>
  );
}
