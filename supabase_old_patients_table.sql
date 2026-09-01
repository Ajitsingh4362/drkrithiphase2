-- Run this once in Supabase Dashboard → SQL Editor
-- Creates the `old_patients` table used for the "Old Patients" admin section
-- (a quick-add register for existing/legacy patients, separate from the full patient profiles)

create table if not exists old_patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  age integer,
  phone text not null,
  created_at timestamp with time zone default now()
);

-- Allow the app (using the anon key) to read/write, same as other tables like patients
alter table old_patients enable row level security;

create policy "Anyone with anon key can read old_patients" on old_patients
  for select using (true);

create policy "Anyone with anon key can insert old_patients" on old_patients
  for insert with check (true);

create policy "Anyone with anon key can update old_patients" on old_patients
  for update using (true);

create policy "Anyone with anon key can delete old_patients" on old_patients
  for delete using (true);
