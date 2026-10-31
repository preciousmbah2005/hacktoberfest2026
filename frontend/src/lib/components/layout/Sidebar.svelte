<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: 'dashboard',
			badge: null
		},
		{
			label: 'Career Orientation',
			href: '/orientation',
			icon: 'compass',
			badge: 'AI'
		},
		{
			label: 'Courses & Lessons',
			href: '/courses',
			icon: 'book',
			badge: '3 Active'
		},
		{
			label: 'Rewards & Data',
			href: '/rewards',
			icon: 'gift',
			badge: 'Earn ⚡'
		},
		{
			label: 'AI Tutor Assistant',
			href: '/ai-assistant',
			icon: 'bot',
			badge: 'Live'
		}
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<aside class="sidebar">
	<div class="sidebar-inner">
		<!-- Navigation Group -->
		<div class="nav-section">
			<span class="section-label">Main Menu</span>
			<nav class="nav-list">
				{#each navItems as item}
					<a 
						href={item.href} 
						class="nav-item" 
						class:active={isActive(item.href)}
					>
						<span class="item-icon">
							{#if item.icon === 'dashboard'}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
							{:else if item.icon === 'compass'}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
							{:else if item.icon === 'book'}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
							{:else if item.icon === 'gift'}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
							{:else if item.icon === 'bot'}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
							{/if}
						</span>
						<span class="item-label">{item.label}</span>
						{#if item.badge}
							<span class="item-badge" class:badge-accent={item.badge === 'Earn ⚡'}>{item.badge}</span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Learning Value Proposition Box -->
		<div class="incentive-card">
			<div class="incentive-header">
				<span class="incentive-icon">📶</span>
				<span class="incentive-title">Learn & Earn Data</span>
			</div>
			<p class="incentive-desc">
				Complete lessons and career quizzes to earn instant mobile recharge for MTN, Airtel, and Safaricom.
			</p>
			<a href="/rewards" class="btn btn-reward btn-sm">Redeem Rewards</a>
		</div>

		<!-- Footer mini info -->
		<div class="sidebar-footer">
			<div class="status-indicator">
				<span class="dot"></span>
				<span class="status-text">FastAPI + Supabase Online</span>
			</div>
		</div>
	</div>
</aside>

<style>
	.sidebar {
		width: var(--sidebar-width);
		height: calc(100vh - var(--header-height));
		position: sticky;
		top: var(--header-height);
		background: rgba(15, 23, 42, 0.5);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}

	.sidebar-inner {
		padding: 20px 16px;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 24px;
	}

	.section-label {
		display: block;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
		margin-bottom: 12px;
		padding-left: 10px;
	}

	.nav-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: var(--radius-md);
		color: var(--text-muted);
		font-weight: 600;
		font-size: 0.92rem;
		transition: all 0.18s ease;
		border: 1px solid transparent;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-main);
	}

	.nav-item.active {
		background: rgba(99, 102, 241, 0.12);
		border-color: rgba(99, 102, 241, 0.35);
		color: #ffffff;
		box-shadow: 0 2px 10px rgba(99, 102, 241, 0.15);
	}

	.nav-item.active .item-icon {
		color: var(--accent-indigo);
	}

	.item-icon {
		display: flex;
		align-items: center;
		color: var(--text-dim);
	}

	.item-label {
		flex: 1;
	}

	.item-badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.08);
		color: var(--text-muted);
	}

	.item-badge.badge-accent {
		background: rgba(16, 185, 129, 0.2);
		color: #34d399;
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.incentive-card {
		margin-top: auto;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
		border: 1px solid rgba(16, 185, 129, 0.25);
		border-radius: var(--radius-md);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.incentive-header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.incentive-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.9rem;
		color: #34d399;
	}

	.incentive-desc {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.sidebar-footer {
		padding-top: 8px;
		border-top: 1px solid var(--border-subtle);
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 8px #10b981;
	}

	.status-text {
		font-size: 0.72rem;
		color: var(--text-dim);
	}

	@media (max-width: 1024px) {
		.sidebar {
			display: none;
		}
	}
</style>
