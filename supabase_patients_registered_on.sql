-- Run this once in Supabase Dashboard → SQL Editor
-- Adds a `registered_on` date to patients — separate from `created_at` (which is
-- always "when this record was typed into the system"). This lets you enter an old/
-- past patient today but record their real original visit date, and also affects
-- nothing else (analytics, filters, etc. keep using created_at as before).

alter table patients add column if not exists registered_on date;

-- Optional one-time cleanup: for existing patients that don't have it set,
-- default it to the date their record was created.
update patients set registered_on = created_at::date where registered_on is null;
