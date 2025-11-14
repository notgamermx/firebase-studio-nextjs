'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { generateResponse } from '@/ai/flows/generate-response-from-prompt';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ExamplePrompts } from './example-prompts';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { provideExamplePrompts } from '@/ai/flows/provide-example-prompts';

const LOCAL_STORAGE_KEY = 'nova-chat-session';

export function ChatPanel() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [examplePrompts, setExamplePrompts] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Failed to parse messages from localStorage', error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }

    const fetchPrompts = async () => {
      try {
        const prompts = await provideExamplePrompts();
        setExamplePrompts(prompts);
      } catch (error) {
        console.error('Failed to fetch example prompts', error);
      }
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [messages]);

  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      'div[data-radix-scroll-area-viewport]'
    );
    if (viewport) {
      setTimeout(() => {
        viewport.scrollTop = viewport.scrollHeight;
      }, 100);
    }
  }, [messages, isLoading]);

  const handleNewThread = () => {
    setMessages([]);
  };

  const handlePromptClick = async (prompt: string) => {
    await handleSubmit({ prompt });
  };

  const handleSubmit = async (values: { prompt: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: values.prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse({ prompt: values.prompt });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Failed to get a response from the AI. Please try again.',
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full max-w-4xl flex-col rounded-lg border bg-card shadow-lg">
      <ChatHeader onNewThread={handleNewThread} />
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="px-4 py-6">
          {messages.length > 0 ? (
            messages.map((m) => <ChatMessage key={m.id} message={m} />)
          ) : (
            <ExamplePrompts
              prompts={examplePrompts}
              onPromptClick={handlePromptClick}
            />
          )}
          {isLoading && (
            <ChatMessage
              message={{ id: 'loading', role: 'assistant', content: '' }}
            />
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-background/80 px-4 py-3 backdrop-blur-sm">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
