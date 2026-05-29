# AGENTS.md

## Project Goal

Student Help is an Android-first, mobile-first app for students around VNU-HCM, Thu Duc, and Di An. The goal is to build a cute, friendly, smooth, demo-ready, and market-ready mobile product that helps students verify identity, commute together, trade study items, search Lost and Found, chat safely, discover food and student services, use campus links, and build reputation.

## Stack

- Expo React Native
- TypeScript
- Expo Router
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase Realtime
- NativeWind or another lightweight React Native styling solution
- TanStack Query or a simple clean data fetching layer
- Zustand only if lightweight shared client state is useful
- Expo Image Picker
- Expo Linking for Google Maps
- EAS Build for Android APK/AAB
- pnpm preferred

## Core Principles

- Android-first.
- Mobile-first.
- Student experience is the top priority.
- Admin and vendor flows should still be usable on mobile.
- Never make the app feel like a desktop web page squeezed into mobile.
- Keep the UI cute, warm, pastel, Vietnamese, and student-friendly.
- Demo screens must not feel empty.

## Non-Negotiable Decisions

Follow `docs/DECISIONS.md` as the source of truth:

1. Student card verification is manual admin review only.
2. AI must not approve student cards.
3. No realtime GPS.
4. No payment.
5. No real order management.
6. No delivery tracking.
7. Food ordering is manual through chat.
8. AI features are optional.
9. App must work without an AI API key.
10. If no AI API is available for Lost and Found privacy checks, use OCR plus rule-based scoring.
11. OCR risk logic:
   - 0-10%: auto pass.
   - 11-59%: admin review.
   - 60-100%: auto reject only if evidence is strong.
   - Ambiguous OCR must go to admin review, not auto reject.
12. All major list screens need filters.
13. All important screens must have demo seed data.
14. Phone number is private and only revealed after an approved contact request.
15. Vendor cannot see student phone unless approved.
16. Vendor cannot see student verification documents.
17. Admin creates vendor accounts using phone-style login and a seed password.
18. UI must be cute, warm, pastel, Vietnamese, and student-friendly.
19. App must feel like a real mobile app, not a web page squeezed into mobile.
20. Demo must not feel empty.

## Required Context Before Coding

Always read `docs/CONTEXT_BOOTSTRAP.md` before coding.

Before implementation work, also read the files it lists:

- `docs/PRD.md`
- `docs/MOBILE_TECHNICAL_SPEC.md`
- `docs/DECISIONS.md`
- `docs/CURRENT_STATE.md`
- `docs/TODO.md`
- latest entries in `docs/BUILD_JOURNAL.md`
- relevant `.cursor/rules`
- relevant `.cursor/skills`

## Scope Discipline

- Never implement outside the current prompt scope.
- Do not build app features when the prompt asks only for docs, planning, rules, memory, or verification.
- Preserve user changes. Do not revert unrelated work.

## Required Updates After Every Prompt

After every prompt, update:

- `docs/CURRENT_STATE.md`
- `docs/TODO.md`
- `docs/BUILD_JOURNAL.md`

`docs/BUILD_JOURNAL.md` is append-only.

## Checks Before Stopping After Implementation

Always run what is configured and relevant:

- typecheck
- lint, if configured
- tests, if configured
- Expo start check, if possible

Report exact commands and results. If a check is not available because the app has not been scaffolded or scripts are missing, say that explicitly.

