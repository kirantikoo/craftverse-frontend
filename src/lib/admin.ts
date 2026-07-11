export function getAdminUrl() {
  const value = process.env.NEXT_PUBLIC_ADMIN_URL || "https://craftverse-admin.vercel.app";
  const cleaned = value.replace(/\/$/, "");

  return cleaned.endsWith("/login") ? cleaned : `${cleaned}/login`;
}
