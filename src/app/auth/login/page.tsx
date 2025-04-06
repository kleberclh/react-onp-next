"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Erro ao fazer login. Verifique o e-mail e a senha.");
      console.error("Erro de login:", result);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Tabs.Root defaultValue="login" className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <Tabs.List className="flex border-b mb-4">
          <Tabs.Trigger
            value="login"
            className="flex-1 text-center py-2 text-gray-600 hover:text-black data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:font-medium"
          >
            Entrar
          </Tabs.Trigger>
          <Tabs.Trigger
            value="register"
            className="flex-1 text-center py-2 text-gray-600 hover:text-black data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:font-medium"
          >
            Cadastrar
          </Tabs.Trigger>
          <Tabs.Trigger
            value="password"
            className="flex-1 text-center py-2 text-gray-600 hover:text-black data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:font-medium"
          >
            Password
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Login */}
        <Tabs.Content value="login">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded text-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded text-sm"
            />
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
              Entrar
            </Button>
          </form>
        </Tabs.Content>

        {/* Tab Cadastrar (aqui é só o layout, pode conectar depois com seu sistema de registro) */}
        <Tabs.Content value="register">
          <div className="text-sm text-gray-500">
            Ainda não implementado. Em breve você poderá se cadastrar aqui!
          </div>
        </Tabs.Content>
        <Tabs.Content value="password">
          <div className="text-sm text-gray-500">
            Ainda não implementado. Em breve você poderá redefinir a senha  aqui!
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
