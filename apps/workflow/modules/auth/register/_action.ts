'use server';

import { parseWithZod } from '@conform-to/zod';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { registerSchema } from '@/models/schema';
import { authServer } from '@/utils/auth/server';

export async function register(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await authServer.api.signUpEmail({
      body: {
        name: submission.value.name,
        email: submission.value.email,
        password: submission.value.password,
      },
      headers: await headers(),
    });
  } catch (error) {
    return submission.reply({
      formErrors: [error instanceof Error ? error.message : 'Failed to create account'],
    });
  }

  redirect('/auth/login');
}
