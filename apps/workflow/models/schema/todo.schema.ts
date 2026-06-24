import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  completed: z.boolean().optional(),
});

export const todoParamsSchema = z.object({
  id: z.string(),
});

export type CreateTodoDTO = z.infer<typeof createTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;
