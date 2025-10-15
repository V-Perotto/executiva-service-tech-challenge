import { Form, redirect, type ActionFunctionArgs } from "react-router";
import api from "~/api/api";

export function meta() {
  return [
    { title: "Nova Tarefa" },
    {
      name: "description",
      content: "Crie uma nova Tarefa para a lista.",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Title and content are required" };
  }

  const { data, error } = await api.post("/tasks", { title, description });

  if (error) {
    return { error: error.response?.data?.message || "Erro ao criar item" };
  }

  return redirect("/");
};

export default function NewTask() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crie uma nova tarefa</h2>
      <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-gray-700">Título</label>
          <input
            name="title"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Descrição</label>
          <textarea
            name="description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Crie a tarefa
        </button>
      </Form>
    </div>
  );
}