<script lang="ts">
	import { signInWithEmail, DEMO_USER } from '$lib/services/supabase';
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	let email = $state('alex.student@learn2earn.io');
	let password = $state('password123');
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		errorMsg = null;

		const { user, error } = await signInWithEmail(email, password);
		loading = false;

		if (error) {
			errorMsg = error.message;
			return;
		}

		if (user) {
			authStore.setUser(user);
			goto('/dashboard');
		}
	}

	function handleDemoLogin() {
		authStore.setUser(DEMO_USER);
		goto('/dashboard');
	}
</script>

<div class="auth-page">
	<div class="card auth-card">
		<div class="auth-head">
			<span class="badge badge-points">Student Access</span>
			<h1 class="auth-title">Welcome to Learn2Earn</h1>
			<p class="auth-subtitle">Sign in to your learning account and wallet</p>
		</div>

		<form onsubmit={handleLogin} class="auth-form">
			<div class="form-group">
				<label class="form-label" for="login-email">Email Address</label>
				<input 
					id="login-email"
					type="email" 
					class="form-input" 
					bind:value={email} 
					required 
				/>
			</div>

			<div class="form-group">
				<label class="form-label" for="login-password">Password</label>
				<input 
					id="login-password"
					type="password" 
					class="form-input" 
					bind:value={password} 
					required 
				/>
			</div>

			{#if errorMsg}
				<div class="error-box">{errorMsg}</div>
			{/if}

			<button type="submit" class="btn btn-primary btn-lg w-full" disabled={loading}>
				{loading ? 'Signing in...' : 'Sign In with Supabase Auth'}
			</button>
		</form>

		<div class="divider">
			<span>OR QUICK TEST</span>
		</div>

		<button type="button" class="btn btn-outline w-full" onclick={handleDemoLogin}>
			Instant Demo Login
		</button>

		<div class="auth-footer">
			<span class="footer-text">New to Learn2Earn?</span>
			<a href="/register" class="footer-link">Create free student account →</a>
		</div>
	</div>
</div>

<style>
	.auth-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - var(--header-height) - 120px);
		padding: 20px;
	}

	.auth-card {
		width: 100%;
		max-width: 440px;
		padding: 36px 32px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		background: rgba(15, 23, 42, 0.85);
		border-color: var(--border-highlight);
	}

	.auth-head {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	.auth-title {
		font-size: 1.6rem;
	}

	.auth-subtitle {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.error-box {
		background: rgba(239, 68, 68, 0.15);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #fca5a5;
		padding: 10px;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
	}

	.divider {
		position: relative;
		text-align: center;
		margin: 6px 0;
	}

	.divider::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		height: 1px;
		background: var(--border-subtle);
	}

	.divider span {
		position: relative;
		background: var(--bg-secondary);
		padding: 0 10px;
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--text-dim);
		letter-spacing: 0.08em;
	}

	.auth-footer {
		text-align: center;
		font-size: 0.85rem;
		padding-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	.footer-text {
		color: var(--text-muted);
	}

	.footer-link {
		color: #38bdf8;
		font-weight: 600;
	}

	.footer-link:hover {
		text-decoration: underline;
	}

	.w-full {
		width: 100%;
	}
</style>
