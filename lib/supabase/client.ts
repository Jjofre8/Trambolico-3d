import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/product";

/**
 * Cliente de Supabase para usar en Client Components ("use client").
 * Usa las variables públicas (anon key), seguras para exponer al navegador
 * porque el acceso real está controlado por las políticas RLS.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
