<script lang="ts">
	import { page } from '$app/state';
	import LessonNavigation from '$lib/components/courses/LessonNavigation.svelte';
	import type { Lesson } from '$lib/components/courses/types';

	const courseId = $derived(page.params.courseId);

	const course = {
		id: courseId,
		title: 'Introduction to Python',
		description: 'Learn Python basics for data and AI.',
		pathway: 'Data Science & AI',
		level: 'Beginner',
		duration: '4 weeks',
		objectives: ['Understand variables and data types', 'Write loops and functions', 'Use basic data structures'],
		lessons: [
			{ id: 'l1', courseId, title: 'Variables and Types', order: 1, completed: false, pointsReward: 50 },
			{ id: 'l2', courseId, title: 'Control Flow', order: 2, completed: false, pointsReward: 50 },
			{ id: 'l3', courseId, title: 'Functions', order: 3, completed: false, pointsReward: 50 }
		] as Lesson[]
	};

	let lessons = $state<Lesson[]>(course.lessons);
	let activeLessonId = $state<string | null>(null);
	let completing = $state(false);
	let feedback = $state('');

	const activeLesson = $derived(lessons.find((l) => l.id === activeLessonId) ?? null);
	const completedCount = $derived(lessons.filter((l) => l.completed).length);
	const progress = $derived(Math.round((completedCount / lessons.length) * 100));

	function startLearning() {
		const next = lessons.find((l) => !l.completed) ?? lessons[0];
		activeLessonId = next.id;
	}

	function navigate(id: string) { activeLessonId = id; feedback = ''; }

	function prevLesson() {
		if (!activeLesson) return;
		const idx = lessons.findIndex((l) => l.id === activeLesson.id);
		if (idx > 0) activeLessonId = lessons[idx - 1].id;
	}

	function nextLesson() {
		if (!activeLesson) return;
		const idx = lessons.findIndex((l) => l.id === activeLesson.id);
		if (idx < lessons.length - 1) activeLessonId = lessons[idx + 1].id;
	}

	async function completeLesson() {
		if (!activeLesson || completing || activeLesson.completed) return;
		completing = true;
		await new Promise((r) => setTimeout(r, 400));
		lessons = lessons.map((l) => (l.id === activeLesson.id ? { ...l, completed: true } : l));
		feedback = `Lesson completed! +${activeLesson.pointsReward} PTS`;
		completing = false;
	}
</script>

<div class="course-page">
	<a href="/courses" class="back-link">← Back to courses</a>

	{#if !activeLesson}
		<div class="card course-details">
			<h1 class="course-title">{course.title}</h1>
			<p class="course-desc">{course.description}</p>
			<div class="meta-row">
				<span>Pathway: {course.pathway}</span>
				<span>Level: {course.level}</span>
				<span>Duration: {course.duration}</span>
				<span>Lessons: {lessons.length}</span>
			</div>
			<div class="progress-container"><div class="progress-bar" style="width: {progress}%"></div></div>
			<p class="progress-text">{progress}% complete</p>

			<h3>Learning Objectives</h3>
			<ul class="objectives">
				{#each course.objectives as o}<li>{o}</li>{/each}
			</ul>

			<h3>Lessons</h3>
			<LessonNavigation {lessons} currentId="" onNavigate={navigate} />

			<div class="actions">
				<button class="btn btn-primary" onclick={startLearning}>Start Learning</button>
				<a href="/orientation/results" class="btn btn-outline">Assessment Entry</a>
			</div>
		</div>
	{:else}
		<div class="lesson-view">
			<div class="lesson-header">
				<h2>{activeLesson.title}</h2>
				<span class="lesson-progress">Lesson {activeLesson.order} of {lessons.length}</span>
			</div>
			<div class="lesson-content card">
				<p>This is educational content for {activeLesson.title}. Read and understand the concepts before marking complete.</p>
			</div>
			{#if feedback}<p class="feedback">{feedback}</p>{/if}
			<div class="lesson-nav-row">
				<button class="btn btn-outline" onclick={prevLesson} disabled={activeLesson.order === 1}>Previous</button>
				<button class="btn btn-primary" onclick={completeLesson} disabled={completing || activeLesson.completed}>
					{completing ? 'Completing...' : activeLesson.completed ? 'Completed' : 'Complete Lesson'}
				</button>
				<button class="btn btn-outline" onclick={nextLesson} disabled={activeLesson.order === lessons.length}>Next</button>
			</div>
			<button class="btn btn-outline btn-sm" onclick={() => (activeLessonId = null)}>Back to Course Overview</button>
		</div>
	{/if}
</div>

<style>
	.course-page { display: flex; flex-direction: column; gap: 20px; }
	.back-link { color: #a5b4fc; font-size: 0.9rem; }
	.course-details { padding: 28px; display: flex; flex-direction: column; gap: 14px; }
	.course-title { font-size: 1.8rem; }
	.course-desc { color: var(--text-muted); }
	.meta-row { display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.85rem; color: var(--text-dim); }
	.progress-text { font-size: 0.85rem; color: var(--text-muted); }
	.objectives { padding-left: 20px; color: var(--text-muted); font-size: 0.9rem; }
	.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
	.lesson-view { display: flex; flex-direction: column; gap: 16px; }
	.lesson-header { display: flex; justify-content: space-between; align-items: center; }
	.lesson-header h2 { font-size: 1.5rem; }
	.lesson-progress { font-size: 0.85rem; color: var(--text-muted); }
	.lesson-content { padding: 24px; }
	.lesson-nav-row { display: flex; gap: 12px; flex-wrap: wrap; }
	.feedback { color: #34d399; font-size: 0.9rem; }
</style>
