"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Perfil</h1>
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <p>
          <strong>Nome:</strong> {session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p>
          <strong>UUID:</strong> {session.user.uuid}
        </p>
        <p>
          <strong>ID:</strong> {session.user.id}
        </p>
        <p>
          <strong>Admin:</strong> {session.user.isAdmin ? "Sim" : "Não"}
        </p>
      </div>
    </div>
  );
}
