import type { User } from "firebase/auth";

export function getUserDisplayName(user: User | null) {
  if (!user) {
    return "";
  }

  if (user.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (user.email?.includes("@")) {
    return user.email.split("@")[0];
  }

  return "CraftVerse member";
}
