const CARDS = [
  {
    icon: "💵",
    title: "Seña",
    lines: [
      "Para comenzar el pedido se solicita una seña del 50%.",
      "El 50% restante se abona al recibir el pedido.",
      "La seña no es reembolsable en caso de cancelación.",
    ],
  },
  {
    icon: "🎁",
    title: "Envoltorio individual",
    lines: [
      "Opcional con costo adicional.",
      "Incluye bolsita transparente + sticker de la marca.",
    ],
  },
  {
    icon: "🎨",
    title: "Colores",
    lines: [
      "Los colores están sujetos a disponibilidad.",
      "Consultá antes de confirmar tu pedido.",
    ],
  },
  {
    icon: "📅",
    title: "Pedidos",
    lines: ["Pedidos confirmados hasta el 07/09."],
  },
];

export default function ImportantInfo() {
  return (
    <section className="bg-cream-200/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 rounded-xl2 border-2 border-dashed border-naranja-500 bg-naranja-500/10 p-5 text-center sm:mb-10">
          <p className="font-display text-base font-extrabold text-ink-900 sm:text-lg">
            🎁 ¡Los primeros 3 pedidos se llevan el envoltorio individual DE
            REGALO!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-xl2 bg-white p-5 shadow-soft"
            >
              <span className="text-2xl">{card.icon}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink-900">
                {card.title}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {card.lines.map((line) => (
                  <li key={line} className="text-sm leading-snug text-ink-700/75">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
