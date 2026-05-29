# Student Help Mobile QA

Use this skill for QA, Android testing, and release checks.

## Required Context

Before QA, read:

- `docs/MOBILE_TECHNICAL_SPEC.md`
- `docs/DEMO_GUIDE.md`
- `docs/CURRENT_STATE.md`
- `.cursor/rules/050-testing-debugging.mdc`
- `.cursor/rules/070-android-release-readiness.mdc`

## Workflow

1. Run configured typecheck.
2. Run configured lint.
3. Run configured tests.
4. Run Expo start check when practical.
5. Test Android emulator or Android device when available.
6. Verify navigation, loading states, forms, filters, and role boundaries.
7. Verify no unnecessary Android permissions were added.
8. For release readiness, verify EAS profiles for preview APK and production AAB.
9. Record exact commands and results in `docs/BUILD_JOURNAL.md`.
10. Update `docs/CURRENT_STATE.md` with last successful checks and known issues.

## Mobile QA Focus

- Touch targets are large enough.
- Text does not overflow on small Android screens.
- Lists scroll smoothly.
- Empty states are friendly.
- Demo data appears on important screens.
- Sensitive data is not exposed across roles.

