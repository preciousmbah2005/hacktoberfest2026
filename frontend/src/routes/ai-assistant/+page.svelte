<script lang="ts">
	import { sendAIChat } from '$lib/services/api';
	import { walletStore } from '$lib/stores/walletStore';

	interface ChatMessage {
		sender: 'user' | 'assistant';
		text: string;
		time: string;
		suggestions?: string[];
	}

	let inputMessage = $state('');
	let courseContext = $state('Introduction to Python & AI Foundations');
	let isSending = $state(false);

	let messages = $state<ChatMessage[]>([
		{
			sender: 'assistant',
			text: "Hello! I am your Learn2Earn AI Learning Assistant. Ask me anything about programming concepts, debug your code, or ask for practice questions to earn learning points!",
			time: 'Just now',
			suggestions: [
				'Explain Python list comprehensions',
				'How do I earn mobile data with quizzes?',
				'Give me a beginner Python challenge'
			]
		}
	]);

	async function handleSend(msgToSend?: string) {
		const text = (msgToSend || inputMessage).trim();
		if (!text || isSending) return;

		messages = [
			...messages,
			{
				sender: 'user',
				text,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			}
		];
		inputMessage = '';
		isSending = true;

		try {
			const res = await sendAIChat(text, 'demo-course', courseContext);
			messages = [
				...messages,
				{
					sender: 'assistant',
					text: res.response,
					time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					suggestions: res.suggested_actions
				}
			];
			// Credit 15 points for engaging with AI tutor
			await walletStore.claimRewardPoints(15, 'Engaged with AI Learning Assistant');
		} catch (err) {
			console.error(err);
		} finally {
			isSending = false;
		}
	}
</script>

<div class="ai-page">
	<div class="page-head">
		<div>
			<div class="owner-tag">
				<span class="owner-pill">Assigned: Developer 3</span>
				<span class="status-pill">Contract Connected</span>
			</div>
			<h1 class="page-title">AI Learning Assistant</h1>
			<p class="page-subtitle">Interactive conceptual tutor and quiz generator.</p>
		</div>

		<div class="context-selector">
			<label for="course-context-select" class="context-label">Context:</label>
			<select id="course-context-select" class="form-select context-select" bind:value={courseContext}>
				<option value="Introduction to Python & AI Foundations">Python & AI Foundations</option>
				<option value="Modern Full-Stack Web Development">SvelteKit & Full-Stack</option>
				<option value="Practical SQL & Relational Databases">SQL & Relational Databases</option>
			</select>
		</div>
	</div>

	<!-- Chat Window -->
	<div class="card chat-window">
		<div class="messages-container">
			{#each messages as m}
				<div class="message-row" class:user-row={m.sender === 'user'}>
					<div class="bubble" class:user-bubble={m.sender === 'user'}>
						<div class="bubble-header">
							<span class="sender-tag">{m.sender === 'assistant' ? 'AI Tutor' : '👤 You'}</span>
							<span class="time-tag">{m.time}</span>
						</div>
						<p class="bubble-text">{m.text}</p>

						{#if m.suggestions && m.suggestions.length > 0}
							<div class="suggestions-wrap">
								<span class="sugg-label">Quick Suggestions:</span>
								<div class="sugg-buttons">
									{#each m.suggestions as sugg}
										<button class="sugg-btn" onclick={() => handleSend(sugg)}>
											{sugg}
										</button>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}

			{#if isSending}
				<div class="message-row">
					<div class="bubble">
						<div class="typing-indicator">
							<span></span><span></span><span></span>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input bar -->
		<form class="chat-input-bar" onsubmit={(e) => { e.preventDefault(); handleSend(); }}>
			<input 
				type="text" 
				class="form-input chat-input" 
				placeholder="Ask the AI Tutor anything (e.g. explain recursion, review code)..."
				bind:value={inputMessage}
				disabled={isSending}
			/>
			<button type="submit" class="btn btn-primary" disabled={isSending || !inputMessage.trim()}>
				Send 🚀
			</button>
		</form>
	</div>
</div>

<style>
	.ai-page {
		display: flex;
		flex-direction: column;
		gap: 20px;
		height: calc(100vh - var(--header-height) - 100px);
	}

	.page-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
	}

	.owner-tag {
		display: flex;
		gap: 8px;
		margin-bottom: 6px;
	}

	.owner-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: #c084fc;
		background: rgba(168, 85, 247, 0.15);
		border: 1px solid rgba(168, 85, 247, 0.3);
		padding: 2px 8px;
		border-radius: 9999px;
	}

	.status-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: #34d399;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		padding: 2px 8px;
		border-radius: 9999px;
	}

	.page-title {
		font-size: 1.8rem;
	}

	.page-subtitle {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.context-selector {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.context-label {
		font-size: 0.8rem;
		color: var(--text-dim);
	}

	.context-select {
		padding: 6px 12px;
		font-size: 0.82rem;
	}

	.chat-window {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0;
		overflow: hidden;
		background: rgba(15, 23, 42, 0.75);
		border-color: var(--border-highlight);
	}

	.messages-container {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.message-row {
		display: flex;
		justify-content: flex-start;
	}

	.message-row.user-row {
		justify-content: flex-end;
	}

	.bubble {
		max-width: 75%;
		background: rgba(30, 41, 59, 0.85);
		border: 1px solid var(--border-subtle);
		padding: 16px 20px;
		border-radius: var(--radius-lg);
		border-bottom-left-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.bubble.user-bubble {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(79, 70, 229, 0.9) 100%);
		border-color: rgba(99, 102, 241, 0.4);
		border-radius: var(--radius-lg);
		border-bottom-right-radius: 4px;
	}

	.bubble-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.72rem;
		color: var(--text-dim);
	}

	.bubble.user-bubble .bubble-header {
		color: rgba(255, 255, 255, 0.7);
	}

	.sender-tag {
		font-weight: 700;
	}

	.bubble-text {
		font-size: 0.95rem;
		line-height: 1.55;
		white-space: pre-wrap;
	}

	.suggestions-wrap {
		margin-top: 8px;
		padding-top: 10px;
		border-top: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sugg-label {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--text-dim);
	}

	.sugg-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.sugg-btn {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-subtle);
		color: #38bdf8;
		padding: 4px 10px;
		border-radius: 9999px;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.sugg-btn:hover {
		background: rgba(56, 189, 248, 0.15);
		border-color: rgba(56, 189, 248, 0.4);
	}

	.chat-input-bar {
		display: flex;
		gap: 12px;
		padding: 16px 20px;
		background: rgba(15, 23, 42, 0.95);
		border-top: 1px solid var(--border-subtle);
	}

	.chat-input {
		flex: 1;
	}

	.typing-indicator {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 0;
	}

	.typing-indicator span {
		width: 8px;
		height: 8px;
		background: var(--accent-indigo);
		border-radius: 50%;
		animation: bounce 1.2s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
	.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

	@keyframes bounce {
		0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
		40% { transform: scale(1); opacity: 1; }
	}
</style>
