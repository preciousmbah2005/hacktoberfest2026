from fastapi import APIRouter, HTTPException, Query
from typing import List
from backend.app.schemas.rewards import (
    DataPackage, WalletBalance, TransactionRecord,
    RedeemDataRequest, RedeemDataResponse, EarnPointsRequest
)
from backend.app.services.rewards_service import RewardsService

router = APIRouter(prefix="/rewards", tags=["Rewards & Wallet"])

@router.get("/packages", response_model=List[DataPackage])
def get_available_packages():
    """Returns available mobile data packages that can be redeemed with learning points."""
    return RewardsService.get_packages()

@router.get("/wallet", response_model=WalletBalance)
def get_student_wallet(student_id: str = Query("demo_student", description="Student ID or user UUID")):
    """Returns the current points balance, total earned, and mobile data redeemed."""
    return RewardsService.get_wallet(student_id)

@router.get("/transactions", response_model=List[TransactionRecord])
def get_transaction_history(student_id: str = Query("demo_student", description="Student ID or user UUID")):
    """Returns point accrual and data redemption transaction history."""
    return RewardsService.get_transactions(student_id)

@router.post("/redeem", response_model=RedeemDataResponse)
def redeem_mobile_data(request: RedeemDataRequest, student_id: str = Query("demo_student")):
    """Exchange earned learning points for simulated mobile data recharge."""
    try:
        return RewardsService.redeem_mobile_data(student_id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/earn-points", response_model=WalletBalance)
def earn_points(request: EarnPointsRequest, student_id: str = Query("demo_student")):
    """Credit points for completing lessons, quizzes, or orientation assessments."""
    return RewardsService.earn_points(
        student_id=student_id,
        points=request.points,
        description=request.description,
        activity_type=request.activity_type
    )
