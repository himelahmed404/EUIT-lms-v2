"use client";
import { useEffect, useState } from "react";
import {
  accountApi,
  errorMessage,
  type RoleDefinition,
} from "@/lib/api/account";
import { useAccount } from "./auth-provider";
export function AccessSettings() {
  const { profile } = useAccount();
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [catalog, setCatalog] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const canRead = profile?.permissions.includes("roles.read");
  const canWrite =
    profile?.role === "OWNER" && profile.permissions.includes("access.write");
  useEffect(() => {
    let active = true;
    if (canRead)
      Promise.all([accountApi.roles(), accountApi.catalog()])
        .then(([r, c]) => {
          if (active) {
            setRoles(r);
            setCatalog(c);
          }
        })
        .catch((e) => {
          if (active) setError(errorMessage(e));
        });
    return () => {
      active = false;
    };
  }, [canRead]);
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setMessage("");
    const selected = roles.find((r) => r.id === data.get("role"));
    try {
      if (!selected) throw new Error("Choose a role.");
      await accountApi.updateAccess(String(data.get("profileId")).trim(), {
        role: selected.system ? selected.key : "CUSTOM",
        customRoleId: selected.system ? null : selected.id,
        active: data.get("active") === "on",
        batchScope: data.get("scope"),
        batchIds: String(data.get("batchIds") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setMessage("Access updated and recorded in the audit log.");
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  if (!canRead)
    return (
      <main className="account-card">
        <h1>Access restricted</h1>
        <p>Your role cannot view staff permissions.</p>
      </main>
    );
  return (
    <main className="account-card">
      <h1>Roles and permissions</h1>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {roles.map((role) => (
        <section key={role.id}>
          <h2>{role.name}</h2>
          <p>
            {role.defaultBatchScope === "ALL"
              ? "All batches"
              : "Assigned batches"}
          </p>
          <p>
            {role.permissions.filter((p) => catalog.includes(p)).join(", ")}
          </p>
        </section>
      ))}
      {canWrite && (
        <section>
          <h2>Update account access</h2>
          <p>
            Use the internal account ID shown on the target person’s profile.
            Owner accounts cannot be changed here.
          </p>
          <form onSubmit={save}>
            <label>
              Target account ID
              <input name="profileId" required pattern="[0-9a-fA-F-]{36}" />
            </label>
            <label htmlFor="access-role">
              Role
              <select id="access-role" name="role" required>
                <option value="">Select role</option>
                {roles
                  .filter((r) => r.key !== "OWNER")
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="access-scope">
              Batch scope
              <select id="access-scope" name="scope">
                <option value="ASSIGNED">Assigned batches</option>
                <option value="ALL">All batches (staff only)</option>
              </select>
            </label>
            <label>
              Batch IDs (comma separated)
              <input name="batchIds" />
            </label>
            <label className="account-toggle">
              <input type="checkbox" name="active" defaultChecked />
              Account active
            </label>
            <button disabled={busy}>Save access</button>
          </form>
        </section>
      )}
    </main>
  );
}
