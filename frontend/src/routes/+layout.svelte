<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<div class="app-shell">
	<Navbar />
	<div class="app-body">
		<Sidebar />
		<main class="app-main">
			{@render children()}
		</main>
	</div>
	<Footer />
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-body {
		display: flex;
		flex: 1;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
	}

	.app-main {
		flex: 1;
		padding: 32px 36px;
		overflow-y: auto;
		min-width: 0;
	}

	@media (max-width: 768px) {
		.app-main {
			padding: 20px 16px;
		}
	}
</style>
