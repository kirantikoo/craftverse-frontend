"use client";

import {
  User,
  onAuthStateChanged,
} from "firebase/auth";
import {
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
import { auth, db } from "@/src/lib/firebase";
import { getTrialEndDate } from "@/src/lib/subscription";
import { getUserDisplayName } from "@/src/lib/user";

export type UserProfile = {
  uid: string;
  name: string;
  email: string | null;
  photoURL: string | null;
  role: "user" | "admin";
  plan: "trial" | "premium" | "free";
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
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function ensureUserDocument(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as UserProfile;
  }

  const now = new Date();
  const newProfile: UserProfile = {
    uid: user.uid,
    name: getUserDisplayName(user),
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (!currentUser) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await ensureUserDocument(currentUser);
        setUserProfile(profile);
      } catch (error) {
        console.error("Unable to load CraftVerse user profile", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const displayName = userProfile?.name ?? getUserDisplayName(user);
  const value = useMemo(
    () => ({
      user,
      loading,
      displayName,
      isLoggedIn: Boolean(user),
      userProfile,
    }),
    [displayName, loading, user, userProfile],
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
