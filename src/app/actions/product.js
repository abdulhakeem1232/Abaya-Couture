"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) throw new Error("Unauthorized");
  const payload = await verifyToken(token);
  if (!payload) throw new Error("Unauthorized");
  return payload;
}

export async function getProducts() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProduct(id) {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  return JSON.parse(JSON.stringify(product));
}

async function saveImages(formData) {
  const images = formData.getAll("images");
  if (!images || images.length === 0 || (images.length === 1 && images[0].size === 0)) {
    return [];
  }

  const uploadedPaths = [];

  for (const image of images) {
    if (image instanceof File && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const base64 = buffer.toString('base64');
      const mimeType = image.type || 'image/jpeg';
      uploadedPaths.push(`data:${mimeType};base64,${base64}`);
    }
  }
  return uploadedPaths;
}

export async function createProduct(formData) {
  await requireAdmin();
  await connectToDatabase();
  
  const images = await saveImages(formData);

  const rawPrice = Number(formData.get("price"));
  const price = Math.round(rawPrice);
  
  const rawDiscount = formData.get("discountPrice");
  const discountPrice = rawDiscount ? Math.round(Number(rawDiscount)) : null;

  if (discountPrice !== null && discountPrice > price) {
    throw new Error("Discount price cannot be more than actual price");
  }

  const newProduct = await Product.create({
    name: formData.get("name"),
    description: formData.get("description"),
    price: price,
    discountPrice: discountPrice,
    images: images,
    category: formData.get("category") || 'Abaya',
  });
  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/products');
  return JSON.parse(JSON.stringify(newProduct));
}

export async function updateProduct(id, formData) {
  await requireAdmin();
  await connectToDatabase();
  
  const newImages = await saveImages(formData);
  const existingImagesJson = formData.get("existingImages");
  const keepImages = existingImagesJson ? JSON.parse(existingImagesJson) : [];
  
  const finalImages = [...keepImages, ...newImages];

  const rawPrice = Number(formData.get("price"));
  const price = Math.round(rawPrice);
  
  const rawDiscount = formData.get("discountPrice");
  const discountPrice = rawDiscount ? Math.round(Number(rawDiscount)) : null;

  if (discountPrice !== null && discountPrice > price) {
    throw new Error("Discount price cannot be more than actual price");
  }

  const updated = await Product.findByIdAndUpdate(id, {
    name: formData.get("name"),
    description: formData.get("description"),
    price: price,
    discountPrice: discountPrice,
    images: finalImages,
    category: formData.get("category") || 'Abaya',
  }, { new: true });
  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/products');
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteProduct(id) {
  await requireAdmin();
  await connectToDatabase();
  await Product.findByIdAndDelete(id);
  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/products');
  return { success: true };
}
