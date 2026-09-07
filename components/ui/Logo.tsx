interface LogoProps {
  size?: "sm" | "lg";
  layout?: "stacked" | "inline";
  className?: string;
  dark?: boolean;
}

export default function Logo({
  size = "lg",
  layout = "stacked",
  className = "",
  dark = false,
}: LogoProps) {
  const isSmall = size === "sm";

  const textSize = isSmall
    ? "text-xl sm:text-2xl"
    : "text-5xl sm:text-7xl md:text-8xl";

  const blackText = dark ? "text-white" : "text-black";

  return (
    <div
      className={`flex items-center whitespace-nowrap font-display font-black leading-none ${textSize} ${className}`}
      aria-label="TRAMBÓLICO 3D"
    >
      {/* TRAMB — negro en fondo claro / blanco en fondo oscuro */}
      <span className={blackText}>TRAMB</span>

      {/* Ó — verde lima, un poquito más abajo */}
      <span className="relative top-2 text-[#d2d74a]">Ó</span>

      {/* L — negro en fondo claro / blanco en fondo oscuro */}
      <span className={blackText}>L</span>

      {/* i — violeta, minúscula e inclinada hacia la derecha */}
      <span className="relative inline-block -translate-y-0.5 rotate-[12deg] text-[#d0ace9]">
        i
      </span>

      {/* C — negro en fondo claro / blanco en fondo oscuro */}
      <span className={blackText}>C</span>

      {/* O final — naranja */}
      <span className="text-[#ec6b2e]">O</span>
    </div>
  );
}

