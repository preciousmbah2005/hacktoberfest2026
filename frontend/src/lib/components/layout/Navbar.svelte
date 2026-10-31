<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
	import { walletStore } from '$lib/stores/walletStore';
	import { onMount } from 'svelte';

	let points = $derived($walletStore.wallet.points_balance);
	let user = $derived($authStore.user);

	let showProfileMenu = $state(false);
	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		walletStore.load();
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggleMenu() {
		showProfileMenu = !showProfileMenu;
	}

	function handleSignOut() {
		authStore.logout();
		showProfileMenu = false;
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('l2e_theme', theme);
	}
</script>

<header class="topbar">
	<div class="topbar-container">
		<!-- Brand Logo -->
		<div class="brand">
			<a href="/" class="brand-link">
				<div class="logo-icon">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					</svg>
				</div>
				<div class="brand-text">
					<span class="brand-name">Learn<span class="highlight">2Earn</span></span>
					<span class="brand-badge">AI MVP</span>
				</div>
			</a>
		</div>

		<!-- Action bar & Status -->
		<div class="topbar-actions">
			<button
				class="theme-toggle"
				type="button"
				onclick={toggleTheme}
				aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
				title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
			>
				{#if theme === 'light'}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
					</svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="4"/>
						<line x1="12" y1="2" x2="12" y2="4"/>
						<line x1="12" y1="20" x2="12" y2="22"/>
						<line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
						<line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
						<line x1="2" y1="12" x2="4" y2="12"/>
						<line x1="20" y1="12" x2="22" y2="12"/>
						<line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
						<line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
					</svg>
				{/if}
			</button>
			<!-- Quick Wallet Pill -->
			<a href="/rewards" class="points-pill" title="View Rewards Wallet & Redeem Mobile Data">
				<div class="coin-icon">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="8"/>
						<line x1="12" y1="2" x2="12" y2="4"/>
						<line x1="12" y1="20" x2="12" y2="22"/>
						<line x1="2" y1="12" x2="4" y2="12"/>
						<line x1="20" y1="12" x2="22" y2="12"/>
					</svg>
				</div>
				<div class="points-info">
					<span class="points-val">{points.toLocaleString()}</span>
					<span class="points-label">Pts</span>
				</div>
				<span class="pill-cta">Redeem Data</span>
			</a>

			<!-- User Menu -->
			<div class="profile-container">
				<button class="profile-btn" onclick={toggleMenu} aria-label="User Profile">
					<img 
						src={user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} 
						alt="Student Avatar" 
						class="avatar-img"
					/>
					<span class="user-name">{user?.user_metadata?.full_name || 'Alex Kimani'}</span>
					<svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="6 9 12 15 18 9"/>
					</svg>
				</button>

				{#if showProfileMenu}
					<div class="dropdown-menu">
						<div class="dropdown-header">
							<p class="user-display">{user?.user_metadata?.full_name || 'Alex Kimani'}</p>
							<p class="user-email">{user?.email || 'alex.student@learn2earn.io'}</p>
						</div>
						<div class="divider"></div>
						<a href="/dashboard" class="dropdown-item" onclick={() => showProfileMenu = false}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
							Student Dashboard
						</a>
						<a href="/rewards" class="dropdown-item" onclick={() => showProfileMenu = false}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
							Rewards & Mobile Data
						</a>
						<a href="/ai-assistant" class="dropdown-item" onclick={() => showProfileMenu = false}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
							AI Learning Assistant
						</a>
						<div class="divider"></div>
						<button class="dropdown-item text-danger" onclick={handleSignOut}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
							Sign Out
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 40;
		height: var(--header-height);
		background: rgba(9, 13, 22, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.topbar-container {
		max-width: 1440px;
		height: 100%;
		margin: 0 auto;
		padding: 0 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-icon {
		width: 38px;
		height: 38px;
		background: var(--grad-primary);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);
	}

	.brand-name {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.brand-name .highlight {
		background: var(--grad-reward);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.brand-badge {
		margin-left: 8px;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 2px 6px;
		background: rgba(99, 102, 241, 0.2);
		border: 1px solid rgba(99, 102, 241, 0.4);
		border-radius: 6px;
		color: #a5b4fc;
	}

	.topbar-actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.theme-toggle {
		width: 38px;
		height: 38px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border-radius: 9999px;
		border: 1px solid var(--border-subtle);
		background: var(--bg-card);
		color: var(--text-main);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		border-color: var(--border-highlight);
		background: var(--bg-card-hover);
		transform: translateY(-1px);
	}

	.points-pill {
		display: flex;
		align-items: center;
		gap: 10px;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		padding: 6px 14px;
		border-radius: 9999px;
		transition: all 0.2s ease;
	}

	.points-pill:hover {
		background: rgba(16, 185, 129, 0.2);
		border-color: rgba(16, 185, 129, 0.5);
		transform: translateY(-1px);
		box-shadow: var(--glow-emerald);
	}

	.coin-icon {
		color: #34d399;
		display: flex;
		align-items: center;
	}

	.points-info {
		display: flex;
		align-items: baseline;
		gap: 3px;
	}

	.points-val {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 800;
		color: #34d399;
	}

	.points-label {
		font-size: 0.72rem;
		color: #6ee7b7;
		font-weight: 600;
	}

	.pill-cta {
		font-size: 0.75rem;
		font-weight: 700;
		background: var(--grad-reward);
		color: #032e1f;
		padding: 3px 8px;
		border-radius: 9999px;
	}

	.profile-container {
		position: relative;
	}

	.profile-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-subtle);
		padding: 6px 12px;
		border-radius: 9999px;
		cursor: pointer;
		color: var(--text-main);
		transition: all 0.2s ease;
	}

	.profile-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--border-highlight);
	}

	.avatar-img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
		border: 1.5px solid var(--accent-indigo);
	}

	.user-name {
		font-size: 0.88rem;
		font-weight: 600;
	}

	.chevron {
		color: var(--text-dim);
	}

	.dropdown-menu {
		position: absolute;
		right: 0;
		top: calc(100% + 8px);
		width: 220px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 8px;
		box-shadow: var(--shadow-lg);
		backdrop-filter: blur(16px);
		animation: slideDown 0.15s ease-out;
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-6px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.dropdown-header {
		padding: 8px 12px;
	}

	.user-display {
		font-weight: 700;
		font-size: 0.9rem;
	}

	.user-email {
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.divider {
		height: 1px;
		background: var(--border-subtle);
		margin: 6px 0;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		font-size: 0.85rem;
		color: var(--text-muted);
		border-radius: var(--radius-sm);
		transition: all 0.15s ease;
		background: transparent;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.dropdown-item:hover {
		background: rgba(255, 255, 255, 0.06);
		color: var(--text-main);
	}

	.text-danger {
		color: #f87171;
	}

	.text-danger:hover {
		background: rgba(248, 113, 113, 0.1);
		color: #ef4444;
	}

	@media (max-width: 768px) {
		.user-name { display: none; }
		.pill-cta { display: none; }
	}
</style>
