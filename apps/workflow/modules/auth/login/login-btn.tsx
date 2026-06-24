'use client';

import { Button } from '@repo/ui/button';
import { DotLoader } from '@repo/ui/dot-loader';
import { useFormStatus } from 'react-dom';
const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" size={'sm'} type="submit" disabled={pending}>
      {pending ? <DotLoader speed="fast" /> : 'Submit'}
    </Button>
  );
};

export default LoginButton;
