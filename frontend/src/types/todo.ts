interface Todo {
  _id?: string;
  titulo: string;
  descricao: string;
  status: string;
  data_criacao: Date;
  data_conclusao?: Date;
}

interface TodoEdit {
  _id?: string;
  titulo?: string;
  descricao?: string;
}

interface TodoState {
  todos?: Todo[];
  todoLoading?: boolean;
  loading?: boolean;
  error: null | string;
  getTodos?: () => void;
  createTodo?: (formData: Todo) => void;
  updateTodo?: (id: string, formData: TodoEdit) => void;
  changeStatus?: (id: string, status: string) => void;
  clearError?: () => void;
  deleteTodo?: (id: string) => void;
}

export type { Todo, TodoEdit, TodoState };
