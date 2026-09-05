interface DoodleStarProps {
  className?: string;
}

/** Estrellita tipo garabato, como los acentos dibujados a mano del arte de marca. */
export default function DoodleStar({ className = "" }: DoodleStarProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" />
    </svg>
  );
}
