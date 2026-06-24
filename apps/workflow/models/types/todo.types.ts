import { ApiResponse } from './global.types';

export interface Todos {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoResponse = Todos[];
