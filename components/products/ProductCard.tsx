"use client";

import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onRequest: (product: Product) => void;
}

export default function ProductCard({ product, onRequest }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-lima-50">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🧩
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink-900/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-lima-400">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold leading-tight text-ink-900">
          {product.name}
        </h3>

        {product.description && (
          <p className="line-clamp-2 text-sm text-ink-700/80">
            {product.description}
          </p>
        )}

        <div className="mt-1 flex items-center justify-between">
          <span className="font-display text-xl font-extrabold text-lima-600">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {product.production_time && (
            <span className="flex items-center gap-1 text-xs font-semibold text-ink-700/70">
              ⏱ {product.production_time}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color}
                className="rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] font-semibold text-ink-700"
              >
                {color}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => onRequest(product)}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-naranja-500 px-4 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-naranja-600 active:scale-95"
        >
          Quiero este producto
        </button>
      </div>
    </article>
  );
}
