<script lang="ts">
	import type { DataPackage } from '$lib/services/api';

	let { 
		packages, 
		userPoints, 
		onSelectPackage 
	}: { 
		packages: DataPackage[]; 
		userPoints: number; 
		onSelectPackage: (pkg: DataPackage) => void;
	} = $props();

	function getProviderColor(provider: string): { bg: string; text: string; border: string } {
		const p = provider.toLowerCase();
		if (p.includes('mtn')) return { bg: 'rgba(234, 179, 8, 0.15)', text: '#facc15', border: 'rgba(234, 179, 8, 0.35)' };
		if (p.includes('airtel')) return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.35)' };
		if (p.includes('safaricom')) return { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.35)' };
		if (p.includes('glo')) return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.35)' };
		if (p.includes('vodafone')) return { bg: 'rgba(225, 29, 72, 0.15)', text: '#fb7185', border: 'rgba(225, 29, 72, 0.35)' };
		return { bg: 'rgba(99, 102, 241, 0.15)', text: '#a5b4fc', border: 'rgba(99, 102, 241, 0.35)' };
	}
</script>

<div class="packages-section">
	<div class="section-head">
		<div>
			<h2 class="section-title">Available Mobile Data Packages</h2>
			<p class="section-subtitle">Select any carrier bundle to convert your learning points into instant data.</p>
		</div>
	</div>

	<div class="packages-grid">
		{#each packages as pkg}
			{@const colors = getProviderColor(pkg.provider)}
			{@const canAfford = userPoints >= pkg.points_cost}

			<div class="card package-card" class:disabled={!canAfford}>
				<div class="card-top">
					<span 
						class="provider-pill" 
						style="background: {colors.bg}; color: {colors.text}; border-color: {colors.border};"
					>
						{pkg.provider}
					</span>
					<span class="validity">{pkg.duration_days} Days Validity</span>
				</div>

				<div class="data-size">
					<span class="data-val">{pkg.data_amount}</span>
				</div>

				<p class="pkg-desc">{pkg.description}</p>

				<div class="pkg-footer">
					<div class="price-block">
						<span class="cost-num">{pkg.points_cost}</span>
						<span class="cost-label">POINTS</span>
					</div>

					<button 
						class="btn btn-reward btn-sm"
						disabled={!canAfford}
						onclick={() => onSelectPackage(pkg)}
					>
						{#if canAfford}
							Redeem Bundle
						{:else}
							Need {pkg.points_cost - userPoints} more pts
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.packages-section {
		margin-bottom: 36px;
	}

	.section-head {
		margin-bottom: 20px;
	}

	.section-title {
		font-size: 1.35rem;
	}

	.section-subtitle {
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.packages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 20px;
	}

	.package-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 24px;
		gap: 16px;
		background: rgba(15, 23, 42, 0.7);
		border: 1px solid var(--border-subtle);
		transition: all 0.25s ease;
	}

	.package-card:hover:not(.disabled) {
		border-color: var(--accent-emerald);
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), var(--glow-emerald);
	}

	.package-card.disabled {
		opacity: 0.75;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.provider-pill {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 800;
		padding: 4px 10px;
		border-radius: 6px;
		border: 1px solid;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.validity {
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.data-size {
		margin: 4px 0;
	}

	.data-val {
		font-family: var(--font-display);
		font-size: 2.2rem;
		font-weight: 800;
		color: var(--text-main);
		letter-spacing: -0.02em;
	}

	.pkg-desc {
		font-size: 0.82rem;
		color: var(--text-muted);
		line-height: 1.45;
	}

	.pkg-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 14px;
		border-top: 1px solid var(--border-subtle);
	}

	.price-block {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.cost-num {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 800;
		color: #f59e0b;
	}

	.cost-label {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--text-dim);
	}
</style>
