# Demo Guide

## Prerequisites

- Node.js LTS
- npm
- Android Studio emulator or Android phone with Expo Go
- Supabase CLI
- EAS CLI through `npx eas-cli`

## Install And Env

```bash
npm install
```

`.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=local-only-service-role-key
```

Do not expose service role keys in the app or commit them.

## Supabase Reset

Cloud/staging:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
npx supabase db query --linked --file supabase/seed.sql
npm run demo:auth
```

Local, if Docker Desktop is running:

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

Extra vendor accounts `0900000004`, `0900000005`, and `0900000006` also use `vendor123456`.

## Run On Android

Phone with Expo Go:

```bash
npm start
```

Android emulator:

```bash
npm run android
```

Expo smoke check:

```bash
npx expo start --no-dev --minify --offline
```

## EAS Build Commands

Development APK:

```bash
npx eas-cli build --platform android --profile development
```

Preview APK:

```bash
npx eas-cli build --platform android --profile preview
```

Production AAB:

```bash
npx eas-cli build --platform android --profile production
```

Remote EAS builds require `npx eas-cli login` or `EXPO_TOKEN`.

## Exact Demo Data

- 12 student Auth accounts, 1 admin account, and 6 vendor Auth accounts.
- 6 food vendors with opening status, tags, fake distances, menu images, menu items, availability, item tags, and options.
- 15 ride posts.
- 25 marketplace/borrow/lend posts.
- 30 Lost and Found posts.
- Saved searches, 12 conversations, phone request states, reports, blocks, reputation, and badges.
- Services for printing, laundry, bike repair, laptop repair, tutoring, and campus support.
- Community Alerts and Campus Quick Links.
- Search phrases: `vi nau gan KTX B`, `tai nghe trang thu vien`, `the sinh vien UIT`, `binh nuoc xanh`.

## 7-Minute Customer Demo Script

1. Sign in as `minhanh@studenthelp.local` and show the home screen: verification, reputation, alerts, food preview, ride suggestions, chats, and quick links.
2. Open Ride Together, apply filters, open Maps, request a match, and point out no realtime GPS.
3. Open Lost and Found, search the four demo phrases, save a search, and explain OCR risk logic plus manual admin review.
4. Open Chat, send a quick message, show an image message entry point, and approve or decline a phone request.
5. Open Food & Deals, filter nearby/open/favorites, view a vendor profile, menu image, structured menu, save vendor/item, and quick order through chat.
6. Sign in as vendor `0900000001`, edit shop status/profile, upload menu image, edit menu items, and create a vendor post.
7. Sign in as admin, show overview stats, manual verification queue, vendor create/reset/suspend, reports/blocks, AI/OCR settings, alerts, quick links, and services CRUD.

## QA Rehearsal Checklist

- Demo accounts sign in and route to the correct role.
- No major student, vendor, or admin screen is empty.
- Student verification upload/status is visible.
- Ride filters, match, and safety note are visible.
- Marketplace filters and borrow/lend completion are visible.
- Lost and Found search, saved search, privacy reminder, and OCR states are visible.
- Chat, image message entry point, report/block, and phone request consent are visible.
- Vendor menu image upload, menu edit, and posts are visible.
- Food quick order remains chat-only.
- Services filters, Community Alerts, and Campus Quick Links are visible.

## Known Limitations

- Real Android device QA still needs to be performed outside this workspace.
- EAS remote build needs Expo login or `EXPO_TOKEN`.
- OCR is rule-based and Expo-safe; no native OCR module was added.
- Some Prompt 4 demo metadata is app-level because the current schema is lean.
- Production realtime chat subscriptions are deferred.
- Before Play Store launch, replace placeholder icon/splash with final assets, complete privacy policy/store listing, run closed testing, and perform production RLS/security review.
