"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] pt-12 pb-24">
      {/* Hero Header */}
      <section className="relative h-[40vh] w-full flex items-center justify-center bg-[#f5f3ef] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10" />
        <div className="relative z-20 text-center px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-serif text-accent tracking-wide">
              About Us
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
              Our Story & Vision
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <h2 className="text-3xl font-serif text-accent font-semibold">Elegance in Every Thread</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg pt-4 max-w-3xl mx-auto">
              Welcome to Abaya Couture. We believe that modesty should never come at the expense of style. Founded on the principles of timeless elegance, premium craftsmanship, and modern sophistication, we craft Abayas that empower women to express their grace confidently.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-accent font-semibold">Our Craftsmanship</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece in our collection is meticulously hand-crafted using the finest Nida and Crepe fabrics. We pay close attention to the smallest details—from intricate embroidery to sleek, minimalist silhouettes—ensuring that each Abaya is a masterpiece of design and comfort.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are dressing for a special occasion or seeking an everyday essential, our designs are curated to blend tradition with contemporary aesthetics seamlessly.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <Image src="/next.svg" alt="Craftsmanship" fill className="object-cover opacity-20 p-20" />
              <div className="absolute inset-0 flex items-center justify-center bg-accent/5 backdrop-blur-[2px]">
                <span className="text-accent/50 font-serif font-bold text-xl tracking-widest uppercase">Premium Quality</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center pt-10">
            <h3 className="text-2xl font-serif text-accent font-semibold mb-6">Join Our Journey</h3>
            <p className="text-gray-600 leading-relaxed mx-auto max-w-2xl mb-10">
              Discover a new standard of modest fashion. We are dedicated to providing an unparalleled shopping experience and garments that you will cherish for years to come.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-accent hover:bg-black text-white px-8 py-3.5 rounded-full transition duration-300 font-medium shadow-lg shadow-accent/20">
              Explore Collection <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
