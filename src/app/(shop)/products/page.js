import { getProducts } from "@/app/actions/product";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">Shop Collection</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">Browse our complete collection of elegant, timeless Abayas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id} className="group cursor-pointer">
            <div className="relative h-[420px] w-full bg-[#fcfbf9] rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
              <Image src={product.images?.[0] || '/next.svg'} alt={product.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-serif font-semibold text-accent mb-1 truncate">{product.name}</h3>
              <p className="text-primary font-medium tracking-wide">₹{product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-400 py-20 font-medium">
          No products found. Please check back later.
        </div>
      )}
    </div>
  );
}
