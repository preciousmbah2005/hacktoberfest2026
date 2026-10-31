<script lang="ts">
	import type { StudentStats } from '$lib/services/api';

	let { stats }: { stats: StudentStats } = $props();

	function formatData(mb: number): string {
		if (mb >= 1024) {
			return `${(mb / 1024).toFixed(1)} GB`;
		}
		return `${mb} MB`;
	}
</script>

<div class="stats-grid">
	<!-- Learning Points -->
	<div class="card stat-card glow-points">
		<div class="stat-top">
			<span class="stat-label">Learning Points</span>
			<span class="stat-badge points-badge">Active Balance</span>
		</div>
		<div class="stat-main">
			<span class="stat-val text-amber">{stats.learning_points.toLocaleString()}</span>
			<span class="stat-unit">PTS</span>
		</div>
		<div class="stat-footer">
			<span class="stat-hint">⚡ Earn more by finishing modules & quizzes</span>
		</div>
	</div>

	<!-- Mobile Data Earned -->
	<div class="card stat-card glow-emerald">
		<div class="stat-top">
			<span class="stat-label">Mobile Data Redeemed</span>
			<span class="stat-badge data-badge">Telco Rewards</span>
		</div>
		<div class="stat-main">
			<span class="stat-val text-emerald">{formatData(stats.mobile_data_mb_earned)}</span>
			<span class="stat-unit">FREE DATA</span>
		</div>
		<div class="stat-footer">
			<a href="/rewards" class="stat-link">Redeem data packages →</a>
		</div>
	</div>

	<!-- Learning Streak -->
	<div class="card stat-card">
		<div class="stat-top">
			<span class="stat-label">Learning Streak</span>
			<span class="stat-badge streak-badge">🔥 Daily Goal</span>
		</div>
		<div class="stat-main">
			<span class="stat-val text-rose">{stats.streak_days}</span>
			<span class="stat-unit">DAYS IN A ROW</span>
		</div>
		<div class="stat-footer">
			<span class="stat-hint">Keep learning today to protect your streak!</span>
		</div>
	</div>

	<!-- Enrolled & Certificates -->
	<div class="card stat-card">
		<div class="stat-top">
			<span class="stat-label">Course Progress</span>
			<span class="stat-badge prog-badge">Pathways</span>
		</div>
		<div class="stat-main">
			<span class="stat-val text-indigo">{stats.courses_enrolled_count}</span>
			<span class="stat-unit">COURSES ({stats.courses_completed_count} CERTIFIED)</span>
		</div>
		<div class="stat-footer">
			<span class="stat-hint">{stats.target_pathway || 'Software Engineering & AI'}</span>
		</div>
	</div>
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
		margin-bottom: 32px;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 22px;
		min-height: 145px;
		background: rgba(15, 23, 42, 0.7);
		border: 1px solid var(--border-subtle);
		position: relative;
		overflow: hidden;
	}

	.glow-points:hover {
		border-color: rgba(245, 158, 11, 0.4);
		box-shadow: 0 0 25px rgba(245, 158, 11, 0.15);
	}

	.glow-emerald:hover {
		border-color: rgba(16, 185, 129, 0.4);
		box-shadow: 0 0 25px rgba(16, 185, 129, 0.15);
	}

	.stat-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.stat-label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.stat-badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 3px 8px;
		border-radius: 9999px;
	}

	.points-badge {
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
	}

	.data-badge {
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
	}

	.streak-badge {
		background: rgba(244, 63, 94, 0.15);
		color: #fb7185;
	}

	.prog-badge {
		background: rgba(99, 102, 241, 0.15);
		color: #a5b4fc;
	}

	.stat-main {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin: 12px 0 8px;
	}

	.stat-val {
		font-family: var(--font-display);
		font-size: 2.2rem;
		font-weight: 800;
		line-height: 1;
	}

	.stat-unit {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-dim);
		letter-spacing: 0.05em;
	}

	.text-amber { color: #f59e0b; }
	.text-emerald { color: #10b981; }
	.text-rose { color: #f43f5e; }
	.text-indigo { color: #818cf8; }

	.stat-footer {
		font-size: 0.8rem;
		color: var(--text-dim);
	}

	.stat-hint {
		font-size: 0.78rem;
	}

	.stat-link {
		color: #34d399;
		font-weight: 600;
		transition: all 0.2s;
	}

	.stat-link:hover {
		color: #6ee7b7;
		text-decoration: underline;
	}
</style>
