import type { Course } from './types';

export const mockCourses: Course[] = [
	{ id: 'intro-programming', title: 'Introduction to Programming', description: 'Learn programming fundamentals.', pathway: 'Software Engineering', level: 'Beginner', duration: '4 weeks', enrolled: false },
	{ id: 'html-css', title: 'HTML and CSS Fundamentals', description: 'Build web pages with HTML and CSS.', pathway: 'UI/UX & Product Design', level: 'Beginner', duration: '3 weeks', enrolled: false },
	{ id: 'js-fundamentals', title: 'JavaScript Fundamentals', description: 'Core JavaScript concepts.', pathway: 'Software Engineering', level: 'Beginner', duration: '5 weeks', enrolled: true, progress: 40 },
	{ id: 'intro-python', title: 'Introduction to Python', description: 'Python basics for data and AI.', pathway: 'Data Science & AI', level: 'Beginner', duration: '4 weeks', enrolled: false },
	{ id: 'intro-data-science', title: 'Introduction to Data Science', description: 'Data analysis fundamentals.', pathway: 'Data Science & AI', level: 'Intermediate', duration: '6 weeks', enrolled: false },
	{ id: 'cybersecurity-fundamentals', title: 'Cybersecurity Fundamentals', description: 'Security basics.', pathway: 'Cybersecurity', level: 'Beginner', duration: '4 weeks', enrolled: false },
	{ id: 'ui-ux-fundamentals', title: 'UI/UX Design Fundamentals', description: 'Design principles and UX.', pathway: 'UI/UX & Product Design', level: 'Beginner', duration: '4 weeks', enrolled: false }
];
