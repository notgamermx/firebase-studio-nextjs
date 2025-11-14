import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Sparkles, User } from 'lucide-react';

const LoadingDots = () => (
  <div className="flex items-center gap-1.5">
    <span
      className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/60"
      style={{ animationDelay: '0s' }}
    />
    <span
      className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/60"
      style={{ animationDelay: '0.2s' }}
    />
    <span
      className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/60"
      style={{ animationDelay: '0.4s' }}
    />
  </div>
);

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isLoading = message.id === 'loading';

  return (
    <div
      className={cn(
        'group relative mb-6 flex items-start gap-4',
        isUser && 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-lg border bg-background text-primary shadow-sm',
          isUser && 'order-2'
        )}
      >
        {isUser ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </div>
      <div
        className={cn(
          'max-w-[80%] space-y-2 overflow-hidden rounded-lg px-4 py-3 shadow-sm',
          isUser
            ? 'order-1 bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground'
        )}
      >
        {isLoading ? (
          <LoadingDots />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
}
