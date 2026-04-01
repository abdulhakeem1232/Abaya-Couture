"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function HomeContent({ products }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="overflow-hidden bg-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-[#f5f3ef] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-10" />
          {/* Decorative premium SVG Path / Subtle Pattern */}
          <svg className="absolute w-full h-full text-primary/10 opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q50,150 100,0 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-[0.4em] uppercase text-[10px] md:text-xs">
              Exquisite Modesty • Timeless Elegance
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-serif text-accent leading-[1.05] tracking-tight">
              Elegance in Every <br /><span className="text-primary italic font-light">Thread</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed pt-2">
              Discover our exclusive range of luxury Abayas crafted for the modern woman who values modesty without compromising on style.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-8 flex justify-center">
              <Link href="/products" className="bg-accent hover:bg-black text-white px-8 py-3.5 rounded-full transition duration-300 font-medium flex items-center gap-2 shadow-lg shadow-accent/20">
                Shop Collection <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent mb-4">Latest Arrivals</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {products && products.slice(0, 3).map((product) => (
            <motion.div key={product._id} variants={fadeInUp} className="group cursor-pointer">
              <Link href={`/products/${product._id}`}>
                <div className="relative h-[480px] w-full bg-[#fcfbf9] rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                  <Image src={product.images?.[0] || '/next.svg'} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain transition duration-700 group-hover:scale-105 p-4" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-300" />
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                      className="p-3 bg-white/90 backdrop-blur hover:bg-white text-gray-800 rounded-full shadow-lg transition"
                    >
                      <Heart size={20} className={isFavorite(product._id) ? "fill-primary text-primary" : ""} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product); }}
                      className="p-3 bg-white/90 backdrop-blur hover:bg-white text-gray-800 rounded-full shadow-lg transition"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>

                  {/* View Details Button */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                    <div className="bg-white/95 backdrop-blur-md py-3.5 px-6 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:bg-accent hover:text-white group/btn">
                      <span className="text-accent group-hover/btn:text-white text-sm font-semibold uppercase tracking-wider transition-colors">View Details</span>
                      <ArrowRight size={16} className="text-accent group-hover/btn:text-white transition-colors" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-serif font-semibold text-accent mb-1">{product.name}</h3>
                  <div className="flex items-center justify-center gap-3">
                    {product.discountPrice ? (
                      <>
                        <p className="text-primary font-bold tracking-wide">₹{product.discountPrice.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm font-medium line-through">₹{product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="text-primary font-medium tracking-wide">₹{product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-3 text-center text-gray-400 py-12 font-medium">
              No products available yet. Admin can add products in the dashboard.
            </div>
          )}
        </motion.div>

        {products && products.length > 3 && (
          <div className="mt-16 text-center">
            <Link href="/products" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full transition duration-300 font-medium tracking-wide uppercase text-sm">
              View All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
