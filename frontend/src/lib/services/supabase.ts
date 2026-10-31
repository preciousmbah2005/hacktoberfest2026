import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://iplolasbeckwmxdbllqi.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'demo-anon-key-learn2earn';

export const isConfigured = Boolean(
	supabaseUrl &&
	supabaseAnonKey &&
	!supabaseUrl.includes('your-project') &&
	!supabaseAnonKey.includes('your-supabase')
);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export interface StudentProfile {
	id: string;
	email: string;
	fullName: string;
	avatarUrl?: string;
	targetPathway?: string;
}

// Fallback demo user for local hackathon demo when remote Supabase isn't connected
export const DEMO_USER: User = {
	id: '00000000-0000-0000-0000-000000000001',
	app_metadata: {},
	user_metadata: {
		full_name: 'Alex Kimani',
		avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
	},
	aud: 'authenticated',
	created_at: new Date().toISOString(),
	email: 'alex.student@learn2earn.io'
};

export async function getCurrentUser(): Promise<User | null> {
	if (!isConfigured) {
		const stored = localStorage.getItem('l2e_demo_user');
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {
				return DEMO_USER;
			}
		}
		return DEMO_USER;
	}

	try {
		const { data: { session } } = await supabase.auth.getSession();
		return session?.user ?? null;
	} catch (err) {
		console.warn('Supabase getSession failed, using demo fallback:', err);
		return DEMO_USER;
	}
}

export async function signInWithEmail(email: string, password: string):Promise<{ user: User | null; error: Error | null }> {
	if (!isConfigured) {
		const demo = { ...DEMO_USER, email };
		localStorage.setItem('l2e_demo_user', JSON.stringify(demo));
		return { user: demo, error: null };
	}

	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	return { user: data.user, error: error as Error | null };
}

export async function signUpWithEmail(email: string, password: string, fullName: string): Promise<{ user: User | null; error: Error | null }> {
	if (!isConfigured) {
		const demo = {
			...DEMO_USER,
			email,
			user_metadata: { full_name: fullName }
		};
		localStorage.setItem('l2e_demo_user', JSON.stringify(demo));
		return { user: demo, error: null };
	}

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { full_name: fullName }
		}
	});

	return { user: data.user, error: error as Error | null };
}

export async function signOutUser(): Promise<void> {
	localStorage.removeItem('l2e_demo_user');
	if (isConfigured) {
		await supabase.auth.signOut();
	}
}
