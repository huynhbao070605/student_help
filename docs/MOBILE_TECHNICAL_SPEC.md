# Mobile Technical Spec

## Architecture

- Expo React Native with TypeScript.
- Expo Router for file-based navigation.
- Supabase for Auth, Postgres, Storage, and Realtime.
- NativeWind preferred for lightweight styling unless the project later chooses another React Native-friendly approach.
- TanStack Query preferred for server state, caching, retries, and invalidation. A simple typed data layer is acceptable for early demo scope.
- Zustand may be used for small shared client state such as onboarding state, selected demo area, or UI preferences.
- pnpm is the preferred package manager. Prompt 1 used npm as a documented fallback because `pnpm` was not installed in the environment.

## Suggested Expo Router Structure

```text
app/
  _layout.tsx
  (auth)/
    sign-in.tsx
    onboarding.tsx
  (student)/
    _layout.tsx
    home.tsx
    rides/
    marketplace/
    lost-found/
    chat/
    food/
    services/
    profile/
  (vendor)/
    _layout.tsx
    dashboard.tsx
    menu.tsx
    chats.tsx
    profile.tsx
  (admin)/
    _layout.tsx
    dashboard.tsx
    verifications.tsx
    privacy-review.tsx
    vendors.tsx
    reports.tsx
  modal/
components/
features/
lib/
  supabase/
  query/
  auth/
  storage/
  permissions/
constants/
assets/
```

## Supabase Schema Overview

Initial tables should include:

- profiles: user profile, role, display name, avatar, phone, campus, verification status, reputation score.
- student_verifications: student card uploads, review status, admin notes.
- vendors: vendor profile, owner user, category, address, demo distance, open status.
- vendor_menu_items: manual menu items.
- vendor_menu_images: uploaded menu images.
- vendor_favorites: student favorite vendors.
- ride_posts: commute posts.
- marketplace_listings: sell/exchange/free/borrow/lend listings.
- lost_found_posts: lost/found posts and privacy review state.
- lost_found_privacy_checks: OCR/AI result, risk score, decision, evidence.
- saved_searches: saved Lost and Found search criteria.
- conversations: chat context and participants.
- conversation_participants: users in each conversation.
- messages: text messages and quick message metadata.
- phone_requests: consent flow for phone reveal.
- student_services: service vendors or service posts.
- community_alerts: admin-managed alerts.
- campus_quick_links: useful external links.
- badges: badge definitions.
- user_badges: assigned badges.
- reports: reports against users, posts, vendors, or chats.
- blocks: block relationships.

## Auth And Role Strategy

- Supabase Auth is the identity provider.
- profiles.role determines student, admin, or vendor app access.
- Admin creates vendor accounts using phone-style login and seed password.
- Client routing must be role-aware, but RLS is the real security boundary.
- Student verification status must not grant admin privileges.

## Storage Buckets

- avatars: public or signed read depending on implementation.
- student-verifications: private. Owner and admin only.
- listing-images: public or signed read for marketplace display.
- lost-found-images: public/signed only after privacy approval; restricted while pending/rejected.
- vendor-menu-images: vendor-managed, readable by students.
- chat-attachments: optional future bucket; private to participants if added.

## Realtime Chat Strategy

- Use Supabase Realtime on messages filtered by conversation membership.
- RLS must ensure only participants can read and insert conversation messages.
- Use optimistic UI for sent messages.
- Use TanStack Query invalidation or direct cache updates after sends.
- Keep chat simple for demo: text and quick messages first.

## Offline And Cache Strategy

- Use TanStack Query caching for smooth back navigation and repeated list visits.
- Keep stale times practical for demo screens.
- Persisted offline cache is optional for first demo.
- Form drafts can be local component state or small Zustand slices.
- Always show friendly loading, empty, and error states.

## Android Permissions

Request only necessary permissions:

- Camera or media library for student card, listings, Lost and Found, vendor menu images, and avatars.
- Notifications only if later implemented.
- No background location.
- No realtime GPS.
- External maps should open through Expo Linking without location tracking.

## EAS Build Plan

- Configure `app.json` or `app.config.ts` with Android package name, version, icon, splash, and permissions.
- Add `eas.json` with development, preview, and production profiles.
- Preview profile should build APK for customer demos.
- Production profile should build AAB for Play Store readiness.
- Document environment variables for Supabase URL and anon key.

## Backend Environments

- local: optional Supabase local development for schema iteration.
- staging: development cloud project for active testing.
- demo: stable Supabase project with curated seed data.
- Keep demo seed data deterministic and resettable.
- Never use real private student information in demo.

## Testing Commands

Future project commands should include:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm expo start
pnpm eas build --platform android --profile preview
```

Prompt 1 npm fallback commands:

```bash
npm install
npm run typecheck
npm run lint
npm start
npm run android
npx expo start --no-dev --minify --offline
```

## Performance Rules

- Optimize list screens with FlatList or FlashList if needed.
- Paginate major lists.
- Compress and resize uploaded images.
- Avoid excessive realtime subscriptions.
- Keep home screen fast with cached summary data.
- Avoid heavy native modules unless necessary.
- Document Expo development build or EAS implications when native modules are required.
