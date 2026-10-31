import { writable } from 'svelte/store';
import type { OrientationAssessmentResponse } from './types';

export const orientationResult = writable<OrientationAssessmentResponse | null>(null);
