import { getProduct, getProducts } from "@/app/actions/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p._id.toString() }));
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition mb-8 text-sm font-medium uppercase tracking-wider">
        <ArrowLeft size={16} /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col justify-center py-10">
          <div className="mb-3 text-sm text-primary tracking-widest uppercase font-medium">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-6 leading-[1.1]">
            {product.name}
          </h1>
          <div className="mb-8">
            {product.discountPrice ? (
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-primary">₹{product.discountPrice.toFixed(2)}</p>
                <p className="text-xl text-gray-400 line-through">₹{product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-2xl text-gray-900 font-medium">₹{product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="prose prose-gray text-gray-500 mb-12 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <ProductActions product={product} />

          <div className="mt-16 pt-8 border-t border-gray-100 space-y-5 text-sm text-gray-500">
            <p className="flex justify-between"><span>Material:</span> <span className="text-gray-900 font-medium">Premium Nida/Crepe</span></p>
            <p className="flex justify-between"><span>Care:</span> <span className="text-gray-900 font-medium">Dry Clean Recommended</span></p>
            <p className="flex justify-between"><span>Shipping:</span> <span className="text-gray-900 font-medium">Free within GCC</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
