<script lang="ts">
	import type { Course } from './types';
	let { course, onAction = () => {} }: { course: Course; onAction?: () => void } = $props();
</script>

<div class="card course-card">
	<div class="card-head">
		<span class="badge badge-ai">{course.pathway}</span>
		<span class="level-pill">{course.level}</span>
	</div>
	<h3 class="course-name">{course.title}</h3>
	<p class="course-desc">{course.description}</p>
	<div class="course-meta">
		<span class="meta-item">⏱ {course.duration}</span>
		{#if course.progress !== undefined}<span class="meta-item">Progress: {course.progress}%</span>{/if}
	</div>
	{#if course.progress !== undefined}
		<div class="progress-container"><div class="progress-bar" style="width: {course.progress}%"></div></div>
	{/if}
	<button class="btn btn-reward btn-sm" onclick={onAction}>
		{course.enrolled ? 'Continue Learning' : 'Enroll'}
	</button>
</div>

<style>
	.course-card { display: flex; flex-direction: column; gap: 12px; }
	.card-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
	.level-pill { font-size: 0.75rem; color: var(--text-dim); }
	.course-name { font-size: 1.15rem; }
	.course-desc { font-size: 0.88rem; color: var(--text-muted); }
	.course-meta { display: flex; gap: 12px; font-size: 0.8rem; color: var(--text-dim); }
	.meta-item { font-weight: 600; }
</style>
