import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-accent text-white pt-20 pb-10 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        <div className="md:col-span-2">
          <h3 className="text-3xl font-serif font-bold text-primary mb-6">Abaya Couture</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
            Elevate your modesty with our premium collection of luxury Abayas, designed for the modern woman who embraces elegance and grace. Experience timeless luxury in every thread.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition group">
              <FaInstagram size={18} className="text-gray-400 group-hover:text-white transition" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition group">
              <FaFacebook size={18} className="text-gray-400 group-hover:text-white transition" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition group">
              <FaWhatsapp size={18} className="text-gray-400 group-hover:text-white transition" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition group">
              <FaTwitter size={18} className="text-gray-400 group-hover:text-white transition" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-6 tracking-wider uppercase text-sm text-gray-200">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/" className="hover:text-primary transition duration-300">Home</a></li>
            <li><a href="/products" className="hover:text-primary transition duration-300">Shop Collection</a></li>
            <li><a href="/cart" className="hover:text-primary transition duration-300">My Bag</a></li>
            <li><a href="/favorites" className="hover:text-primary transition duration-300">Wishlist</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 tracking-wider uppercase text-sm text-gray-200">Customer Care</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-primary transition duration-300">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition duration-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition duration-300">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-primary transition duration-300">Returns & Exchanges</a></li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 mt-20 border-t border-white/10 pt-8">
        <p>&copy; {new Date().getFullYear()} Abaya Couture. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
