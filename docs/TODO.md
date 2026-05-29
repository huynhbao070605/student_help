# Student Help TODO

## Phase 0: Project Memory

- [x] Create PRD.
- [x] Create mobile technical spec.
- [x] Create decisions source of truth.
- [x] Create current state tracker.
- [x] Create phase checklist.
- [x] Create build journal.
- [x] Create context bootstrap guide.
- [x] Create demo guide skeleton.
- [x] Create UI style guide.
- [x] Create Cursor rules.
- [x] Create Cursor skills.
- [x] Verify Prompt 0 file creation proof.

## Phase 1: App Scaffold

- [x] Initialize Expo React Native TypeScript app.
- [x] Configure Expo Router.
- [x] Choose and install styling solution.
- [x] Configure npm fallback scripts because pnpm is unavailable.
- [x] Add lint and typecheck.
- [x] Configure app icon, splash placeholder, Android package name, and app metadata.
- [x] Add environment variable pattern for Supabase.
- [x] Add Supabase client shell without backend implementation.
- [x] Add placeholder role-aware navigation shells.
- [x] Add reusable mobile UI design system components.
- [x] Add polished placeholder screens.
- [x] Verify Prompt 1 scaffold proof.

## Phase 2: Supabase Foundation

- [x] Create schema migration plan.
- [x] Add profiles, roles, verification, vendors, posts, chat, phone request, reports, and blocks tables.
- [x] Add storage buckets.
- [x] Add RLS policies.
- [x] Add seed script structure.
- [x] Add Supabase client with React Native session persistence.
- [x] Add auth provider and role guards.
- [x] Add vendor phone-style login mapping.
- [x] Add profile edit, avatar upload, student-card upload, and admin approve/reject hooks.
- [x] Apply migrations to Supabase cloud/staging.
- [x] Apply seed SQL to Supabase cloud/staging.
- [x] Generate typed database types after migrations are applied.
- [x] Verify Prompt 2 backend foundation proof.
- [x] Verify Prompt 2.5 Supabase cloud migration status.
- [x] Confirm `.env` has required public Supabase keys without committing values.
- [x] Stabilize seed SQL for later staging/demo application.
- [x] Verify Prompt 2.6 seed/auth readiness checks.
- [x] Add service-role-only script to repair or recreate demo Auth accounts through Supabase Auth Admin API.
- [x] Run `npm run demo:auth` with local `SUPABASE_SERVICE_ROLE_KEY`.
- [x] Verify demo admin/student/vendor Auth accounts through `npm run demo:auth`.
- [ ] Verify student/admin/vendor login and role routing on a real Android device during demo QA.

## Phase 3: Core Student Flows

- [x] Auth and onboarding compatibility maintained.
- [x] Manual student verification upload/status remains available from profile.
- [x] Home screen with quick menu.
- [x] Ride Together list/create/edit/delete, filters, Maps action, match request, safety note, and completion reputation event.
- [x] Marketplace list/create/edit/delete, filters, post types, image upload, chat shortcut, completion confirmation, and reputation event.
- [x] Lost and Found list/create/edit/delete, filters, smart search, saved searches, privacy workflow, and returned item flow.
- [x] Student chat inbox/detail, text/image sending, quick messages, report/block, and phone request consent UI.
- [x] Student profile details, reputation explanation, badges, dates, and completed activity stats.
- [x] Verify Prompt 3 proof/check commands.
- [ ] Real Android device smoke test for Prompt 3 student flows.

## Phase 4: Safety And Communication

- [x] Basic chat conversations and messages for student demo.
- [x] Context-aware quick messages for student demo.
- [x] Phone request consent UI for student demo.
- [x] Basic report flow from chat.
- [x] Basic block action from chat.
- [x] Admin review queues.

## Phase 5: Vendor And Services

- [x] Food and Deals list/detail.
- [x] Vendor profile.
- [x] Menu image upload.
- [x] Manual menu editing.
- [x] Favorite vendors.
- [x] Student services.

## Phase 6: Demo Data And Polish

- [x] Full demo seed data.
- [x] Community alerts.
- [x] Campus Quick Links.
- [x] Reputation score and badges.
- [x] Friendly empty states.
- [ ] Vietnamese copy polish.
- [ ] Android device QA.

## Phase 7: Release Readiness

- [ ] EAS Build setup.
- [ ] Preview APK build.
- [ ] Production AAB profile.
- [ ] Demo guide completion.
- [ ] Known limitations review.
- [ ] Customer demo rehearsal.
