"use client";

import { generateWhatsAppUrl, buildCustomIdeaMessage } from "@/lib/whatsapp";
import DoodleStar from "@/components/ui/DoodleStar";

export default function CustomProductSection() {
  return (
    <section
      id="personalizados"
      className="relative overflow-hidden bg-cream-200/50 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-blob bg-violeta-300 sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-36 w-36 rounded-blob bg-naranja-400/70 sm:h-48 sm:w-48" />
      <DoodleStar className="pointer-events-none absolute right-1/4 top-8 h-8 w-8 opacity-60" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-700 shadow-soft">
          💡 Hecho a medida
        </span>

        <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          ¿Tenés una idea?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-ink-700/75">
          ¿No encontrás lo que buscás? También podemos crear productos
          personalizados. Contanos tu idea y la hacemos realidad, capa por
          capa.
        </p>

        <a
          href={generateWhatsAppUrl(buildCustomIdeaMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-sm font-bold text-lima-400 shadow-soft-lg transition-transform hover:-translate-y-0.5 hover:bg-ink-700 sm:text-base"
        >
          Quiero pedir algo personalizado
        </a>
      </div>
    </section>
  );
}
