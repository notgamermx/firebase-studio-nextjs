'use server';
/**
 * @fileOverview Provides example prompts to help users understand how to interact with the chatbot.
 *
 * - provideExamplePrompts - A function that returns a list of example prompts.
 * - ProvideExamplePromptsOutput - The return type for the provideExamplePrompts function.
 */

import {z} from 'genkit';

const ProvideExamplePromptsOutputSchema = z.array(
  z.string().describe('An example prompt for the chatbot.')
);
export type ProvideExamplePromptsOutput = z.infer<
  typeof ProvideExamplePromptsOutputSchema
>;

const examplePrompts = [
  'Write a short poem about the beauty of nature.',
  'Summarize the key points of the latest climate change report.',
  'Translate the following sentence into French: "Hello, how are you?"',
  'Explain the concept of quantum physics in simple terms.',
  'Suggest three healthy recipes for a vegetarian diet.',
];

export async function provideExamplePrompts(): Promise<ProvideExamplePromptsOutput> {
  return Promise.resolve(examplePrompts);
}
