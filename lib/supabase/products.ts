import { createClient as createBrowserClient } from "@/lib/supabase/client";

import type { Product, ProductInput } from "@/types/product";

/**
 * Trae los productos activos para el catálogo público.
 */
export async function getActiveProducts(): Promise<Product[]> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al traer productos activos:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Trae todos los productos para el panel de administración.
 */
export async function getAllProductsClient(): Promise<Product[]> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/**
 * Crea un producto.
 */
export async function createProduct(
  input: ProductInput
): Promise<Product> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      description: input.description,
      price: input.price,
      image_url: input.image_url,
      category: input.category,
      size: input.size,
      production_time: input.production_time,
      colors: input.colors,
      customizable: input.customizable,
      active: input.active,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Actualiza un producto.
 */
export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Activa o desactiva un producto.
 */
export async function toggleProductActive(
  id: string,
  active: boolean
): Promise<void> {
  const supabase = createBrowserClient();

  const { error } = await supabase
    .from("products")
    .update({
      active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/**
 * Elimina un producto.
 */
export async function deleteProduct(id: string): Promise<void> {
  const supabase = createBrowserClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

