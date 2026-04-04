"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useState } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { favCount } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="relative h-24 w-56 md:w-72 transition hover:opacity-85">
          <Image src="/logo.png" alt="Abaya Couture" fill className="object-contain mix-blend-multiply filter brightness-[1.05] contrast-[1.05]" priority />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700 tracking-wide uppercase">
          <Link href="/" className="hover:text-primary transition duration-300">Home</Link>
          <Link href="/products" className="hover:text-primary transition duration-300">Shop Collection</Link>
          <Link href="/about" className="hover:text-primary transition duration-300">About Us</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/favorites" className="text-gray-700 hover:text-primary transition relative">
            <Heart size={20} strokeWidth={1.5} />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                {favCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-primary transition relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition"
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4 text-sm font-medium text-gray-700 tracking-wide uppercase">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block hover:text-primary transition">Home</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)} className="block hover:text-primary transition">Shop Collection</Link>
          <Link href="#" onClick={() => setMobileOpen(false)} className="block hover:text-primary transition">About Us</Link>
        </div>
      )}
    </nav>
  );
}
