<script lang="ts">
	let { achievements }: { achievements: string[] } = $props();
</script>

<div class="card achievements-card">
	<div class="card-head">
		<div class="icon-wrap">🏆</div>
		<div>
			<h3 class="card-title">Recent Milestones & Badges</h3>
			<p class="card-subtitle">Your latest learning proofs and achievements</p>
		</div>
	</div>

	<div class="achievements-list">
		{#each achievements as achievement}
			<div class="achievement-item">
				<span class="badge-star"></span>
				<span class="achievement-text">{achievement}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.achievements-card {
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.card-head {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.icon-wrap {
		font-size: 1.5rem;
		background: rgba(245, 158, 11, 0.15);
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.card-title {
		font-size: 1.1rem;
	}

	.card-subtitle {
		font-size: 0.8rem;
		color: var(--text-dim);
	}

	.achievements-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.achievement-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		background: rgba(255, 255, 255, 0.03);
		padding: 10px 14px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
		font-size: 0.88rem;
		color: var(--text-muted);
	}

	.badge-star {
		font-size: 1rem;
	}
</style>
