"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, loaded } = useFavorites();
  const { addToCart } = useCart();

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
          <Heart size={40} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-accent mb-3">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Save your favorite Abayas here so you can easily find them later.
        </p>
        <Link
          href="/products"
          className="bg-accent hover:bg-black text-white px-8 py-3.5 rounded-full transition duration-300 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Browse Collection
        </Link>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-accent">My Wishlist</h1>
        <p className="text-gray-500 mt-1 text-sm">{favorites.length} {favorites.length === 1 ? "item" : "items"} saved</p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {favorites.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="relative h-72 w-full bg-gray-100">
                <Link href={`/products/${product._id}`}>
                  <Image
                    src={product.images?.[0] || '/next.svg'}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to remove this from your wishlist?")) {
                      removeFromFavorites(product._id);
                    }
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition shadow-sm"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-5">
                <Link href={`/products/${product._id}`}>
                  <h3 className="font-serif font-semibold text-accent text-lg hover:text-primary transition">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-primary font-medium mt-1">₹{product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 bg-accent hover:bg-black text-white py-2.5 rounded-full transition duration-300 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
