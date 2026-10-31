from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class DataPackage(BaseModel):
    id: str
    name: str
    provider: str  # e.g., MTN, Airtel, Safaricom, Glo, Vodafone
    data_amount: str  # e.g., "500MB", "1GB", "2.5GB", "5GB"
    points_cost: int
    duration_days: int = 30
    description: str

class WalletBalance(BaseModel):
    student_id: str
    points_balance: int
    total_earned: int
    total_redeemed: int
    mobile_data_mb_redeemed: int

class TransactionRecord(BaseModel):
    id: str
    type: str  # "earned", "redeemed"
    description: str
    points: int
    created_at: str
    status: str = "completed"
    metadata: Optional[dict] = None

class RedeemDataRequest(BaseModel):
    package_id: str
    phone_number: str = Field(..., description="Recipient phone number with country code")
    provider: str = Field(..., description="Telecom carrier name")

class RedeemDataResponse(BaseModel):
    success: bool
    transaction_id: str
    message: str
    points_deducted: int
    remaining_balance: int
    data_granted: str
    phone_number: str
    simulated_carrier_reference: str

class EarnPointsRequest(BaseModel):
    activity_type: str = Field(..., description="e.g. 'lesson_completed', 'quiz_perfect_score', 'streak_bonus'")
    points: int = Field(..., gt=0)
    description: str
    course_id: Optional[str] = None
