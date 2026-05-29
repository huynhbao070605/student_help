# Demo Guide

## Install Prerequisites

Placeholder until the Expo app is scaffolded.

Expected tools:

- Node.js LTS
- pnpm preferred, npm fallback currently used because pnpm is not installed in this environment
- Expo CLI through project scripts
- Android Studio and Android emulator
- Expo Go or development build, depending on native module needs
- EAS CLI for APK/AAB builds

## Run App On Android Device

Placeholder:

```bash
npm install
npm start
```

Then scan the QR code with Expo Go or install the development build when configured.

## Run App On Android Emulator

Placeholder:

```bash
npm install
npm run android
```

## Demo Accounts

Demo accounts are created or repaired through the Supabase Auth Admin API, not by direct SQL inserts into `auth.users`.

Local setup for the repair script:

```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
npm run demo:auth
```

The script also needs `SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_URL`, plus `SUPABASE_ANON_KEY` or `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Keep the service role key local only.

Accounts:

- Admin: `admin@studenthelp.local` / `StudentHelp123!`
- Student verified: `minhanh@studenthelp.local` / `StudentHelp123!`
- Student pending verification: `quanghuy@studenthelp.local` / `StudentHelp123!`
- Vendor restaurant phone login: `0900000201` / `VendorDemo123!`
- Vendor drink shop phone login: `0900000202` / `VendorDemo123!`

Vendor phone login maps to `{phone}@vendor.studenthelp.local` internally.

Prompt 2.8 auth status: demo Auth repair passed. `npm run demo:auth` verified the admin account, both student accounts, and both vendor accounts.

Verification checklist:

- Admin email login reaches the admin area and loads the admin profile.
- Student email login reaches the student tabs and loads the profile.
- Vendor phone login maps to `{phone}@vendor.studenthelp.local`, reaches the vendor area, and loads the vendor profile.
- Logout clears the session and returns to auth screens.

## Backend For Real Android Demo

Prefer Supabase cloud/staging for customer demos on a real Android phone. A phone may not reliably reach laptop localhost.

Local development commands when Supabase CLI is installed:

```bash
supabase start
supabase db reset
```

Cloud/staging commands when Supabase CLI is installed:

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

Prompt 2.5 verified these remote migrations are applied:

- `202605290001`
- `202605290002`
- `202605290003`

Seed status: reapplied to the linked cloud/staging project before Prompt 2.8 verification and completed without visible errors.

Seed command used:

```bash
npx supabase db query --linked --file supabase/seed.sql
```

SQL Editor method for future reseeding:

1. Open the Supabase Dashboard for the staging/demo project.
2. Go to SQL Editor.
3. Paste `supabase/seed.sql`.
4. Confirm it is the staging/demo project, not production.
5. Run the SQL and then test the demo accounts.

The SQL seed does not create Auth users. Use `npm run demo:auth` after reseeding public reference data.

Set the mobile app environment:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Do not add service role keys or database passwords to `.env`.

## 7-Minute Customer Demo Script

1. Open Student Help and show the cute Vietnamese student home screen.
2. Show verification status and explain manual admin review.
3. Browse Ride Together with filters.
4. Browse Marketplace with realistic listings.
5. Create or inspect a Lost and Found post with privacy check state.
6. Open Food and Deals, view a vendor menu, favorite the vendor, and start manual food order chat.
7. Show chat, quick messages, and phone request consent.
8. Show community alerts, Campus Quick Links, badges, and reputation.
9. Switch briefly to admin review queues if available.

## APK Build Placeholder

Future command:

```bash
npx eas build --platform android --profile preview
```

## Known Limitations

Placeholder:

- Expo app foundation exists with polished placeholder screens only.
- Backend migrations, RLS policies, storage buckets, and seed SQL are applied to Supabase cloud/staging.
- Demo Auth accounts were repaired and verified through `npm run demo:auth`; keep real-device login verification in the customer-demo QA path.
- AI features are optional and must not block demo.
