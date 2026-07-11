import type { UserProfile } from "@/src/context/AuthContext";
import { isTrialActive } from "@/src/lib/subscription";

export type AppRole = "user" | "admin" | "superadmin";
export type AppPlan = "trial" | "free" | "premium";

export const SUPERADMIN_EMAIL = "kirantikoo@gmail.com";

export const isStaff = (role?: AppRole) =>
  role === "admin" || role === "superadmin";

export const isSuperadmin = (role?: AppRole) => role === "superadmin";

export const canManageUsers = (role?: AppRole) => isStaff(role);

export const canManageAdmins = (role?: AppRole) => isSuperadmin(role);

export const canAccessAdmin = (role?: AppRole) => isStaff(role);

export const getRole = (profile?: Pick<UserProfile, "role"> | null): AppRole =>
  profile?.role ?? "user";

export const getPlan = (profile?: Pick<UserProfile, "plan"> | null): AppPlan =>
  profile?.plan ?? "trial";

export const getPlanLabel = (profile?: Pick<UserProfile, "plan" | "role"> | null) => {
  const role = getRole(profile);

  if (role === "superadmin") {
    return "Super Administrator";
  }

  if (role === "admin") {
    return "Administrator";
  }

  const plan = getPlan(profile);
  return plan === "premium" ? "Premium" : plan === "free" ? "Free" : "Trial";
};

export const hasPremiumAccess = (
  profile?: Pick<UserProfile, "plan" | "role" | "trialEndsAt"> | null,
) => {
  if (!profile) {
    return false;
  }

  return isStaff(profile.role) || profile.plan === "premium" || isTrialActive(profile.trialEndsAt);
};

export const isTrialUser = (
  profile?: Pick<UserProfile, "plan" | "role" | "trialEndsAt"> | null,
) => {
  if (!profile || isStaff(profile.role)) {
    return false;
  }

  return getPlan(profile) === "trial" && isTrialActive(profile.trialEndsAt);
};

export const shouldShowUpgradeCard = (
  profile?: Pick<UserProfile, "plan" | "role"> | null,
) => {
  if (!profile || isStaff(profile.role)) {
    return false;
  }

  return getPlan(profile) !== "premium";
};
