"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-ink-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl2 bg-lima-500 font-display text-lg font-extrabold text-ink-900">
              T
            </span>
            <div>
              <p className="font-display text-base font-extrabold text-cream-100">
                TRAMBÓLICO 3D
              </p>
              <p className="text-xs font-semibold text-lima-400">
                Panel de administración
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="hidden text-sm font-semibold text-cream-100/70 hover:text-lima-400 sm:block"
            >
              Ver sitio público ↗
            </a>
            <button
              onClick={handleLogout}
              className="rounded-full bg-cream-100/10 px-4 py-2 text-sm font-bold text-cream-100 hover:bg-acento-500 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
