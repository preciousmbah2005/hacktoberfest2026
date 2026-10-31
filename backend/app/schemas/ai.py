from pydantic import BaseModel, Field
from typing import List, Optional

class AIChatRequest(BaseModel):
    message: str = Field(..., description="User prompt or question to the learning assistant")
    course_id: Optional[str] = Field(None, description="Optional associated course identifier")
    context: Optional[str] = Field(None, description="Course module, topic, or lesson context")

class AIChatResponse(BaseModel):
    response: str = Field(..., description="AI assistant explanation or answer")
    suggested_actions: List[str] = Field(default_factory=list, description="Follow-up questions or recommended practice tasks")
    course_id: Optional[str] = None
