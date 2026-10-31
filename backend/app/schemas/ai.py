from typing import List, Literal, Optional

from pydantic import BaseModel, Field, field_validator

class AIChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="User prompt or question to the learning assistant")
    course_id: Optional[str] = Field(None, max_length=256, description="Optional associated course identifier")
    context: Optional[str] = Field(None, max_length=6000, description="Course module, topic, or lesson context")

    @field_validator("message")
    @classmethod
    def clean_message(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Message must not be blank.")
        return value

    @field_validator("course_id", "context")
    @classmethod
    def clean_optional_fields(cls, value: Optional[str]) -> Optional[str]:
        value = value.strip() if value else None
        return value or None

class AIChatResponse(BaseModel):
    response: str = Field(..., description="AI assistant explanation or answer")
    suggested_actions: List[str] = Field(default_factory=list, description="Follow-up questions or recommended practice tasks")
    course_id: Optional[str] = None
    source: Literal["ai", "demo"] = "ai"
