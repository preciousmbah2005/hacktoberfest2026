from fastapi import APIRouter, HTTPException

from backend.app.schemas.ai import AIChatRequest, AIChatResponse
from backend.app.services.ai_service import (
    AIConfigurationError,
    AIProviderError,
    AIResponseError,
    AITimeoutError,
    chat_with_tutor,
)

router = APIRouter(prefix="/ai", tags=["AI Learning Assistant (Owned by Dev 3)"])


@router.post("/chat", response_model=AIChatResponse)
async def chat_with_learning_assistant(request: AIChatRequest) -> AIChatResponse:
    try:
        response_text, source = await chat_with_tutor(
            request.message,
            request.course_id,
            request.context,
        )
    except AIConfigurationError:
        raise HTTPException(status_code=503, detail="AI provider configuration is invalid.") from None
    except AITimeoutError:
        raise HTTPException(status_code=504, detail="The AI provider request timed out.") from None
    except (AIProviderError, AIResponseError):
        raise HTTPException(status_code=502, detail="The learning assistant is temporarily unavailable.") from None

    return AIChatResponse(
        response=response_text,
        suggested_actions=[
            "Can you give me a practical example?",
            "Give me a practice question on this topic.",
            "Can you explain that more simply?",
        ],
        course_id=request.course_id,
        source=source,
    )
