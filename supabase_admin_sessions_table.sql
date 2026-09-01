-- Run this once in Supabase Dashboard → SQL Editor
-- Creates the `admin_sessions` table used for the "Recent Logins" admin section.
-- NOTE: this admin panel uses a single shared password (not per-user Supabase Auth),
-- so unlike a typical auth-based version there is no user_id / auth.users link — this
-- table is just an informational login log, open to anon key like the rest of the app.

create table if not exists admin_sessions (
  id uuid primary key default gen_random_uuid(),
  device_name text,
  browser text,
  os text,
  ip text,
  city text,
  region text,
  country text,
  created_at timestamptz default now(),
  last_seen_at timestamptz default now(),
  revoked boolean default false
);

alter table admin_sessions enable row level security;

create policy "Anyone with anon key can read admin_sessions" on admin_sessions
  for select using (true);

create policy "Anyone with anon key can insert admin_sessions" on admin_sessions
  for insert with check (true);

create policy "Anyone with anon key can update admin_sessions" on admin_sessions
  for update using (true);
