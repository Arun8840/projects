import { todoService } from '@/controller/todo.service';
import { todoKeys } from '@/keys/todo.keys';
import { useQuery } from '@tanstack/react-query';

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: todoService.getAllTodos,
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoService.getTodoById(id),
    enabled: !!id,
  });
}
