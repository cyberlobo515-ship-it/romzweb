-- =========================================================
-- ROMZ CLOTHING — Supabase Schema (to'liq)
-- SQL Editor'ga paste qilib RUN bosing
-- =========================================================

-- ========== 1. PRODUCTS ==========
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  name text not null,
  description text default '',
  price numeric not null default 0,
  category text not null,
  badge text default '',
  stock integer not null default 0,
  sizes jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  featured integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ========== 2. ORDERS ==========
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_code text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  discount numeric default 0,
  promo_code text,
  status text default 'Kutilmoqda',
  created_at timestamptz default now()
);

-- ========== 3. HERO (single row) ==========
create table if not exists public.hero (
  id integer primary key default 1,
  product_code text,
  badge text default 'Haftaning sarasi',
  updated_at timestamptz default now()
);

insert into public.hero (id, badge) values (1, 'Haftaning sarasi')
on conflict (id) do nothing;

-- ========== 4. RLS YOQISH ==========
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.hero enable row level security;

-- ========== 5. PRODUCTS RLS ==========
drop policy if exists "products_read_all" on public.products;
create policy "products_read_all" on public.products
  for select to anon, authenticated using (true);

drop policy if exists "products_insert_auth" on public.products;
create policy "products_insert_auth" on public.products
  for insert to authenticated with check (true);

drop policy if exists "products_update_auth" on public.products;
create policy "products_update_auth" on public.products
  for update to authenticated using (true);

drop policy if exists "products_delete_auth" on public.products;
create policy "products_delete_auth" on public.products
  for delete to authenticated using (true);

-- ========== 6. ORDERS RLS ==========
drop policy if exists "orders_read_all" on public.orders;
create policy "orders_read_all" on public.orders
  for select to anon, authenticated using (true);

drop policy if exists "orders_insert_all" on public.orders;
create policy "orders_insert_all" on public.orders
  for insert to anon, authenticated with check (true);

drop policy if exists "orders_update_auth" on public.orders;
create policy "orders_update_auth" on public.orders
  for update to authenticated using (true);

drop policy if exists "orders_delete_auth" on public.orders;
create policy "orders_delete_auth" on public.orders
  for delete to authenticated using (true);

-- ========== 7. HERO RLS ==========
drop policy if exists "hero_read_all" on public.hero;
create policy "hero_read_all" on public.hero
  for select to anon, authenticated using (true);

drop policy if exists "hero_update_auth" on public.hero;
create policy "hero_update_auth" on public.hero
  for update to authenticated using (true);

drop policy if exists "hero_insert_auth" on public.hero;
create policy "hero_insert_auth" on public.hero
  for insert to authenticated with check (true);

-- ========== 8. STOCK DECREMENT FUNCTION ==========
create or replace function public.decrement_stock(product_id uuid, qty integer)
returns void
language sql
security definer
as $$
  update public.products
  set stock = greatest(0, stock - qty), updated_at = now()
  where id = product_id;
$$;

-- ========== 9. AUTO UPDATE updated_at ==========
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- ========== 10. STORAGE POLICIES (product-images bucket) ==========
-- ⚠️ Faqat "product-images" bucket yaratilgandan keyin ishlaydi
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Auth upload product images" on storage.objects;
create policy "Auth upload product images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Auth delete product images" on storage.objects;
create policy "Auth delete product images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images');

-- ========== ✅ DONE ==========