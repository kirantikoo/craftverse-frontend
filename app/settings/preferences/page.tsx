"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PreferenceFlow from "@/components/common/PreferenceFlow";
export default function Page(){return <ProtectedRoute><PreferenceFlow edit/></ProtectedRoute>}
