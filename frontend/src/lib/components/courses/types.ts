export interface OrientationQuestionnaireAnswers {
	interests: string[];
	favoriteSubjects: string[];
	skills: string[];
	careerGoals: string;
}

export interface CareerPathway {
	id: string;
	name: string;
	description: string;
	skills: string[];
	courses: string[];
}

export interface CareerRecommendation {
	pathway: CareerPathway;
	reason: string;
}

export interface AssessmentResult {
	recommendations: CareerRecommendation[];
}
" filePath">
/home/rebase04/Desktop/hacktoberfest2026/frontend/src/lib/components/orientation/types.ts