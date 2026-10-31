export interface Course {
	id: string;
	title: string;
	description: string;
	pathway: string;
	level: 'Beginner' | 'Intermediate' | 'Advanced';
	duration: string;
	enrolled: boolean;
	progress?: number;
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
