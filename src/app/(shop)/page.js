import HomeContent from "@/components/HomeContent";
import { getProducts } from "@/app/actions/product";

export default async function HomePage() {
  const products = await getProducts();
  
  return <HomeContent products={products} />;
}
