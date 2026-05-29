# Demo Guide

## Run App

```bash
npm install
npm start
```

Use Expo Go on Android or an Android emulator. For cloud demo data, keep `.env` pointed at the linked Supabase project.

## Demo Accounts

Run public seed first, then repair Auth users:

```bash
npx supabase db query --linked --file supabase/seed.sql
npm run demo:auth
```

Accounts verified by Prompt 4:

- Admin: `admin@studenthelp.local` / `admin123456`
- Main verified student: `minhanh@studenthelp.local` / `student123456`
- Pending student: `quanghuy@studenthelp.local` / `student123456`
- Vendor: `0900000001` / `vendor123456`
- Vendor: `0900000002` / `vendor123456`
- Vendor: `0900000003` / `vendor123456`

Vendor phone login maps to `{phone}@vendor.studenthelp.local` internally. Extra demo vendors `0900000004`, `0900000005`, and `0900000006` also use `vendor123456`.

## Exact Demo Data

- 12 student Auth accounts plus 1 admin and 6 vendor Auth accounts.
- 6 food vendors with opening status, tags, fake distances, menu images, structured menu items, item availability, item tags, and item options.
- 15 ride posts, 25 marketplace/borrow/lend posts, 30 Lost and Found posts, saved searches, 12 conversations, phone request states, reports, blocks, reputation and badges.
- Services directory data for printing, laundry, bike repair, laptop repair, tutoring, and campus support.
- Community alerts and Campus Quick Links seeded in SQL and mirrored in app demo data.
- Search demos: `ví nâu gần KTX B`, `tai nghe trắng thư viện`, `thẻ sinh viên UIT`, `bình nước xanh`.

## 7-Minute Customer Demo

1. Sign in as `minhanh@studenthelp.local` and show home: verification, reputation, active alerts, food preview, rides, chats, and quick links.
2. Open Ride Together and show filters, map-safe meeting notes, and no realtime GPS.
3. Open Lost and Found and search the four demo phrases; point out OCR/privacy states and manual admin review for ambiguous sensitive content.
4. Open Food & Deals, filter nearby/open/favorites, view vendor profile, menu image, structured menu, save vendor/item, and quick order through chat.
5. Open Services and show category/area/open/discount/admin-verified filters.
6. Switch to vendor `0900000001`, edit shop status/profile, upload menu image, edit menu items, and create vendor posts.
7. Switch to admin, show overview stats, manual verification queue, vendor creation/reset/suspend, reports/blocks, AI/OCR settings, alerts, quick links, and services CRUD.

## Known Limitations

- Food ordering is chat-only by design: no payment, no order management, no delivery tracking.
- OCR remains Expo-safe rule-based demo logic; no native OCR module was added.
- Some Prompt 4 metadata is app-level demo data because the Prompt 2 schema is intentionally lean.
- Real Android device QA is still recommended before a customer rehearsal.
