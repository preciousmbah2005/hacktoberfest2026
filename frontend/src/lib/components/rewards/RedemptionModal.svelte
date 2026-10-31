<script lang="ts">
	import type { DataPackage } from '$lib/services/api';
	import { walletStore } from '$lib/stores/walletStore';

	let { 
		selectedPackage, 
		onClose 
	}: { 
		selectedPackage: DataPackage | null; 
		onClose: () => void; 
	} = $props();

	let phoneNumber = $state('+2348012345678');
	let provider = $state('MTN');

	$effect(() => {
		if (selectedPackage) {
			provider = selectedPackage.provider;
		}
	});

	let isSubmitting = $derived($walletStore.redeeming);
	let errorMsg = $derived($walletStore.error);
	let lastRedemption = $derived($walletStore.lastRedemption);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!selectedPackage) return;
		walletStore.redeem(selectedPackage.id, phoneNumber, provider);
	}

	function handleDone() {
		walletStore.clearRedemptionModal();
		onClose();
	}
</script>

{#if selectedPackage}
	<div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1">
		<button type="button" class="backdrop-click" onclick={onClose} aria-label="Close"></button>
		<div class="modal-container card">
			{#if lastRedemption}
				<!-- Success Screen -->
				<div class="success-view">
					<div class="success-icon">🎉</div>
					<h3 class="success-title">Mobile Data Dispatched!</h3>
					<p class="success-msg">{lastRedemption.message}</p>

					<div class="receipt-box">
						<div class="receipt-row">
							<span>Package:</span>
							<strong class="text-white">{lastRedemption.data_granted} Data</strong>
						</div>
						<div class="receipt-row">
							<span>Recipient Phone:</span>
							<strong class="text-white">{lastRedemption.phone_number}</strong>
						</div>
						<div class="receipt-row">
							<span>Carrier Ref:</span>
							<code class="ref-code">{lastRedemption.simulated_carrier_reference}</code>
						</div>
						<div class="receipt-row">
							<span>Points Deducted:</span>
							<strong class="text-amber">-{lastRedemption.points_deducted} PTS</strong>
						</div>
						<div class="receipt-row">
							<span>Remaining Balance:</span>
							<strong class="text-emerald">{lastRedemption.remaining_balance.toLocaleString()} PTS</strong>
						</div>
					</div>

					<button class="btn btn-reward btn-lg w-full" onclick={handleDone}>
						Back to Rewards
					</button>
				</div>
			{:else}
				<!-- Form Screen -->
				<div class="modal-head">
					<div>
						<span class="modal-badge">Simulated Telco Recharge</span>
						<h3 class="modal-title">Redeem {selectedPackage.data_amount} Data</h3>
					</div>
					<button class="close-btn" onclick={onClose} aria-label="Close modal">✕</button>
				</div>

				<form onsubmit={handleSubmit} class="modal-form">
					<div class="summary-box">
						<div class="summary-item">
							<span class="label">Package:</span>
							<span class="val">{selectedPackage.name}</span>
						</div>
						<div class="summary-item">
							<span class="label">Cost:</span>
							<span class="val text-amber">{selectedPackage.points_cost} Learning Points</span>
						</div>
					</div>

					<div class="form-group">
						<label class="form-label" for="provider-select">Mobile Network Provider</label>
						<select id="provider-select" class="form-select" bind:value={provider}>
							<option value="MTN">MTN Nigeria / Global</option>
							<option value="Airtel">Airtel</option>
							<option value="Safaricom">Safaricom (M-Pesa / Tunukiwa)</option>
							<option value="Glo">Glo Mobile</option>
							<option value="Vodafone">Vodafone / Telecel</option>
						</select>
					</div>

					<div class="form-group">
						<label class="form-label" for="phone-input">Student Phone Number</label>
						<input 
							id="phone-input"
							type="tel" 
							class="form-input" 
							placeholder="+2348012345678" 
							bind:value={phoneNumber} 
							required
						/>
						<span class="form-hint">Enter your full international phone number with country code.</span>
					</div>

					{#if errorMsg}
						<div class="error-banner">
							⚠️ {errorMsg}
						</div>
					{/if}

					<div class="modal-actions">
						<button type="button" class="btn btn-outline" onclick={onClose} disabled={isSubmitting}>
							Cancel
						</button>
						<button type="submit" class="btn btn-reward" disabled={isSubmitting}>
							{isSubmitting ? 'Dispatching Recharge...' : `Confirm & Redeem (${selectedPackage.points_cost} PTS)`}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		z-index: 100;
	}

	.backdrop-click {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.modal-container {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 480px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-highlight);
		padding: 28px;
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg), var(--glow-emerald);
		animation: modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes modalPop {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	.modal-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.modal-badge {
		font-size: 0.72rem;
		font-weight: 700;
		color: #34d399;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.modal-title {
		font-size: 1.35rem;
		margin-top: 2px;
	}

	.close-btn {
		background: transparent;
		border: none;
		color: var(--text-dim);
		font-size: 1.2rem;
		cursor: pointer;
		padding: 4px;
	}

	.close-btn:hover {
		color: var(--text-main);
	}

	.summary-box {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 18px;
	}

	.summary-item {
		display: flex;
		justify-content: space-between;
		font-size: 0.88rem;
	}

	.summary-item .label {
		color: var(--text-muted);
	}

	.summary-item .val {
		font-weight: 700;
	}

	.form-hint {
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.error-banner {
		background: rgba(239, 68, 68, 0.15);
		border: 1px solid rgba(239, 68, 68, 0.35);
		color: #fca5a5;
		padding: 10px 14px;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		margin-bottom: 16px;
	}

	.modal-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		margin-top: 24px;
	}

	.success-view {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.success-icon {
		font-size: 3rem;
	}

	.success-title {
		font-size: 1.5rem;
	}

	.success-msg {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.receipt-box {
		width: 100%;
		background: rgba(15, 23, 42, 0.9);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 8px 0 16px;
		text-align: left;
	}

	.receipt-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.ref-code {
		font-family: monospace;
		background: rgba(99, 102, 241, 0.2);
		padding: 2px 6px;
		border-radius: 4px;
		color: #a5b4fc;
	}

	.text-white { color: #ffffff; }
	.text-amber { color: #f59e0b; }
	.text-emerald { color: #10b981; }
	.w-full { width: 100%; }
</style>
