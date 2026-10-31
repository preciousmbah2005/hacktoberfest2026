<script lang="ts">
	import type { Lesson } from './types';
	let { lessons, currentId = '', onNavigate = (_id: string) => {} } = $props<{ lessons: Lesson[]; currentId?: string; onNavigate?: (id: string) => void }>();
</script>

<nav class="lesson-nav">
	{#each lessons as lesson}
		<button
			class="lesson-item"
			class:active={lesson.id === currentId}
			class:completed={lesson.completed}
			onclick={() => onNavigate(lesson.id)}
			type="button"
		>
			<span class="lesson-order">{lesson.order}</span>
			<span class="lesson-title">{lesson.title}</span>
		</button>
	{/each}
</nav>

<style>
	.lesson-nav { display: flex; flex-direction: column; gap: 6px; }
	.lesson-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
		background: rgba(255,255,255,0.03);
		cursor: pointer;
		text-align: left;
		color: var(--text-main);
	}
	.lesson-item.active { border-color: var(--accent-indigo); background: rgba(99,102,241,0.1); }
	.lesson-item.completed .lesson-title { color: var(--text-dim); text-decoration: line-through; }
	.lesson-order { font-weight: 700; color: var(--text-muted); min-width: 20px; }
	.lesson-title { font-size: 0.9rem; }
</style>
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/courses/LessonNavigation.svelte