import { NovaLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface ChatHeaderProps {
  onNewThread: () => void;
}

export function ChatHeader({ onNewThread }: ChatHeaderProps) {
  return (
    <header className="flex w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <NovaLogo className="h-6 w-6 text-primary" />
        <h1 className="font-headline text-lg font-semibold">Nova</h1>
      </div>
      <Button variant="ghost" size="sm" onClick={onNewThread}>
        <PenSquare className="mr-2 h-4 w-4" />
        New Thread
      </Button>
    </header>
  );
}
