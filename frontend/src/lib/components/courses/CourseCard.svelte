<script lang="ts">
	import type { CareerPathway } from './types';
	let { pathway } = $props<{ pathway: CareerPathway }>();
</script>

<div class="card pathway-card">
	<h4>{pathway.name}</h4>
	<p>{pathway.description}</p>
</div>

<style>
	.pathway-card { display: flex; flex-direction: column; gap: 8px; }
	.pathway-card h4 { font-size: 1.1rem; color: #38bdf8; }
	.pathway-card p { font-size: 0.85rem; color: var(--text-muted); }
</style>
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/orientation/PathwayCard.svelte