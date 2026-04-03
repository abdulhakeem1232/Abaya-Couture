import { getProduct, getProducts } from "@/app/actions/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p._id.toString() !== product._id.toString())
    .slice(0, 4);

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
                <p className="text-2xl font-bold text-primary">₹{product.discountPrice}</p>
                <p className="text-xl text-gray-400 line-through">₹{product.price}</p>
              </div>
            ) : (
              <p className="text-2xl text-gray-900 font-medium">₹{product.price}</p>
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

      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-accent mb-4">You May Also Like</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProduct) => (
              <Link href={`/products/${relProduct._id}`} key={relProduct._id} className="group cursor-pointer">
                <div className="relative h-[380px] w-full bg-[#fcfbf9] rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
                  <Image src={relProduct.images?.[0] || '/next.svg'} alt={relProduct.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-serif font-semibold text-accent mb-1 truncate">{relProduct.name}</h3>
                  {relProduct.discountPrice ? (
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-primary font-bold tracking-wide">₹{relProduct.discountPrice}</p>
                      <p className="text-gray-400 text-xs line-through">₹{relProduct.price}</p>
                    </div>
                  ) : (
                    <p className="text-primary font-medium tracking-wide">₹{relProduct.price}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
