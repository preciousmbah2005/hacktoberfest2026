import type { OrientationAssessmentRequest, OrientationAssessmentResponse } from './types';
import { mockOrientationAssessment } from './orientationMock';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export async function submitOrientationAssessment(
	req: OrientationAssessmentRequest
): Promise<OrientationAssessmentResponse> {
	if (import.meta.env.PUBLIC_USE_MOCK_ORIENTATION === 'true') {
		return mockOrientationAssessment;
	}
	try {
		const res = await fetch(`${API_BASE_URL}/api/orientation/assess`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(req)
		});
		if (!res.ok) throw new Error(`Orientation assessment error ${res.status}`);
		return await res.json();
	} catch (err) {
		console.warn('Backend unavailable, using mock orientation assessment:', err);
		return mockOrientationAssessment;
	}
}
