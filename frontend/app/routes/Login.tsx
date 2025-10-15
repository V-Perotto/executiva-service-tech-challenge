import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router";
import { useAuth } from "../auth/useAuth";
import { isLogged } from "~/auth/authService";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Acesse sua conta." },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email e senha são obrigatórios." };
  }

  try {
    const { login } = useAuth();
    await login(email, password);
    return redirect("/");
  } catch {
    return { error: "Credenciais inválidas." };
  }
}

export default function Login() {
  const actionData = useActionData() as { error?: string };

  if (isLogged()) return <p>Você já está logado. <a href="/tasks">Ir para tarefas</a></p>;
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Form method="post" className="space-y-4 bg-white p-6 rounded shadow">
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
          Entrar
        </button>
      </Form>
    </div>
  );
}