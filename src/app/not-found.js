import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/50 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-gray-100 shadow-xl shadow-stone-100/50 max-w-2xl w-full">
        <h1 className="text-7xl md:text-9xl font-serif font-black text-primary/10 tracking-widest relative">
          404
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-serif font-bold text-accent tracking-normal">
            Oops!
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-4 font-serif">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          The elegant page you are looking for seems to have been moved or no longer exists. Let's get you back to our collection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/products"
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full transition duration-300 font-medium flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
          <Link 
            href="/"
            className="w-full sm:w-auto bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-black px-8 py-3.5 rounded-full transition duration-300 font-medium flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
