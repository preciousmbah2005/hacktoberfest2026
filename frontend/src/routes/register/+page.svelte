<script lang="ts">
	import { signUpWithEmail } from '$lib/services/supabase';
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	let fullName = $state('Alex Kimani');
	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);

	async function handleRegister(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		errorMsg = null;

		const { user, error } = await signUpWithEmail(email, password, fullName);
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
</script>

<div class="auth-page">
	<div class="card auth-card">
		<div class="auth-head">
			<span class="badge badge-reward">New Student</span>
			<h1 class="auth-title">Create Account</h1>
			<p class="auth-subtitle">Get 500 Welcome Learning Points immediately</p>
		</div>

		<form onsubmit={handleRegister} class="auth-form">
			<div class="form-group">
				<label class="form-label" for="reg-name">Full Name</label>
				<input 
					id="reg-name"
					type="text" 
					class="form-input" 
					placeholder="Alex Kimani"
					bind:value={fullName} 
					required 
				/>
			</div>

			<div class="form-group">
				<label class="form-label" for="reg-email">Email Address</label>
				<input 
					id="reg-email"
					type="email" 
					class="form-input" 
					placeholder="student@example.com"
					bind:value={email} 
					required 
				/>
			</div>

			<div class="form-group">
				<label class="form-label" for="reg-pass">Password</label>
				<input 
					id="reg-pass"
					type="password" 
					class="form-input" 
					placeholder="Create a strong password"
					bind:value={password} 
					required 
				/>
			</div>

			{#if errorMsg}
				<div class="error-box">⚠️ {errorMsg}</div>
			{/if}

			<button type="submit" class="btn btn-reward btn-lg w-full" disabled={loading}>
				{loading ? 'Creating Account...' : 'Sign Up & Claim 500 PTS ⚡'}
			</button>
		</form>

		<div class="auth-footer">
			<span class="footer-text">Already registered?</span>
			<a href="/login" class="footer-link">Sign in here →</a>
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
