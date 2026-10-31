<script lang="ts">
	const pathways = [
		{ id: 'software-engineering', name: 'Software Engineering', description: 'Design, build, and maintain software applications and systems.', skills: ['Programming', 'Problem Solving', 'Version Control', 'Testing'], learningAreas: ['Algorithms', 'Web Development', 'Databases', 'APIs'] },
		{ id: 'data-science-ai', name: 'Data Science & AI', description: 'Analyze data and build intelligent models and AI systems.', skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'], learningAreas: ['Python', 'Statistics', 'Machine Learning', 'SQL'] },
		{ id: 'cybersecurity', name: 'Cybersecurity', description: 'Protect systems, networks, and data from threats.', skills: ['Networking', 'Security Principles', 'Risk Assessment', 'Incident Response'], learningAreas: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Compliance'] },
		{ id: 'ui-ux-product', name: 'UI/UX & Product Design', description: 'Design intuitive, accessible, and delightful digital products.', skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'], learningAreas: ['Design Thinking', 'Interaction Design', 'Accessibility', 'Product Strategy'] }
	];

	let selected = $state<string | null>(null);
	let expanded = $state<string | null>(null);
</script>

<div class="orientation-page">
	<div class="header-box">
		<h1 class="page-title">Career Pathway Exploration</h1>
		<p class="page-subtitle">Discover different career fields before deciding which to pursue.</p>
	</div>

	<div class="pathways-grid">
		{#each pathways as p}
			<div class="card pathway-card" class:selected={selected === p.id}>
				<div class="card-head">
					<h3>{p.name}</h3>
					{#if selected === p.id}<span class="badge badge-reward">Selected</span>{/if}
				</div>
				<p class="desc">{p.description}</p>

				{#if expanded === p.id}
					<div class="details">
						<div class="meta-section">
							<span class="meta-label">Relevant Skills</span>
							<div class="tags-wrap">
								{#each p.skills as sk}<span class="tag-pill">{sk}</span>{/each}
							</div>
						</div>
						<div class="meta-section">
							<span class="meta-label">Recommended Learning Areas</span>
							<div class="tags-wrap">
								{#each p.learningAreas as la}<span class="tag-pill">{la}</span>{/each}
							</div>
						</div>
					</div>
				{/if}

				<div class="card-actions">
					<button class="btn btn-outline btn-sm" onclick={() => (expanded = expanded === p.id ? null : p.id)}>
						{expanded === p.id ? 'Hide Details' : 'Explore Pathway'}
					</button>
					<button class="btn btn-primary btn-sm" onclick={() => (selected = p.id)}>Select Pathway</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.orientation-page { display: flex; flex-direction: column; gap: 24px; }
	.header-box { display: flex; flex-direction: column; gap: 8px; }
	.page-title { font-size: 2rem; }
	.page-subtitle { font-size: 0.95rem; color: var(--text-muted); }
	.pathways-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
	.pathway-card { display: flex; flex-direction: column; gap: 12px; }
	.pathway-card.selected { border-color: var(--accent-emerald); box-shadow: var(--glow-emerald); }
	.card-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
	.card-head h3 { font-size: 1.15rem; color: #38bdf8; }
	.desc { font-size: 0.88rem; color: var(--text-muted); }
	.details { display: flex; flex-direction: column; gap: 10px; }
	.meta-section { display: flex; flex-direction: column; gap: 6px; }
	.meta-label { font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; }
	.tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
	.tag-pill { font-size: 0.75rem; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 6px; }
	.card-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
	@media (max-width: 600px) { .pathways-grid { grid-template-columns: 1fr; } }
</style>
