create extension if not exists pgcrypto;

create type public.app_role as enum ('student', 'admin', 'vendor');
create type public.verification_status as enum ('not_submitted', 'pending', 'approved', 'rejected', 'resubmit_requested');
create type public.post_status as enum ('draft', 'active', 'paused', 'closed', 'removed');
create type public.marketplace_type as enum ('sell', 'exchange', 'free', 'borrow', 'lend');
create type public.lost_found_type as enum ('lost', 'found');
create type public.privacy_review_status as enum ('auto_pass', 'admin_review', 'auto_rejected', 'approved', 'rejected');
create type public.contact_request_status as enum ('pending', 'approved', 'rejected', 'cancelled');
create type public.conversation_context as enum ('general', 'ride', 'marketplace', 'lost_found', 'vendor', 'food_order', 'service');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
create type public.reputation_event_type as enum ('student_verified', 'helpful_post', 'successful_meetup', 'positive_feedback', 'report_penalty', 'admin_adjustment');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  campus text,
  city text default 'Thu Duc',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.housing_areas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area text not null,
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'student',
  display_name text not null,
  email text,
  phone text,
  phone_share_enabled boolean not null default false,
  avatar_path text,
  university_id uuid references public.universities(id),
  housing_area_id uuid references public.housing_areas(id),
  verification_status public.verification_status not null default 'not_submitted',
  reputation_score integer not null default 0,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create table public.student_verifications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  university_id uuid references public.universities(id),
  card_front_path text not null,
  card_back_path text,
  status public.verification_status not null default 'pending',
  submitted_note text,
  admin_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ride_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  origin text not null,
  destination text not null,
  campus text,
  depart_at timestamptz,
  schedule_note text,
  transport_type text,
  seats_available integer default 1,
  safety_note text,
  status public.post_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.marketplace_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  listing_type public.marketplace_type not null,
  title text not null,
  description text,
  category text,
  condition text,
  price_vnd integer,
  exchange_terms text,
  location_text text,
  image_paths text[] not null default '{}',
  status public.post_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lost_found_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  post_type public.lost_found_type not null,
  title text not null,
  description text,
  category text,
  color text,
  brand text,
  location_text text,
  event_at timestamptz,
  image_paths text[] not null default '{}',
  privacy_review_status public.privacy_review_status not null default 'admin_review',
  ocr_risk_score integer check (ocr_risk_score between 0 and 100),
  ocr_evidence text,
  status public.post_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lost_found_saved_searches (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  criteria jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lost_found_search_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) on delete set null,
  query_text text,
  criteria jsonb not null default '{}'::jsonb,
  result_count integer,
  created_at timestamptz not null default now()
);

create table public.vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category text not null,
  description text,
  address_text text,
  area text,
  phone text,
  image_path text,
  is_open boolean not null default true,
  is_active boolean not null default true,
  reputation_score integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vendor_menu_items (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  description text,
  category text,
  price_vnd integer not null default 0,
  image_path text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vendor_menu_images (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  image_path text not null,
  label text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.vendor_posts (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null,
  body text,
  deal_label text,
  image_path text,
  status public.post_status not null default 'active',
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vendor_distance_seed (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  area_name text not null,
  distance_meters integer not null,
  walking_minutes integer,
  created_at timestamptz not null default now(),
  unique (vendor_id, area_name)
);

create table public.favorite_vendors (
  student_id uuid not null references public.profiles(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (student_id, vendor_id)
);

create table public.saved_menu_items (
  student_id uuid not null references public.profiles(id) on delete cascade,
  menu_item_id uuid not null references public.vendor_menu_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (student_id, menu_item_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  category text not null,
  description text,
  area text,
  price_hint text,
  image_path text,
  status public.post_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  context public.conversation_context not null default 'general',
  context_id uuid,
  title text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_read_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  image_path text,
  quick_message_key text,
  created_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  context public.conversation_context not null default 'general',
  context_id uuid,
  status public.contact_request_status not null default 'pending',
  requester_note text,
  response_note text,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> target_id)
);

create table public.phone_share_audit_logs (
  id uuid primary key default gen_random_uuid(),
  contact_request_id uuid references public.contact_requests(id) on delete set null,
  viewer_id uuid not null references public.profiles(id) on delete cascade,
  phone_owner_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  created_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id uuid not null,
  target_type text not null,
  target_id uuid not null,
  score numeric(5,2) not null default 0,
  reason text,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  details text,
  status public.report_status not null default 'open',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  reason text,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create table public.reputation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type public.reputation_event_type not null,
  points integer not null,
  source_type text,
  source_id uuid,
  note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

create table public.user_badges (
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table public.community_alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  area text,
  severity text not null default 'info',
  is_active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campus_quick_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  category text,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.quick_messages (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  role public.app_role,
  context public.conversation_context,
  label text not null,
  body text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.app_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);
create index profiles_verification_status_idx on public.profiles(verification_status);
create index student_verifications_student_idx on public.student_verifications(student_id);
create index vendors_owner_idx on public.vendors(owner_id);
create index conversations_context_idx on public.conversations(context, context_id);
create index messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index contact_requests_pair_idx on public.contact_requests(requester_id, target_id, status);

create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_student_verifications_updated_at before update on public.student_verifications for each row execute function public.set_updated_at();
create trigger set_ride_posts_updated_at before update on public.ride_posts for each row execute function public.set_updated_at();
create trigger set_marketplace_posts_updated_at before update on public.marketplace_posts for each row execute function public.set_updated_at();
create trigger set_lost_found_posts_updated_at before update on public.lost_found_posts for each row execute function public.set_updated_at();
create trigger set_lost_found_saved_searches_updated_at before update on public.lost_found_saved_searches for each row execute function public.set_updated_at();
create trigger set_vendors_updated_at before update on public.vendors for each row execute function public.set_updated_at();
create trigger set_vendor_menu_items_updated_at before update on public.vendor_menu_items for each row execute function public.set_updated_at();
create trigger set_vendor_posts_updated_at before update on public.vendor_posts for each row execute function public.set_updated_at();
create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger set_conversations_updated_at before update on public.conversations for each row execute function public.set_updated_at();
create trigger set_contact_requests_updated_at before update on public.contact_requests for each row execute function public.set_updated_at();
create trigger set_reports_updated_at before update on public.reports for each row execute function public.set_updated_at();
create trigger set_community_alerts_updated_at before update on public.community_alerts for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role public.app_role;
begin
  requested_role := coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'student');

  insert into public.profiles (id, role, display_name, email, phone)
  values (
    new.id,
    requested_role,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1), 'Student Help user'),
    new.email,
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role <> new.role and not public.is_admin() then
    raise exception 'Only admins can change profile roles';
  end if;
  return new;
end;
$$;

create trigger prevent_profile_role_escalation
before update on public.profiles
for each row execute function public.prevent_profile_role_escalation();

create or replace function public.owns_vendor(target_vendor_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.vendors
    where id = target_vendor_id and owner_id = auth.uid()
  );
$$;

create or replace function public.is_conversation_participant(target_conversation_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.conversation_participants
    where conversation_id = target_conversation_id and user_id = auth.uid()
  );
$$;

create or replace function public.can_view_phone(phone_owner uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select auth.uid() = phone_owner
    or public.is_admin()
    or exists (
      select 1 from public.contact_requests
      where status = 'approved'
        and (
          (requester_id = auth.uid() and target_id = phone_owner)
          or (requester_id = phone_owner and target_id = auth.uid())
        )
    );
$$;

create or replace view public.safe_profiles as
select
  p.id,
  p.role,
  p.display_name,
  case when public.can_view_phone(p.id) then p.phone else null end as phone,
  p.phone_share_enabled,
  p.avatar_path,
  p.university_id,
  p.housing_area_id,
  p.verification_status,
  p.reputation_score,
  p.bio,
  p.created_at,
  p.last_active_at
from public.profiles p;

create or replace function public.approve_student_verification(target_verification_id uuid, admin_note_text text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_student uuid;
begin
  if not public.is_admin() then
    raise exception 'Only admins can approve student verifications';
  end if;

  select student_id into target_student
  from public.student_verifications
  where id = target_verification_id;

  update public.student_verifications
  set status = 'approved',
      reviewed_by = auth.uid(),
      reviewed_at = now(),
      admin_note = admin_note_text
  where id = target_verification_id;

  update public.profiles
  set verification_status = 'approved',
      reputation_score = reputation_score + 20
  where id = target_student;

  insert into public.reputation_events (user_id, event_type, points, source_type, source_id, note, created_by)
  values (target_student, 'student_verified', 20, 'student_verification', target_verification_id, 'Manual admin student card approval', auth.uid());
end;
$$;

create or replace function public.reject_student_verification(target_verification_id uuid, admin_note_text text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_student uuid;
begin
  if not public.is_admin() then
    raise exception 'Only admins can reject student verifications';
  end if;

  select student_id into target_student
  from public.student_verifications
  where id = target_verification_id;

  update public.student_verifications
  set status = 'rejected',
      reviewed_by = auth.uid(),
      reviewed_at = now(),
      admin_note = admin_note_text
  where id = target_verification_id;

  update public.profiles
  set verification_status = 'rejected'
  where id = target_student;
end;
$$;
