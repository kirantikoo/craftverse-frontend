"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PreferenceFlow from "@/components/common/PreferenceFlow";
import { useAuth } from "@/src/context/AuthContext";
import { isStaff } from "@/src/lib/access";
export default function Page(){const {loading,user,userProfile}=useAuth();const router=useRouter();useEffect(()=>{if(loading)return;if(!user)router.replace("/login");else if(isStaff(userProfile?.role)||userProfile?.onboardingCompleted)router.replace("/dashboard")},[loading,router,user,userProfile]);if(loading||!user||isStaff(userProfile?.role)||userProfile?.onboardingCompleted)return <div className="grid min-h-[60vh] place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"/></div>;return <PreferenceFlow/>}
