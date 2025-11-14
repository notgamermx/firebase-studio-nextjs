'use client';

import { Button } from '@/components/ui/button';

export function ExamplePromptsClient({
  prompts,
  onPromptClick,
}: {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto justify-start whitespace-normal bg-background text-left"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
