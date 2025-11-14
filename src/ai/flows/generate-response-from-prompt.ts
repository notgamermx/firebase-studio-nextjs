'use server';

/**
 * @fileOverview A Genkit flow that takes a prompt as input and returns a response from the AI chatbot.
 *
 * - generateResponse - A function that handles the AI chatbot response generation.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  prompt: z.string().describe('The prompt to send to the AI chatbot.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

// Offline, rule-based responses
const offlineResponses: {keywords: string[]; response: string}[] = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello there! I'm Nova. How can I assist you today?",
  },
  {
    keywords: ['how are you', 'how is it going'],
    response: "I'm operating at full capacity! Thanks for asking. What's on your mind?",
  },
  {
    keywords: ['help', 'support', 'what can you do'],
    response: "I can answer questions, tell jokes, and have a simple conversation. Feel free to ask me anything!",
  },
  {
    keywords: ['who are you', 'what are you'],
    response: "I am Nova, an AI assistant designed to be helpful and engaging.",
  },
  {
    keywords: ['who made you', 'who created you', 'developer'],
    response: 'I was created by a talented developer using some very clever code!',
  },
  {
    keywords: ['joke', 'funny'],
    response: "Why don't scientists trust atoms? Because they make up everything!",
  },
  {
    keywords: ['thank you', 'thanks'],
    response: "You're welcome! Is there anything else I can help you with?",
  },
  {
    keywords: ['bye', 'goodbye'],
    response: 'Goodbye! Have a great day!',
  },
  {
    keywords: ['what is your name'],
    response: "My name is Nova. It's a pleasure to chat with you!",
  },
  {
    keywords: ['what time is it', 'current time'],
    response: "I can't check the real-world time, but I can tell you it's always the right time to learn something new!",
  }
];

const defaultOfflineResponses = [
  "That's an interesting question. I'll have to think about that.",
  "I'm not quite sure how to answer that. Could you try rephrasing?",
  "I'm still learning and don't have information on that topic. How about we talk about something else?",
  "Let's change the subject. Did you know that the honeybee is the only insect that produces food eaten by man?",
  "I'm afraid I don't have the answer to that. Can I help with something else?",
];

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  const prompt = input.prompt.toLowerCase();

  for (const rule of offlineResponses) {
    for (const keyword of rule.keywords) {
      if (prompt.includes(keyword)) {
        return Promise.resolve({ response: rule.response });
      }
    }
  }

  // If no keyword is matched, return a random default response.
  const randomIndex = Math.floor(Math.random() * defaultOfflineResponses.length);
  return Promise.resolve({
    response: defaultOfflineResponses[randomIndex]
  });
}
