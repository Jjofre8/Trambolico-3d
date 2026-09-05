export const CATEGORIES = [
  "Llaveros",
  "Fidget",
  "Juegos",
  "Articulados",
  "Especiales",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: Category | string;
  size: string | null;
  production_time: string | null;
  colors: string[] | null;
  customizable: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

/** Payload usado al crear/editar un producto desde el panel admin */
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  size: string;
  production_time: string;
  colors: string[];
  customizable: boolean;
  active: boolean;
}

export const EMPTY_PRODUCT_INPUT: ProductInput = {
  name: "",
  description: "",
  price: 0,
  image_url: null,
  category: CATEGORIES[0],
  size: "",
  production_time: "",
  colors: [],
  customizable: false,
  active: true,
};

/** Tipado de la tabla `products` de Supabase, para usar con el cliente tipado */
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Partial<Product> & {
          name: string;
          price: number;
          category: string;
        };
        Update: Partial<Product>;
      };
    };
  };
}
