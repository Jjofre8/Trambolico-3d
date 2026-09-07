"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadProductImage } from "@/lib/supabase/storage";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // Preview inmediato mientras se sube.
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    const { publicUrl, error: uploadError } = await uploadProductImage(file);

    setUploading(false);

    if (uploadError || !publicUrl) {
      setError(uploadError || "No se pudo subir la imagen.");
      setPreview(value);
      return;
    }

    setPreview(publicUrl);
    onChange(publicUrl);
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-ink-900">
        Imagen del producto
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-900/15 bg-cream-50 p-4 text-center transition-colors hover:border-lima-500"
      >
        {preview ? (
          <div className="relative h-40 w-40 overflow-hidden rounded-xl">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        ) : (
          <div className="py-6 text-sm text-ink-700/60">
            📷 Tocá para subir una foto
            <br />
            <span className="text-xs">JPG, PNG o WEBP · máx. 5MB</span>
          </div>
        )}
        {uploading && (
          <span className="text-xs font-semibold text-lima-600">
            Subiendo imagen...
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && (
        <p className="mt-2 text-xs font-semibold text-acento-600">{error}</p>
      )}

      {preview && !uploading && (
        <button
          type="button"
          onClick={() => {
            setPreview(null);
            onChange(null);
          }}
          className="mt-2 text-xs font-semibold text-ink-700/60 underline hover:text-acento-600"
        >
          Quitar imagen
        </button>
      )}
    </div>
  );
}
