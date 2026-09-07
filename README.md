# TRAMBÓLICO 3D — Catálogo web administrable

Vitrina/catálogo digital de productos impresos en 3D. **No es un e-commerce**:
los clientes ven el catálogo y consultan/compran por WhatsApp. El catálogo se
administra 100% desde un panel privado (`/admin`), sin tocar código.

Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase
(Postgres + Auth + Storage)**, pensado para desplegar en **Vercel**.

---

## 1. Archivos creados

Proyecto construido desde cero con esta estructura:

```
app/
  layout.tsx              → layout raíz, fuentes, SEO/Open Graph
  page.tsx                → página pública (home)
  globals.css             → estilos globales Tailwind
  admin/
    page.tsx              → panel admin (CRUD productos)
    login/page.tsx         → login del admin
components/
  navbar/Navbar.tsx
  navbar/Footer.tsx
  hero/Hero.tsx
  products/ProductCatalog.tsx
  products/ProductCard.tsx
  products/ProductModal.tsx
  products/CategoryFilter.tsx
  sections/CustomProductSection.tsx
  sections/HowToBuy.tsx
  sections/ImportantInfo.tsx
  sections/ContactSection.tsx
  whatsapp/WhatsAppButton.tsx
  admin/AdminLayout.tsx
  admin/AdminLogin.tsx
  admin/ProductForm.tsx
  admin/ProductTable.tsx
  admin/ImageUploader.tsx
lib/
  supabase/client.ts       → cliente Supabase (browser)
  supabase/server.ts       → cliente Supabase (server components)
  supabase/products.ts     → funciones CRUD de productos
  supabase/storage.ts      → subida de imágenes a Storage
  whatsapp/index.ts        → generateWhatsAppUrl() y builders de mensajes
types/product.ts           → tipos TypeScript (Product, ProductInput, etc.)
middleware.ts               → protege /admin y refresca sesión de Supabase
sql/01_schema.sql           → tabla products + políticas RLS + bucket Storage
sql/02_seed.sql              → los 10 productos iniciales del brief
tailwind.config.ts          → paleta de marca (verde lima, negro, crema, naranja, rojo)
package.json, tsconfig.json, next.config.js, postcss.config.js
.env.local.example
```

No existía un proyecto previo, así que todo se generó desde cero siguiendo
la arquitectura pedida (separación de UI / lógica / acceso a datos / tipos).

## 2. Dependencias a instalar

Ya están declaradas en `package.json`. Al ejecutar `npm install` se instalan:

- `next`, `react`, `react-dom`
- `@supabase/supabase-js`, `@supabase/ssr`
- `tailwindcss`, `postcss`, `autoprefixer`
- `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
- `eslint`, `eslint-config-next`

## 3. Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá con los datos de tu
proyecto de Supabase (Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
NEXT_PUBLIC_WHATSAPP_NUMBER=543835430869
```

En **Vercel**, configurá las mismas variables en
Project Settings → Environment Variables.

## 4. SQL a ejecutar en Supabase

En el Dashboard de Supabase → **SQL Editor**, ejecutá en este orden:

1. `sql/01_schema.sql` → crea la tabla `products`, las políticas RLS
   (visitantes solo leen productos activos; solo un usuario autenticado
   puede crear/editar/ocultar/eliminar) y el bucket público `product-images`
   en Supabase Storage.
2. `sql/02_seed.sql` → carga los 10 productos iniciales del catálogo
   (llaveros, fidgets, juegos, articulados y especiales). Podés editarlos,
   ocultarlos o borrarlos después desde `/admin`.

## 5. Crear el usuario administrador

El panel usa **Supabase Auth** (email + contraseña). Para crear a la
administradora (tu hermana):

1. Andá a **Supabase Dashboard → Authentication → Users → Add user**.
2. Cargá su email y una contraseña (o "Send invite" si preferís que ella
   la defina).
3. Con esas credenciales ya puede entrar en `tusitio.com/admin`.

> No hace falta una tabla extra de "admins": cualquier usuario que exista en
> Supabase Auth puede administrar el catálogo. Si en el futuro hay más de un
> perfil (ej. vendedores con menos permisos), se puede sumar una tabla de
> roles y ajustar las políticas RLS.

## 6. Cómo ejecutar el proyecto localmente

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000` para el catálogo público y
`http://localhost:3000/admin` para el panel (te pedirá login).

## 7. Cómo desplegarlo en Vercel

1. Subí este proyecto a un repositorio de GitHub/GitLab.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importá el repo.
3. Framework detectado automáticamente: **Next.js**.
4. Agregá las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`).
5. **Deploy**. Cada nuevo push a la rama principal vuelve a desplegar solo.

## 8. Verificaciones antes de lanzar

- [ ] `npm run build` compila sin errores.
- [ ] `npm run lint` sin errores.
- [ ] Las imágenes cargan (bucket `product-images` creado y público).
- [ ] Supabase conectado (variables de entorno correctas).
- [ ] CRUD de productos funciona desde `/admin`.
- [ ] El login de administrador funciona y `/admin` redirige a `/admin/login`
      si no hay sesión.
- [ ] Los productos con `active = true` aparecen en la home; los
      `active = false` no aparecen.
- [ ] Los botones "Quiero este producto", "Quiero algo personalizado" y el
      botón flotante generan bien el link de `wa.me` con el mensaje armado.
- [ ] Se ve bien en celular, tablet y desktop.

## Notas de diseño

- Paleta: verde lima/pasto como color principal, negro para contraste fuerte
  (hero, footer, panel admin), blanco/crema de fondo, naranja como color de
  acción secundaria y rojo como acento (alertas, badges especiales).
- Mobile-first: cards de 1 columna en mobile, 2 en tablet, 3–4 en desktop;
  menú hamburguesa; botón de WhatsApp flotante siempre visible.
- El catálogo público es un **Server Component** (`app/page.tsx`) que lee
  directo de Supabase en cada visita (`revalidate = 0`), así los cambios
  desde `/admin` se reflejan al instante sin necesidad de rebuild.
