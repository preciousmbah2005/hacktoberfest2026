"""
Developer 3 Ownership Note:
===========================
This route implements the contract specified in SECTION 3: API CONTRACTS.
Developer 3 will extend this file and implement the AI learning assistant chat
via Gemini/OpenAI and Supabase persistence on their dedicated feature branch.
"""

from fastapi import APIRouter
from backend.app.schemas.ai import AIChatRequest, AIChatResponse

router = APIRouter(prefix="/ai", tags=["AI Learning Assistant (Owned by Dev 3)"])

@router.post("/chat", response_model=AIChatResponse)
def chat_with_learning_assistant(request: AIChatRequest):
    """
    Contract endpoint: POST /api/ai/chat
    Provides structured AI learning guidance, concept explanations, and practice suggestions.
    """
    msg = request.message.strip()
    course_ctx = request.context or "General Learning"

    # Default baseline contract response (Developer 3 connects Gemini/OpenAI client on their branch)
    response_text = (
        f"Hello! I am your Learn2Earn AI Assistant. Regarding '{msg}' in the context of {course_ctx}: "
        "In programming and computer science, breaking complex problems down into modular functions "
        "and practicing with real code allows you to earn learning points and mobile data faster! "
        "Try writing a small function and running it."
    )

    suggested_actions = [
        f"Give me a code example for: {msg}",
        "Show me a quick quiz question to earn points",
        "Explain this in simpler terms"
    ]

    return AIChatResponse(
        response=response_text,
        suggested_actions=suggested_actions,
        course_id=request.course_id
    )
