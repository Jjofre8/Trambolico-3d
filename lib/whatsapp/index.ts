import type { Product } from "@/types/product";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "543835430869";

/**
 * Genera una URL de wa.me con el mensaje ya codificado.
 * Función reutilizable pedida en el brief: generateWhatsAppUrl().
 */
export function generateWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Mensaje genérico del botón flotante / "Ver productos" desde el hero. */
export function buildGenericInquiryMessage(): string {
  return "Hola! 👋 Quiero hacer una consulta sobre los productos de TRAMBÓLICO 3D.";
}

/** Mensaje para "Quiero algo personalizado" (hero y sección de personalizados). */
export function buildCustomIdeaMessage(): string {
  return [
    "Hola! 👋 Quiero consultar por un producto personalizado.",
    "",
    "Tengo una idea y quisiera saber si pueden realizarla.",
  ].join("\n");
}

interface ProductInquiryOptions {
  product: Pick<Product, "name" | "price">;
  quantity?: number;
  customName?: string;
}

/** Mensaje de consulta de un producto puntual del catálogo. */
export function buildProductInquiryMessage({
  product,
  quantity = 1,
  customName,
}: ProductInquiryOptions): string {
  const lines = [
    "Hola! 👋 Quiero consultar por este producto:",
    "",
    `Producto: ${product.name}`,
    `Precio publicado: $${product.price.toLocaleString("es-AR")}`,
    `Cantidad: ${quantity}`,
  ];

  if (customName && customName.trim().length > 0) {
    lines.push(`Nombre a personalizar: ${customName.trim()}`);
  }

  lines.push("", "¿Me pueden confirmar disponibilidad y colores?");

  return lines.join("\n");
}
