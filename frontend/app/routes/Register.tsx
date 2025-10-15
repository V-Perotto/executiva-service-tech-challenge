import { Form, redirect, type ActionFunctionArgs } from "react-router";
import api from "../api/api";

export function meta() {
  return [
    { title: "Cadastro" },
    { name: "description", content: "Crie uma nova conta." },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios." };
  }

  try {
    await api.post("/auth/register", { name, email, password });
    return redirect("/login");
  } catch (err: any) {
    return { error: err.response?.data?.message || "Erro ao cadastrar usuário." };
  }
}

export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Crie sua conta</h2>
      <Form method="post" className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            name="name"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Senha</label>
          <input
            name="password"
            type="password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Cadastrar
        </button>
        <p className="mt-4">
          Já tem conta? <a href="/login" className="text-blue-600">Entrar</a>
        </p>
      </Form>
    </div>
  );
}
