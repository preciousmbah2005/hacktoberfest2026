<script lang="ts">
	import { onMount } from 'svelte';
	import { walletStore } from '$lib/stores/walletStore';
	import type { DataPackage } from '$lib/services/api';
	import WalletBalanceCard from '$lib/components/rewards/WalletBalanceCard.svelte';
	import DataPackagesGrid from '$lib/components/rewards/DataPackagesGrid.svelte';
	import RedemptionModal from '$lib/components/rewards/RedemptionModal.svelte';
	import TransactionHistory from '$lib/components/rewards/TransactionHistory.svelte';

	let wallet = $derived($walletStore.wallet);
	let packages = $derived($walletStore.packages);
	let transactions = $derived($walletStore.transactions);
	let loading = $derived($walletStore.loading);

	let selectedPackage = $state<DataPackage | null>(null);

	onMount(() => {
		walletStore.load();
	});

	function handleOpenModal(pkg: DataPackage) {
		selectedPackage = pkg;
	}

	function handleCloseModal() {
		selectedPackage = null;
	}
</script>

<div class="rewards-page">
	<div class="page-header">
		<div>
			<span class="badge badge-reward">Incentive Engine</span>
			<h1 class="page-title">Rewards Wallet & Mobile Data</h1>
			<p class="page-subtitle">
				Convert the skills you learn into real mobile data bundles across MTN, Airtel, Safaricom, Glo, and Vodafone.
			</p>
		</div>
	</div>

	{#if loading && packages.length === 0}
		<div class="loading-state">
			<div class="spinner"></div>
			<p>Accessing wallet and telecom packages...</p>
		</div>
	{:else}
		<!-- Wallet Balance Overview -->
		<WalletBalanceCard {wallet} />

		<!-- Packages Grid -->
		<DataPackagesGrid 
			{packages} 
			userPoints={wallet.points_balance} 
			onSelectPackage={handleOpenModal} 
		/>

		<!-- Transaction Log -->
		<TransactionHistory {transactions} />

		<!-- Redemption Popup Modal -->
		{#if selectedPackage}
			<RedemptionModal 
				{selectedPackage} 
				onClose={handleCloseModal} 
			/>
		{/if}
	{/if}
</div>

<style>
	.rewards-page {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.page-header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.page-title {
		font-size: 2rem;
	}

	.page-subtitle {
		font-size: 0.95rem;
		color: var(--text-muted);
		max-width: 700px;
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 0;
		gap: 16px;
		color: var(--text-muted);
	}

	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid rgba(255, 255, 255, 0.1);
		border-top-color: var(--accent-emerald);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
