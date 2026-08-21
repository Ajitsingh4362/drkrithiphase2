-- Run this once in Supabase Dashboard → SQL Editor
-- Adds a `category` column to `doctors` so the home page can show
-- "Our Doctors" (Dr Kirthi + Dr Spurana) separately from "Our Care Team"
-- (therapists like Hema, Madhavi, etc.)

alter table doctors add column if not exists category text default 'team';

alter table doctors drop constraint if exists doctors_category_check;
alter table doctors add constraint doctors_category_check check (category in ('doctor', 'team'));

-- After running this, open Admin → Doctor's Team and set each existing
-- entry's category (Doctor / Team) using the new dropdown — existing rows
-- default to 'team' until you change them.
