from pydantic import BaseModel, Field
from typing import List, Optional

class AssessmentAnswers(BaseModel):
    interests: List[str] = Field(default_factory=list, description="List of user interests")
    favorite_subjects: List[str] = Field(default_factory=list, description="Favorite school/college subjects")
    skills: List[str] = Field(default_factory=list, description="Self-reported skills or strengths")
    career_goals: str = Field("", description="Stated career aspiration or objective")

class AssessmentRequest(BaseModel):
    answers: AssessmentAnswers

class PathwayRecommendation(BaseModel):
    pathway: str
    description: str
    reason: str
    skills: List[str] = Field(default_factory=list)
    courses: List[str] = Field(default_factory=list)

class AssessmentResponse(BaseModel):
    recommendations: List[PathwayRecommendation]
