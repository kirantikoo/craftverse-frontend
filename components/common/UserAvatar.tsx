"use client";

import type { User } from "firebase/auth";
import type { UserProfile } from "@/src/context/AuthContext";

type UserAvatarProps = {
  user?: User | null;
  userProfile?: UserProfile | null;
  className?: string;
  fallbackClassName?: string;
};

export default function UserAvatar({
  className = "h-10 w-10 rounded-full object-cover",
  fallbackClassName = "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#4EFE32] text-sm font-black text-white",
  user,
  userProfile,
}: UserAvatarProps) {
  const avatarUrl = userProfile?.photoURL || user?.photoURL || null;
  const displayName = userProfile?.displayName || userProfile?.name || user?.displayName || "User";
  const fallbackSource = userProfile?.displayName || userProfile?.name || user?.displayName || user?.email || "U";

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={displayName}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span className={fallbackClassName}>
      {fallbackSource.charAt(0).toUpperCase()}
    </span>
  );
}
