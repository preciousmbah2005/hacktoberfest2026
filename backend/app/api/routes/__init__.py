from fastapi import APIRouter
from .rewards import router as rewards_router
from .dashboard import router as dashboard_router
from .orientation import router as orientation_router
from .ai import router as ai_router

api_router = APIRouter(prefix="/api")

api_router.include_router(dashboard_router)
api_router.include_router(rewards_router)
api_router.include_router(orientation_router)
api_router.include_router(ai_router)

__all__ = ["api_router"]
