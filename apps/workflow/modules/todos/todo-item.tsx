'use client';

import type { Todos } from '@/models/types/todo.types';
import { useDeleteTodo, useToggleTodo, useUpdateTodo } from '@/mutations/todo.mutation';
import { Button } from '@repo/ui/button';
import { DotLoader } from '@repo/ui/dot-loader';
import { Input } from '@repo/ui/input';
import { toast } from '@repo/ui/sonner';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todos;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const { mutate: toggleTodo, isPending: isToggling } = useToggleTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  const isPending = isToggling || isUpdating || isDeleting;

  const handleToggle = () => {
    toggleTodo(
      { id: todo.id, completed: !todo.completed },
      { onError: () => toast.error('Failed to update todo') },
    );
  };

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed || trimmed === todo.title) {
      setIsEditing(false);
      setEditTitle(todo.title);
      return;
    }

    updateTodo(
      { id: todo.id, data: { title: trimmed } },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success('Todo updated');
        },
        onError: () => toast.error('Failed to update todo'),
      },
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this todo?')) return;

    deleteTodo(todo.id, {
      onSuccess: () => toast.success('Todo deleted'),
      onError: () => toast.error('Failed to delete todo'),
    });
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isPending}
        className="h-4 w-4 shrink-0 accent-primary"
      />

      {isEditing ? (
        <div className="flex flex-1 gap-1 items-center">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            disabled={isPending}
            className="h-8"
            autoFocus
          />
          <Button size="icon-xs" onClick={handleSaveEdit} disabled={isPending}>
            {isUpdating ? <DotLoader speed="fast" size="sm" /> : <Check className="h-3 w-3" />}
          </Button>
          <Button size="icon-xs" variant="ghost" onClick={handleCancelEdit} disabled={isPending}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer truncate ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
            onDoubleClick={() => {
              setEditTitle(todo.title);
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>

          {todo.completed && <span className="text-xs text-muted-foreground shrink-0">Done</span>}

          <Button
            size="icon-xs"
            variant="ghost"
            onClick={() => {
              setEditTitle(todo.title);
              setIsEditing(true);
            }}
            disabled={isPending}
            aria-label="Edit todo"
          >
            <Pencil className="h-3 w-3" />
          </Button>

          <Button
            size="icon-xs"
            variant="ghost"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete todo"
          >
            {isDeleting ? <DotLoader speed="fast" size="sm" /> : <Trash className="h-3 w-3" />}
          </Button>
        </>
      )}
    </div>
  );
}
