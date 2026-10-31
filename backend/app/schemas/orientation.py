from enum import Enum
from typing import Annotated, List, Literal

from pydantic import BaseModel, Field, field_validator, model_validator


class CareerPathway(str, Enum):
    SOFTWARE_ENGINEERING = "Software Engineering"
    DATA_SCIENCE_AI = "Data Science and Artificial Intelligence"
    CYBERSECURITY = "Cybersecurity"
    UI_UX_DESIGN = "UI/UX and Product Design"

class AssessmentAnswers(BaseModel):
    interests: List[Annotated[str, Field(min_length=1, max_length=120)]] = Field(default_factory=list, max_length=15, description="List of user interests")
    favorite_subjects: List[Annotated[str, Field(min_length=1, max_length=120)]] = Field(default_factory=list, max_length=15, description="Favorite school/college subjects")
    skills: List[Annotated[str, Field(min_length=1, max_length=120)]] = Field(default_factory=list, max_length=15, description="Self-reported skills or strengths")
    career_goals: str = Field("", max_length=500, description="Stated career aspiration or objective")

    @field_validator("interests", "favorite_subjects", "skills")
    @classmethod
    def clean_answer_lists(cls, values: List[str]) -> List[str]:
        return [value.strip() for value in values if value.strip()]

    @field_validator("career_goals")
    @classmethod
    def clean_career_goals(cls, value: str) -> str:
        return value.strip()

    @model_validator(mode="after")
    def require_at_least_one_answer(self):
        if not (self.interests or self.favorite_subjects or self.skills or self.career_goals):
            raise ValueError("Provide at least one assessment answer.")
        return self

class AssessmentRequest(BaseModel):
    answers: AssessmentAnswers

class PathwayRecommendation(BaseModel):
    pathway: CareerPathway
    description: str = Field(min_length=1, max_length=1000)
    reason: str = Field(min_length=1, max_length=1000)
    skills: List[str] = Field(min_length=1, max_length=12)
    courses: List[str] = Field(min_length=1, max_length=12)
    first_activity: str = Field(min_length=1, max_length=500)

class AssessmentResponse(BaseModel):
    recommendations: List[PathwayRecommendation] = Field(min_length=3, max_length=3)
    source: Literal["ai", "demo"] = "ai"

    @model_validator(mode="after")
    def require_distinct_pathways(self):
        pathways = [recommendation.pathway for recommendation in self.recommendations]
        if len(set(pathways)) != len(pathways):
            raise ValueError("Recommendations must contain distinct pathways.")
        return self
