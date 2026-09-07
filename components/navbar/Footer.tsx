import { generateWhatsAppUrl, buildGenericInquiryMessage } from "@/lib/whatsapp";
import Logo from "@/components/ui/Logo";

const INSTAGRAM_URL = "https://instagram.com/trambolico.3d";

export default function Footer() {
  return (
    <footer className="bg-ink-950 py-10 text-cream-100/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <div className="flex flex-col items-center gap-2">
          <Logo size="sm" dark/>
          <p className="mt-1 text-sm">Imprimimos tus ideas.</p>
        </div>

        <div className="flex gap-5 text-sm font-semibold">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lima-400"
          >
            Instagram
          </a>
          <a
            href={generateWhatsAppUrl(buildGenericInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lima-400"
          >
            WhatsApp
          </a>
        </div>

        <p className="text-xs text-cream-100/40">
          © {new Date().getFullYear()} TRAMBÓLICO 3D. Todos los derechos reservados.
        </p> 
      </div>
    </footer>
  );
}
