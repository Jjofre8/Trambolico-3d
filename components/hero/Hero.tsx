"use client";

import { generateWhatsAppUrl, buildCustomIdeaMessage } from "@/lib/whatsapp";
import Logo from "@/components/ui/Logo";
import DoodleStar from "@/components/ui/DoodleStar";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cream-100 text-ink-900"
    >
      {/* Manchas orgánicas de fondo, como en el arte de marca */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-blob bg-naranja-500 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -left-14 bottom-10 h-40 w-40 rounded-blob bg-lima-300 sm:h-56 sm:w-56" />
      <DoodleStar className="pointer-events-none absolute right-8 top-40 hidden h-10 w-10 sm:block" />
      <DoodleStar className="pointer-events-none absolute left-10 top-16 h-7 w-7 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:py-24">
        <div className="animate-pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-700 shadow-soft">
            🖨️ Impresión 3D hecha con onda
          </span>

          <div className="mt-5">
            <Logo size="lg" layout="stacked" />
          </div>

          <p className="mt-5 font-display text-xl font-bold text-naranja-600 sm:text-2xl">
            Ideas que toman forma.
          </p>

          <p className="mt-3 max-w-md text-base text-ink-700/80 sm:text-lg">
            Productos impresos en 3D, personalizados y hechos para vos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#productos"
              className="inline-flex items-center justify-center rounded-full bg-ink-900 px-7 py-3.5 text-sm font-bold text-lima-400 shadow-soft-lg transition-transform hover:-translate-y-0.5 hover:bg-ink-700 sm:text-base"
            >
              Ver productos
            </a>
            <a
              href={generateWhatsAppUrl(buildCustomIdeaMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-900 bg-white px-7 py-3.5 text-sm font-bold text-ink-900 transition-transform hover:-translate-y-0.5 hover:bg-naranja-500 sm:text-base"
            >
              Quiero algo personalizado
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative animate-float">
            <svg
              viewBox="0 0 240 240"
              className="h-52 w-52 drop-shadow-xl sm:h-72 sm:w-72"
              aria-hidden="true"
            >
              <g>
                <rect x="30" y="150" width="180" height="14" rx="7" fill="#141414" />
                <rect x="60" y="130" width="120" height="14" rx="7" fill="#72b81a" />
                <rect x="75" y="110" width="90" height="14" rx="7" fill="#c9b6e8" />
                <rect x="85" y="90" width="70" height="14" rx="7" fill="#e8804a" />
                <rect x="95" y="70" width="50" height="14" rx="7" fill="#a7e256" />
                <circle cx="120" cy="55" r="10" fill="#fdf6d8" stroke="#141414" strokeWidth="2" />
                <path d="M100 40 L140 40 L150 20 L90 20 Z" fill="#141414" />
                <line
                  x1="120"
                  y1="20"
                  x2="120"
                  y2="164"
                  stroke="#141414"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.35"
                />
              </g>
            </svg>
            <DoodleStar className="absolute -right-4 -top-4 h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="h-3 w-full bg-gradient-to-r from-violeta-400 via-naranja-500 to-lima-400" />
    </section>
  );
}
