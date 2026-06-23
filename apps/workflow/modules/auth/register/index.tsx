'use client';

import { registerSchema } from '@/models/schema';
import { PasswordField } from '@/modules/auth/password-field';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button } from '@repo/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@repo/ui/field';
import { Input } from '@repo/ui/input';
import Link from 'next/link';
import { useActionState } from 'react';
import { register } from './_action';
import RegisterButton from './register-btn';

function Register() {
  const [lastResult, action] = useActionState(register, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className="w-full max-w-3xl z-1"
    >
      <Card className="w-full">
        <CardHeader className="text-center space-y-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg font-bold mx-auto">
            W
          </div>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Sign up to start building your workflow automation.</CardDescription>
        </CardHeader>
        <CardContent>
          {form.errors && (
            <div role="alert" className="text-destructive text-sm font-normal mb-4">
              {form.errors}
            </div>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={fields.name.id}>Name</FieldLabel>
              <Input
                aria-invalid={!!fields?.name?.errors}
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
              <FieldError>{fields.name.errors}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor={fields.email.id}>Email</FieldLabel>
              <Input
                aria-invalid={!!fields?.email?.errors}
                type="email"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                className="border"
                autoComplete="off"
              />
              <FieldError>{fields.email.errors}</FieldError>
            </Field>
            <div className="grid gap-4 lg:grid-cols-2">
              <PasswordField
                id={fields.password.id}
                name={fields.password.name}
                conformKey={fields.password.key}
                defaultValue={fields.password.initialValue}
                label="Password"
                error={fields.password.errors}
                autoComplete="new-password"
              />
              <PasswordField
                id={fields.confirmPassword.id}
                name={fields.confirmPassword.name}
                conformKey={fields.confirmPassword.key}
                defaultValue={fields.confirmPassword.initialValue}
                label="Confirm Password"
                error={fields.confirmPassword.errors}
                autoComplete="new-password"
              />
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col">
          <RegisterButton />
          <Button variant="link" className="w-full" size={'sm'} asChild>
            <Link href="/auth/login">Already have an account? Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Register;
