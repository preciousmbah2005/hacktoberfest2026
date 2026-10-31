<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
	let user = $derived($authStore.user);
</script>

<div class="landing-hero">
	<div class="badge-wrap">
		<span class="badge badge-ai">Hackathon 2026 • AI Education</span>
	</div>

	<h1 class="landing-title">
		Master High-Demand Tech.<br/>
		<span class="gradient-text">Earn Real Mobile Data.</span>
	</h1>

	<p class="landing-desc">
		Learn2Earn eliminates the digital divide by rewarding student progress with immediate mobile internet data. Take AI-powered career assessments, study bite-sized coding courses, and fuel your education.
	</p>

	<div class="cta-row">
		<a href="/dashboard" class="btn btn-primary btn-lg">
			Go to Dashboard
		</a>
		<a href="/orientation" class="btn btn-outline btn-lg">
			Take AI Career Assessment
		</a>
		<a href="/rewards" class="btn btn-reward btn-lg">
			View Mobile Rewards
		</a>
	</div>

	<!-- 3 Key Value Pillars -->
	<div class="pillars-grid">
		<div class="card pillar-card">
			<h3 class="pillar-title">1. AI Career Orientation</h3>
			<p class="pillar-desc">
				Discover tailored pathways in Software Engineering, AI, and Data Science based on your strengths and goals.
			</p>
			<span class="pillar-owner">Assigned to: Dev 2 & 3</span>
		</div>

		<div class="card pillar-card">
			<h3 class="pillar-title">2. Bite-Sized Learning</h3>
			<p class="pillar-desc">
				Explore interactive modules, practice live coding exercises, and get instant answers from your AI tutor.
			</p>
			<span class="pillar-owner">Assigned to: Dev 2 & 3</span>
		</div>

		<div class="card pillar-card">
			<h3 class="pillar-title">3. Mobile Data Rewards</h3>
			<p class="pillar-desc">
				Every completed quiz converts to learning points spendable directly on telecom data top-ups.
			</p>
			<span class="pillar-owner">Foundation Ready: Dev 1</span>
		</div>
	</div>
</div>

<style>
	.landing-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 40px 16px 60px;
		max-width: 960px;
		margin: 0 auto;
	}

	.badge-wrap {
		margin-bottom: 20px;
	}

	.landing-title {
		font-size: 3.2rem;
		font-weight: 800;
		line-height: 1.15;
		margin-bottom: 20px;
	}

	.gradient-text {
		background: var(--grad-reward);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.landing-desc {
		font-size: 1.15rem;
		color: var(--text-muted);
		max-width: 720px;
		margin-bottom: 32px;
		line-height: 1.6;
	}

	.cta-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		flex-wrap: wrap;
		margin-bottom: 60px;
	}

	.pillars-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 24px;
		width: 100%;
		text-align: left;
	}

	.pillar-card {
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.pillar-icon {
		font-size: 2rem;
	}

	.pillar-title {
		font-size: 1.2rem;
	}

	.pillar-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.pillar-owner {
		font-size: 0.72rem;
		font-weight: 700;
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.12);
		padding: 3px 8px;
		border-radius: 4px;
		align-self: flex-start;
		margin-top: auto;
	}

	@media (max-width: 768px) {
		.landing-title {
			font-size: 2.2rem;
		}

		.landing-desc {
			font-size: 1rem;
		}
	}
</style>
