"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/product";
import { toast } from "sonner";

export default function ProductForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState(initialData?.images || []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("existingImages", JSON.stringify(existingImages));

    const price = Number(formData.get("price"));
    const discountPrice = formData.get("discountPrice");
    if (discountPrice && Number(discountPrice) > price) {
      toast.error("Discount price cannot be more than actual price");
      setLoading(false);
      return;
    }

    try {
      if (initialData) {
        await updateProduct(initialData._id, formData);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(formData);
        toast.success("Product created successfully!");
      }
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const removeImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-gray-100 pb-4 mb-2">
        <h2 className="text-xl font-serif font-bold text-accent">
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-400 text-sm">Fill in the details below to {initialData ? "update" : "create"} your product.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input name="name" defaultValue={initialData?.name} required className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Elegant Black Abaya" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} required rows="4" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Describe the fabric, design, etc." />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input name="price" type="number" step="1" min="0" defaultValue={initialData?.price} required className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (₹)</label>
          <input name="discountPrice" type="number" step="1" min="0" defaultValue={initialData?.discountPrice} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="0 (Optional)" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" defaultValue={initialData?.category || "Abaya"} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="Abaya">Abaya</option>
            <option value="Hijab">Hijab</option>
            <option value="Dress">Dress</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
        
        {existingImages.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            {existingImages.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
                <img src={img} alt="Product" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative group">
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl outline-none focus:border-primary transition bg-gray-50 hover:bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-2 italic">You can select multiple images. New images will be added to the gallery.</p>
      </div>
      <div className="pt-4 flex gap-3">
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition font-medium disabled:opacity-50">
          {loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
