<script lang="ts">
	import type { Course } from './types';
	let { course, onEnroll = () => {} } = $props<{ course: Course; onEnroll?: () => void }>();
</script>

<div class="card course-card">
	<div class="card-head">
		<span class="badge badge-ai">{course.category}</span>
		<span class="level-pill">{course.level}</span>
	</div>
	<h3 class="course-name">{course.title}</h3>
	<p class="course-desc">{course.description}</p>
	<div class="course-stats">
		<span class="stat-k">Modules:</span>
		<span class="stat-v">{course.modules}</span>
		<span class="stat-k">Reward:</span>
		<span class="stat-v text-emerald">+{course.pointsReward} PTS</span>
	</div>
	<button class="btn btn-reward btn-sm" onclick={onEnroll} disabled={course.enrolled}>
		{course.enrolled ? 'Enrolled' : 'Enroll'}
	</button>
</div>

<style>
	.course-card { display: flex; flex-direction: column; gap: 12px; }
	.card-head { display: flex; justify-content: space-between; align-items: center; }
	.level-pill { font-size: 0.75rem; color: var(--text-dim); }
	.course-name { font-size: 1.15rem; }
	.course-desc { font-size: 0.88rem; color: var(--text-muted); }
	.course-stats { display: flex; gap: 12px; font-size: 0.85rem; }
	.stat-k { color: var(--text-dim); }
	.stat-v { font-weight: 700; }
	.text-emerald { color: #34d399; }
</style>
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/courses/CourseCard.svelte