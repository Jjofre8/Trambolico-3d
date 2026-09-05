"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="scroll-no-bar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-all ${
              isActive
                ? "bg-ink-900 text-lima-400 shadow-soft"
                : "bg-white text-ink-700 hover:bg-lima-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
