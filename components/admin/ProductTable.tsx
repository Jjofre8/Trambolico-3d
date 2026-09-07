"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleActive: (product: Product) => Promise<void>;
  onDelete: (product: Product) => Promise<void>;
}

export default function ProductTable({
  products,
  onEdit,
  onToggleActive,
  onDelete,
}: ProductTableProps) {
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleToggle = async (product: Product) => {
    setBusyId(product.id);
    await onToggleActive(product);
    setBusyId(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusyId(pendingDelete.id);
    await onDelete(pendingDelete);
    setBusyId(null);
    setPendingDelete(null);
  };

  if (products.length === 0) {
    return (
      <p className="rounded-xl2 bg-white p-8 text-center text-ink-700/70 shadow-soft">
        Todavía no cargaste productos. Creá el primero con el botón de arriba.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl2 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cream-200 text-xs font-bold uppercase tracking-wide text-ink-700/70">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-ink-900/5 hover:bg-cream-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-lima-50">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center">
                          🧩
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-ink-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-700/80">{product.category}</td>
                <td className="px-4 py-3 font-semibold text-lima-700">
                  ${product.price.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      product.active
                        ? "bg-lima-100 text-lima-700"
                        : "bg-ink-900/10 text-ink-700/60"
                    }`}
                  >
                    {product.active ? "Activo" : "Oculto"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-full bg-cream-200 px-3 py-1.5 text-xs font-bold text-ink-700 hover:bg-cream-100"
                    >
                      Editar
                    </button>
                    <button
                      disabled={busyId === product.id}
                      onClick={() => handleToggle(product)}
                      className="rounded-full bg-naranja-500/15 px-3 py-1.5 text-xs font-bold text-naranja-600 hover:bg-naranja-500/25 disabled:opacity-50"
                    >
                      {product.active ? "Ocultar" : "Mostrar"}
                    </button>
                    <button
                      disabled={busyId === product.id}
                      onClick={() => setPendingDelete(product)}
                      className="rounded-full bg-acento-500/10 px-3 py-1.5 text-xs font-bold text-acento-600 hover:bg-acento-500/20 disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingDelete && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
          onClick={() => setPendingDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-soft-lg animate-pop-in"
          >
            <h3 className="font-display text-lg font-bold text-ink-900">
              ¿Eliminar producto?
            </h3>
            <p className="mt-2 text-sm text-ink-700/75">
              Vas a eliminar <strong>{pendingDelete.name}</strong>
              definitivamente. Esta acción no se puede deshacer. Si preferís
              conservarlo pero no mostrarlo, usá &quot;Ocultar&quot; en su
              lugar.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-full bg-acento-500 px-4 py-3 text-sm font-bold text-white hover:bg-acento-600"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setPendingDelete(null)}
                className="rounded-full bg-cream-200 px-4 py-3 text-sm font-bold text-ink-700 hover:bg-cream-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
