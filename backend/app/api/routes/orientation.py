"""
Developer 3 Ownership Note:
===========================
This route implements the contract specified in SECTION 3: API CONTRACTS.
Developer 3 will extend this file and implement the AI recommendation service
via Gemini/OpenAI and Supabase persistence on their dedicated feature branch.
"""

from fastapi import APIRouter
from backend.app.schemas.orientation import AssessmentRequest, AssessmentResponse, PathwayRecommendation

router = APIRouter(prefix="/orientation", tags=["Career Orientation (Owned by Dev 3)"])

@router.post("/assess", response_model=AssessmentResponse)
def assess_career_orientation(request: AssessmentRequest):
    """
    Contract endpoint: POST /api/orientation/assess
    Accepts student assessment answers and returns AI-driven career recommendations.
    """
    answers = request.answers
    
    # Baseline contract response (Developer 3 will integrate live Gemini/OpenAI logic here)
    interests_str = ", ".join(answers.interests) if answers.interests else "technology"
    
    recommendation = PathwayRecommendation(
        pathway="Software Engineering & Applied AI",
        description="Design and build intelligent software applications, user experiences, and backend services.",
        reason=f"Your interests in {interests_str} and career goal ('{answers.career_goals or 'software innovation'}') indicate strong alignment with modern software engineering.",
        skills=["Python", "TypeScript", "SQL", "AI Integration", "Problem Solving"],
        courses=[
            "Introduction to Python & AI Foundations",
            "Modern Full-Stack Web Development with SvelteKit",
            "Practical SQL & Relational Databases"
        ]
    )
    
    second_recommendation = PathwayRecommendation(
        pathway="Data Science & Machine Learning",
        description="Analyze complex datasets, train predictive models, and extract actionable insights.",
        reason="Your analytical focus and interest in intelligent systems make data science a natural fit.",
        skills=["Data Analysis", "Python", "NumPy & Pandas", "Machine Learning Basics"],
        courses=["Data Analysis with Python", "Applied Machine Learning Fundamentals"]
    )

    return AssessmentResponse(recommendations=[recommendation, second_recommendation])
