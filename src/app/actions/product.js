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
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  for (const image of images) {
    if (image instanceof File && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, filename);
      
      await writeFile(filePath, buffer);
      uploadedPaths.push(`/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createProduct(formData) {
  await requireAdmin();
  await connectToDatabase();
  
  const images = await saveImages(formData);

  const discountPrice = formData.get("discountPrice");

  const newProduct = await Product.create({
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    discountPrice: discountPrice ? Number(discountPrice) : null,
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

  const discountPrice = formData.get("discountPrice");

  const updated = await Product.findByIdAndUpdate(id, {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    discountPrice: discountPrice ? Number(discountPrice) : null,
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
