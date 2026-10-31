<script lang="ts">
	let { selected = false, title = '', description = '', onclick = () => {} } = $props();
</script>

<button class="selection-card" class:selected onclick={onclick} type="button">
	<h4>{title}</h4>
	<p>{description}</p>
</button>

<style>
	.selection-card {
		text-align: left;
		padding: 16px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
		background: var(--bg-card);
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.selection-card:hover { border-color: var(--border-highlight); }
	.selection-card.selected { border-color: var(--accent-indigo); background: var(--bg-card-hover); }
	.selection-card h4 { font-size: 1rem; margin-bottom: 4px; }
	.selection-card p { font-size: 0.85rem; color: var(--text-muted); }
</style>
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/orientation/SelectionCard.svelte