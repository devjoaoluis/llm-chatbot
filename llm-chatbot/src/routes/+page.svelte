<script>
	import { Chat } from '@ai-sdk/svelte';
	import { marked } from 'marked';

	const chat = new Chat({
		api: '/api/chat'
	});

	let searchQuery = $state('');
	let input = $state('');

	function getMessageText(message) {
		return message.parts
			.filter((part) => part.type === 'text')
			.map((part) => part.text)
			.join('');
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!input.trim()) return;
		chat.sendMessage({ text: input });
		input = '';
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			handleSubmit(event);
		}
	}
</script>

<div
	class="flex h-screen overflow-hidden bg-white text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
>
	<!-- Sidebar -->
	<aside class="flex w-72 shrink-0 flex-col border-r dark:border-zinc-700">
		<div class="space-y-4 p-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold">Messages</h2>
				<button
					type="button"
					class="rounded-md p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						></path>
					</svg>
				</button>
			</div>

			<div class="relative flex items-center">
				<svg
					class="absolute left-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
				<input
					bind:value={searchQuery}
					class="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 pl-9 text-sm placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-400 focus:outline-none dark:border-zinc-700"
					placeholder="Search messages..."
					type="search"
				/>
			</div>
		</div>

		<!-- Lista de mensagens na sidebar -->
		<div class="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
			{#each chat.messages as message, messageIndex (messageIndex)}
				<div class="rounded-lg border p-3 dark:border-zinc-700">
					<span
						class="text-xs font-semibold {message.role === 'user'
							? 'text-blue-500'
							: 'text-green-500'}"
					>
						{message.role === 'user' ? 'You' : 'Assistant'}
					</span>
					<p class="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
						{getMessageText(message)}
					</p>
				</div>
			{/each}
		</div>
	</aside>

	<!-- Chat principal -->
	<section class="flex min-w-0 flex-1 flex-col">
		<header class="shrink-0 border-b p-4 dark:border-zinc-700">
			<div class="flex items-center gap-3">
				<div
					class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700"
				>
					<span
						class="absolute -top-0.5 -right-0.5 z-10 flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-600 dark:border-zinc-800"
					></span>
					<span class="text-sm font-medium text-zinc-500 dark:text-zinc-300">AI</span>
				</div>
				<div class="flex flex-col">
					<span class="text-base font-bold">Assistant</span>
					<span class="text-xs font-normal text-green-600">Online</span>
				</div>
			</div>
		</header>

		<main class="flex-1 overflow-y-auto p-4">
			<div class="flex flex-col gap-4">
				{#if chat.messages.length === 0}
					<div class="flex items-center justify-center pt-20">
						<p class="text-sm text-zinc-400 dark:text-zinc-500">
							Send a message to start the conversation.
						</p>
					</div>
				{/if}

				{#each chat.messages as message, messageIndex (messageIndex)}
					<div
						class="flex items-end gap-2 {message.role === 'user' ? 'justify-end' : 'justify-start'}"
					>
						{#if message.role === 'assistant'}
							<div
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
							>
								AI
							</div>
						{/if}

						<div
							class="rounded-lg p-3 {message.role === 'user'
								? 'max-w-[60%] bg-blue-500 text-white'
								: 'max-w-[70%] bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'}"
						>
							{#each message.parts as part, partIndex (partIndex)}
								{#if part.type === 'text'}
									{#if message.role === 'assistant'}
										<div class="prose prose-sm dark:prose-invert max-w-none">
											{@html marked(part.text)}
										</div>
									{:else}
										<p class="text-sm break-words whitespace-pre-wrap">{part.text}</p>
									{/if}
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</main>

		<footer class="shrink-0 border-t p-4 dark:border-zinc-700">
			<form class="flex items-center gap-2" onsubmit={handleSubmit}>
				<button
					type="button"
					class="shrink-0 rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
						></path>
					</svg>
				</button>

				<input
					bind:value={input}
					onkeydown={handleKeydown}
					class="h-10 min-w-0 flex-1 rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:text-zinc-50"
					placeholder="Type a message..."
				/>

				<button
					type="submit"
					disabled={!input.trim()}
					class="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					Send
				</button>
			</form>
		</footer>
	</section>
</div>
