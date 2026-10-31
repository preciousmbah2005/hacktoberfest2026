import { writable } from 'svelte/store';
import { fetchDashboardOverview, type DashboardOverview } from '../services/api';

export interface DashboardState {
	overview: DashboardOverview | null;
	loading: boolean;
	error: string | null;
}

function createDashboardStore() {
	const { subscribe, set, update } = writable<DashboardState>({
		overview: null,
		loading: false,
		error: null
	});

	return {
		subscribe,
		load: async (studentId = 'demo_student') => {
			update((s) => ({ ...s, loading: true, error: null }));
			try {
				const overview = await fetchDashboardOverview(studentId);
				set({
					overview,
					loading: false,
					error: null
				});
			} catch (err: unknown) {
				set({
					overview: null,
					loading: false,
					error: (err as Error).message || 'Failed to load dashboard data'
				});
			}
		}
	};
}

export const dashboardStore = createDashboardStore();
