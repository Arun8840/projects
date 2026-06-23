'use server';

import { loginSchema } from '@/models/schema';
import { authServer } from '@/utils/auth/server';
import { parseWithZod } from '@conform-to/zod';
import { headers } from 'next/headers';

export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await authServer.api.signInEmail({
      body: {
        email: submission.value.email,
        password: submission.value.password,
      },
      headers: await headers(),
    });
  } catch (error) {
    return submission.reply({
      formErrors: [error instanceof Error ? error.message : 'Invalid credentials'],
    });
  }

  return null;
}
