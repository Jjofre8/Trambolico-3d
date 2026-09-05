import { generateWhatsAppUrl, buildGenericInquiryMessage } from "@/lib/whatsapp";

const INSTAGRAM_URL = "https://instagram.com/trambolico.3d";

export default function ContactSection() {
  return (
    <section id="contacto" className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
      <span className="text-sm font-bold uppercase tracking-widest text-lima-600">
        Estamos para ayudarte
      </span>
      <h2 className="mt-1 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        ¿Hablamos?
      </h2>

      <div className="mt-4 flex flex-col items-center gap-1 text-ink-700">
        <p className="font-semibold">WhatsApp: 3835-430869</p>
        <p className="font-semibold">Instagram: @trambolico.3d</p>
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={generateWhatsAppUrl(buildGenericInquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          WhatsApp
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-naranja-500 to-acento-500 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
