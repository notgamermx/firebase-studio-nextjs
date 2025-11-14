'use server';
/**
 * @fileOverview Provides example prompts to help users understand how to interact with the chatbot.
 *
 * - provideExamplePrompts - A function that returns a list of example prompts.
 * - ProvideExamplePromptsOutput - The return type for the provideExamplePrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideExamplePromptsOutputSchema = z.array(
  z.string().describe('An example prompt for the chatbot.')
);
export type ProvideExamplePromptsOutput = z.infer<
  typeof ProvideExamplePromptsOutputSchema
>;

export async function provideExamplePrompts(): Promise<ProvideExamplePromptsOutput> {
  return provideExamplePromptsFlow();
}

const prompt = ai.definePrompt({
  name: 'provideExamplePromptsPrompt',
  output: {schema: ProvideExamplePromptsOutputSchema},
  prompt: `You are a helpful assistant providing a diverse array of example prompts to help users understand how to interact with an AI chatbot.

  Provide 5 example prompts that showcase different functionalities and interaction styles. The prompts should be clear, concise, and engaging.

  Example Prompts:
  1.  Write a short poem about the beauty of nature.
  2.  Summarize the key points of the latest climate change report.
  3.  Translate the following sentence into French: "Hello, how are you?"
  4.  Explain the concept of quantum physics in simple terms.
  5.  Suggest three healthy recipes for a vegetarian diet.
  `,
});

const provideExamplePromptsFlow = ai.defineFlow(
  {
    name: 'provideExamplePromptsFlow',
    outputSchema: ProvideExamplePromptsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
