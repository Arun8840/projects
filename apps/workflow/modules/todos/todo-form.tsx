'use client';

import { createTodoSchema } from '@/models/schema/todo.schema';
import type { CreateTodoDTO } from '@/models/schema/todo.schema';
import { useCreateTodo } from '@/mutations/todo.mutation';
import { useForm } from '@conform-to/react';
import type { SubmissionResult } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@repo/ui/button';
import { DotLoader } from '@repo/ui/dot-loader';
import { Field, FieldError, FieldLabel } from '@repo/ui/field';
import { Input } from '@repo/ui/input';
import { toast } from '@repo/ui/sonner';
import { useState } from 'react';

export function TodoForm() {
  const [lastResult, setLastResult] = useState<SubmissionResult | null>(null);
  const [formKey, setFormKey] = useState(0);
  const { mutateAsync: createTodo, isPending } = useCreateTodo();

  const [form, fields] = useForm<CreateTodoDTO>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleAction = async (formData: FormData) => {
    if (isPending) return;

    const submission = parseWithZod(formData, { schema: createTodoSchema });
    if (submission.status !== 'success') {
      setLastResult(submission.reply());
      return;
    }

    try {
      await createTodo({ title: submission.value.title });
      toast.success('Todo created');
      setLastResult(null);
      setFormKey((k) => k + 1);
    } catch {
      setLastResult(
        submission.reply({
          formErrors: ['Failed to create todo. Please try again.'],
        }),
      );
    }
  };

  return (
    <form key={formKey} id={form.id} onSubmit={form.onSubmit} action={handleAction} noValidate>
      {form.errors && (
        <p role="alert" className="text-destructive text-sm mb-2">
          {form.errors}
        </p>
      )}
      <div className="flex gap-2 items-start">
        <Field className="flex-1">
          <FieldLabel htmlFor={fields.title.id} className="sr-only">
            Title
          </FieldLabel>
          <Input
            aria-invalid={!!fields.title.errors}
            key={fields.title.key}
            name={fields.title.name}
            defaultValue={fields.title.initialValue}
            placeholder="What needs to be done?"
            disabled={isPending}
          />
          <FieldError>{fields.title.errors}</FieldError>
        </Field>
        <Button type="submit" disabled={isPending} size="sm">
          {isPending ? <DotLoader speed="fast" size="sm" /> : 'Add'}
        </Button>
      </div>
    </form>
  );
}
