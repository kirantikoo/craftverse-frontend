"use client";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  FirestoreError,
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth, db, googleProvider } from "@/src/lib/firebase";
import { getTrialEndDate } from "@/src/lib/subscription";
import { getUserDisplayName } from "@/src/lib/user";

export type UserProfile = {
  uid: string;
  displayName: string;
  name?: string;
  email: string | null;
  photoURL: string | null;
  role: "user" | "admin";
  plan?: "trial" | "premium" | "free";
  trialStartedAt: Timestamp;
  trialEndsAt: Timestamp;
  subscriptionStatus: "trial" | "active" | "expired" | "canceled";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  displayName: string;
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  profileError: string;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PROFILE_ERROR_MESSAGE =
  "You are signed in, but CraftVerse could not save your profile yet. Please check your connection or Firebase permissions.";

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
      return "Something went wrong. Please try again.";
  }
}

function isFirestorePermissionError(error: unknown) {
  return error instanceof FirestoreError && error.code === "permission-denied";
}

function getProfileErrorMessage(error: unknown) {
  if (isFirestorePermissionError(error)) {
    return "You are signed in, but CraftVerse cannot access your profile because Firestore permissions need updating.";
  }

  return PROFILE_ERROR_MESSAGE;
}

export async function ensureUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as UserProfile;
  }

  const now = new Date();
  const newProfile: UserProfile = {
    uid: user.uid,
    displayName: getUserDisplayName(user),
    email: user.email,
    photoURL: user.photoURL,
    role: "user",
    plan: "trial",
    trialStartedAt: Timestamp.fromDate(now),
    trialEndsAt: Timestamp.fromDate(getTrialEndDate(now)),
    subscriptionStatus: "trial",
  };

  await setDoc(userRef, {
    ...newProfile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newProfile;
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
        console.error("Unable to load CraftVerse user profile", error);
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
    }
  };

  const displayName = userProfile?.displayName ?? userProfile?.name ?? getUserDisplayName(user);
  const value = useMemo(
    () => ({
      user,
      loading,
      displayName,
      isLoggedIn: Boolean(user),
      userProfile,
      profileError,
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
