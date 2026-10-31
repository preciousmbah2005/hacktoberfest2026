from fastapi import APIRouter, Query
from backend.app.schemas.dashboard import DashboardOverview, StudentStats, CourseProgressSummary
from backend.app.services.rewards_service import RewardsService

router = APIRouter(prefix="/dashboard", tags=["Student Dashboard"])

@router.get("/overview", response_model=DashboardOverview)
def get_dashboard_overview(student_id: str = Query("demo_student")):
    """Returns aggregated student statistics, active course progress, and recent achievements."""
    wallet = RewardsService.get_wallet(student_id)
    
    stats = StudentStats(
        student_id=student_id,
        full_name="Alex Kimani",
        email="alex.student@learn2earn.io",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        learning_points=wallet.points_balance,
        mobile_data_mb_earned=wallet.mobile_data_mb_redeemed,
        streak_days=5,
        courses_enrolled_count=3,
        courses_completed_count=1,
        certificates_count=1,
        target_pathway="AI & Software Engineering"
    )

    active_courses = [
        CourseProgressSummary(
            course_id="ai-python-foundations",
            title="Introduction to Python & AI Foundations",
            category="Software & AI",
            progress_percentage=68,
            modules_completed=7,
            total_modules=10,
            points_earned=350,
            last_accessed="2 hours ago"
        ),
        CourseProgressSummary(
            course_id="web-dev-svelte",
            title="Modern Full-Stack Web Development with SvelteKit",
            category="Web Engineering",
            progress_percentage=40,
            modules_completed=4,
            total_modules=10,
            points_earned=200,
            last_accessed="Yesterday"
        ),
        CourseProgressSummary(
            course_id="data-analysis-sql",
            title="Practical SQL & Relational Databases",
            category="Data & Analytics",
            progress_percentage=10,
            modules_completed=1,
            total_modules=8,
            points_earned=50,
            last_accessed="3 days ago"
        )
    ]

    recent_achievements = [
        "Earned 'Quick Learner' badge for completing 5 modules in 2 days",
        "Redeemed 500MB MTN Data bundle successfully",
        "Achieved 100% score on the Python Logic quiz"
    ]

    return DashboardOverview(
        stats=stats,
        active_courses=active_courses,
        recent_achievements=recent_achievements
    )
