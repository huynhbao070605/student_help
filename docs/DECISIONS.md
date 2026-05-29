# Student Help Decisions

This file is the source of truth for non-negotiable product and technical decisions.

## Product Decisions

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

## Platform Decisions

- Android-first mobile app.
- Future iOS compatibility is preferred, but Android is the priority.
- Student experience is the main priority.
- Admin and vendor flows may be mobile-friendly app screens.

## Stack Decisions

- Expo React Native.
- TypeScript.
- Expo Router.
- Supabase Auth, Postgres, Storage, and Realtime.
- NativeWind or another lightweight React Native styling solution.
- TanStack Query or a simple clean data fetching layer.
- Zustand only if shared client state is useful.
- Expo Image Picker.
- Expo Linking for Google Maps.
- EAS Build for Android APK/AAB.
- Package manager: pnpm is preferred. If pnpm is unavailable, document the npm fallback before using it.

