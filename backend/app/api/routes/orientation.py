from fastapi import APIRouter, HTTPException

from backend.app.schemas.orientation import AssessmentRequest, AssessmentResponse
from backend.app.services.ai_service import (
    AIConfigurationError,
    AIProviderError,
    AIResponseError,
    AITimeoutError,
)
from backend.app.services.orientation_service import assess_career

router = APIRouter(prefix="/orientation", tags=["Career Orientation (Owned by Dev 3)"])


@router.post("/assess", response_model=AssessmentResponse)
async def assess_career_orientation(request: AssessmentRequest) -> AssessmentResponse:
    try:
        return await assess_career(request.answers)
    except AIConfigurationError:
        raise HTTPException(status_code=503, detail="AI provider configuration is invalid.") from None
    except AITimeoutError:
        raise HTTPException(status_code=504, detail="The AI provider request timed out.") from None
    except (AIProviderError, AIResponseError):
        raise HTTPException(status_code=502, detail="Career recommendations are temporarily unavailable.") from None
