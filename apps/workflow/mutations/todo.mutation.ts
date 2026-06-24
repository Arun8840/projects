import { todoService } from '@/controller/todo.service';
import { todoKeys } from '@/keys/todo.keys';
import type { CreateTodoDTO, UpdateTodoDTO } from '@/models/schema/todo.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTodoDTO) => todoService.createTodo(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoDTO }) =>
      todoService.updateTodo(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todoService.updateTodo(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  });
}
