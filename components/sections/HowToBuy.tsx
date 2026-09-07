const STEPS = [
  {
    number: "01",
    title: "Elegí tu producto",
    text: "Mirá nuestro catálogo y elegí lo que más te guste.",
    color: "bg-lima-500",
  },
  {
    number: "02",
    title: "Consultanos por WhatsApp",
    text: "Mandanos tu pedido, cantidad, color y personalización si corresponde.",
    color: "bg-naranja-500",
  },
  {
    number: "03",
    title: "Confirmamos tu pedido",
    text: "Te informamos disponibilidad, tiempo de producción y detalles del pedido.",
    color: "bg-acento-500",
  },
];

export default function HowToBuy() {
  return (
    <section id="como-comprar" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-lima-600">
          Es fácil
        </span>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          ¿Cómo comprar?
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative rounded-xl2 bg-white p-6 shadow-soft transition-transform hover:-translate-y-1"
          >
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${step.color} font-display text-lg font-extrabold text-white shadow-soft`}
            >
              {step.number}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-ink-700/75">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
