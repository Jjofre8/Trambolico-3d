interface LogoProps {
  /** "sm" para navbar/footer, "lg" para el hero */
  size?: "sm" | "lg";
  /** "stacked" apila los 3 bloques (hero), "inline" los pone en fila (navbar) */
  layout?: "stacked" | "inline";
  className?: string;
}

/**
 * Logo de TRAMBÓLICO 3D reconstruido como 3 bloques de color
 * (violeta / naranja / verde lima) con texto negro grueso,
 * igual al arte de marca usado en redes e impresos.
 */
export default function Logo({
  size = "lg",
  layout = "stacked",
  className = "",
}: LogoProps) {
  const isSmall = size === "sm";

  const blockBase = isSmall
    ? "px-2.5 py-0.5 text-sm sm:text-base rounded-lg"
    : "px-4 py-1 sm:px-5 sm:py-1.5 text-4xl sm:text-6xl rounded-xl2";

  const wrapperClass =
    layout === "stacked"
      ? "flex flex-col items-start gap-1.5 sm:gap-2"
      : "flex flex-row items-center gap-1.5";

  return (
    <div className={`${wrapperClass} ${className}`}>
      <span
        className={`${blockBase} bg-violeta-400 font-display font-extrabold leading-none text-ink-900 shadow-soft`}
      >
        TRAMB
      </span>
      <span
        className={`${blockBase} bg-naranja-500 font-display font-extrabold leading-none text-ink-900 shadow-soft`}
      >
        BÓLI<span className="text-lima-400">·</span>
      </span>
      <span
        className={`${blockBase} bg-lima-400 font-display font-extrabold leading-none text-ink-900 shadow-soft`}
      >
        CO
      </span>
    </div>
  );
}
