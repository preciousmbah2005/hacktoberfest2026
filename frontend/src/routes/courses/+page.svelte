<script lang="ts">
	import { walletStore } from '$lib/stores/walletStore';

	// Integration foundation for Developer 2
	const mockCourseCatalog = [
		{
			id: 'ai-python-foundations',
			title: 'Introduction to Python & AI Foundations',
			category: 'Software & AI',
			modules: 10,
			level: 'Beginner',
			pointsReward: 350,
			description: 'Learn variables, loops, data structures, and how to interface with AI models.',
			enrolled: true
		},
		{
			id: 'web-dev-svelte',
			title: 'Modern Full-Stack Web Development with SvelteKit',
			category: 'Web Engineering',
			modules: 10,
			level: 'Intermediate',
			pointsReward: 400,
			description: 'Build fast, interactive web applications using Svelte 5 and TypeScript.',
			enrolled: true
		},
		{
			id: 'data-analysis-sql',
			title: 'Practical SQL & Relational Databases',
			category: 'Data & Analytics',
			modules: 8,
			level: 'Beginner',
			pointsReward: 250,
			description: 'Query, model, and join datasets using PostgreSQL and Supabase.',
			enrolled: true
		},
		{
			id: 'machine-learning-101',
			title: 'Applied Machine Learning Fundamentals',
			category: 'AI & Machine Learning',
			modules: 12,
			level: 'Advanced',
			pointsReward: 500,
			description: 'Supervised vs unsupervised learning, model evaluation, and deployment.',
			enrolled: false
		}
	];

	let completingId = $state<string | null>(null);

	async function handleSimulateLesson(courseTitle: string, id: string) {
		completingId = id;
		await walletStore.claimRewardPoints(75, `Completed lesson in '${courseTitle}'`);
		setTimeout(() => {
			completingId = null;
		}, 800);
	}
</script>

<div class="courses-page">
	<div class="header-box">
		<div class="ownership-banner">
			<span class="owner-pill">Assigned: Developer 2</span>
			<span class="status-pill">Course Foundation Ready</span>
		</div>
		<h1 class="page-title">Course Catalog & Learning Modules</h1>
		<p class="page-subtitle">
			Every lesson completed credits your student wallet with learning points that convert into free mobile data.
		</p>
	</div>

	<div class="courses-grid">
		{#each mockCourseCatalog as course}
			<div class="card course-card">
				<div class="card-head">
					<span class="badge badge-ai">{course.category}</span>
					<span class="level-pill">{course.level}</span>
				</div>

				<h3 class="course-name">{course.title}</h3>
				<p class="course-desc">{course.description}</p>

				<div class="course-stats">
					<div class="stat-item">
						<span class="stat-k">Modules:</span>
						<span class="stat-v">{course.modules} lessons</span>
					</div>
					<div class="stat-item">
						<span class="stat-k">Reward:</span>
						<span class="stat-v text-emerald">+{course.pointsReward} PTS</span>
					</div>
				</div>

				<div class="card-actions">
					<button 
						class="btn btn-reward btn-sm"
						onclick={() => handleSimulateLesson(course.title, course.id)}
						disabled={completingId === course.id}
					>
						{completingId === course.id ? 'Crediting +75 PTS...' : 'Complete Lesson (+75 Pts) ⚡'}
					</button>

					<a href="/ai-assistant?course={course.id}" class="btn btn-outline btn-sm">
						Open AI Tutor 🤖
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.courses-page {
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

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 24px;
	}

	.course-card {
		padding: 24px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 16px;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.level-pill {
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.course-name {
		font-size: 1.2rem;
		line-height: 1.35;
	}

	.course-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.course-stats {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
		font-size: 0.85rem;
	}

	.stat-k {
		color: var(--text-dim);
	}

	.stat-v {
		font-weight: 700;
	}

	.text-emerald {
		color: #34d399;
	}

	.card-actions {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
