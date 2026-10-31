<script lang="ts">
	import { goto } from '$app/navigation';
	import ProgressIndicator from '$lib/components/orientation/ProgressIndicator.svelte';
	import SelectionCard from '$lib/components/orientation/SelectionCard.svelte';
	import { orientationResult } from '$lib/components/orientation/orientationStore';
	import { submitOrientationAssessment } from '$lib/components/orientation/orientationService';
	import type { OrientationQuestionnaireAnswers } from '$lib/components/orientation/types';

	const steps = [
		{ id: 'interests', title: 'Areas of Interest', description: 'Select the fields that excite you the most.', type: 'multi', options: ['Technology', 'Science', 'Arts', 'Business', 'Health', 'Education'] },
		{ id: 'favoriteSubjects', title: 'Favourite Academic Subjects', description: 'Choose the subjects you enjoy studying.', type: 'multi', options: ['Mathematics', 'Computer Science', 'Physics', 'Biology', 'Literature', 'Economics'] },
		{ id: 'skills', title: 'Existing Skills', description: 'Select skills you already have or are developing.', type: 'multi', options: ['Problem Solving', 'Communication', 'Coding', 'Research', 'Design', 'Leadership'] },
		{ id: 'preferredActivities', title: 'Preferred Activities', description: 'What kinds of activities do you enjoy most?', type: 'multi', options: ['Building', 'Analyzing', 'Teaching', 'Creating', 'Organizing', 'Experimenting'] },
		{ id: 'problems', title: 'Problems You Enjoy Solving', description: 'Pick the problem types you find most engaging.', type: 'multi', options: ['Logical Puzzles', 'Real-world Issues', 'Creative Challenges', 'Data Problems', 'People Problems'] },
		{ id: 'careerGoals', title: 'Career Aspirations', description: 'Describe the career you aspire to in your own words.', type: 'text' }
	];

	let answers = $state<OrientationQuestionnaireAnswers>({ interests: [], favoriteSubjects: [], skills: [], careerGoals: '' });
	let preferredActivities = $state<string[]>([]);
	let problems = $state<string[]>([]);

	let current = $state(0);
	let error = $state('');
	let loading = $state(false);
	let submitting = $state(false);
	let submitted = $state(false);

	function toggle(list: string[], value: string): string[] {
		return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
	}

	function currentAnswerEmpty(): boolean {
		const step = steps[current];
		if (step.type === 'text') return !answers.careerGoals.trim();
		const map: Record<string, string[]> = {
			interests: answers.interests,
			favoriteSubjects: answers.favoriteSubjects,
			skills: answers.skills,
			preferredActivities,
			problems
		};
		return (map[step.id] ?? []).length === 0;
	}

	function next() {
		if (currentAnswerEmpty()) { error = 'Please provide an answer before continuing.'; return; }
		error = '';
		if (current < steps.length - 1) current++;
	}

	function prev() { error = ''; if (current > 0) current--; }

	async function submit() {
		if (submitting) return;
		submitting = true;
		loading = true;
		error = '';
		try {
			const req = {
				answers: {
					interests: answers.interests,
					favorite_subjects: answers.favoriteSubjects,
					skills: answers.skills,
					career_goals: answers.careerGoals
				}
			};
			const res = await submitOrientationAssessment(req);
			orientationResult.set(res);
			await goto('/orientation/results');
		} catch (e) {
			error = 'Submission failed. Please try again.';
		} finally {
			loading = false;
			submitting = false;
		}
	}

	const step = $derived(steps[current]);
</script>

<div class="orientation-page">
	<div class="header-box">
		<h1 class="page-title">Career Orientation Questionnaire</h1>
		<p class="page-subtitle">Answer a few questions to help us understand your interests and aspirations.</p>
	</div>

	<ProgressIndicator value={current + 1} max={steps.length} label={`Step ${current + 1} of ${steps.length}`} />

	<div class="card question-card">
		<h2 class="step-title">{step.title}</h2>
		<p class="step-desc">{step.description}</p>

		{#if step.type === 'multi'}
			<div class="options-grid">
				{#each step.options as opt}
					<SelectionCard
						title={opt}
						description=""
						selected={
							step.id === 'interests' ? answers.interests.includes(opt) :
							step.id === 'favoriteSubjects' ? answers.favoriteSubjects.includes(opt) :
							step.id === 'skills' ? answers.skills.includes(opt) :
							step.id === 'preferredActivities' ? preferredActivities.includes(opt) :
							problems.includes(opt)
						}
						onclick={() => {
							if (step.id === 'interests') answers.interests = toggle(answers.interests, opt);
							else if (step.id === 'favoriteSubjects') answers.favoriteSubjects = toggle(answers.favoriteSubjects, opt);
							else if (step.id === 'skills') answers.skills = toggle(answers.skills, opt);
							else if (step.id === 'preferredActivities') preferredActivities = toggle(preferredActivities, opt);
							else problems = toggle(problems, opt);
						}}
					/>
				{/each}
			</div>
		{:else}
			<textarea class="form-textarea" rows="4" bind:value={answers.careerGoals} placeholder="e.g. I want to build AI products..."></textarea>
		{/if}

		{#if error}<p class="error">{error}</p>{/if}

		<div class="nav-row">
			<button class="btn btn-outline" onclick={prev} disabled={current === 0}>Previous</button>
			{#if current === steps.length - 1}
				<button class="btn btn-primary" onclick={submit} disabled={loading || submitting}>{loading ? 'Submitting...' : 'Submit'}</button>
			{:else}
				<button class="btn btn-primary" onclick={next}>Next</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.orientation-page { display: flex; flex-direction: column; gap: 24px; }
	.header-box { display: flex; flex-direction: column; gap: 8px; }
	.page-title { font-size: 2rem; }
	.page-subtitle { font-size: 0.95rem; color: var(--text-muted); max-width: 720px; }
	.question-card { padding: 28px; display: flex; flex-direction: column; gap: 16px; }
	.step-title { font-size: 1.35rem; }
	.step-desc { font-size: 0.9rem; color: var(--text-muted); }
	.options-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
	.nav-row { display: flex; justify-content: space-between; gap: 12px; margin-top: 8px; }
	.error { color: #f43f5e; font-size: 0.85rem; }
	@media (max-width: 600px) { .options-grid { grid-template-columns: 1fr; } .nav-row { flex-direction: column; } }
</style>
