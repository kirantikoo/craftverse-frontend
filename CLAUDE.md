# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this repo is

`craftverse-frontend` is the customer-facing Next.js app (App Router) for CraftVerse, an AI-powered craft learning platform. It is one of three repos (`craftverse-frontend`, `craftverse-backend`, `craftverse-admin`) — this repo has no backend/server code of its own; it talks to `craftverse-backend` over HTTP and to Firebase directly from the client. See `AGENTS.md` for the full product vision/roadmap.

## Commands

```bash
npm run dev      # next dev --webpack, http://localhost:3000
npm run build    # next build --webpack
npm run start    # serve production build
npm run lint      # eslint
```

There is no test runner configured in this repo — do not assume Jest/Vitest exist.

## Environment

Configured via `.env.local` (not committed). Required keys:

- `NEXT_PUBLIC_FIREBASE_API_KEY`, `_AUTH_DOMAIN`, `_PROJECT_ID`, `_STORAGE_BUCKET`, `_MESSAGING_SENDER_ID`, `_APP_ID` — Firebase client config (`src/lib/firebase.ts`)
- `NEXT_PUBLIC_API_URL` — base URL of `craftverse-backend`; code throws if unset when a backend call is attempted
- `NEXT_PUBLIC_ADMIN_URL` — URL of the separate `craftverse-admin` app (used to build a login link, defaults to `https://craftverse-admin.vercel.app`)

## Architecture

### Split root: `app/` vs `src/`

Routes live under `app/` (App Router, one folder per route). Non-route application code is split unusually between three places — know which to reach for:

- `src/` — auth/session core: `src/context/AuthContext.tsx` (the `useAuth()` provider), `src/lib/*` (access control, firebase client, subscription/trial math, admin API client, personalization scoring), `src/data/tutorials.ts`
- `lib/` (repo root) — generic UI helpers: `lib/utils.ts` (shadcn `cn()`), `lib/constants.ts`, `lib/colors.ts`
- `components/`, `data/`, `hooks/`, `types/` (repo root) — shared UI components, static nav/page/home content, hooks, shared types

Import both with the `@/` alias (maps to repo root), e.g. `@/src/context/AuthContext` and `@/components/ui/button` side by side.

### Auth, roles and plans (the core domain model)

Everything else in the app hangs off `UserProfile` in `src/context/AuthContext.tsx`:

- **Roles**: `"user" | "admin" | "superadmin"` (`AppRole`, `src/lib/access.ts`). `isStaff()` = admin or superadmin. The permanent superadmin is `kirantikoo@gmail.com` (`SUPERADMIN_EMAIL`) — used only as a client-side fallback when a profile has no stored role; real role persistence is backend/Firebase-Admin-only. **Never add admin role selection to client registration/signup forms**, and never trust a role value from the browser.
- **Plans**: `"trial" | "free" | "premium"` (`AppPlan`). New signups get `plan: "trial"`, a 15-day trial (`TRIAL_DAYS` in `src/lib/subscription.ts`), `isTrialActive()`/`getDaysLeft()` derive from `trialEndsAt`. `hasPremiumAccess()` = staff OR premium OR active trial.
- **Profile loading** (`AuthProvider` in `AuthContext.tsx`): on Firebase auth state change, `ensureUserProfile()` first tries Firestore (`users/{uid}` doc, creating it on first login), then falls back to POSTing to the backend `/api/auth/sync-user`, then falls back to a normalized in-memory profile derived from the Firebase `User` alone. `normalizeUserProfile()` is where role/plan defaults and coercion happen — read it before changing profile shape.
- **Route protection** is component-based (no middleware.ts):
  - `components/auth/ProtectedRoute.tsx` — requires login, redirects to `/onboarding` if a non-staff user hasn't completed onboarding
  - `components/auth/PremiumGate.tsx` — wraps `ProtectedRoute`, additionally requires `hasPremiumAccess()` or shows an upgrade screen linking to `/pricing`
  - `components/admin/AdminGuard.tsx` — requires `isStaff()`, redirects non-staff to `/dashboard`
  - Admin UI additionally lives behind the separate `craftverse-admin` app; `src/lib/admin.ts` just builds the login URL to it.
- **Backend calls**: `src/lib/admin-api.ts` (`adminApi()`) is the pattern for authenticated calls to `craftverse-backend` — grabs a Firebase ID token, hits `${NEXT_PUBLIC_API_URL}/api/admin${path}`, throws `ApiError` with the server's message/status on failure.

### Routes (`app/`)

Public marketing/learning routes at the top level (`explore`, `learn`, `pricing`, craft-category pages like `crochet`, `sewing`, `knitting`, `embroidery`, `painting`, `diy`, `stitching`, individual `tutorials/[slug]`-style folders), authenticated app routes (`dashboard`, `profile`, `settings`, `create`, `projects`, `community`, `shop`, `ai-tutor`, `collections`, `notifications`), and a self-contained `app/admin/*` section (`dashboard`, `users`, `crafts`, `tutorials`, `categories`, `community`, `subscriptions`, `pricing`, `reports`, `settings`) gated by `AdminGuard`/`AdminShell`.

`app/layout.tsx` wraps every page in `ThemeProvider` → `AuthProvider` → `AppShell` (`components/layout/AppShell.tsx`: `Sidebar` + `TopHeader` + `BottomNav`, responsive between desktop sidebar and mobile bottom nav). This is the only root layout — page-specific chrome is composed inside route folders, not via nested layouts.

### Tutorial/content model

`src/data/tutorials.ts` defines the static `Tutorial` shape used by the tutorial detail pages (steps, materials, tips, common mistakes, XP) — this maps directly to the "AI Tutor Workflow" step structure described in `AGENTS.md`. `src/lib/personalization.ts` holds the separate `PersonalizedTutorial`/`Preferences` model (interests, skill level, learning goals) and the scoring functions (`scoreTutorial`, `recommendedTutorials`, `relatedTutorials`) used for recommendations — these are two distinct tutorial shapes, don't conflate them.

### UI stack

Tailwind CSS v4 + shadcn/ui (`components.json`: style `radix-luma`, base color `neutral`, icons via `lucide-react`) + Radix primitives (via the `radix-ui` umbrella package) + `framer-motion` for animation + `next-themes` for dark mode (`suppressHydrationWarning` on `<html>` in the root layout is intentional). PWA support is wired via `@ducanh2912/next-pwa` in `next.config.ts`, disabled in development.
