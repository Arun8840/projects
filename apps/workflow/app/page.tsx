import { Button } from '@repo/ui/button';
import { Sparkle } from 'lucide-react';

export default function Page() {
  return (
    <main className="bg-white min-h-screen flex justify-center items-center">
      <Button size={'sm'}>
        <Sparkle />
        hello world
      </Button>
    </main>
  );
}
