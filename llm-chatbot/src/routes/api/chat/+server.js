import { streamText, convertToModelMessages } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const ollama = createOpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama',
	compatibility: 'compatible',
});

export async function POST({ request }) {
	const { messages } = await request.json();

	const result = streamText({
		model: ollama.chat('gemma2:latest'),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
}