<script lang="ts">
	import type { CourseProgressSummary } from '$lib/services/api';
	import { walletStore } from '$lib/stores/walletStore';

	let { courses }: { courses: CourseProgressSummary[] } = $props();

	let simulatingCourseId = $state<string | null>(null);

	async function simulateCompleteLesson(course: CourseProgressSummary) {
		simulatingCourseId = course.course_id;
		await walletStore.claimRewardPoints(
			75,
			`Completed lesson in '${course.title}'`
		);
		setTimeout(() => {
			simulatingCourseId = null;
		}, 800);
	}
</script>

<div class="courses-section">
	<div class="section-head">
		<div>
			<h2 class="section-title">Enrolled Courses & Pathways</h2>
			<p class="section-subtitle">Earn 50 to 150 points for every module completed.</p>
		</div>
		<a href="/courses" class="btn btn-outline btn-sm">Browse All Courses →</a>
	</div>

	<div class="courses-list">
		{#each courses as course}
			<div class="card course-card">
				<div class="course-meta">
					<span class="badge badge-ai">{course.category}</span>
					<span class="last-seen">Active: {course.last_accessed}</span>
				</div>

				<h3 class="course-title">{course.title}</h3>

				<div class="progress-block">
					<div class="progress-info">
						<span class="modules-text">{course.modules_completed} of {course.total_modules} modules completed</span>
						<span class="percent-text">{course.progress_percentage}%</span>
					</div>
					<div class="progress-container">
						<div class="progress-bar" style="width: {course.progress_percentage}%"></div>
					</div>
				</div>

				<div class="course-bottom">
					<div class="points-reward-info">
						<span class="reward-pill">+{course.points_earned} PTS Earned</span>
					</div>
					<div class="course-actions">
						<button 
							class="btn btn-outline btn-sm"
							onclick={() => simulateCompleteLesson(course)}
							disabled={simulatingCourseId === course.course_id}
						>
							{#if simulatingCourseId === course.course_id}
								Crediting +75 PTS...
							{:else}
								Complete Quick Lesson (+75 Pts)
							{/if}
						</button>
						<a href="/ai-assistant?course={course.course_id}" class="btn btn-primary btn-sm">
							Ask AI Tutor 🤖
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.courses-section {
		margin-bottom: 36px;
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		flex-wrap: wrap;
		gap: 12px;
	}

	.section-title {
		font-size: 1.35rem;
	}

	.section-subtitle {
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.courses-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.course-card {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 20px 24px;
	}

	.course-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.last-seen {
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	.course-title {
		font-size: 1.15rem;
		font-weight: 700;
	}

	.progress-block {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.progress-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.8rem;
	}

	.modules-text {
		color: var(--text-muted);
	}

	.percent-text {
		font-weight: 700;
		color: #a5b4fc;
	}

	.course-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 8px;
		border-top: 1px solid var(--border-subtle);
	}

	.reward-pill {
		font-size: 0.75rem;
		font-weight: 700;
		color: #34d399;
		background: rgba(16, 185, 129, 0.12);
		padding: 3px 10px;
		border-radius: 9999px;
		border: 1px solid rgba(16, 185, 129, 0.25);
	}

	.course-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
