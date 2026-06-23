'use client';

import { loginSchema } from '@/models/schema';
import { PasswordField } from '@/modules/auth/password-field';
import { signIn } from '@/utils/auth/client';
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
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import LoginButton from './login-btn';

function Login() {
  const router = useRouter();
  const [lastResult, action] = useActionState(async (_: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, { schema: loginSchema });
    if (submission.status !== 'success') return submission.reply();

    const { error } = await signIn.email({
      email: submission.value.email,
      password: submission.value.password,
    });

    if (error) {
      return submission.reply({
        formErrors: [error.message || 'Invalid credentials'],
      });
    }

    router.push('/');
    return null;
  }, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
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
      className="w-full max-w-md z-1"
    >
      <Card className="w-full">
        <CardHeader className="text-center space-y-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg font-bold mx-auto">
            W
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue building your workflow automation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {form.errors && (
            <div role="alert" className="text-destructive text-sm font-normal mb-4 text-center">
              {form.errors}
            </div>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={fields.email.id}>Email</FieldLabel>
              <Input
                aria-invalid={!!fields?.email?.errors}
                type="email"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                className="border"
              />
              <FieldError>{fields.email.errors}</FieldError>
            </Field>
            <PasswordField
              id={fields.password.id}
              name={fields.password.name}
              conformKey={fields.password.key}
              defaultValue={fields.password.initialValue}
              label="Password"
              error={fields.password.errors}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col">
          <LoginButton />
          <Button variant="link" className="w-full" size={'sm'} asChild>
            <Link href="/auth/register">Don&apos;t have an account? Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;
