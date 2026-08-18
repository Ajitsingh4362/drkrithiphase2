-- Run this once in Supabase Dashboard → SQL Editor
-- Creates the `doctors` table used for the "Doctor's Team" section

create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  qualification text,
  designation text,
  bio text,
  photo_url text,
  visible boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

-- Allow the app (using the anon key) to read/write, same as other tables like testimonials
alter table doctors enable row level security;

create policy "Public can read visible doctors" on doctors
  for select using (true);

create policy "Anyone with anon key can insert doctors" on doctors
  for insert with check (true);

create policy "Anyone with anon key can update doctors" on doctors
  for update using (true);

create policy "Anyone with anon key can delete doctors" on doctors
  for delete using (true);
