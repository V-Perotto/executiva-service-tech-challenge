import { useEffect, useState } from "react";
import type { Route } from "./+types/tasks";
import { Link } from "react-router";
import { useRequireAuth } from "~/auth/protectedRoute";
import { getToken, logout } from "~/auth/authService";
import api from "~/api/api";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function meta() {
  return [
    { title: `Todas as tarefas` },
    {
      name: "description",
      content: "Gerencie suas tarefas - veja, crie, remova e atualize suas tarefas.",
    },
  ];
}

export async function loader() {
  const token = getToken();
  const { data, error } = await api.get("/tasks", {
    headers: { Authorization: `bearer ${token}` },
  });
  if (error) {
    return { error: error.message };
  }

  return { tasks: data };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  useRequireAuth();
  const [ tasks, setTasks ] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = getToken();
    const { data } = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (task: Task) => {
    const token = getToken();
    await api.patch(`/tasks/${task.id}`, { completed: !task.completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const deleteTask = async (taskId: string) => {
    const token = getToken();
    await api.delete(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Sair
        </button>
      </div>

      <a href="/tasks/new" className="text-blue-600 mb-4 inline-block">+ Nova Tarefa</a>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleComplete(task)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500"
              >
                {task.completed ? "Pendente" : "Concluir"}
              </button>
              <a
                href={`/tasks/edit/${task.id}`}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
              >
                Editar
              </a>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}