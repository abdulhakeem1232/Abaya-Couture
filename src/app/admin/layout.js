"use client";

import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {!isLoginPage && (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-xl font-serif font-bold text-primary">Abaya Couture Admin</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
