from pydantic import BaseModel
from typing import List, Optional

class CourseProgressSummary(BaseModel):
    course_id: str
    title: str
    category: str
    progress_percentage: int
    modules_completed: int
    total_modules: int
    points_earned: int
    last_accessed: str

class StudentStats(BaseModel):
    student_id: str
    full_name: str
    email: str
    avatar_url: Optional[str] = None
    learning_points: int
    mobile_data_mb_earned: int
    streak_days: int
    courses_enrolled_count: int
    courses_completed_count: int
    certificates_count: int
    target_pathway: Optional[str] = None

class DashboardOverview(BaseModel):
    stats: StudentStats
    active_courses: List[CourseProgressSummary]
    recent_achievements: List[str]
