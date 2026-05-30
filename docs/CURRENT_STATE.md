# Current State

## Current Phase

Phase 5: Final QA polish and Android release readiness implemented.

## Completed Features

- Expo React Native TypeScript app foundation scaffolded.
- Expo Router configured with auth, student, admin, and vendor route groups.
- Student bottom tabs created with Vietnamese labels.
- Admin and vendor mobile tab shells created.
- Reusable mobile UI design system components created.
- Polished placeholder screens created for onboarding, login, register, student home, rides, marketplace, Lost and Found, food, chat, profile, admin dashboard, and vendor dashboard.
- Supabase client structure and environment variable pattern created.
- Supabase schema migrations created for core roles, posts, chat, phone consent, reports, reputation, quick links, quick messages, and app settings.
- Supabase RLS policies created for self/admin profile access, public-safe content, vendor ownership, private student verification, participant-only chat, and contact request privacy.
- Supabase storage buckets and storage policies created.
- Seed SQL created for universities, housing areas, app settings, quick messages, badges, demo admin, demo students, and demo vendors.
- Prompt 2.5 verified the linked Supabase cloud project has migrations `202605290001`, `202605290002`, and `202605290003` applied.
- Seed SQL stabilized for staging/demo public reference data only; demo Auth users are intentionally created through a service-role-only Auth Admin script instead of direct `auth.users` or `auth.identities` inserts.
- Prompt 2.6 user-reported seed application completed with `npx supabase db query --linked --file supabase/seed.sql` and no visible errors.
- Prompt 2.6 generated database types from the linked Supabase project at `lib/supabase/database.types.ts`.
- Prompt 2.6 wired the Supabase client to the generated `Database` type.
- Prompt 2.6 direct Supabase Auth verification found seeded account login failing with `Database error querying schema`.
- Prompt 2.7 identified the likely root cause as direct writes into hosted Supabase Auth internals and added `scripts/create-demo-auth-users.mjs` plus `npm run demo:auth` to recreate/verify demo Auth users through the Supabase Auth Admin API.
- Prompt 2.8 user-reported `npx supabase db query --linked --file supabase/seed.sql` completed without visible errors.
- Prompt 2.8 user-reported `npm run demo:auth` passed and verified admin, both student accounts, and both vendor accounts.
- Prompt 3 implemented the student home experience with greeting, verification status, reputation, community alerts, quick actions, nearby food preview, ride suggestions, Lost and Found shortcut, marketplace shortcut, latest chats, and Campus Quick Links.
- Prompt 3 implemented Ride Together list/search/filter UI, create/edit/delete own ride posts, Google Maps open action, match request, safety note after match, and completion reputation event.
- Prompt 3 implemented Marketplace/Borrow/Lend list/search/filter UI, create/edit/delete own posts, image selection/upload, chat shortcut, completion confirmation, and reputation event.
- Prompt 3 implemented Lost and Found list/search/filter UI, create/edit/delete own posts, image selection/upload, saved searches, returned item flow, and return reputation event.
- Prompt 3 implemented Lost and Found privacy workflow with sensitive-info reminder, user privacy-checked marker, and Expo-safe rule-based OCR fallback scoring.
- Prompt 3 implemented Vietnamese smart search without AI with synonym matching and confidence labels.
- Prompt 3 implemented student chat inbox/detail, send text, send image, read/unread presentation, context-aware quick messages, mini profile cards, report/block actions, and phone request consent card with approve/decline.
- Prompt 3 expanded student profile with reputation explanation, badges, account dates, privacy controls, and completed activity stats.
- Prompt 4 implemented Food & Deals listing, vendor profile, menu quick view, menu image view, quick chat order, saved vendors, saved menu items, reorder, favorite vendors, fake nearby restaurants, and food filters.
- Prompt 4 implemented Student Services directory with category, area, open now, open late, student discount, delivery, preorder, admin verified, favorited, and rating filters.
- Prompt 4 implemented Campus Quick Links grouped list with filters, save action, and external open action.
- Prompt 4 implemented Community Alerts dismiss action on student home and admin CRUD-style alert management.
- Prompt 4 implemented vendor dashboard with shop profile edit, opening status, location query/note, Google Maps URL, and vendor tags.
- Prompt 4 implemented vendor menu management with image upload, menu image tab, add/edit/delete structured menu items, item availability, tags, and options.
- Prompt 4 implemented vendor posts for daily deal, new item, combo, notice, sold out, and group order.
- Prompt 4 implemented admin overview stats, verification queue visibility, user/vendor management, create/reset/suspend vendor account demo controls, reports, blocks, moderation, app settings, AI/OCR settings display, community alerts CRUD, quick links CRUD, and services CRUD.
- Prompt 4 expanded demo Auth repair to 1 admin, 12 students, and 6 phone-style vendor accounts with the requested credentials.
- Prompt 4 expanded seed/app demo data for vendors, menus, vendor posts, services, alerts, quick links, rides, marketplace, Lost and Found, saved searches, conversations, phone request states, reports, blocks, reputation events, and badges.
- Prompt 5 polished shared mobile UI foundations for keyboard-safe forms, bottom sheet height, button/badge text wrapping, quick action card wrapping, loading skeletons, and small Android screen resilience.
- Prompt 5 added Android release readiness config with version `0.5.0`, Android versionCode `5`, runtimeVersion policy, empty Android permissions, and `eas.json` profiles for development APK, preview APK, and production AAB.
- Prompt 5 updated README and demo guide with prerequisites, env setup, Supabase reset, Android run commands, EAS build commands, troubleshooting, demo script, and known limitations.
- Prompt 5 ran final QA command checks and documented EAS build blocker: Expo login or `EXPO_TOKEN` is required before remote APK/AAB builds.
- Android runtime dependency mismatch from Expo SDK native packages was fixed by pinning AsyncStorage, Expo, React, Gesture Handler, Reanimated, Safe Area Context, Image Picker, Linking, and Router to SDK 56-compatible versions.
- Student core chat handoff now works for Ride Together match requests and Marketplace chat actions: each action creates or reuses a demo conversation, navigates to the Chat tab, and opens the correct chat detail.
- Chat tab now has an explicit conversation list/detail flow with tappable conversation rows, visible message history, input, send button, image action, quick messages, phone consent, report, and block controls.
- Core student MVP polish is implemented for login, home, rides, marketplace, chat, and profile: clearer customer-ready copy, loading/empty/error states, button feedback, UIT-focused seed data, and local AsyncStorage persistence for ride, marketplace, and chat state.
- Mobile auth/session provider, vendor phone-style login mapping, role guards, logout, profile update, avatar upload, student-card upload, and admin verification approve/reject hooks created.
- Android app config, placeholder icon, adaptive icon, and splash assets created.
- Backend foundation exists as migrations/seed and app integration hooks; full product flows are not implemented yet.
- Product requirements documented.
- Technical direction documented.
- Non-negotiable decisions documented.
- Cursor rule set created.
- Cursor skill workflows created.

## In-Progress Features

- Student demo shell is being simplified to focus on core flows: rides, marketplace/document exchange, chat, and profile.
- Android phone retest is pending after dependency fix and Metro cache clear.
- Android phone retest is pending for Ride Together -> Xin match -> Chat, Marketplace -> Chat -> Chat, Chat list -> detail, and sending a new message.
- Android phone retest is pending for the polished MVP customer walkthrough: login, home, ride match, marketplace chat, chat send, reload persistence, and profile.

## Not-Started Features

- Full manual student verification workflow polish beyond profile upload/status.
- Production-grade realtime chat subscriptions.
- Native OCR integration.
- Preview APK build execution on EAS cloud.

## Last Successful Checks

- Documentation bootstrap completed.
- Prompt 0 proof verification completed on 2026-05-29.
- Prompt 1 dependency install completed with npm fallback because pnpm is unavailable.
- `npm run typecheck` passed on 2026-05-29.
- `npm run lint` passed on 2026-05-29.
- `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout to avoid leaving the dev server running.
- `npx expo config --type public` passed and resolved app name, Android package, icon, splash, and permissions.
- Expo dev server started in the background with `npm start -- --host lan` and is waiting on `http://localhost:8081`.
- Prompt 1 proof verification completed on 2026-05-29. `npm run typecheck` and `npm run lint` still pass. Expo start check reached Metro status `packager-status:running` during verification.
- Prompt 2 dependency install completed with npm fallback: `expo-image-picker` and `@react-native-async-storage/async-storage`.
- `npm run typecheck` passed on 2026-05-29 after Prompt 2.
- `npm run lint` passed on 2026-05-29 after Prompt 2.
- `npx expo config --type public` passed after Prompt 2.
- `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout.
- Supabase CLI dev dependency installed and `npx supabase --version` returns `2.102.0`.
- `npx supabase db reset` could not apply migrations/seed because Docker Desktop is not available/running.
- `npx supabase db push` could not apply migrations because the Supabase project is not linked.
- Prompt 2.5 `npx supabase migration list` verified local and remote migration versions match for `202605290001`, `202605290002`, and `202605290003`.
- Prompt 2.5 confirmed `.env` contains `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`; values were not committed.
- Prompt 2.5 `npm run typecheck` passed.
- Prompt 2.5 `npm run lint` passed.
- Prompt 2.5 `npx expo config --type public` passed after removing Supabase URL/key values from app config `extra`.
- Prompt 2.5 `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout.
- Prompt 2.6 `npm run typecheck` passed after generated database types were added.
- Prompt 2.6 `npm run lint` passed after generated database types were added.
- Prompt 2.6 `npx expo config --type public` passed.
- Prompt 2.6 `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout.
- Prompt 2.7 `npm run demo:auth` stopped safely with `Missing required local env values: SUPABASE_SERVICE_ROLE_KEY`; no remote Auth changes were made.
- Prompt 2.7 `npm run typecheck` passed.
- Prompt 2.7 `npm run lint` passed.
- Prompt 2.7 `npx expo config --type public` passed and does not expose Supabase URL/key values in `extra`.
- Prompt 2.7 `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout.
- Prompt 2.8 user-reported seed reapply completed without visible errors.
- Prompt 2.8 user-reported `npm run demo:auth` passed and verified:
  - `admin@studenthelp.local`
  - `minhanh@studenthelp.local`
  - `quanghuy@studenthelp.local`
  - `0900000201@vendor.studenthelp.local`
  - `0900000202@vendor.studenthelp.local`
- Prompt 2.8 user-reported `npm run typecheck` passed.
- Prompt 2.8 user-reported `npm run lint` passed.
- Prompt 3 `npm run typecheck` passed.
- Prompt 3 `npm run lint` passed.
- Prompt 3 `npx expo config --type public` passed and did not expose Supabase keys in Expo `extra`.
- Prompt 3 `npx expo start --no-dev --minify --offline` started Metro and waited on `http://localhost:8081`; the bounded smoke check was stopped by timeout.
- Prompt 3 proof check on 2026-05-29 re-ran `npm run typecheck` and `npm run lint`; both passed.
- Prompt 3 proof check confirmed no project test script is configured in `package.json`.
- Prompt 3 proof check ran Expo offline start again. The direct bounded run reached `Starting Metro Bundler` before timeout, and the hidden port `8082` smoke check returned Metro status `packager-status:running`.
- Prompt 4 `npx supabase db query --linked --file supabase/seed.sql` passed.
- Prompt 4 first `npm run demo:auth` was blocked by sandbox network access; rerun with approved network access passed and verified 1 admin, 12 students, and 6 vendors.
- Prompt 4 `npm run typecheck` passed.
- Prompt 4 `npm run lint` passed.
- Prompt 4 found no configured root project test script in `package.json`.
- Prompt 4 Expo offline smoke check reached Metro on port `8082` with status `packager-status:running`; the spawned Metro process was stopped afterward.
- Prompt 5 `npm run typecheck` passed.
- Prompt 5 `npm run lint` passed.
- Prompt 5 `npx expo config --type public` passed and resolved app name, Android package, version, versionCode, icons, splash, runtimeVersion, and empty Android permissions.
- Prompt 5 `npx eas-cli --version` passed after network approval and returned `eas-cli/20.0.0`.
- Prompt 5 `npx eas-cli config --profile preview --platform android` and `npx eas-cli build --platform android --profile preview --non-interactive --no-wait` were blocked by missing Expo login or `EXPO_TOKEN`.
- Prompt 5 Expo offline smoke check reached Metro on port `8082` with status `packager-status:running`; the spawned Metro process was stopped afterward.
- 2026-05-30 Android runtime fix checks passed: `npx expo install --check`, `npm run typecheck`, `npm run lint`, and Expo offline Metro smoke check on port `8082`.
- 2026-05-30 chat handoff fix checks passed: `npm run typecheck`, `npm run lint`, `npx expo install --check`, `npx expo config --type public`, and Expo offline Metro smoke check on port `8082`.
- 2026-05-30 MVP polish checks passed: `npm run typecheck`, `npm run lint`, `npx expo install --check`, `npx expo config --type public`, no configured root test script found, and Expo offline Metro smoke check on port `8082`.
- 2026-05-30 student demo polish fixed Ride Together timestamp submission by parsing natural Vietnamese time input into ISO `depart_at` values while keeping a separate display label in local ride state and `schedule_note`.
- 2026-05-30 core student UI copy was normalized for Vietnamese accents across Home, Ride Together, Marketplace, Chat, Login, Onboarding, Profile, tab labels, and student seed data.
- 2026-05-30 theme tokens were standardized to the warm cream/coral palette, with shared cards, buttons, badges, search boxes, and tabs updated for a more consistent Android demo look.
- 2026-05-30 timestamp/theme polish checks passed: `npm run typecheck`, `npm run lint`, `npx expo install --check`, `npx expo config --type public`, no configured root test script found, and Expo offline Metro smoke check on port `8082`.
- 2026-05-30 chat UUID fix added local-to-remote conversation mapping: mock/local chat IDs stay client-only, Supabase sends create or reuse a real `conversations.id` UUID, insert the current user into `conversation_participants`, and then insert into `messages`.
- 2026-05-30 guarded student Supabase writes that use UUID columns so mock ride/market/lost-found IDs are not sent to `source_id`, `target_id`, or `id` filters.
- 2026-05-30 chat UUID fix checks passed: `npm run typecheck`, `npm run lint`, `npx expo install --check`, `npx expo config --type public`, no configured root test script found, and Expo offline Metro smoke check on port `8082`.

## Known Issues

- Migrations and seed were not applied locally because Docker Desktop is not available/running.
- `npm install` reported 10 moderate transitive dependency vulnerabilities.
- Demo Auth accounts are repaired and verified through `npm run demo:auth`.
- Real Android device login and role-routing smoke verification should still be done during demo QA.
- Prompt 4 food/vendor/admin/service screens are demo-complete but still use a lightweight app-level demo data layer for metadata not present in the Prompt 2 schema.
- OCR uses an Expo-safe rule-based text detector and manual privacy check marker; no native OCR module was added.
- Chat supports demo/local interaction and basic Supabase message insert when conversation IDs are real; production realtime subscriptions are deferred.
- Some richer filters are UI/client-side because the current Prompt 2 schema does not have dedicated columns for every requested filter dimension.
- Dev server logs are written to `.expo/dev-server.out.log` and `.expo/dev-server.err.log`.
- Background Expo dev server may exit after hidden `Start-Process` launch in this environment; use `npm start` in a visible terminal for an interactive demo session if needed.
- Real Android device QA still needs to be performed outside this workspace.
- EAS preview APK/AAB cloud builds need Expo login or `EXPO_TOKEN`.
- Placeholder app icon and splash should be replaced before Play Store submission.
- After dependency changes, Android devices should restart Expo with a cleared Metro cache using `npx expo start -c` before retesting.

## Next Recommended Task

Finish stabilizing the simplified student demo and rehearse the core flows before returning to Android release work.
