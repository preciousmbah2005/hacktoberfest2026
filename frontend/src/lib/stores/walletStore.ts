import { writable } from 'svelte/store';
import {
	fetchWallet,
	fetchDataPackages,
	fetchTransactions,
	redeemMobileData,
	earnPoints,
	type WalletBalance,
	type DataPackage,
	type TransactionRecord,
	type RedeemDataResponse
} from '../services/api';

export interface WalletState {
	wallet: WalletBalance;
	packages: DataPackage[];
	transactions: TransactionRecord[];
	loading: boolean;
	redeeming: boolean;
	error: string | null;
	lastRedemption: RedeemDataResponse | null;
}

const initialWallet: WalletBalance = {
	student_id: 'demo_student',
	points_balance: 1250,
	total_earned: 1850,
	total_redeemed: 600,
	mobile_data_mb_redeemed: 1500
};

function createWalletStore() {
	const { subscribe, set, update } = writable<WalletState>({
		wallet: initialWallet,
		packages: [],
		transactions: [],
		loading: false,
		redeeming: false,
		error: null,
		lastRedemption: null
	});

	return {
		subscribe,
		load: async (studentId = 'demo_student') => {
			update((s) => ({ ...s, loading: true, error: null }));
			try {
				const [wallet, packages, transactions] = await Promise.all([
					fetchWallet(studentId),
					fetchDataPackages(),
					fetchTransactions(studentId)
				]);
				update((s) => ({
					...s,
					wallet,
					packages,
					transactions,
					loading: false
				}));
			} catch (err: unknown) {
				update((s) => ({
					...s,
					loading: false,
					error: (err as Error).message || 'Failed to load wallet'
				}));
			}
		},
		redeem: async (packageId: string, phone: string, provider: string, studentId = 'demo_student') => {
			update((s) => ({ ...s, redeeming: true, error: null }));
			try {
				const res = await redeemMobileData(packageId, phone, provider, studentId);
				const [wallet, transactions] = await Promise.all([
					fetchWallet(studentId),
					fetchTransactions(studentId)
				]);
				update((s) => ({
					...s,
					wallet,
					transactions,
					redeeming: false,
					lastRedemption: res
				}));
				return res;
			} catch (err: unknown) {
				const msg = (err as Error).message || 'Redemption failed';
				update((s) => ({ ...s, redeeming: false, error: msg }));
				throw err;
			}
		},
		claimRewardPoints: async (points: number, description: string, studentId = 'demo_student') => {
			try {
				const wallet = await earnPoints(points, description, 'manual_claim', studentId);
				const transactions = await fetchTransactions(studentId);
				update((s) => ({
					...s,
					wallet,
					transactions
				}));
			} catch (err) {
				console.error('Points claim error:', err);
			}
		},
		clearRedemptionModal: () => {
			update((s) => ({ ...s, lastRedemption: null, error: null }));
		}
	};
}

export const walletStore = createWalletStore();
