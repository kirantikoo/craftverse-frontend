import { auth } from "@/src/lib/firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function adminApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const user = auth.currentUser;
  if (!user) throw new ApiError("You must be signed in.", 401);
  if (!API_URL) throw new ApiError("NEXT_PUBLIC_API_URL is not configured.", 500);
  const token = await user.getIdToken();
  const response = await fetch(`${API_URL}/api/admin${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(body.message || body.error || "Request failed.", response.status);
  return (body.data ?? body) as T;
}
