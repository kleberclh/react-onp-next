"use client";

import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-medium">
          Você precisa estar logado para acessar essa página.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">
          Olá, {session.user.name} 👋
        </h1>
        <div className="text-left text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">ID:</span> {session.user.id}
          </p>
          <p>
            <span className="font-semibold">UUID:</span> {session.user.uuid}
          </p>
          <p>
            <span className="font-semibold">Admin:</span>{" "}
            {session.user.isAdmin ? "✅ Sim" : "❌ Não"}
          </p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => signOut({ callbackUrl: "/auth" })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
