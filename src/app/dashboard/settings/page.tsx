"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Configurações</h1>
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <p className="text-gray-600">
          Aqui futuramente você poderá alterar dados da conta, trocar senha,
          configurar preferências etc.
        </p>
      </div>
    </div>
  );
}
