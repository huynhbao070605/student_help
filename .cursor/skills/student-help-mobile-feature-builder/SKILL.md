# Student Help Mobile Feature Builder

Use this skill when building or changing Student Help mobile app features.

## Required Context

Before coding, read:

- `docs/PRD.md`
- `docs/MOBILE_TECHNICAL_SPEC.md`
- `docs/DECISIONS.md`
- `docs/CURRENT_STATE.md`
- `docs/TODO.md`
- latest entries in `docs/BUILD_JOURNAL.md`
- relevant `.cursor/rules`

## Workflow

1. Confirm the requested feature scope.
2. Check `docs/DECISIONS.md` for constraints.
3. Identify affected role flows: student, admin, vendor.
4. Design the mobile-first screen flow before writing code.
5. Add or update typed data models and API helpers before UI if backend data is involved.
6. Build small, focused screens/components.
7. Include filters for major list screens.
8. Include loading, empty, error, pending, approved, rejected, and blocked states where relevant.
9. Add demo seed data requirements if the feature creates a new important screen.
10. Run configured checks.
11. Update `docs/CURRENT_STATE.md`, `docs/TODO.md`, and append `docs/BUILD_JOURNAL.md`.

## Guardrails

- Do not add realtime GPS.
- Do not add payment.
- Do not add real order management.
- Do not add delivery tracking.
- Do not let AI approve student cards.
- Keep Android performance and touch ergonomics in mind.

