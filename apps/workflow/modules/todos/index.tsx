'use client';

import { useTodos } from '@/queries/todo.queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import { DotLoader } from '@repo/ui/dot-loader';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';

function TodoPage() {
  const { data, isLoading, isError, error } = useTodos();

  if (isLoading) {
    return (
      <section className="p-2 border min-h-screen flex justify-center items-center">
        <DotLoader speed="fast" size="sm" color="#0ea5e9" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="p-2 border min-h-screen flex justify-center items-center">
        <p className="text-destructive">Error: {error?.message}</p>
      </section>
    );
  }

  const todos = data?.data ?? [];

  return (
    <section className="relative p-2 border min-h-screen flex justify-center items-center">
      {/* Shader gradient background */}
      <div
        className="fixed inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 80% 55% at 0% 20%, color-mix(in oklab, var(--primary) 35%, transparent), transparent)',
            'radial-gradient(ellipse 60% 70% at 100% 80%, color-mix(in oklab, var(--accent-foreground) 25%, transparent), transparent)',
            'radial-gradient(ellipse 50% 60% at 50% 50%, color-mix(in oklab, var(--chart-2) 15%, transparent), transparent)',
          ].join(', '),
        }}
      />
      <Card className="w-full max-w-3xl z-1">
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="flex items-center justify-between">
              <h2>Todo Items</h2>
            </div>
          </CardTitle>
          <CardDescription>Manage your todos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TodoForm />
          <div className="divide-y">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No todos yet. Create one above!
              </p>
            ) : (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default TodoPage;
