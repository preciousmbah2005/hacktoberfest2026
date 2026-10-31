<script lang="ts">
	import { onMount } from 'svelte';
	import { dashboardStore } from '$lib/stores/dashboardStore';
	import { walletStore } from '$lib/stores/walletStore';
	import { authStore } from '$lib/stores/authStore';
	import StatsCards from '$lib/components/dashboard/StatsCards.svelte';
	import ActiveCourses from '$lib/components/dashboard/ActiveCourses.svelte';
	import Achievements from '$lib/components/dashboard/Achievements.svelte';

	let overview = $derived($dashboardStore.overview);
	let loading = $derived($dashboardStore.loading);
	let user = $derived($authStore.user);

	let claimingBonus = $state(false);
	let bonusClaimed = $state(false);

	onMount(() => {
		dashboardStore.load();
		walletStore.load();
	});

	async function handleClaimDailyBonus() {
		claimingBonus = true;
		await walletStore.claimRewardPoints(100, 'Claimed Daily Hackathon Learning Bonus');
		claimingBonus = false;
		bonusClaimed = true;
		dashboardStore.load();
	}
</script>

<div class="dashboard-page">
	<!-- Hero Welcome Banner -->
	<section class="hero-banner">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="dot"></span>
				<span>AI-Powered Career & Skill Acceleration</span>
			</div>
			<h1 class="hero-title">
				Welcome back, <span class="highlight">{user?.user_metadata?.full_name || 'Alex'}</span>!
			</h1>
			<p class="hero-desc">
				Track your learning milestones, master AI-guided modules, and convert your study hours directly into free mobile data recharges.
			</p>

			<div class="hero-actions">
				<a href="/orientation" class="btn btn-primary">
					Take Career Orientation (AI) 🎯
				</a>
				<a href="/rewards" class="btn btn-reward">
					Open Rewards Wallet ⚡
				</a>
				<button 
					class="btn btn-outline"
					onclick={handleClaimDailyBonus}
					disabled={claimingBonus || bonusClaimed}
				>
					{#if bonusClaimed}
						✅ +100 PTS Claimed!
					{:else if claimingBonus}
						Claiming...
					{:else}
						🎁 Claim Daily Bonus (+100 PTS)
					{/if}
				</button>
			</div>
		</div>
	</section>

	{#if loading && !overview}
		<div class="loading-state">
			<div class="spinner"></div>
			<p>Loading your student dashboard...</p>
		</div>
	{:else if overview}
		<!-- Stats Summary Cards -->
		<StatsCards stats={overview.stats} />

		<div class="dashboard-grid">
			<!-- Enrolled Courses -->
			<div class="main-col">
				<ActiveCourses courses={overview.active_courses} />
			</div>

			<!-- Side Col: Achievements & Motivation -->
			<div class="side-col">
				<Achievements achievements={overview.recent_achievements} />

				<!-- Quick AI Assistant Callout -->
				<div class="card ai-card">
					<div class="ai-head">
						<span class="ai-icon"></span>
						<div>
							<h4 class="ai-title">24/7 AI Learning Assistant</h4>
							<p class="ai-sub">Stuck on a problem or concept?</p>
						</div>
					</div>
					<p class="ai-desc">
						Get instant interactive explanations, code reviews, and tailored quizzes to boost your points balance.
					</p>
					<a href="/ai-assistant" class="btn btn-outline btn-sm">Chat with AI Tutor →</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard-page {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.hero-banner {
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: 36px 40px;
		position: relative;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.hero-banner::after {
		content: '';
		position: absolute;
		top: -50%;
		right: -10%;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
		pointer-events: none;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		padding: 4px 12px;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 700;
		color: #a5b4fc;
		margin-bottom: 16px;
	}

	.hero-badge .dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #6366f1;
		box-shadow: 0 0 6px #6366f1;
	}

	.hero-title {
		font-size: 2.2rem;
		margin-bottom: 12px;
	}

	.hero-title .highlight {
		background: var(--grad-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-desc {
		font-size: 0.98rem;
		color: var(--text-muted);
		max-width: 680px;
		margin-bottom: 24px;
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 28px;
	}

	.main-col {
		min-width: 0;
	}

	.side-col {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.ai-card {
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(24, 18, 48, 0.8) 100%);
		border-color: rgba(168, 85, 247, 0.3);
	}

	.ai-head {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.ai-icon {
		font-size: 1.6rem;
		background: rgba(168, 85, 247, 0.2);
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		border: 1px solid rgba(168, 85, 247, 0.4);
	}

	.ai-title {
		font-size: 1.05rem;
		color: #e9d5ff;
	}

	.ai-sub {
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	.ai-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
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
		border-top-color: var(--accent-indigo);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@media (max-width: 1024px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.hero-banner {
			padding: 28px 24px;
		}

		.hero-title {
			font-size: 1.8rem;
		}
	}
</style>
