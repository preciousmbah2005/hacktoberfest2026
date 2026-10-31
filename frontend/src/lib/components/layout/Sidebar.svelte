<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			badge: null
		},
		{
			label: 'Career Orientation',
			href: '/orientation',
			badge: 'AI'
		},
		{
			label: 'Courses & Lessons',
			href: '/courses',
			badge: '3 Active'
		},
		{
			label: 'Rewards & Data',
			href: '/rewards',
			badge: 'Earn'
		},
		{
			label: 'AI Tutor Assistant',
			href: '/ai-assistant',
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
						<span class="item-label">{item.label}</span>
						{#if item.badge}
							<span class="item-badge">{item.badge}</span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Learning Value Proposition Box -->
		<div class="incentive-card">
			<div class="incentive-header">
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
		background: var(--bg-secondary);
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

	.incentive-card {
		margin-top: auto;
		background: var(--bg-card);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: var(--shadow-md);
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
		color: var(--text-main);
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
