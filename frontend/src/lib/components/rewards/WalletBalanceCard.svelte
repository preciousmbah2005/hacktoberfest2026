<script lang="ts">
	import type { WalletBalance } from '$lib/services/api';
	import { walletStore } from '$lib/stores/walletStore';

	let { wallet }: { wallet: WalletBalance } = $props();

	function formatData(mb: number): string {
		if (mb >= 1024) {
			return `${(mb / 1024).toFixed(1)} GB`;
		}
		return `${mb} MB`;
	}

	let claiming = $state(false);

	async function handleQuickEarn() {
		claiming = true;
		await walletStore.claimRewardPoints(50, 'Practiced Code Syntax Quiz');
		claiming = false;
	}
</script>

<div class="card wallet-card">
	<div class="wallet-glow"></div>
	
	<div class="wallet-top">
		<div class="brand-badge">
			<span>Learn2Earn Verified Wallet</span>
		</div>
		<span class="status-live">Live Balance</span>
	</div>

	<div class="wallet-balance-row">
		<div class="balance-item">
			<span class="sub-label">Spendable Points</span>
			<div class="balance-number">
				<span class="val text-gold">{wallet.points_balance.toLocaleString()}</span>
				<span class="currency">PTS</span>
			</div>
		</div>

		<div class="vertical-divider"></div>

		<div class="balance-item">
			<span class="sub-label">Mobile Data Granted</span>
			<div class="balance-number">
				<span class="val text-emerald">{formatData(wallet.mobile_data_mb_redeemed)}</span>
				<span class="currency">DATA</span>
			</div>
		</div>

		<div class="vertical-divider"></div>

		<div class="balance-item">
			<span class="sub-label">Lifetime Points Earned</span>
			<div class="balance-number">
				<span class="val text-indigo">{wallet.total_earned.toLocaleString()}</span>
				<span class="currency">PTS</span>
			</div>
		</div>
	</div>

	<div class="wallet-footer">
		<div class="exchange-rate-pill">
			<span>100 Points = 200MB Telecom Data</span>
		</div>
		<button 
			class="btn btn-outline btn-sm"
			onclick={handleQuickEarn}
			disabled={claiming}
		>
			{claiming ? 'Crediting...' : '+ Earn 50 Points Now'}
		</button>
	</div>
</div>

<style>
	.wallet-card {
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
		border: 1px solid rgba(16, 185, 129, 0.3);
		padding: 30px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
	}

	.wallet-glow {
		position: absolute;
		top: -40px;
		right: -40px;
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
		pointer-events: none;
	}

	.wallet-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.78rem;
		font-weight: 700;
		color: #34d399;
		background: rgba(16, 185, 129, 0.12);
		border: 1px solid rgba(16, 185, 129, 0.25);
		padding: 4px 12px;
		border-radius: 9999px;
	}

	.status-live {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-dim);
	}

	.wallet-balance-row {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 20px;
		padding: 12px 0;
	}

	.balance-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sub-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.balance-number {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.val {
		font-family: var(--font-display);
		font-size: 2.2rem;
		font-weight: 800;
		line-height: 1;
	}

	.currency {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--text-dim);
	}

	.text-gold { color: #f59e0b; }
	.text-emerald { color: #10b981; }
	.text-indigo { color: #818cf8; }

	.vertical-divider {
		width: 1px;
		height: 48px;
		background: var(--border-subtle);
	}

	.wallet-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 14px;
		border-top: 1px solid var(--border-subtle);
	}

	.exchange-rate-pill {
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	@media (max-width: 768px) {
		.vertical-divider {
			display: none;
		}

		.wallet-balance-row {
			justify-content: flex-start;
		}
	}
</style>
