alter table public.universities enable row level security;
alter table public.housing_areas enable row level security;
alter table public.profiles enable row level security;
alter table public.student_verifications enable row level security;
alter table public.ride_posts enable row level security;
alter table public.marketplace_posts enable row level security;
alter table public.lost_found_posts enable row level security;
alter table public.lost_found_saved_searches enable row level security;
alter table public.lost_found_search_logs enable row level security;
alter table public.vendors enable row level security;
alter table public.vendor_menu_items enable row level security;
alter table public.vendor_menu_images enable row level security;
alter table public.vendor_posts enable row level security;
alter table public.vendor_distance_seed enable row level security;
alter table public.favorite_vendors enable row level security;
alter table public.saved_menu_items enable row level security;
alter table public.services enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.contact_requests enable row level security;
alter table public.phone_share_audit_logs enable row level security;
alter table public.matches enable row level security;
alter table public.reports enable row level security;
alter table public.blocks enable row level security;
alter table public.reputation_events enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.community_alerts enable row level security;
alter table public.campus_quick_links enable row level security;
alter table public.quick_messages enable row level security;
alter table public.app_settings enable row level security;

create policy "reference data is readable" on public.universities for select using (is_active or public.is_admin());
create policy "admins manage universities" on public.universities for all using (public.is_admin()) with check (public.is_admin());
create policy "housing areas are readable" on public.housing_areas for select using (is_active or public.is_admin());
create policy "admins manage housing areas" on public.housing_areas for all using (public.is_admin()) with check (public.is_admin());

create policy "profiles readable only to self or admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "users update own non-role profile" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());
create policy "admins manage all profiles" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

create policy "students create own verification" on public.student_verifications
  for insert with check (student_id = auth.uid());
create policy "students read own verification" on public.student_verifications
  for select using (student_id = auth.uid() or public.is_admin());
create policy "students update own pending verification" on public.student_verifications
  for update using (student_id = auth.uid() and status in ('pending', 'rejected', 'resubmit_requested'))
  with check (student_id = auth.uid());
create policy "admins manage verifications" on public.student_verifications
  for all using (public.is_admin()) with check (public.is_admin());

create policy "active rides readable" on public.ride_posts for select using (status = 'active' or owner_id = auth.uid() or public.is_admin());
create policy "students manage own rides" on public.ride_posts for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "admins manage rides" on public.ride_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "active marketplace readable" on public.marketplace_posts for select using (status = 'active' or owner_id = auth.uid() or public.is_admin());
create policy "students manage own marketplace" on public.marketplace_posts for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "admins manage marketplace" on public.marketplace_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "safe lost found readable" on public.lost_found_posts
  for select using (
    owner_id = auth.uid()
    or public.is_admin()
    or (status = 'active' and privacy_review_status in ('auto_pass', 'approved'))
  );
create policy "students manage own lost found" on public.lost_found_posts for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "admins manage lost found" on public.lost_found_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "students manage own saved searches" on public.lost_found_saved_searches for all using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy "admins read saved searches" on public.lost_found_saved_searches for select using (public.is_admin());
create policy "students create own search logs" on public.lost_found_search_logs for insert with check (student_id = auth.uid() or student_id is null);
create policy "users read own search logs" on public.lost_found_search_logs for select using (student_id = auth.uid() or public.is_admin());

create policy "active vendors readable" on public.vendors for select using (is_active or owner_id = auth.uid() or public.is_admin());
create policy "vendors manage own vendor profile" on public.vendors for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "admins manage vendors" on public.vendors for all using (public.is_admin()) with check (public.is_admin());

create policy "menu items readable" on public.vendor_menu_items
  for select using (exists (select 1 from public.vendors v where v.id = vendor_id and (v.is_active or v.owner_id = auth.uid() or public.is_admin())));
create policy "vendors manage own menu items" on public.vendor_menu_items for all using (public.owns_vendor(vendor_id)) with check (public.owns_vendor(vendor_id));
create policy "admins manage menu items" on public.vendor_menu_items for all using (public.is_admin()) with check (public.is_admin());

create policy "menu images readable" on public.vendor_menu_images
  for select using (exists (select 1 from public.vendors v where v.id = vendor_id and (v.is_active or v.owner_id = auth.uid() or public.is_admin())));
create policy "vendors manage own menu images" on public.vendor_menu_images for all using (public.owns_vendor(vendor_id)) with check (public.owns_vendor(vendor_id));
create policy "admins manage menu images" on public.vendor_menu_images for all using (public.is_admin()) with check (public.is_admin());

create policy "active vendor posts readable" on public.vendor_posts
  for select using (status = 'active' or public.owns_vendor(vendor_id) or public.is_admin());
create policy "vendors manage own vendor posts" on public.vendor_posts for all using (public.owns_vendor(vendor_id)) with check (public.owns_vendor(vendor_id));
create policy "admins manage vendor posts" on public.vendor_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "vendor distance readable" on public.vendor_distance_seed for select using (true);
create policy "vendors manage own distance seed" on public.vendor_distance_seed for all using (public.owns_vendor(vendor_id)) with check (public.owns_vendor(vendor_id));
create policy "admins manage vendor distance seed" on public.vendor_distance_seed for all using (public.is_admin()) with check (public.is_admin());

create policy "students manage own favorite vendors" on public.favorite_vendors for all using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy "students manage own saved menu items" on public.saved_menu_items for all using (student_id = auth.uid()) with check (student_id = auth.uid());

create policy "active services readable" on public.services for select using (status = 'active' or owner_id = auth.uid() or public.is_admin());
create policy "owners manage own services" on public.services for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "participants read conversations" on public.conversations
  for select using (public.is_admin() or public.is_conversation_participant(id));
create policy "authenticated users create conversations" on public.conversations
  for insert with check (auth.uid() is not null and created_by = auth.uid());
create policy "participants update conversations" on public.conversations
  for update using (public.is_conversation_participant(id) or public.is_admin());

create policy "participants read participants" on public.conversation_participants
  for select using (public.is_admin() or public.is_conversation_participant(conversation_id));
create policy "participants insert self" on public.conversation_participants
  for insert with check (user_id = auth.uid() or public.is_admin());
create policy "participants update own read state" on public.conversation_participants
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "participants read messages" on public.messages
  for select using (public.is_admin() or public.is_conversation_participant(conversation_id));
create policy "participants send messages" on public.messages
  for insert with check (sender_id = auth.uid() and public.is_conversation_participant(conversation_id));

create policy "contact request participants read" on public.contact_requests
  for select using (requester_id = auth.uid() or target_id = auth.uid() or public.is_admin());
create policy "users create own contact requests" on public.contact_requests
  for insert with check (requester_id = auth.uid());
create policy "target responds to contact requests" on public.contact_requests
  for update using (target_id = auth.uid() or public.is_admin())
  with check (target_id = auth.uid() or public.is_admin());

create policy "phone audit own or admin" on public.phone_share_audit_logs
  for select using (viewer_id = auth.uid() or phone_owner_id = auth.uid() or public.is_admin());
create policy "users insert phone audit when involved" on public.phone_share_audit_logs
  for insert with check (viewer_id = auth.uid() or public.is_admin());

create policy "matches readable to admins" on public.matches for select using (public.is_admin());
create policy "admins manage matches" on public.matches for all using (public.is_admin()) with check (public.is_admin());

create policy "reporter and admin read reports" on public.reports
  for select using (reporter_id = auth.uid() or public.is_admin());
create policy "users create reports" on public.reports
  for insert with check (reporter_id = auth.uid());
create policy "admins manage reports" on public.reports for all using (public.is_admin()) with check (public.is_admin());

create policy "users manage own blocks" on public.blocks for all using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy "admins read blocks" on public.blocks for select using (public.is_admin());

create policy "own reputation readable" on public.reputation_events for select using (user_id = auth.uid() or public.is_admin());
create policy "admins manage reputation" on public.reputation_events for all using (public.is_admin()) with check (public.is_admin());

create policy "badges readable" on public.badges for select using (true);
create policy "admins manage badges" on public.badges for all using (public.is_admin()) with check (public.is_admin());
create policy "user badges readable" on public.user_badges for select using (true);
create policy "admins manage user badges" on public.user_badges for all using (public.is_admin()) with check (public.is_admin());

create policy "active alerts readable" on public.community_alerts for select using (is_active or public.is_admin());
create policy "admins manage alerts" on public.community_alerts for all using (public.is_admin()) with check (public.is_admin());

create policy "active quick links readable" on public.campus_quick_links for select using (is_active or public.is_admin());
create policy "admins manage quick links" on public.campus_quick_links for all using (public.is_admin()) with check (public.is_admin());

create policy "active quick messages readable" on public.quick_messages for select using (is_active or public.is_admin());
create policy "admins manage quick messages" on public.quick_messages for all using (public.is_admin()) with check (public.is_admin());

create policy "app settings readable" on public.app_settings for select using (true);
create policy "admins manage app settings" on public.app_settings for all using (public.is_admin()) with check (public.is_admin());
