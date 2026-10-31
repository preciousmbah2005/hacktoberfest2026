export interface Course {
	id: string;
	title: string;
	category: string;
	description: string;
	level: 'Beginner' | 'Intermediate' | 'Advanced';
	modules: number;
	pointsReward: number;
	enrolled: boolean;
}

export interface Lesson {
	id: string;
	courseId: string;
	title: string;
	order: number;
	completed: boolean;
	pointsReward: number;
}

export interface CourseProgress {
	courseId: string;
	modulesCompleted: number;
	totalModules: number;
	progressPercentage: number;
	pointsEarned: number;
}
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/courses/types.ts