<script lang="ts">
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import { mockCourses } from '$lib/components/courses/courseMock';
	import type { Course } from '$lib/components/courses/types';

	let pathwayFilter = $state('All');
	let levelFilter = $state('All');

	const pathways = ['All', 'Software Engineering', 'Data Science & AI', 'Cybersecurity', 'UI/UX & Product Design'];
	const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

	const filtered = $derived(
		mockCourses.filter((c: Course) =>
			(pathwayFilter === 'All' || c.pathway === pathwayFilter) &&
			(levelFilter === 'All' || c.level === levelFilter)
		)
	);
</script>

<div class="courses-page">
	<div class="header-box">
		<h1 class="page-title">Course Catalog</h1>
		<p class="page-subtitle">Discover courses to develop skills for your career pathway.</p>
	</div>

	<div class="filters">
		<select class="form-select" bind:value={pathwayFilter}>
			{#each pathways as p}<option value={p}>{p}</option>{/each}
		</select>
		<select class="form-select" bind:value={levelFilter}>
			{#each levels as l}<option value={l}>{l}</option>{/each}
		</select>
	</div>

	<div class="courses-grid">
		{#each filtered as course}
			<CourseCard {course} onAction={() => {}} />
		{/each}
	</div>
</div>

<style>
	.courses-page { display: flex; flex-direction: column; gap: 24px; }
	.header-box { display: flex; flex-direction: column; gap: 8px; }
	.page-title { font-size: 2rem; }
	.page-subtitle { font-size: 0.95rem; color: var(--text-muted); }
	.filters { display: flex; gap: 12px; flex-wrap: wrap; }
	.filters select { max-width: 260px; }
	.courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
</style>
EOF
echo done