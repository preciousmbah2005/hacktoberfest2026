<script lang="ts">
	import { submitCareerAssessment, type AssessmentResponse } from '$lib/services/api';
	import { walletStore } from '$lib/stores/walletStore';

	// Integration harness for Developer 2 & 3
	let interests = $state('technology, mathematics, artificial intelligence');
	let favoriteSubjects = $state('computer science, physics');
	let skills = $state('problem solving, logical reasoning');
	let careerGoals = $state('Build intelligent systems and software solutions');

	let loading = $state(false);
	let result = $state<AssessmentResponse | null>(null);

	async function handleTestAssessment() {
		loading = true;
		try {
			const res = await submitCareerAssessment({
				interests: interests.split(',').map((s) => s.trim()).filter(Boolean),
				favorite_subjects: favoriteSubjects.split(',').map((s) => s.trim()).filter(Boolean),
				skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
				career_goals: careerGoals
			});
			result = res;
			// Award points for completing orientation
			await walletStore.claimRewardPoints(150, 'Completed AI Career Orientation Assessment');
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="orientation-page">
	<div class="header-box">
		<div class="ownership-banner">
			<span class="owner-pill">Assigned: Developer 2 & 3</span>
			<span class="status-pill">Contract Verified & Ready</span>
		</div>
		<h1 class="page-title">AI Career Orientation & Pathways</h1>
		<p class="page-subtitle">
			Discover which high-impact tech career pathway aligns with your passions, strengths, and ambitions.
		</p>
	</div>

	<!-- Interactive Assessment Form / Test Harness -->
	<div class="grid-layout">
		<div class="card form-card">
			<h3 class="card-title">Career Aptitude Survey</h3>
			<p class="card-hint">Answer the questions below to trigger the AI recommendation engine.</p>

			<div class="form-group">
				<label class="form-label" for="interests-input">Your Interests (comma separated)</label>
				<input id="interests-input" class="form-input" bind:value={interests} placeholder="technology, robotics, design" />
			</div>

			<div class="form-group">
				<label class="form-label" for="subjects-input">Favorite Subjects</label>
				<input id="subjects-input" class="form-input" bind:value={favoriteSubjects} placeholder="computer science, maths" />
			</div>

			<div class="form-group">
				<label class="form-label" for="skills-input">Current Skills / Strengths</label>
				<input id="skills-input" class="form-input" bind:value={skills} placeholder="problem solving, coding basics" />
			</div>

			<div class="form-group">
				<label class="form-label" for="goals-input">Career Goals</label>
				<textarea id="goals-input" class="form-textarea" rows="3" bind:value={careerGoals}></textarea>
			</div>

			<button class="btn btn-primary btn-lg" onclick={handleTestAssessment} disabled={loading}>
				{loading ? 'Evaluating with AI Model...' : 'Run Career Evaluation (+150 PTS) 🎯'}
			</button>
		</div>

		<div class="results-col">
			{#if result}
				<div class="card results-card">
					<div class="results-head">
						<span class="badge badge-reward">AI Recommendation Generated</span>
						<h3>Recommended Career Pathways</h3>
					</div>

					<div class="recommendations-list">
						{#each result.recommendations as rec}
							<div class="rec-item">
								<h4 class="rec-pathway">{rec.pathway}</h4>
								<p class="rec-desc">{rec.description}</p>
								<div class="rec-reason">
									<strong>Why this matches you:</strong> {rec.reason}
								</div>

								<div class="rec-meta">
									<div class="meta-section">
										<span class="meta-label">Key Skills to Master:</span>
										<div class="tags-wrap">
											{#each rec.skills as sk}
												<span class="tag-pill">{sk}</span>
											{/each}
										</div>
									</div>

									<div class="meta-section">
										<span class="meta-label">Suggested Courses:</span>
										<ul class="courses-ul">
											{#each rec.courses as c}
												<li><a href="/courses" class="course-link">👉 {c}</a></li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="card placeholder-card">
					<div class="placeholder-icon">🤖</div>
					<h3>Awaiting Assessment Input</h3>
					<p>Fill out your interests on the left to generate customized pathways, required skills, and course sequences.</p>
					
					<div class="contract-spec">
						<code>POST /api/orientation/assess</code>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.orientation-page {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.header-box {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ownership-banner {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.owner-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: #c084fc;
		background: rgba(168, 85, 247, 0.15);
		border: 1px solid rgba(168, 85, 247, 0.3);
		padding: 3px 10px;
		border-radius: 9999px;
	}

	.status-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: #34d399;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		padding: 3px 10px;
		border-radius: 9999px;
	}

	.page-title {
		font-size: 2rem;
	}

	.page-subtitle {
		font-size: 0.95rem;
		color: var(--text-muted);
		max-width: 720px;
	}

	.grid-layout {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 28px;
	}

	.form-card {
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.card-title {
		font-size: 1.25rem;
	}

	.card-hint {
		font-size: 0.82rem;
		color: var(--text-dim);
	}

	.results-card {
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.results-head {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.recommendations-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.rec-item {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-subtle);
		padding: 20px;
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.rec-pathway {
		font-size: 1.2rem;
		color: #38bdf8;
	}

	.rec-desc {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.rec-reason {
		font-size: 0.85rem;
		background: rgba(99, 102, 241, 0.1);
		border-left: 3px solid var(--accent-indigo);
		padding: 8px 12px;
		border-radius: 4px;
	}

	.meta-section {
		margin-top: 6px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meta-label {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-dim);
		text-transform: uppercase;
	}

	.tags-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag-pill {
		font-size: 0.75rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--border-subtle);
		padding: 3px 8px;
		border-radius: 6px;
	}

	.courses-ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.course-link {
		font-size: 0.88rem;
		color: #a5b4fc;
	}

	.course-link:hover {
		text-decoration: underline;
	}

	.placeholder-card {
		padding: 40px 24px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 14px;
		min-height: 380px;
		color: var(--text-muted);
	}

	.placeholder-icon {
		font-size: 3rem;
	}

	.contract-spec {
		margin-top: 10px;
		background: rgba(0, 0, 0, 0.4);
		padding: 6px 14px;
		border-radius: 6px;
		border: 1px solid var(--border-subtle);
	}

	@media (max-width: 900px) {
		.grid-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
