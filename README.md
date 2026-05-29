# Student Help

Student Help is an Android-first, mobile-first Expo React Native app for students around VNU-HCM, Thu Duc, and Di An.

This scaffold is Prompt 1 scope only: app foundation, navigation shells, reusable mobile UI components, polished placeholder screens, environment variable pattern, and Supabase client structure. It does not implement backend schema, RLS, auth flows, chat, marketplace logic, ordering, payments, realtime GPS, or product features.
Prompt 2 adds the Supabase backend foundation: migrations, RLS policies, storage buckets, seed foundation, mobile auth/session wiring, role guards, profile editing, avatar upload, student-card upload, and admin manual verification actions.

## Stack

- Expo React Native
- TypeScript
- Expo Router
- Supabase client shell
- Supabase migrations and seed SQL
- React Native StyleSheet-based design system
- npm fallback for this scaffold because `pnpm` is not installed in the current environment

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in Supabase values when a backend project exists.

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

## Run

```bash
npm start
npm run android
```

## Checks

```bash
npm run typecheck
npm run lint
```

Expo start check:

```bash
npx expo start --no-dev --minify
```

## Android Config

- App name: Student Help
- Android package placeholder: `com.studenthelp.app`
- Icon placeholders: `assets/images/icon.png`, `assets/images/adaptive-icon.png`
- Splash placeholder: `assets/images/splash.png`
- Permissions: none requested yet

## Supabase Backend

For customer demos on a real Android phone, prefer Supabase cloud/staging. A phone may not reliably reach a laptop localhost Supabase instance. Local Supabase is still useful for development.

Migration files:

- `supabase/migrations/202605290001_foundation_schema.sql`
- `supabase/migrations/202605290002_rls_policies.sql`
- `supabase/migrations/202605290003_storage_buckets.sql`

Seed file:

- `supabase/seed.sql`

Important: `supabase/seed.sql` now seeds public reference/demo support data only. It must not insert directly into `auth.users` or `auth.identities`; hosted Supabase Auth owns those tables and direct inserts can create login failures such as `Database error querying schema`.

Local development commands when Supabase CLI is installed:

```bash
supabase start
supabase db reset
```

Cloud/staging commands when Supabase CLI is installed and authenticated:

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

Prompt 2.5 verified that the linked cloud project has these migrations applied:

- `202605290001_foundation_schema.sql`
- `202605290002_rls_policies.sql`
- `202605290003_storage_buckets.sql`

Seed status: `supabase/seed.sql` was reapplied to the linked cloud/staging project before Prompt 2.8 verification and completed without visible errors.

Seed command used:

```bash
npx supabase db query --linked --file supabase/seed.sql
```

Alternative for future reseeding: open the Supabase Dashboard SQL Editor for the staging/demo project, paste `supabase/seed.sql`, confirm it is not production, then run it once.

Do not put service role keys or database passwords in the mobile app.

## Demo Auth Accounts

Demo login accounts are created/repaired through the Supabase Auth Admin API with a local service-role-only script:

```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
npm run demo:auth
```

The script reads `SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY` or `EXPO_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` from local environment values. Do not commit the service role key and do not expose it through `EXPO_PUBLIC_*`.

Demo credentials:

- Admin: `admin@studenthelp.local` / `StudentHelp123!`
- Student: `minhanh@studenthelp.local` / `StudentHelp123!`
- Student: `quanghuy@studenthelp.local` / `StudentHelp123!`
- Vendor phone login: `0900000201` / `VendorDemo123!`
- Vendor phone login: `0900000202` / `VendorDemo123!`

Vendor phone login maps to internal email format: `{phone}@vendor.studenthelp.local`.

Database types were generated from the linked project:

- `lib/supabase/database.types.ts`

Prompt 2.8 status: demo Auth repair passed. `npm run demo:auth` verified the admin account, both student accounts, and both vendor accounts. Prompt 3 can proceed; keep real Android device login and role-routing smoke checks in the demo QA path.

## Project Rules

Before coding, read `AGENTS.md` and `docs/CONTEXT_BOOTSTRAP.md`. Obey `docs/DECISIONS.md`, keep scope tight, and update project memory after every prompt.
