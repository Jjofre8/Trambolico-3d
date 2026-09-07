"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/ui/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-ink-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <p className="hidden text-xs font-semibold text-lima-400 sm:block">
              Panel de administración
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <a
              href="/"
              target="_blank"
              className="text-sm font-semibold text-cream-100/70 hover:text-lima-400"
            >
              Ver sitio público ↗
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-full bg-cream-100/10 px-4 py-2 text-sm font-bold text-cream-100 hover:bg-acento-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Saliendo..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
