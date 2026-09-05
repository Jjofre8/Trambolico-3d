"use client";

import { generateWhatsAppUrl, buildGenericInquiryMessage } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={generateWhatsAppUrl(buildGenericInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[#25D366]/40" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-7 w-7 sm:h-8 sm:w-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.372.696 4.583 1.897 6.44L4 29l7.73-1.86A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6a9.55 9.55 0 0 1-4.87-1.33l-.35-.21-4.59 1.1 1.12-4.47-.23-.36A9.55 9.55 0 1 1 25.55 15a9.56 9.56 0 0 1-9.546 9.6Zm5.24-7.15c-.29-.145-1.71-.845-1.976-.941-.265-.096-.458-.145-.65.145-.192.29-.746.94-.914 1.134-.168.193-.336.217-.626.072-.29-.145-1.223-.451-2.33-1.437-.861-.768-1.443-1.716-1.612-2.006-.168-.29-.018-.447.127-.591.13-.13.29-.338.434-.507.145-.169.193-.29.29-.483.096-.193.048-.362-.024-.507-.072-.145-.65-1.566-.89-2.146-.235-.564-.474-.488-.65-.497l-.554-.01c-.193 0-.507.072-.772.362-.265.29-1.012.988-1.012 2.41 0 1.42 1.036 2.793 1.18 2.987.145.193 2.04 3.115 4.945 4.368.691.298 1.23.476 1.65.61.693.22 1.323.189 1.822.115.556-.083 1.71-.699 1.951-1.373.24-.675.24-1.253.168-1.373-.072-.12-.265-.193-.554-.338Z" />
      </svg>
    </a>
  );
}
