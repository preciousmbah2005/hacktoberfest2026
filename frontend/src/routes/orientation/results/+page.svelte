<script lang="ts">
	import { orientationResult } from '$lib/components/orientation/orientationStore';
</script>

<div class="orientation-page">
	<h1 class="page-title">Career Recommendations</h1>
	{#if $orientationResult}
		{#each $orientationResult.recommendations as rec}
			<div class="card">
				<h3>{rec.pathway}</h3>
				<p>{rec.description}</p>
				<p>{rec.reason}</p>
			</div>
		{/each}
	{:else}
		<p>No results yet.</p>
	{/if}
</div>

<style>
	.orientation-page { display: flex; flex-direction: column; gap: 16px; }
	.page-title { font-size: 2rem; }
</style>
