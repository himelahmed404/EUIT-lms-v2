"use client";
import { useRef, useState } from "react";
import { firebaseAuth } from "@/lib/auth/firebase-client";
import { useAccount } from "./auth-provider";
import { errorMessage } from "@/lib/api/account";
export function ProfilePhotoUpload({
  className = "p-ghostbtn",
}: {
  className?: string;
}) {
  const { profile, refresh } = useAccount();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function upload(file?: File) {
    if (!file) return;
    setError("");
    setMessage("");
    let type = file.type;
    if (!type || type === "image/jpg") {
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) type = "image/jpeg";
      else if (lower.endsWith(".png")) type = "image/png";
      else if (lower.endsWith(".webp")) type = "image/webp";
    }
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(type) ||
      file.size > 2 * 1024 * 1024 ||
      file.size === 0
    ) {
      setError("Choose a JPEG, PNG or WebP image up to 2 MB.");
      return;
    }
    setBusy(true);
    try {
      const user = firebaseAuth().currentUser;
      if (!user) throw new Error("Please sign in again.");
      for (let attempt = 0; attempt < 2; attempt++) {
        const token = await user.getIdToken(attempt > 0);
        const response = await fetch("/api/me/photo/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": type,
          },
          body: file,
          signal: AbortSignal.timeout(45000),
        });
        if (response.status === 401 && attempt === 0) continue;
        const result = await response.json().catch(() => null);
        if (!response.ok || !result?.success)
          throw new Error(
            result?.message ?? "Photo upload failed. Please try again.",
          );
        await refresh();
        setMessage("Profile photo updated.");
        break;
      }
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }
  return (
    <div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Choose profile photo"
        hidden
        onChange={(e) => void upload(e.target.files?.[0])}
      />
      <button
        type="button"
        className={className}
        disabled={busy || !profile?.permissions.includes("profile.write")}
        onClick={() => input.current?.click()}
      >
        {busy ? "Uploading…" : "Upload photo"}
      </button>
      <p className="p-small">
        JPEG, PNG or WebP · up to 2 MB. Photos are cropped to a square.
      </p>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
    </div>
  );
}
