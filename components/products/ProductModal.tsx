"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { generateWhatsAppUrl, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    const message = buildProductInquiryMessage({
      product,
      quantity,
      customName: product.customizable ? customName : undefined,
    });
    window.open(generateWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-pop-in rounded-t-2xl bg-white p-6 shadow-soft-lg sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-lima-600">
              {product.category}
            </p>
            <h3 className="font-display text-xl font-bold text-ink-900">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-200 text-ink-700 hover:bg-cream-100"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 font-display text-2xl font-extrabold text-lima-600">
          ${product.price.toLocaleString("es-AR")}
        </p>

        {product.customizable && (
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-bold text-ink-900">
              ¿Qué nombre querés colocar?
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Escribí el nombre"
              className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Cantidad
          </label>
          <div className="flex w-fit items-center gap-3 rounded-full bg-cream-200 px-2 py-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-ink-900 shadow-sm"
              aria-label="Restar"
            >
              −
            </button>
            <span className="w-6 text-center font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-ink-900 shadow-sm"
              aria-label="Sumar"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Consultar por WhatsApp
        </button>
      </div>
    </div>
  );
}
