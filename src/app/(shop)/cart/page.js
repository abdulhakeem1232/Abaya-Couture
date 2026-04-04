"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, loaded } = useCart();

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-accent mb-3">Your Bag is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Discover our exquisite collection of luxury Abayas and find your perfect style.
        </p>
        <Link
          href="/products"
          className="bg-accent hover:bg-black text-white px-8 py-3.5 rounded-full transition duration-300 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-accent">Shopping Bag</h1>
          <p className="text-gray-500 mt-1 text-sm">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-1">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex gap-5 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="w-24 h-28 md:w-28 md:h-32 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={item.images?.[0] || '/next.svg'} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-semibold text-accent text-lg">{item.name}</h3>
                    {item.discountPrice ? (
                      <div className="mt-0.5 flex items-center gap-2">
                        <p className="text-primary font-bold">₹{item.discountPrice}</p>
                        <p className="text-gray-400 text-sm line-through">₹{item.price}</p>
                      </div>
                    ) : (
                      <p className="text-primary font-medium mt-0.5">₹{item.price}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 hover:bg-gray-50 transition text-gray-500 disabled:opacity-30"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-2 text-sm font-medium border-x border-gray-200 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-50 transition text-gray-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.success("Removed from bag");
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-28">
            <h2 className="text-lg font-serif font-bold text-accent mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-semibold text-accent">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            <a 
              href={`https://wa.me/916364208033?text=${encodeURIComponent(`Hello Abaya Couture! I want to order the following items from my bag:\n\n${cart.map(i => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}\n\nTotal: ₹${cartTotal}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-6 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-3.5 rounded-full flex items-center justify-center gap-2 transition duration-300 font-medium text-sm tracking-wide shadow-lg shadow-[#25D366]/20"
            >
              <FaWhatsapp size={20} /> Order via WhatsApp
            </a>
            <Link
              href="/products"
              className="block text-center text-sm text-gray-500 hover:text-primary transition mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
