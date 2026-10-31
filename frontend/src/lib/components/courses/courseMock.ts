import type { Course } from './types';

export const mockCourses: Course[] = [
	{
		id: 'ai-python-foundations',
		title: 'Introduction to Python & AI Foundations',
		description: 'Learn Python fundamentals and build your first AI-powered programs.',
		pathway: 'Software Engineering',
		level: 'Beginner',
		duration: '8 hours',
		enrolled: true,
		progress: 68
	},
	{
		id: 'data-analysis-sql',
		title: 'Data Analysis with SQL',
		description: 'Query, clean, and explore real-world datasets with SQL.',
		pathway: 'Data Science & AI',
		level: 'Beginner',
		duration: '6 hours',
		enrolled: false
	},
	{
		id: 'cybersecurity-basics',
		title: 'Cybersecurity Fundamentals',
		description: 'Understand common threats, security controls, and safe practices.',
		pathway: 'Cybersecurity',
		level: 'Intermediate',
		duration: '10 hours',
		enrolled: false
	},
	{
		id: 'product-design-uiux',
		title: 'UI/UX Product Design',
		description: 'Design accessible digital experiences from research to prototyping.',
		pathway: 'UI/UX & Product Design',
		level: 'Intermediate',
		duration: '7 hours',
		enrolled: true,
		progress: 40
	}
];
