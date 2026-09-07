"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/ui/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Nunca mostramos el mensaje técnico de Supabase: siempre un
        // mensaje genérico y amigable, sea cual sea la causa exacta.
        setError("Email o contraseña incorrectos.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError(
        "No pudimos iniciar sesión. Revisá tu conexión e intentá de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl2 bg-cream-100 p-7 shadow-soft-lg animate-pop-in">
      <div className="mb-6 flex flex-col items-center text-center">
        <Logo size="sm" />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-ink-900">
          Panel de administración
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="tuemail@ejemplo.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Contraseña
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-acento-500/10 px-3 py-2 text-sm font-semibold text-acento-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-lima-500 px-5 py-3.5 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-lima-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
