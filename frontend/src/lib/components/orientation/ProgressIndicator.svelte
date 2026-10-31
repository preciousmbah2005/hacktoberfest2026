<script lang="ts">
	let { value = 0, max = 100, label = '' } = $props();
	const pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div class="progress-wrap">
	{#if label}<span class="progress-label">{label}</span>{/if}
	<div class="progress-container">
		<div class="progress-bar" style="width: {pct}%"></div>
	</div>
</div>

<style>
	.progress-wrap { display: flex; flex-direction: column; gap: 6px; }
	.progress-label { font-size: 0.75rem; color: var(--text-muted); }
</style>
