"use client";

import { useState } from "react";
import type { Product, ProductInput } from "@/types/product";
import { CATEGORIES, EMPTY_PRODUCT_INPUT } from "@/types/product";
import ImageUploader from "@/components/admin/ImageUploader";

interface ProductFormProps {
  initialProduct?: Product | null;
  onSubmit: (input: ProductInput) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({
  initialProduct,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductInput>(
    initialProduct
      ? {
          name: initialProduct.name,
          description: initialProduct.description ?? "",
          price: initialProduct.price,
          image_url: initialProduct.image_url,
          category: initialProduct.category,
          size: initialProduct.size ?? "",
          production_time: initialProduct.production_time ?? "",
          colors: initialProduct.colors ?? [],
          customizable: initialProduct.customizable,
          active: initialProduct.active,
        }
      : EMPTY_PRODUCT_INPUT
  );
  const [colorInput, setColorInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addColor = () => {
    const trimmed = colorInput.trim();
    if (!trimmed) return;
    if (!form.colors.includes(trimmed)) {
      update("colors", [...form.colors, trimmed]);
    }
    setColorInput("");
  };

  const removeColor = (color: string) =>
    update(
      "colors",
      form.colors.filter((c) => c !== color)
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || form.price <= 0) {
      setError("Completá al menos el nombre y un precio válido.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error al guardar."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl2 bg-white p-6 shadow-soft"
    >
      <h2 className="font-display text-xl font-bold text-ink-900">
        {initialProduct ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Nombre
          </label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="Llavero Mediano Personalizado"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="Precio por unidad sin envoltorio individual."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Precio ($)
          </label>
          <input
            type="number"
            min={0}
            step="1"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Categoría
          </label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Tamaño aproximado
          </label>
          <input
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="2 x 6 x 3 cm"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Tiempo de producción
          </label>
          <input
            value={form.production_time}
            onChange={(e) => update("production_time", e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="Aproximadamente 4 días"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Colores disponibles
          </label>
          <div className="flex gap-2">
            <input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addColor();
                }
              }}
              className="flex-1 rounded-xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
              placeholder="Ej: Verde lima"
            />
            <button
              type="button"
              onClick={addColor}
              className="rounded-xl bg-ink-900 px-4 text-sm font-bold text-lima-400 hover:bg-ink-700"
            >
              Agregar
            </button>
          </div>
          {form.colors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.colors.map((color) => (
                <span
                  key={color}
                  className="flex items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink-700"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-acento-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <ImageUploader
            value={form.image_url}
            onChange={(url) => update("image_url", url)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <input
            type="checkbox"
            checked={form.customizable}
            onChange={(e) => update("customizable", e.target.checked)}
            className="h-5 w-5 rounded accent-lima-500"
          />
          Permite personalización
        </label>

        <label className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => update("active", e.target.checked)}
            className="h-5 w-5 rounded accent-lima-500"
          />
          Producto activo (visible en la web)
        </label>
      </div>

      {error && (
        <p className="rounded-lg bg-acento-500/10 px-3 py-2 text-sm font-semibold text-acento-600">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-full bg-lima-500 px-5 py-3.5 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-lima-400 disabled:opacity-60"
        >
          {saving
            ? "Guardando..."
            : initialProduct
            ? "Guardar cambios"
            : "Publicar producto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-cream-200 px-5 py-3.5 text-sm font-bold text-ink-700 hover:bg-cream-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
