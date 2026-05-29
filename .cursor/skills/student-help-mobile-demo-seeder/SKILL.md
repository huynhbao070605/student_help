# Student Help Mobile Demo Seeder

Use this skill when creating or updating demo seed data.

## Required Context

Before seeding, read:

- `docs/PRD.md`
- `docs/DECISIONS.md`
- `docs/TODO.md`
- `.cursor/rules/060-demo-seed-data.mdc`

## Workflow

1. Make seed data realistic, fake, and connected across modules.
2. Include accounts for student, admin, and vendor roles.
3. Include multiple student verification states.
4. Include Ride Together, Marketplace, Lost and Found, chats, phone requests, vendors, menus, favorites, services, alerts, quick links, badges, reports, and blocks.
5. Include fake nearby restaurants around VNU-HCM, Thu Duc, and Di An.
6. Include Lost and Found privacy check examples for auto pass, admin review, and strong-evidence reject.
7. Ensure important list screens do not look empty.
8. Keep seed scripts deterministic and resettable.
9. Never use real private information.
10. Update demo account placeholders in `docs/DEMO_GUIDE.md` when accounts exist.

## Quality Bar

- Demo data should support a 7-minute customer demo without awkward gaps.
- Data should be coherent: chats reference real seeded posts/vendors, favorites reference real vendors, reports reference real seeded content.

