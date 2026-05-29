# Student Help PRD

## Overview

Student Help is an Android-first mobile app for students around VNU-HCM, Thu Duc, and Di An. It helps students verify identity, find commute partners, exchange study items, search Lost and Found, chat safely, discover food deals and student services, and build trust through reputation and badges.

The app must be demo-ready, friendly, smooth, cute, Vietnamese, pastel, and mobile-first. The demo must feel populated with realistic fake data.

## Target Users

- Student: primary user. Uses marketplace, rides, Lost and Found, chat, food deals, services, quick links, alerts, reputation, and badges.
- Admin: reviews student verification, privacy-sensitive Lost and Found posts, reports, blocks, vendors, and seed content.
- Vendor: restaurant owner, drink shop, printing shop, laundry, bike repair, laptop repair, or student service owner.

## Platform

- Android-first mobile app.
- Built with Expo React Native.
- Future iOS compatibility is preferred.
- Admin/vendor experiences should be usable on mobile, but student experience is the main priority.
- Prepared for Android APK/AAB builds through EAS Build.

## Core Requirements

### Authentication And Roles

- Support student, admin, and vendor roles.
- Students sign in and complete profile setup.
- Vendors are created by admin using phone-style login and seed password.
- Role-gated navigation and permissions must be enforced in the UI and Supabase RLS.

### Manual Student Verification

- Student uploads student card images and supporting information.
- Verification is manual admin review only.
- AI must never approve student cards.
- Admin can approve, reject, or request resubmission.
- Vendor cannot see student verification documents.
- Verification status affects trust indicators and access to sensitive actions if needed.

### Ride Together

- Students can create and browse commute posts.
- Support origin, destination, campus, date/time, schedule pattern, transport type, seats/companions, notes, and safety preferences.
- No realtime GPS.
- Major list screen must include filters for campus, route, time, transport type, and status.
- Students can chat from a ride post.

### Marketplace

- Students can buy, sell, exchange, free-give, borrow, and lend study items.
- Listings include title, description, category, condition, price or exchange terms, location, images, status, and owner.
- Filters: category, listing type, price/free, condition, campus/location, and status.
- Chat is used for negotiation.

### Lost And Found

- Students can post lost or found items with image, description, location, time, category, and contact preference.
- Includes OCR/AI privacy check for images.
- AI is optional and the app must work without an AI API key.
- If no AI API is available, use OCR plus rule-based scoring.
- OCR risk logic:
  - 0-10%: auto pass.
  - 11-59%: admin review.
  - 60-100%: auto reject only if evidence is strong.
  - Ambiguous OCR must go to admin review, not auto reject.
- Potential privacy risks include visible phone numbers, student card numbers, national IDs, bank information, addresses, and private documents.
- Filters: lost/found, category, campus/location, date, status, and privacy review state.

### Lost And Found Smart Search

- Search Lost and Found by title, description, category, location, date range, color, brand, and item clues.
- Smart matching can be simple keyword/tag matching first.
- AI-assisted matching is optional.

### Lost And Found Saved Search

- Students can save search criteria.
- Saved searches should be easy to revisit.
- Future notification support may be added, but demo can show saved search management without push notifications.

### Chat

- Students can chat with students and vendors.
- Chat supports text and quick messages.
- Chat can be linked to ride posts, marketplace listings, Lost and Found posts, vendors, or food orders.
- Supabase Realtime should power live chat where practical.
- Chat history should be cached enough for smooth demo use.

### Phone Request Consent

- Phone numbers are private by default.
- Student or vendor may request phone visibility.
- Phone is revealed only after the owner approves the request.
- Vendor cannot see student phone unless approved.
- UI must clearly show pending, approved, and rejected states.

### Food And Deals

- Students can browse food vendors and deals.
- Include fake nearby restaurants for demo.
- No payment.
- No real order management.
- No delivery tracking.
- Food ordering is manual through chat.
- Vendor pages include shop info, menu, images, favorite action, and chat action.
- Filters: category, distance/demo area, price range, deal type, open status, and favorites.

### Vendor Menu

- Vendors can upload menu images.
- Vendors can manually edit menu items with name, price, description, image, availability, and category.
- Vendor can manage only own shop, menu, and posts.

### Favorite Vendors

- Students can favorite vendors.
- Favorite vendors should appear in a dedicated filter or section.

### Student Services

- Students can discover services such as printing, laundry, bike repair, laptop repair, tutoring, and campus support.
- Filters: service type, location, price range, open status, and rating/trust.
- Contact happens through chat.

### Quick Menu And Quick Messages

- Quick menu gives fast access to common app actions.
- Quick messages provide reusable Vietnamese-friendly chat phrases for bargaining, pickup, ordering food, and asking availability.

### Community Alerts

- Show alerts relevant to students around campus, Thu Duc, and Di An.
- Examples: traffic, weather, campus notices, scams, lost item trends, and safety reminders.
- Admin can seed and manage alerts.

### Campus Quick Links

- Provide useful quick links such as campus maps, library, academic portals, bus routes, student office, emergency contacts, and university pages.
- Open external links with Expo Linking.

### Reputation Score And Badges

- Students and vendors can build reputation through completed interactions, verified status, helpful posts, positive feedback, and report history.
- Show reputation score and badges in profiles and cards.
- Badges should be friendly and student-themed.

### Report And Block

- Users can report posts, chats, vendors, or students.
- Users can block other users.
- Admin can review reports and take action.
- Blocked users should not be able to initiate chat with the blocker.

## Demo Seed Data

All important screens must have realistic fake data. Demo data must include:

- Student accounts with varied verification states.
- Admin account.
- Vendor accounts for restaurants, drink shops, printing, laundry, bike repair, laptop repair, and student services.
- Ride Together posts across VNU-HCM, Thu Duc, and Di An.
- Marketplace listings across sell, exchange, free, borrow, and lend.
- Lost and Found posts with privacy check states.
- Saved Lost and Found searches.
- Chats across student-student and student-vendor scenarios.
- Phone request examples in pending, approved, and rejected states.
- Food deals, vendor menus, menu images, and favorite vendors.
- Student services.
- Community alerts.
- Campus Quick Links.
- Reputation scores and badges.
- Reports and blocked-user examples.

No real private information is allowed in seed data.

## Android Release Readiness

- Configure app icon, splash screen, Android package name, permissions, app version, and EAS project metadata.
- Avoid unnecessary Android permissions.
- Prepare APK/AAB build instructions.
- Demo must be stable on Android device and emulator.

