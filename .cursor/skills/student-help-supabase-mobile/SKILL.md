# Student Help Supabase Mobile

Use this skill for schema, RLS, storage, auth, realtime, and seed work.

## Required Context

Before coding, read:

- `docs/DECISIONS.md`
- `docs/MOBILE_TECHNICAL_SPEC.md`
- `docs/PRD.md`
- `.cursor/rules/040-supabase-security.mdc`

## Workflow

1. Define tables with clear ownership columns.
2. Add enums or constrained text values for roles, statuses, and listing types.
3. Enable RLS on every app table.
4. Write policies for student, admin, and vendor access.
5. Keep student verification documents private to owner/admin.
6. Keep phone numbers private until approved consent.
7. Keep vendor management scoped to the vendor owner.
8. Configure storage buckets and policies with the same privacy model.
9. Add seed data that is fake, connected, and useful for demo.
10. Test policies with representative student, vendor, and admin users.
11. Update docs and journal after changes.

## Realtime Rules

- Use Realtime primarily for chat.
- Subscribe only to conversations the user participates in.
- Avoid broad realtime subscriptions.
- RLS must remain the security boundary.

