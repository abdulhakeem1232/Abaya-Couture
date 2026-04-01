"use client";

import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  const orderMessage = `Hello Abaya Couture! I'm interested in ordering the product: *${product.name}*.\nPrice: ₹${product.discountPrice || product.price}\nLink: https://abayacouture.com/products/${product._id}`;
  const whatsappUrl = `https://wa.me/916364208033?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-accent hover:bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 font-medium tracking-wide shadow-lg shadow-accent/10"
        >
          <ShoppingBag size={20} /> Add to Cart
        </button>
        <button 
          onClick={handleFavorite}
          className={`px-8 py-4 border rounded-xl flex items-center justify-center gap-2 transition duration-300 ${isFavorite(product._id) ? "border-primary text-primary bg-primary/5" : "border-gray-200 text-gray-400 hover:border-primary hover:text-primary"}`}
        >
          <Heart size={20} className={isFavorite(product._id) ? "fill-primary" : ""} />
        </button>
      </div>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 font-medium tracking-wide shadow-lg shadow-[#25D366]/20"
      >
        <FaWhatsapp size={22} /> Order via WhatsApp
      </a>
    </div>
  );
}
