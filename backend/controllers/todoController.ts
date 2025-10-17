import { createTodoSchema, updateTodoSchema } from '../types/todo';
import Todo from '../models/todo';
import User from '../models/user';
import { Request, Response } from 'express';

const createTodo = async (req: Request, res: Response) => {
  const createPayload = req.body;
  console.log("create", createPayload);
  const parsedPayload = createTodoSchema.safeParse(createPayload);
  console.log("parsedPayload", parsedPayload);
  if (!parsedPayload.success) {
    res.status(411).json({ error: parsedPayload.error });
    return;
  }

  const { 
    titulo, 
    descricao, 
    status, 
    data_criacao, 
    data_conclusao 
  } = parsedPayload.data;
  
  const todo = new Todo({
    titulo,
    descricao,
    status,
    data_criacao,
    data_conclusao
  });

  try {
    await todo.save();

    const user: any = await User.findOne({ email: createPayload.email });
    user.todos.push(todo._id);
    await user.save();
    
    res.status(201).json({ todo, message: 'Tarefa criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user: any = await User.findOne({ email });

    let todos: any[] = [];
    for (let todoId of user.todos) {
      const todoData: any = await Todo.findById(todoId);
      todos.push(todoData);
    }

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descricao, status } = req.body;
    const parsedPayload = updateTodoSchema.safeParse({ 
      id, titulo, descricao, status 
    });
    if (!parsedPayload.success) {
      res.status(411).json({ error: parsedPayload.error });
      return;
    }

    const updateData = {
      status,
      titulo,
      descricao,
      ...(status === "concluída" ? { data_conclusao: new Date() } : {})
    };
    await Todo.findByIdAndUpdate({ _id: id }, updateData);
    res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedPayload = updateTodoSchema.safeParse({ id });
    if (!parsedPayload.success) {
      res.status(411).json({ error: parsedPayload.error });
      return;
    }

    await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
