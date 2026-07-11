This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CraftVerse Roles and Test Accounts

CraftVerse frontend profile logic supports these trusted roles:

- `user`
- `admin`
- `superadmin`

The permanent superadmin email is `kirantikoo@gmail.com`. The frontend only uses that email as a fallback when the trusted profile has no stored role; production role persistence must be handled by Firebase Admin SDK or a backend admin endpoint.

Normal registration must create a trusted backend profile with:

- `role: "user"`
- `plan: "trial"`
- `trialStartedAt`: server timestamp
- `trialEndsAt`: server timestamp plus 15 days

For local validation, create a normal test user through the regular login page, then use a backend-only development admin action or seed script to set:

```json
{
  "role": "user",
  "plan": "trial"
}
```

Do not add admin role selection to the client registration form.

To assign admin access securely, use a Firebase Admin SDK or backend-only action that verifies the acting user's Firebase ID token, loads their trusted profile/custom claims, confirms `role === "superadmin"`, then updates the target user's trusted profile or custom claims to `role: "admin"`. Never trust a role sent by the browser or request body.

Backend admin endpoints and Firestore rules should enforce the same trusted role source:

- unauthenticated requests are rejected
- `role: "user"` cannot access admin data or role mutation endpoints
- `role: "admin"` can access admin tools but cannot promote admins
- `role: "superadmin"` can promote users to admin
- missing or unreadable profiles never default to admin

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
