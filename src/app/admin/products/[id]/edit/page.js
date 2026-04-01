import ProductForm from "@/app/admin/components/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/app/actions/product";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-serif font-bold text-gray-800">Edit Product</h2>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
