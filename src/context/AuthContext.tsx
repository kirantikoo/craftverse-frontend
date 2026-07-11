"use client";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth, db, googleProvider } from "@/src/lib/firebase";
import { SUPERADMIN_EMAIL, type AppPlan, type AppRole } from "@/src/lib/access";
import { getTrialEndDate } from "@/src/lib/subscription";
import { getUserDisplayName } from "@/src/lib/user";
import type { CraftInterest, LearningGoal, SkillLevel } from "@/src/lib/personalization";

export type UserProfile = {
  uid: string;
  displayName?: string;
  name?: string;
  email: string | null;
  photoURL: string | null;
  country?: string;
  role?: AppRole;
  plan?: AppPlan;
  trialStartedAt?: Date | string | number | { toDate: () => Date };
  trialEndsAt?: Date | string | number | { toDate: () => Date };
  subscriptionStatus: "trial" | "active" | "expired" | "canceled";
  createdAt?: Date | string | number | { toDate: () => Date };
  updatedAt?: Date | string | number | { toDate: () => Date };
  interests: CraftInterest[];
  skillLevel?: SkillLevel;
  learningGoals: LearningGoal[];
  onboardingCompleted: boolean;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  displayName: string;
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  profileError: string;
  refreshUserProfile: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PROFILE_ERROR_MESSAGE =
  "You are signed in, but CraftVerse could not save your profile yet. Please check your connection or try again.";

export function getAuthErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/weak-password":
      return "Use at least 6 characters for your password.";
    case "auth/email-already-in-use":
      return "This email already has a CraftVerse account. Try logging in instead.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The email or password does not look right.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup. Please allow popups and try again.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";
    default:
      if (error instanceof Error && error.message) {
        return error.message;
      }

      return "Something went wrong. Please try again.";
  }
}

function getProfileErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return PROFILE_ERROR_MESSAGE;
}

function normalizeRole(role: unknown, email: string | null | undefined): AppRole {
  if (role === "admin" || role === "superadmin" || role === "user") {
    return role;
  }

  if (!role && email?.toLowerCase() === SUPERADMIN_EMAIL) {
    return "superadmin";
  }

  return "user";
}

function normalizePlan(plan: unknown): AppPlan {
  if (plan === "premium" || plan === "free" || plan === "trial") {
    return plan;
  }

  return "trial";
}

function detectCountry() {
  if (typeof navigator === "undefined") {
    return "AU";
  }

  const locale = navigator.languages?.[0] ?? navigator.language;

  try {
    const region = new Intl.Locale(locale).region;
    return region || "AU";
  } catch {
    return "AU";
  }
}

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (!apiUrl) {
    throw new Error("CraftVerse API URL is not configured.");
  }

  return apiUrl;
}

async function getApiErrorMessage(response: Response) {
  try {
    const responseBody = (await response.json()) as {
      error?: string;
      message?: string;
    };

    return responseBody.message || responseBody.error || PROFILE_ERROR_MESSAGE;
  } catch {
    return PROFILE_ERROR_MESSAGE;
  }
}

function normalizeUserProfile(user: User, profile: Partial<UserProfile> = {}): UserProfile {
  const name = profile.name?.trim() || profile.displayName?.trim() || getUserDisplayName(user);
  const email = profile.email ?? user.email;
  const role = normalizeRole(
    typeof profile.role === "string" ? profile.role.toLowerCase() : profile.role,
    email,
  );
  const plan = normalizePlan(profile.plan);
  const trialStartedAt = profile.trialStartedAt ?? new Date();
  const trialEndsAt = profile.trialEndsAt ?? getTrialEndDate(new Date());

  return {
    ...profile,
    uid: profile.uid || user.uid,
    name,
    displayName: profile.displayName?.trim() || name,
    email,
    photoURL: profile.photoURL ?? user.photoURL,
    country: profile.country || detectCountry(),
    role,
    plan,
    trialStartedAt,
    trialEndsAt,
    subscriptionStatus: profile.subscriptionStatus || "trial",
    interests: Array.isArray(profile.interests) ? profile.interests : [],
    learningGoals: Array.isArray(profile.learningGoals) ? profile.learningGoals : [],
    skillLevel: profile.skillLevel,
    onboardingCompleted: role === "admin" || role === "superadmin" ? true : profile.onboardingCompleted === true,
  };
}

function unwrapProfileResponse(responseBody: unknown) {
  if (typeof responseBody !== "object" || responseBody === null) {
    return {};
  }

  const body = responseBody as {
    data?: Partial<UserProfile> & {
      profile?: Partial<UserProfile>;
      user?: Partial<UserProfile>;
    };
    profile?: Partial<UserProfile>;
    user?: Partial<UserProfile>;
  };

  return body.profile ?? body.user ?? body.data?.profile ?? body.data?.user ?? body.data ?? (responseBody as Partial<UserProfile>);
}

async function syncUserProfileWithApi(user: User) {
  const token = await user.getIdToken();

  try {
    const response = await fetch(`${getApiUrl()}/api/auth/sync-user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        country: detectCountry(),
        role: "user",
        plan: "trial",
        trialLengthDays: 15,
        interests: [],
        learningGoals: [],
        skillLevel: null,
        onboardingCompleted: false,
      }),
    });

    if (!response.ok) {
      console.warn("CraftVerse profile sync failed:", await getApiErrorMessage(response));
      return null;
    }

    const responseBody = (await response.json()) as unknown;
    return normalizeUserProfile(user, unwrapProfileResponse(responseBody));
  } catch {
    console.warn("CraftVerse API is not reachable. Using your saved profile if available.");
    return null;
  }
}

async function getFirestoreUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const newProfile = {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? "",
      photoURL: user.photoURL ?? null,
      role: "user" as const,
      plan: "trial" as const,
      interests: [] as CraftInterest[],
      skillLevel: null,
      learningGoals: [] as LearningGoal[],
      onboardingCompleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, newProfile);
    return normalizeUserProfile(user, {
      uid: newProfile.uid,
      email: newProfile.email,
      displayName: newProfile.displayName,
      photoURL: newProfile.photoURL,
      role: newProfile.role,
      plan: newProfile.plan,
      interests: newProfile.interests,
      learningGoals: newProfile.learningGoals,
      onboardingCompleted: newProfile.onboardingCompleted,
    });
  }

  return normalizeUserProfile(user, userSnapshot.data() as Partial<UserProfile>);
}

export async function ensureUserProfile(user: User) {
  try {
    const firestoreProfile = await getFirestoreUserProfile(user);
    if (firestoreProfile) {
      return firestoreProfile;
    }
  } catch {
    console.warn("Saved CraftVerse profile is not available. Using Firebase account details.");
  }

  const syncedProfile = await syncUserProfileWithApi(user);

  if (syncedProfile) {
    return syncedProfile;
  }

  return normalizeUserProfile(user);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setProfileError("");

      if (!currentUser) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await ensureUserProfile(currentUser);
        setUserProfile(profile);
      } catch (error) {
        console.warn("Unable to load CraftVerse user profile:", getProfileErrorMessage(error));
        setProfileError(getProfileErrorMessage(error));
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setProfileError("");
    const credential = await signInWithEmailAndPassword(auth, email, password);

    try {
      const profile = await ensureUserProfile(credential.user);
      setUserProfile(profile);
    } catch (error) {
      console.error("Unable to save CraftVerse profile after email login", error);
      setProfileError(getProfileErrorMessage(error));
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setProfileError("");
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    try {
      const profile = await ensureUserProfile(credential.user);
      setUserProfile(profile);
    } catch (error) {
      console.error("Unable to save CraftVerse profile after signup", error);
      setProfileError(getProfileErrorMessage(error));
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setProfileError("");
    const credential = await signInWithPopup(auth, googleProvider);

    try {
      const profile = await ensureUserProfile(credential.user);
      setUserProfile(profile);
    } catch (error) {
      console.error("Unable to save CraftVerse profile after Google login", error);
      setProfileError(getProfileErrorMessage(error));
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try { setUserProfile(await ensureUserProfile(auth.currentUser)); setProfileError(""); }
    catch (error) { setProfileError(getProfileErrorMessage(error)); }
    finally { setLoading(false); }
  };

  const displayName = userProfile?.name || userProfile?.displayName || getUserDisplayName(user);
  const value = useMemo(
    () => ({
      user,
      loading,
      displayName,
      isLoggedIn: Boolean(user),
      userProfile,
      profileError,
      refreshUserProfile,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
    }),
    [displayName, loading, profileError, user, userProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
