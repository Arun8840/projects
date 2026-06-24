import type { ApiResponse } from '@/models/types/global.types';
import type { TodoResponse, Todos } from '@/models/types/todo.types';
import { publicApi } from './api-middleware';

export const todoService = {
  getAllTodos: async () => {
    const { data } = await publicApi.get<ApiResponse<TodoResponse>>('/api/todos');
    return data;
  },
  getTodoById: async (id: string) => {
    const { data } = await publicApi.get<ApiResponse<Todos>>(`/api/todos/todo/${id}`);
    return data;
  },
  createTodo: async (data: { title: string }) => {
    const { data: res } = await publicApi.post<ApiResponse<Todos>>('/api/todos/create', data);
    return res;
  },
  updateTodo: async (id: string, data: { title?: string; completed?: boolean }) => {
    const { data: res } = await publicApi.patch<ApiResponse<Todos>>(
      `/api/todos/update/${id}`,
      data,
    );
    return res;
  },
  deleteTodo: async (id: string) => {
    const { data } = await publicApi.delete<ApiResponse<Todos>>(`/api/todos/delete/${id}`);
    return data;
  },
};
