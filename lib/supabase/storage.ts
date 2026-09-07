import { createClient } from "@/lib/supabase/client";

export const PRODUCT_IMAGES_BUCKET = "product-images";
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export interface UploadResult {
  publicUrl: string | null;
  error: string | null;
}

/** Valida y sube una imagen de producto a Supabase Storage; devuelve la URL pública. */
export async function uploadProductImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      publicUrl: null,
      error: "Formato no permitido. Usá JPG, PNG o WEBP.",
    };
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      publicUrl: null,
      error: `El archivo es demasiado grande. Máximo ${MAX_FILE_SIZE_MB}MB.`,
    };
  }

  const supabase = createClient();
  const extension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) {
    return { publicUrl: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);

  return { publicUrl, error: null };
}
