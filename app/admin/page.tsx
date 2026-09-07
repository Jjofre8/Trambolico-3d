"use client";

import { useEffect, useState } from "react";
import type { Product, ProductInput } from "@/types/product";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import {
  getAllProductsClient,
  createProduct,
  updateProduct,
  toggleProductActive,
  deleteProduct,
} from "@/lib/supabase/products";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProductsClient();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSubmit = async (input: ProductInput) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, input);
    } else {
      await createProduct(input);
    }
    setShowForm(false);
    setEditingProduct(null);
    await loadProducts();
  };

  const handleToggleActive = async (product: Product) => {
    await toggleProductActive(product.id, !product.active);
    await loadProducts();
  };

  const handleDelete = async (product: Product) => {
    await deleteProduct(product.id);
    await loadProducts();
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-900">
            Productos
          </h1>
          <p className="text-sm text-ink-700/70">
            Creá, editá, ocultá o eliminá productos del catálogo.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lima-500 px-6 py-3 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-lima-400"
          >
            + Nuevo producto
          </button>
        )}
      </div>

      {showForm ? (
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : loading ? (
        <p className="text-ink-700/60">Cargando productos...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
