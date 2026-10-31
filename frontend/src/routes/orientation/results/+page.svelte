<script lang="ts">
	import { orientationResult } from '$lib/components/orientation/orientationStore';

	let selected = $state<string | null>(null);
</script>

<div class="orientation-page">
	<div class="header-box">
		<h1 class="page-title">Career Recommendations</h1>
		<p class="page-subtitle">Based on your responses, here are suggested pathways.</p>
	</div>

	{#if !$orientationResult}
		<div class="card empty-card">
			<h3>No recommendations yet</h3>
			<p>Complete the orientation questionnaire to see your career pathways.</p>
			<a href="/orientation" class="btn btn-primary">Retake Assessment</a>
		</div>
	{:else}
		<div class="recommendations-grid">
			{#each $orientationResult.recommendations as rec}
				<div class="card rec-card" class:selected={selected === rec.pathway}>
					<div class="rec-head">
						<h3 class="pathway-name">{rec.pathway}</h3>
						{#if selected === rec.pathway}
							<span class="badge badge-reward">Selected</span>
						{/if}
					</div>
					<p class="rec-desc">{rec.description}</p>
					<div class="reason">
						<strong>Why this suits you:</strong> {rec.reason}
					</div>

					<div class="meta-section">
						<span class="meta-label">Required Skills</span>
						<div class="tags-wrap">
							{#each rec.skills as sk}
								<span class="tag-pill">{sk}</span>
							{/each}
						</div>
					</div>

					<div class="meta-section">
						<span class="meta-label">Suggested Courses</span>
						<ul class="courses-ul">
							{#each rec.courses as c}
								<li>{c}</li>
							{/each}
						</ul>
					</div>

					<div class="card-actions">
						<a href="/courses" class="btn btn-outline btn-sm">Explore Pathway</a>
						<button class="btn btn-primary btn-sm" onclick={() => (selected = rec.pathway)}>Select Pathway</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="actions-row">
			<a href="/orientation" class="btn btn-outline">Retake Assessment</a>
		</div>
	{/if}
</div>

<style>
	.orientation-page { display: flex; flex-direction: column; gap: 24px; }
	.header-box { display: flex; flex-direction: column; gap: 8px; }
	.page-title { font-size: 2rem; }
	.page-subtitle { font-size: 0.95rem; color: var(--text-muted); }
	.recommendations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
	.rec-card { display: flex; flex-direction: column; gap: 12px; transition: all 0.2s ease; }
	.rec-card.selected { border-color: var(--accent-emerald); box-shadow: var(--glow-emerald); }
	.rec-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
	.pathway-name { font-size: 1.2rem; color: #38bdf8; }
	.rec-desc { font-size: 0.9rem; color: var(--text-muted); }
	.reason { font-size: 0.85rem; background: rgba(99, 102, 241, 0.1); border-left: 3px solid var(--accent-indigo); padding: 8px 12px; border-radius: 4px; }
	.meta-section { display: flex; flex-direction: column; gap: 6px; }
	.meta-label { font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; }
	.tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
	.tag-pill { font-size: 0.75rem; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 6px; }
	.courses-ul { list-style: none; display: flex; flex-direction: column; gap: 4px; font-size: 0.88rem; color: #a5b4fc; }
	.card-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
	.actions-row { display: flex; justify-content: center; margin-top: 8px; }
	.empty-card { padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
</style>
EOF
echo done