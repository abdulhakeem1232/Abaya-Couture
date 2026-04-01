import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: false },
  images: [{ type: String }],
  imageUrl: { type: String, required: false }, // Defensive for stale Mongoose validation
  category: { type: String, default: 'Abaya' },
}, { timestamps: true });

if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export default mongoose.model("Product", ProductSchema);
