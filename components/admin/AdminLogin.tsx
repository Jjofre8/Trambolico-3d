"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="w-full max-w-sm rounded-xl2 bg-cream-100 p-7 shadow-soft-lg animate-pop-in">
      <div className="mb-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl2 bg-ink-900 text-lima-400 font-display text-xl font-extrabold">
          T
        </span>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-ink-900">
          Panel de administración
        </h1>
        <p className="mt-1 text-sm text-ink-700/70">TRAMBÓLICO 3D</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink-900">
            Email
          </label>
          <input
            type="email"
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none focus:border-lima-500 focus:ring-2 focus:ring-lima-500/30"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-acento-500/10 px-3 py-2 text-sm font-semibold text-acento-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-lima-500 px-5 py-3.5 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-lima-400 disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
