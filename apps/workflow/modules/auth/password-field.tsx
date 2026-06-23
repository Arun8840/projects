'use client';
import { Input } from '@repo/ui/input';

import { Field, FieldError, FieldLabel } from '@repo/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface PasswordFieldProps {
  id: string;
  name: string;
  conformKey?: string;
  defaultValue?: string;
  label: string;
  error?: string[];
  autoComplete?: string;
  'aria-invalid'?: boolean;
}

export function PasswordField({
  id,
  name,
  conformKey,
  defaultValue,
  label,
  error,
  autoComplete,
  ...props
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          {...props}
          aria-invalid={!!error}
          type={show ? 'text' : 'password'}
          key={conformKey}
          name={name}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
}
