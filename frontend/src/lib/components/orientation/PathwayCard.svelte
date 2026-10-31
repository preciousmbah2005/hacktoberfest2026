<script lang="ts">
	import type { CareerRecommendation } from './types';
	let { recommendation } = $props<{ recommendation: CareerRecommendation }>();
</script>

<div class="card rec-card">
	<h3 class="pathway-name">{recommendation.pathway.name}</h3>
	<p class="pathway-desc">{recommendation.pathway.description}</p>
	<div class="reason">{recommendation.reason}</div>
	<div class="tags">
		{#each recommendation.pathway.skills as sk}
			<span class="tag-pill">{sk}</span>
		{/each}
	</div>
</div>

<style>
	.rec-card { display: flex; flex-direction: column; gap: 12px; }
	.pathway-name { font-size: 1.15rem; color: #38bdf8; }
	.pathway-desc { font-size: 0.88rem; color: var(--text-muted); }
	.reason { font-size: 0.85rem; border-left: 3px solid var(--accent-indigo); padding: 8px 12px; background: rgba(99,102,241,0.1); border-radius: 4px; }
	.tags { display: flex; flex-wrap: wrap; gap: 6px; }
	.tag-pill { font-size: 0.75rem; background: rgba(255,255,255,0.06); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 6px; }
</style>
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/orientation/CareerRecommendationCard.svelte