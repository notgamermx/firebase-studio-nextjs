import { Lightbulb } from 'lucide-react';
import { ExamplePromptsClient } from './example-prompts-client';

export function ExamplePrompts({
  prompts,
  onPromptClick,
}: {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}) {
  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="mb-4 rounded-lg border bg-card p-4">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Lightbulb className="h-5 w-5" />
          Get Started
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Click an example below to start a conversation, or type your own
          message.
        </p>
        <ExamplePromptsClient prompts={prompts} onPromptClick={onPromptClick} />
      </div>
    </div>
  );
}
