import { getProducts, deleteProduct } from "../actions/product";
import Link from "next/link";
import Image from "next/image";
import { Edit } from "lucide-react";
import DeleteProductButton from "./components/DeleteProductButton";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-gray-800">Products Overview</h2>
        <Link href="/admin/products/new" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg transition font-medium text-sm">
          + Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-5 font-semibold">Product</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold">Category</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">No products found. Add some to get started!</td>
              </tr>
            ) : products.map((product) => (
              <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={product.images?.[0] || '/next.svg'} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 truncate w-64 mt-0.5">{product.description}</p>
                  </div>
                </td>
                <td className="p-5 font-medium text-gray-700">
                  {product.discountPrice ? (
                    <div>
                      <span className="text-primary font-bold">₹{product.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">₹{product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>₹{product.price.toFixed(2)}</span>
                  )}
                </td>
                <td className="p-5">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/admin/products/${product._id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Edit size={18} />
                    </Link>
                    <DeleteProductButton productId={product._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
