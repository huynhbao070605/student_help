insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('student-cards', 'student-cards', false),
  ('marketplace-images', 'marketplace-images', true),
  ('lost-found-images', 'lost-found-images', false),
  ('chat-images', 'chat-images', false),
  ('vendor-images', 'vendor-images', true),
  ('menu-images', 'menu-images', true),
  ('service-images', 'service-images', true)
on conflict (id) do update set public = excluded.public;

create policy "avatar images are readable" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "users upload own avatar folder" on storage.objects
  for insert with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users update own avatar folder" on storage.objects
  for update using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "student cards private to owner and admin" on storage.objects
  for select using (
    bucket_id = 'student-cards'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );
create policy "students upload own card folder" on storage.objects
  for insert with check (bucket_id = 'student-cards' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "students update own card folder" on storage.objects
  for update using (bucket_id = 'student-cards' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "marketplace images readable" on storage.objects
  for select using (bucket_id = 'marketplace-images');
create policy "users upload own marketplace folder" on storage.objects
  for insert with check (bucket_id = 'marketplace-images' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "lost found images private until app policy allows signed access" on storage.objects
  for select using (
    bucket_id = 'lost-found-images'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );
create policy "users upload own lost found folder" on storage.objects
  for insert with check (bucket_id = 'lost-found-images' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "chat images visible to participants by path conversation id" on storage.objects
  for select using (
    bucket_id = 'chat-images'
    and (
      public.is_admin()
      or public.is_conversation_participant(((storage.foldername(name))[1])::uuid)
    )
  );
create policy "participants upload chat images" on storage.objects
  for insert with check (
    bucket_id = 'chat-images'
    and public.is_conversation_participant(((storage.foldername(name))[1])::uuid)
  );

create policy "vendor images readable" on storage.objects
  for select using (bucket_id = 'vendor-images');
create policy "vendors upload own vendor images" on storage.objects
  for insert with check (bucket_id = 'vendor-images' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

create policy "menu images readable" on storage.objects
  for select using (bucket_id = 'menu-images');
create policy "vendors upload own menu images" on storage.objects
  for insert with check (bucket_id = 'menu-images' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

create policy "service images readable" on storage.objects
  for select using (bucket_id = 'service-images');
create policy "users upload own service images" on storage.objects
  for insert with check (bucket_id = 'service-images' and (storage.foldername(name))[1] = auth.uid()::text);

