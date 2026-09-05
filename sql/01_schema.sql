-- =========================================================
-- TRAMBÓLICO 3D — Schema de Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =========================================================

-- Extensión para generar UUIDs
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------
-- Tabla: products
-- ---------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null default 0,
  image_url text,
  category text not null,
  size text,
  production_time text,
  colors text[] default '{}',
  customizable boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger para mantener updated_at al día
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- Índices útiles para el catálogo público
create index if not exists idx_products_active on public.products (active);
create index if not exists idx_products_category on public.products (category);

-- ---------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------
alter table public.products enable row level security;

-- Cualquier visitante (rol anon) puede LEER solo productos activos.
drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products
  for select
  to anon, authenticated
  using (active = true);

-- Un usuario autenticado (la administradora) puede leer TODOS los productos
-- (incluidos los inactivos), para poder administrarlos desde /admin.
drop policy if exists "Authenticated can read all products" on public.products;
create policy "Authenticated can read all products"
  on public.products
  for select
  to authenticated
  using (true);

-- Solo usuarios autenticados pueden crear productos.
drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Solo usuarios autenticados pueden editar productos.
drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Solo usuarios autenticados pueden eliminar productos.
drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------
-- Storage: bucket público para imágenes de productos
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Cualquiera puede ver las imágenes (bucket público de solo lectura).
drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Solo usuarios autenticados pueden subir imágenes.
drop policy if exists "Authenticated can upload product images" on storage.objects;
create policy "Authenticated can upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Solo usuarios autenticados pueden actualizar/eliminar imágenes.
drop policy if exists "Authenticated can update product images" on storage.objects;
create policy "Authenticated can update product images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated can delete product images" on storage.objects;
create policy "Authenticated can delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');
