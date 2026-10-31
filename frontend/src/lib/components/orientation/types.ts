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

export interface OrientationAssessmentRequest {
	answers: {
		interests: string[];
		favorite_subjects: string[];
		skills: string[];
		career_goals: string;
	};
}

export interface OrientationAssessmentResponse {
	recommendations: Array<{
		pathway: string;
		description: string;
		reason: string;
		skills: string[];
		courses: string[];
	}>;
}
