"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductCard from "@/components/products/ProductCard";
import ProductModal from "@/components/products/ProductModal";
import { generateWhatsAppUrl, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["Todos", ...unique];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleRequest = (product: Product) => {
    // Si es personalizable o queremos confirmar cantidad, mostramos el modal.
    // Igual permitimos ir directo a WhatsApp para productos simples desde acá si se prefiere.
    setSelectedProduct(product);
  };

  return (
    <section id="productos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-8 text-center sm:mb-10">
        <span className="text-sm font-bold uppercase tracking-widest text-lima-600">
          Catálogo
        </span>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Nuestros productos
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-ink-700/70">
          Elegí lo que más te guste y consultanos directo por WhatsApp.
        </p>
      </div>

      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl2 bg-white p-10 text-center text-ink-700/70 shadow-soft">
          Todavía no hay productos en esta categoría. ¡Volvé pronto!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
