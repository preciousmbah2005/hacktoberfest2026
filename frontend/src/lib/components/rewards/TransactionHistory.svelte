<script lang="ts">
	import type { TransactionRecord } from '$lib/services/api';

	let { transactions }: { transactions: TransactionRecord[] } = $props();

	function formatDate(iso: string): string {
		try {
			const d = new Date(iso);
			return d.toLocaleDateString(undefined, {
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}
</script>

<div class="card tx-card">
	<div class="tx-head">
		<h3 class="tx-title">Transaction & Redemption History</h3>
		<span class="tx-count">{transactions.length} Activity Logs</span>
	</div>

	{#if transactions.length === 0}
		<div class="empty-state">
			<p>No transactions yet. Complete lessons or redeem mobile data to see history here.</p>
		</div>
	{:else}
		<div class="tx-list">
			{#each transactions as tx}
				<div class="tx-item">
					<div class="tx-icon-wrap" class:earned={tx.type === 'earned'} class:redeemed={tx.type === 'redeemed'}>
						{#if tx.type === 'earned'}
							⚡
						{:else}
							📶
						{/if}
					</div>

					<div class="tx-details">
						<span class="tx-desc">{tx.description}</span>
						<span class="tx-time">{formatDate(tx.created_at)}</span>
					</div>

					<div class="tx-amount">
						<span class="amount-val" class:text-emerald={tx.points > 0} class:text-rose={tx.points < 0}>
							{tx.points > 0 ? `+${tx.points}` : tx.points} PTS
						</span>
						<span class="tx-status">{tx.status}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.tx-card {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.tx-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border-subtle);
	}

	.tx-title {
		font-size: 1.15rem;
	}

	.tx-count {
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	.empty-state {
		padding: 30px;
		text-align: center;
		color: var(--text-dim);
		font-size: 0.85rem;
	}

	.tx-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.tx-item {
		display: flex;
		align-items: center;
		gap: 14px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-subtle);
		padding: 12px 16px;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.tx-item:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.tx-icon-wrap {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		flex-shrink: 0;
	}

	.tx-icon-wrap.earned {
		background: rgba(245, 158, 11, 0.15);
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.tx-icon-wrap.redeemed {
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.tx-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.tx-desc {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-main);
	}

	.tx-time {
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.tx-amount {
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.amount-val {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
	}

	.text-emerald { color: #34d399; }
	.text-rose { color: #f87171; }

	.tx-status {
		font-size: 0.7rem;
		color: var(--text-dim);
		text-transform: capitalize;
	}
</style>
