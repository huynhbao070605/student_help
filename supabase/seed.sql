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
  ('deal_hunter', 'San deal sinh vien', 'Hay luu quan va deal huu ich', 'star'),
  ('lost_found_helper', 'Nguoi tra do tot bung', 'Da giup tra do that lac cho ban khac', 'sparkles'),
  ('safe_chatter', 'Chat an toan', 'Ton trong dong y chia se so dien thoai', 'chatbubbles'),
  ('campus_connector', 'Ket noi campus', 'Tich cuc chia se link va dich vu huu ich', 'link')
on conflict (key) do update set
  label = excluded.label,
  description = excluded.description,
  icon = excluded.icon;

insert into public.community_alerts (id, title, body, area, severity, is_active)
values
  ('40000000-0000-0000-0000-000000000001', 'Duong vao KTX B dong sau 17:30', 'Uu tien hen diem ro rang khi di chung. Khong can chia se GPS realtime.', 'KTX B', 'info', true),
  ('40000000-0000-0000-0000-000000000002', 'Che MSSV truoc khi dang Lost and Found', 'Anh co the sinh vien, CCCD, so dien thoai hoac tai khoan ngan hang phai qua kiem tra rieng tu.', 'VNU-HCM', 'warning', true),
  ('40000000-0000-0000-0000-000000000003', 'Canh bao gia danh shipper', 'Khong chuyen khoan trong app. Student Help khong co thanh toan hoac tracking giao hang.', 'Di An', 'urgent', true),
  ('40000000-0000-0000-0000-000000000004', 'Mua lon quanh Linh Trung', 'Mang ao mua, uu tien diem hen co mai che.', 'Thu Duc', 'info', true)
on conflict (id) do update set
  title = excluded.title,
  body = excluded.body,
  area = excluded.area,
  severity = excluded.severity,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.campus_quick_links (id, title, url, category, description, sort_order, is_active)
values
  ('41000000-0000-0000-0000-000000000001', 'Ban do VNU-HCM', 'https://maps.google.com/?q=VNU-HCM', 'Ban do', 'Mo khu Lang Dai hoc tren Google Maps.', 1, true),
  ('41000000-0000-0000-0000-000000000002', 'Tuyen bus qua KTX', 'https://maps.google.com/?q=bus%20KTX%20Khu%20B', 'Di chuyen', 'Tra nhanh cac tuyen di KTX A/B.', 2, true),
  ('41000000-0000-0000-0000-000000000003', 'Cong thong tin UIT', 'https://www.uit.edu.vn', 'Hoc vu', 'Link demo den trang truong.', 3, true),
  ('41000000-0000-0000-0000-000000000004', 'Thu vien Trung tam', 'https://vnuhcm.edu.vn', 'Hoc vu', 'Gio mo cua va muon tra sach.', 4, true),
  ('41000000-0000-0000-0000-000000000005', 'So khan cap khu KTX', 'tel:0900000999', 'An toan', 'Danh ba demo cho bao ve va y te.', 5, true)
on conflict (id) do update set
  title = excluded.title,
  url = excluded.url,
  category = excluded.category,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.services (id, title, category, description, area, price_hint, status)
values
  ('42000000-0000-0000-0000-000000000001', 'In an KTX B 24h', 'printing', 'In tai lieu, dong gay, scan bai tap.', 'KTX B', '500d/trang', 'active'),
  ('42000000-0000-0000-0000-000000000002', 'Giat say May Sach', 'laundry', 'Nhan giat theo kg, co giao tan noi.', 'Di An', '18k/kg', 'active'),
  ('42000000-0000-0000-0000-000000000003', 'Sua xe Chu Tu', 'bike repair', 'Va xe, thay nhot, cuu ho gan KTX.', 'Lang Dai hoc', 'tu 15k', 'active'),
  ('42000000-0000-0000-0000-000000000004', 'Laptop UIT Care', 'laptop repair', 'Ve sinh laptop, cai phan mem hoc tap.', 'Thu Duc', 'tu 80k', 'active'),
  ('42000000-0000-0000-0000-000000000005', 'Gia su Toan cao cap', 'tutoring', 'Nhom on thi cuoi ky buoi toi.', 'KTX A', '40k/buoi', 'active'),
  ('42000000-0000-0000-0000-000000000006', 'Photo Cong UIT', 'printing', 'In slide, bia kieng, ban but va giay kiem tra.', 'Lang Dai hoc', 'gia sinh vien', 'active')
on conflict (id) do update set
  title = excluded.title,
  category = excluded.category,
  description = excluded.description,
  area = excluded.area,
  price_hint = excluded.price_hint,
  status = excluded.status,
  updated_at = now();
