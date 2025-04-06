"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Início", href: "/dashboard" },
  { name: "Perfil", href: "/dashboard/profile" },
  { name: "Configurações", href: "/dashboard/settings" },
  { name: "Pagamentos", href: "/dashboard/payments" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition duration-200 ease-in-out w-64 bg-white shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Painel</h2>
          <button className="md:hidden" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md transition font-medium ${
                pathname === item.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="mt-4 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sair
          </button>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <h1 className="text-lg font-semibold text-indigo-700">Dashboard</h1>
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
