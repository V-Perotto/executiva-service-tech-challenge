import { z } from 'zod';

const createTodoSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  status: z.enum(['pendente', 'em andamento', 'concluída']),
  data_criacao: z.string().datetime().transform((str) => new Date(str)),
  data_conclusao: z.string().datetime().optional().nullable().transform((str) => str ? new Date(str) : null),
});

const updateTodoSchema = z.object({
  id: z.string(),
  titulo: z.string().optional(),
  descricao: z.string().optional(),
  status: z.enum(['pendente', 'em andamento', 'concluída']).optional(),
});

export { createTodoSchema, updateTodoSchema };
