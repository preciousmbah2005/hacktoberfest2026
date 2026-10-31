import type { OrientationAssessmentResponse } from './types';

export const mockOrientationAssessment: OrientationAssessmentResponse = {
	recommendations: [
		{
			pathway: 'Software Engineering',
			description: 'Build software applications.',
			reason: 'Your interests suggest you may enjoy software development.',
			skills: ['Python', 'SQL', 'Programming'],
			courses: ['Introduction to Python']
		}
	]
};
