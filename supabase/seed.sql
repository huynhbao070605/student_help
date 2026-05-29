-- Demo seed for Student Help.
-- Recommended for staging/demo only. Do not run against production user data.
-- This file intentionally seeds public reference/demo support data only.
--
-- Do not create Supabase Auth users by inserting into auth.users/auth.identities
-- from this file. Hosted Supabase Auth owns that schema and direct inserts can
-- create accounts that fail login with "Database error querying schema".
-- Create or repair demo login accounts with:
--
--   node scripts/create-demo-auth-users.mjs
--
-- That script uses SUPABASE_SERVICE_ROLE_KEY from the local environment only.

insert into public.universities (id, name, short_name, campus)
values
  ('10000000-0000-0000-0000-000000000001', 'Dai hoc Quoc gia TP.HCM', 'VNU-HCM', 'Lang Dai hoc'),
  ('10000000-0000-0000-0000-000000000002', 'Dai hoc Bach Khoa - DHQG HCM', 'HCMUT', 'Di An'),
  ('10000000-0000-0000-0000-000000000003', 'Dai hoc Khoa hoc Tu nhien - DHQG HCM', 'HCMUS', 'Lang Dai hoc'),
  ('10000000-0000-0000-0000-000000000004', 'Dai hoc Cong nghe Thong tin - DHQG HCM', 'UIT', 'Lang Dai hoc')
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  campus = excluded.campus,
  is_active = true;

insert into public.housing_areas (id, name, area, notes)
values
  ('11000000-0000-0000-0000-000000000001', 'KTX Khu A', 'Lang Dai hoc', 'Gan nhieu tuyen bus'),
  ('11000000-0000-0000-0000-000000000002', 'KTX Khu B', 'Lang Dai hoc', 'Khu dong sinh vien'),
  ('11000000-0000-0000-0000-000000000003', 'Di An Center', 'Di An', 'Nhieu quan an va dich vu'),
  ('11000000-0000-0000-0000-000000000004', 'Linh Trung', 'Thu Duc', 'Gan truc Pham Van Dong')
on conflict (id) do update set
  name = excluded.name,
  area = excluded.area,
  notes = excluded.notes,
  is_active = true;

insert into public.app_settings (key, value, description)
values
  ('demo_backend_preference', '{"preferred":"supabase_cloud_staging","reason":"real Android phones may not reach laptop localhost reliably","local_supported":true}'::jsonb, 'Backend target preference for customer demos'),
  ('student_card_ai_policy', '{"ai_can_approve":false,"review":"manual_admin_only"}'::jsonb, 'Student card verification policy'),
  ('lost_found_ocr_risk', '{"auto_pass":[0,10],"admin_review":[11,59],"strong_evidence_reject":[60,100],"ambiguous_goes_to_admin":true}'::jsonb, 'Lost and Found OCR risk thresholds')
on conflict (key) do update set value = excluded.value, description = excluded.description, updated_at = now();

insert into public.quick_messages (key, role, context, label, body, sort_order)
values
  ('ask_available', 'student', 'marketplace', 'Con khong a?', 'Ban oi mon nay con khong a?', 1),
  ('ask_pickup', 'student', 'marketplace', 'Hen lay o dau?', 'Minh co the hen lay o dau cho tien a?', 2),
  ('food_order', 'student', 'food_order', 'Dat mon', 'Cho em dat mon nay, em nhan o cong KTX duoc khong a?', 3),
  ('phone_request', 'student', 'general', 'Xin SDT', 'Ban co the chia se so dien thoai neu thay tien khong a?', 4),
  ('vendor_reply', 'vendor', 'food_order', 'Quan xac nhan', 'Quan nhan tin roi a, ban cho quan thoi gian nhan mon nha.', 5)
on conflict (key) do update set
  body = excluded.body,
  label = excluded.label,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.badges (key, label, description, icon)
values
  ('verified_student', 'Sinh vien da xac minh', 'Da duoc admin duyet the sinh vien thu cong', 'shield-checkmark'),
  ('helpful_friend', 'Ban hoc co tam', 'Hay giup ban khac tim do hoac di chung', 'heart'),
  ('deal_hunter', 'San deal sinh vien', 'Hay luu quan va deal huu ich', 'star')
on conflict (key) do update set
  label = excluded.label,
  description = excluded.description,
  icon = excluded.icon;
