import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser, signOutUser, DEMO_USER } from '../services/supabase';

export interface AuthState {
	user: User | null;
	loading: boolean;
	isAuthenticated: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: DEMO_USER,
		loading: false,
		isAuthenticated: true
	});

	return {
		subscribe,
		init: async () => {
			update((s) => ({ ...s, loading: true }));
			try {
				const user = await getCurrentUser();
				set({
					user: user || DEMO_USER,
					loading: false,
					isAuthenticated: true
				});
			} catch {
				set({
					user: DEMO_USER,
					loading: false,
					isAuthenticated: true
				});
			}
		},
		setUser: (user: User | null) => {
			set({
				user,
				loading: false,
				isAuthenticated: Boolean(user)
			});
		},
		logout: async () => {
			await signOutUser();
			set({
				user: null,
				loading: false,
				isAuthenticated: false
			});
		}
	};
}

export const authStore = createAuthStore();
