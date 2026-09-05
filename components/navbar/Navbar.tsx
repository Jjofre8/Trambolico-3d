"use client";

import { useState } from "react";
import { generateWhatsAppUrl, buildGenericInquiryMessage } from "@/lib/whatsapp";
import Logo from "@/components/ui/Logo";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Personalizados", href: "#personalizados" },
  { label: "Cómo comprar", href: "#como-comprar" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-cream-100/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" aria-label="TRAMBÓLICO 3D - Inicio">
          <Logo size="sm" layout="inline" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-ink-700 transition-colors hover:text-lima-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={generateWhatsAppUrl(buildGenericInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-lima-500 px-5 py-2.5 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-lima-400"
          >
            WhatsApp
          </a>
        </div>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-900/10 md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-ink-900 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink-900 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink-900 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-900/5 bg-cream-100 px-4 pb-5 pt-2 md:hidden animate-pop-in">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-ink-700 hover:bg-lima-50 hover:text-lima-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={generateWhatsAppUrl(buildGenericInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-lima-500 px-5 py-3 text-sm font-bold text-ink-900 shadow-soft"
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
