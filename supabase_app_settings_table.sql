-- Run this once in Supabase Dashboard → SQL Editor
-- Simple key-value settings table. Used first for storing the WhatsApp bridge
-- server URL (so it can be changed from the admin panel without a redeploy),
-- but can hold other app-wide settings later too.

create table if not exists app_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

alter table app_settings enable row level security;

create policy "Anyone with anon key can read app_settings" on app_settings
  for select using (true);

create policy "Anyone with anon key can insert app_settings" on app_settings
  for insert with check (true);

create policy "Anyone with anon key can update app_settings" on app_settings
  for update using (true);

-- Once you've deployed your Baileys WhatsApp bridge on Render, set its URL here
-- (or just do it from the WhatsApp tab in the admin panel once that's wired up):
-- insert into app_settings (key, value) values ('whatsapp_notifier_url', 'https://your-service.onrender.com')
--   on conflict (key) do update set value = excluded.value, updated_at = now();
