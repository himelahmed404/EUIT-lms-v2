"use client";
import Image from "next/image";
import { useAccount } from "./auth-provider";
export function AccountName({ first = false }: { first?: boolean }) {
  const { profile } = useAccount();
  return <>{first ? profile?.fullName.split(/\s+/)[0] : profile?.fullName}</>;
}
export function AccountId() {
  const { profile } = useAccount();
  return <>{profile?.id}</>;
}
export function AccountPhoto() {
  const { profile } = useAccount();
  return profile?.photo ? (
    <Image
      unoptimized
      className="account-avatar"
      src={profile.photo.url}
      alt=""
      width={48}
      height={48}
    />
  ) : (
    <span className="account-avatar" aria-hidden="true">
      {profile?.fullName
        .split(/\s+/)
        .map((s) => s[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
