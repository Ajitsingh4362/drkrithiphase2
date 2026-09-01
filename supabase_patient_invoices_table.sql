-- Run this once in Supabase Dashboard → SQL Editor
-- Creates the `patient_invoices` table used for the "Billing" tab on a patient's profile,
-- and for the Quick Appointment Fee field on the Overview tab.

create table if not exists patient_invoices (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  invoice_number text not null,
  date date not null default current_date,
  items jsonb not null default '[]',
  total_amount numeric not null default 0,
  paid_amount numeric not null default 0,
  status text not null default 'unpaid', -- 'unpaid' | 'partial' | 'paid'
  notes text,
  created_at timestamptz default now()
);

alter table patient_invoices enable row level security;

create policy "Anyone with anon key can read patient_invoices" on patient_invoices
  for select using (true);

create policy "Anyone with anon key can insert patient_invoices" on patient_invoices
  for insert with check (true);

create policy "Anyone with anon key can update patient_invoices" on patient_invoices
  for update using (true);

create policy "Anyone with anon key can delete patient_invoices" on patient_invoices
  for delete using (true);
