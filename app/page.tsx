import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";
import Hero from "@/components/hero/Hero";
import ProductCatalog from "@/components/products/ProductCatalog";
import CustomProductSection from "@/components/sections/CustomProductSection";
import HowToBuy from "@/components/sections/HowToBuy";
import ImportantInfo from "@/components/sections/ImportantInfo";
import ContactSection from "@/components/sections/ContactSection";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { getActiveProducts } from "@/lib/supabase/products-server";

// Siempre trae datos frescos de Supabase (no cachear el catálogo).
export const revalidate = 0;

export default async function HomePage() {
  const products = await getActiveProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductCatalog products={products} />
        <CustomProductSection />
        <HowToBuy />
        <ImportantInfo />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
