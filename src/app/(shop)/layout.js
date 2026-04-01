import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Navbar />
        <div className="pt-20 min-h-screen">
          {children}
        </div>
        <Footer />
      </FavoritesProvider>
    </CartProvider>
  );
}
