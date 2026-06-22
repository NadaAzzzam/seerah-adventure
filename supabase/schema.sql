-- Run this once in Supabase: SQL Editor → New query → Run

create table if not exists seerah_classrooms (
  code text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table seerah_classrooms enable row level security;

create policy "Allow public read"
  on seerah_classrooms for select
  using (true);

create policy "Allow public insert"
  on seerah_classrooms for insert
  with check (true);

create policy "Allow public update"
  on seerah_classrooms for update
  using (true);
