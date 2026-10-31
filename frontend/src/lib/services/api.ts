// Learn2Earn Frontend API Service (FastAPI Client)

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export interface DataPackage {
	id: string;
	name: string;
	provider: string;
	data_amount: string;
	points_cost: number;
	duration_days: number;
	description: string;
}

export interface WalletBalance {
	student_id: string;
	points_balance: number;
	total_earned: number;
	total_redeemed: number;
	mobile_data_mb_redeemed: number;
}

export interface TransactionRecord {
	id: string;
	type: 'earned' | 'redeemed';
	description: string;
	points: number;
	created_at: string;
	status: string;
	metadata?: Record<string, unknown>;
}

export interface RedeemDataResponse {
	success: boolean;
	transaction_id: string;
	message: string;
	points_deducted: number;
	remaining_balance: number;
	data_granted: string;
	phone_number: string;
	simulated_carrier_reference: string;
}

export interface StudentStats {
	student_id: string;
	full_name: string;
	email: string;
	avatar_url?: string;
	learning_points: number;
	mobile_data_mb_earned: number;
	streak_days: number;
	courses_enrolled_count: number;
	courses_completed_count: number;
	certificates_count: number;
	target_pathway?: string;
}

export interface CourseProgressSummary {
	course_id: string;
	title: string;
	category: string;
	progress_percentage: number;
	modules_completed: number;
	total_modules: number;
	points_earned: number;
	last_accessed: string;
}

export interface DashboardOverview {
	stats: StudentStats;
	active_courses: CourseProgressSummary[];
	recent_achievements: string[];
}

export interface PathwayRecommendation {
	pathway: string;
	description: string;
	reason: string;
	skills: string[];
	courses: string[];
}

export interface AssessmentResponse {
	recommendations: PathwayRecommendation[];
}

export interface AIChatResponse {
	response: string;
	suggested_actions: string[];
	course_id?: string;
}

// Fallback in-memory state if backend is offline during frontend isolated preview
let mockWallet: WalletBalance = {
	student_id: 'demo_student',
	points_balance: 1250,
	total_earned: 1850,
	total_redeemed: 600,
	mobile_data_mb_redeemed: 1500
};

const mockPackages: DataPackage[] = [
	{
		id: 'pkg_mtn_500mb',
		name: 'MTN Pulse 500MB Data',
		provider: 'MTN',
		data_amount: '500MB',
		points_cost: 250,
		duration_days: 14,
		description: 'Quick 500MB data bundle for learning and research.'
	},
	{
		id: 'pkg_airtel_1gb',
		name: 'Airtel Smart 1GB Bundle',
		provider: 'Airtel',
		data_amount: '1GB',
		points_cost: 450,
		duration_days: 30,
		description: 'High-speed 1GB bundle for video lessons and tutorials.'
	},
	{
		id: 'pkg_safaricom_2gb',
		name: 'Safaricom Tunukiwa 2GB',
		provider: 'Safaricom',
		data_amount: '2GB',
		points_cost: 800,
		duration_days: 30,
		description: 'Heavy 2GB bundle for full course modules and projects.'
	},
	{
		id: 'pkg_glo_1_5gb',
		name: 'Glo Berekete 1.5GB Data',
		provider: 'Glo',
		data_amount: '1.5GB',
		points_cost: 600,
		duration_days: 30,
		description: 'Reliable 1.5GB bundle for studying on the go.'
	},
	{
		id: 'pkg_vodafone_3gb',
		name: 'Vodafone Red 3GB Super Pack',
		provider: 'Vodafone',
		data_amount: '3GB',
		points_cost: 1100,
		duration_days: 30,
		description: 'Premium 3GB data pack for hackathons and coding practice.'
	}
];

let mockTransactions: TransactionRecord[] = [
	{
		id: 'tx_init_1',
		type: 'earned',
		description: "Completed 'AI Foundations & Career Quiz'",
		points: 350,
		created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
		status: 'completed'
	},
	{
		id: 'tx_init_2',
		type: 'earned',
		description: 'Finished Python Data Types Lesson',
		points: 200,
		created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
		status: 'completed'
	},
	{
		id: 'tx_init_3',
		type: 'redeemed',
		description: 'Redeemed 500MB MTN Data to +2348012345678',
		points: -250,
		created_at: new Date(Date.now() - 3600000).toISOString(),
		status: 'completed'
	}
];

export async function fetchDashboardOverview(studentId = 'demo_student'): Promise<DashboardOverview> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/dashboard/overview?student_id=${studentId}`);
		if (!res.ok) throw new Error(`HTTP error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, using rich mock overview:', err);
		return {
			stats: {
				student_id: studentId,
				full_name: 'Alex Kimani',
				email: 'alex.student@learn2earn.io',
				avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
				learning_points: mockWallet.points_balance,
				mobile_data_mb_earned: mockWallet.mobile_data_mb_redeemed,
				streak_days: 5,
				courses_enrolled_count: 3,
				courses_completed_count: 1,
				certificates_count: 1,
				target_pathway: 'AI & Software Engineering'
			},
			active_courses: [
				{
					course_id: 'ai-python-foundations',
					title: 'Introduction to Python & AI Foundations',
					category: 'Software & AI',
					progress_percentage: 68,
					modules_completed: 7,
					total_modules: 10,
					points_earned: 350,
					last_accessed: '2 hours ago'
				},
				{
					course_id: 'web-dev-svelte',
					title: 'Modern Full-Stack Web Development with SvelteKit',
					category: 'Web Engineering',
					progress_percentage: 40,
					modules_completed: 4,
					total_modules: 10,
					points_earned: 200,
					last_accessed: 'Yesterday'
				},
				{
					course_id: 'data-analysis-sql',
					title: 'Practical SQL & Relational Databases',
					category: 'Data & Analytics',
					progress_percentage: 10,
					modules_completed: 1,
					total_modules: 8,
					points_earned: 50,
					last_accessed: '3 days ago'
				}
			],
			recent_achievements: [
				"Earned 'Quick Learner' badge for completing 5 modules in 2 days",
				'Redeemed 500MB MTN Data bundle successfully',
				'Achieved 100% score on the Python Logic quiz'
			]
		};
	}
}

export async function fetchWallet(studentId = 'demo_student'): Promise<WalletBalance> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/rewards/wallet?student_id=${studentId}`);
		if (!res.ok) throw new Error(`HTTP error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, using mock wallet:', err);
		return mockWallet;
	}
}

export async function fetchDataPackages(): Promise<DataPackage[]> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/rewards/packages`);
		if (!res.ok) throw new Error(`HTTP error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, using mock packages:', err);
		return mockPackages;
	}
}

export async function fetchTransactions(studentId = 'demo_student'): Promise<TransactionRecord[]> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/rewards/transactions?student_id=${studentId}`);
		if (!res.ok) throw new Error(`HTTP error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, using mock transactions:', err);
		return mockTransactions;
	}
}

export async function redeemMobileData(
	packageId: string,
	phoneNumber: string,
	provider: string,
	studentId = 'demo_student'
): Promise<RedeemDataResponse> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/rewards/redeem?student_id=${studentId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				package_id: packageId,
				phone_number: phoneNumber,
				provider
			})
		});
		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.detail || `Redemption failed with status ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, simulating redemption locally:', err);
		const pkg = mockPackages.find((p) => p.id === packageId) || mockPackages[0];
		if (mockWallet.points_balance < pkg.points_cost) {
			throw new Error(`Insufficient learning points. Required: ${pkg.points_cost}, Available: ${mockWallet.points_balance}`);
		}
		mockWallet.points_balance -= pkg.points_cost;
		mockWallet.total_redeemed += pkg.points_cost;
		mockWallet.mobile_data_mb_redeemed += 500;

		const tx: TransactionRecord = {
			id: `tx_${Date.now()}`,
			type: 'redeemed',
			description: `Redeemed ${pkg.data_amount} ${provider} to ${phoneNumber}`,
			points: -pkg.points_cost,
			created_at: new Date().toISOString(),
			status: 'completed'
		};
		mockTransactions = [tx, ...mockTransactions];

		return {
			success: true,
			transaction_id: tx.id,
			message: `Successfully credited ${pkg.data_amount} ${provider} data to ${phoneNumber}!`,
			points_deducted: pkg.points_cost,
			remaining_balance: mockWallet.points_balance,
			data_granted: pkg.data_amount,
			phone_number: phoneNumber,
			simulated_carrier_reference: `SIM-${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
		};
	}
}

export async function earnPoints(
	points: number,
	description: string,
	activityType = 'lesson_completed',
	studentId = 'demo_student'
): Promise<WalletBalance> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/rewards/earn-points?student_id=${studentId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				points,
				description,
				activity_type: activityType
			})
		});
		if (!res.ok) throw new Error(`Points grant failed`);
		return await res.json();
	} catch (err) {
		mockWallet.points_balance += points;
		mockWallet.total_earned += points;
		mockTransactions = [
			{
				id: `tx_${Date.now()}`,
				type: 'earned',
				description,
				points,
				created_at: new Date().toISOString(),
				status: 'completed'
			},
			...mockTransactions
		];
		return mockWallet;
	}
}

// Developer 3 Career Assessment Contract Endpoint
export async function submitCareerAssessment(answers: {
	interests: string[];
	favorite_subjects: string[];
	skills: string[];
	career_goals: string;
}): Promise<AssessmentResponse> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/orientation/assess`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answers })
		});
		if (!res.ok) throw new Error(`Orientation assessment error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, returning fallback assessment response:', err);
		return {
			recommendations: [
				{
					pathway: 'Software Engineering & Applied AI',
					description: 'Build intelligent applications, APIs, and modern responsive user interfaces.',
					reason: 'Your interests suggest you have strong analytical and problem-solving aptitude.',
					skills: ['Python', 'TypeScript', 'SQL', 'AI Prompting', 'API Integration'],
					courses: [
						'Introduction to Python & AI Foundations',
						'Modern Full-Stack Web Development with SvelteKit',
						'Practical SQL & Relational Databases'
					]
				}
			]
		};
	}
}

// Developer 3 AI Assistant Contract Endpoint
export async function sendAIChat(
	message: string,
	courseId = 'demo-python',
	context = 'Introduction to Python'
): Promise<AIChatResponse> {
	try {
		const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message, course_id: courseId, context })
		});
		if (!res.ok) throw new Error(`AI Chat error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, returning fallback AI response:', err);
		return {
			response: `I am your Learn2Earn AI Assistant! For "${message}" in ${context}: Remember that practicing small coding exercises immediately credits your wallet with learning points that unlock mobile data!`,
			suggested_actions: [
				`Show code example for: ${message}`,
				'Take a 3-question quiz for +50 points',
				'Next module in pathway'
			],
			course_id: courseId
		};
	}
}
