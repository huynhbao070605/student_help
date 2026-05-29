# Current State

## Current Phase

Phase 3: Student-facing core experience implemented.

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
- Mobile auth/session provider, vendor phone-style login mapping, role guards, logout, profile update, avatar upload, student-card upload, and admin verification approve/reject hooks created.
- Android app config, placeholder icon, adaptive icon, and splash assets created.
- Backend foundation exists as migrations/seed and app integration hooks; full product flows are not implemented yet.
- Product requirements documented.
- Technical direction documented.
- Non-negotiable decisions documented.
- Cursor rule set created.
- Cursor skill workflows created.

## In-Progress Features

- None.

## Not-Started Features

- Full manual student verification workflow polish beyond profile upload/status.
- Production-grade realtime chat subscriptions.
- Native OCR integration.
- Food and Deals.
- Vendor menu management.
- Favorite vendors.
- Student services.
- Community alerts.
- Campus Quick Links.
- Report and block.
- Full demo seed data.
- Android APK/AAB build setup.

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

## Known Issues

- Migrations and seed were not applied locally because Docker Desktop is not available/running.
- `npm install` reported 10 moderate transitive dependency vulnerabilities.
- Demo Auth accounts are repaired and verified through `npm run demo:auth`.
- Real Android device login and role-routing smoke verification should still be done during demo QA.
- Food tab remains a polished placeholder; full food/vendor system is intentionally deferred to later prompts.
- Admin/vendor dashboards remain foundation placeholders except for compatibility with role routing.
- OCR uses an Expo-safe rule-based text detector and manual privacy check marker; no native OCR module was added.
- Chat supports demo/local interaction and basic Supabase message insert when conversation IDs are real; production realtime subscriptions are deferred.
- Some richer filters are UI/client-side because the current Prompt 2 schema does not have dedicated columns for every requested filter dimension.
- Dev server logs are written to `.expo/dev-server.out.log` and `.expo/dev-server.err.log`.
- Background Expo dev server may exit after hidden `Start-Process` launch in this environment; use `npm start` in a visible terminal for an interactive demo session if needed.
- There is no `.git` directory in this workspace, so changed-file proof is based on the build journal and filesystem state rather than `git diff`.

## Next Recommended Task

Proceed to Prompt 3 proof/check or Prompt 4 safety and communication depth. Before customer demo, run real Android login, role routing, profile loading, post creation, image upload, chat, and logout smoke checks.
