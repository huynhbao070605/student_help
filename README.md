# Student Help

Student Help is an Android-first Expo React Native app for students around VNU-HCM, Thu Duc, and Di An. It supports student verification, ride matching, marketplace/borrow/lend, Lost and Found, safe chat, Food & Deals, services, alerts, quick links, vendor tools, and admin moderation.

## Prerequisites

- Node.js LTS
- npm, used as the fallback package manager in this workspace
- Android Studio and an Android emulator, or an Android phone with Expo Go
- Supabase CLI for migrations/seed work
- EAS CLI for APK/AAB builds: `npx eas-cli --version`

## Install

```bash
npm install
```

## Environment

Create `.env` from `.env.example`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=local-only-service-role-key
```

Only `EXPO_PUBLIC_*` values are for the mobile app. Keep `SUPABASE_SERVICE_ROLE_KEY` local and never commit it.

## Supabase Setup

Cloud/staging is preferred for real Android demos.

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
npx supabase db query --linked --file supabase/seed.sql
npm run demo:auth
```

Local Supabase requires Docker Desktop:

```bash
npx supabase start
npx supabase db reset
```

## Demo Accounts

- Admin: `admin@studenthelp.local` / `admin123456`
- Main verified student: `minhanh@studenthelp.local` / `student123456`
- Pending student: `quanghuy@studenthelp.local` / `student123456`
- Vendor: `0900000001` / `vendor123456`
- Vendor: `0900000002` / `vendor123456`
- Vendor: `0900000003` / `vendor123456`

Vendor phone login maps to `{phone}@vendor.studenthelp.local`.

## Run On Android

Expo Go on phone:

```bash
npm start
```

Then scan the QR code. Use the same Wi-Fi network, or switch Expo to tunnel if LAN is blocked.

Android emulator:

```bash
npm run android
```

Bounded smoke check:

```bash
npx expo start --no-dev --minify --offline
```

## Checks

```bash
npm run typecheck
npm run lint
```

There is currently no root `test` script configured.

## Android Release Readiness

Configured in `app.config.ts`:

- App name: `Student Help`
- Android package: `com.studenthelp.app`
- Version: `0.5.0`
- Android versionCode: `5`
- Icon: `assets/images/icon.png`
- Adaptive icon: `assets/images/adaptive-icon.png`
- Splash: `assets/images/splash.png`
- Theme color: `#FF8A7A`
- Android permissions: `[]`

No background location, realtime GPS, payment, or delivery tracking permissions are requested.

## EAS Builds

Development APK:

```bash
npx eas-cli build --platform android --profile development
```

Preview APK for customer demos:

```bash
npx eas-cli build --platform android --profile preview
```

Production AAB:

```bash
npx eas-cli build --platform android --profile production
```

CI/non-interactive builds require:

```bash
EXPO_TOKEN=your-token
```

Prompt 5 validation confirmed EAS CLI is available, but a remote preview APK build cannot start in this environment until `eas login` is completed or `EXPO_TOKEN` is set.

## Troubleshooting

- If Auth fails, rerun `npm run demo:auth` with a valid local `SUPABASE_SERVICE_ROLE_KEY`.
- If Android phone cannot reach local services, use Supabase cloud/staging and Expo tunnel.
- If image picking fails in Expo Go, verify media library permission prompt was accepted.
- If Metro hangs, stop old Node processes or use a different port: `npx expo start --port 8082`.
- If EAS asks for credentials, run `npx eas-cli login` or set `EXPO_TOKEN`.

## Product Boundaries

- Student card verification is manual admin review only.
- AI/OCR cannot approve student cards.
- No realtime GPS.
- No payment.
- No real order management.
- No delivery tracking.
- Food ordering is manual through chat.
