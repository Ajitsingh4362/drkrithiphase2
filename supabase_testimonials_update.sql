-- Run this once in Supabase Dashboard → SQL Editor
-- Adds new optional columns to the existing `testimonials` table

alter table testimonials add column if not exists title text;
alter table testimonials add column if not exists audio_url text;
alter table testimonials add column if not exists screenshot_url text;
