import uuid
from datetime import datetime, timezone
from typing import List, Dict, Optional
from backend.app.schemas.rewards import (
    DataPackage, WalletBalance, TransactionRecord,
    RedeemDataRequest, RedeemDataResponse
)
from backend.app.database.supabase_client import get_supabase_client

# Built-in mobile data reward packages
DATA_PACKAGES: List[DataPackage] = [
    DataPackage(
        id="pkg_mtn_500mb",
        name="MTN Pulse 500MB Data",
        provider="MTN",
        data_amount="500MB",
        points_cost=250,
        duration_days=14,
        description="Quick 500MB data bundle for learning and research."
    ),
    DataPackage(
        id="pkg_airtel_1gb",
        name="Airtel Smart 1GB Bundle",
        provider="Airtel",
        data_amount="1GB",
        points_cost=450,
        duration_days=30,
        description="High-speed 1GB bundle for video lessons and tutorials."
    ),
    DataPackage(
        id="pkg_safaricom_2gb",
        name="Safaricom Tunukiwa 2GB",
        provider="Safaricom",
        data_amount="2GB",
        points_cost=800,
        duration_days=30,
        description="Heavy 2GB bundle for full course modules and projects."
    ),
    DataPackage(
        id="pkg_glo_1_5gb",
        name="Glo Berekete 1.5GB Data",
        provider="Glo",
        data_amount="1.5GB",
        points_cost=600,
        duration_days=30,
        description="Reliable 1.5GB bundle for studying on the go."
    ),
    DataPackage(
        id="pkg_vodafone_3gb",
        name="Vodafone Red 3GB Super Pack",
        provider="Vodafone",
        data_amount="3GB",
        points_cost=1100,
        duration_days=30,
        description="Premium 3GB data pack for hackathons and coding practice."
    )
]

# In-memory store with realistic initial data for development/demo
_wallets: Dict[str, dict] = {
    "demo_student": {
        "student_id": "demo_student",
        "points_balance": 1250,
        "total_earned": 1850,
        "total_redeemed": 600,
        "mobile_data_mb_redeemed": 1500
    }
}

_transactions: Dict[str, List[dict]] = {
    "demo_student": [
        {
            "id": "tx_init_1",
            "type": "earned",
            "description": "Completed 'AI Foundations & Career Quiz'",
            "points": 350,
            "created_at": "2026-10-31T09:30:00Z",
            "status": "completed"
        },
        {
            "id": "tx_init_2",
            "type": "earned",
            "description": "Finished Python Data Types Lesson",
            "points": 200,
            "created_at": "2026-10-31T10:15:00Z",
            "status": "completed"
        },
        {
            "id": "tx_init_3",
            "type": "redeemed",
            "description": "Redeemed 500MB MTN Data to +2348012345678",
            "points": -250,
            "created_at": "2026-10-31T11:00:00Z",
            "status": "completed"
        },
        {
            "id": "tx_init_4",
            "type": "earned",
            "description": "5-Day Learning Streak Bonus",
            "points": 150,
            "created_at": "2026-10-31T11:45:00Z",
            "status": "completed"
        }
    ]
}

class RewardsService:
    @staticmethod
    def get_packages() -> List[DataPackage]:
        return DATA_PACKAGES

    @staticmethod
    def get_wallet(student_id: str) -> WalletBalance:
        supabase = get_supabase_client()
        if supabase:
            try:
                res = supabase.table("wallets").select("*").eq("student_id", student_id).single().execute()
                if res.data:
                    return WalletBalance(**res.data)
            except Exception:
                pass

        if student_id not in _wallets:
            _wallets[student_id] = {
                "student_id": student_id,
                "points_balance": 500,
                "total_earned": 500,
                "total_redeemed": 0,
                "mobile_data_mb_redeemed": 0
            }
        return WalletBalance(**_wallets[student_id])

    @staticmethod
    def get_transactions(student_id: str) -> List[TransactionRecord]:
        supabase = get_supabase_client()
        if supabase:
            try:
                res = supabase.table("reward_transactions").select("*").eq("student_id", student_id).order("created_at", desc=True).execute()
                if res.data:
                    return [TransactionRecord(**item) for item in res.data]
            except Exception:
                pass

        txs = _transactions.get(student_id, [])
        return [TransactionRecord(**t) for t in reversed(txs)]

    @staticmethod
    def earn_points(student_id: str, points: int, description: str, activity_type: str = "lesson_completed") -> WalletBalance:
        wallet = RewardsService.get_wallet(student_id)
        new_balance = wallet.points_balance + points
        new_total_earned = wallet.total_earned + points

        _wallets[student_id] = {
            "student_id": student_id,
            "points_balance": new_balance,
            "total_earned": new_total_earned,
            "total_redeemed": wallet.total_redeemed,
            "mobile_data_mb_redeemed": wallet.mobile_data_mb_redeemed
        }

        tx = {
            "id": f"tx_{uuid.uuid4().hex[:10]}",
            "type": "earned",
            "description": description,
            "points": points,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "completed"
        }
        if student_id not in _transactions:
            _transactions[student_id] = []
        _transactions[student_id].append(tx)

        # Sync to Supabase if available
        supabase = get_supabase_client()
        if supabase:
            try:
                supabase.table("wallets").upsert(_wallets[student_id]).execute()
                supabase.table("reward_transactions").insert({
                    **tx,
                    "student_id": student_id,
                    "activity_type": activity_type
                }).execute()
            except Exception:
                pass

        return WalletBalance(**_wallets[student_id])

    @staticmethod
    def redeem_mobile_data(student_id: str, request: RedeemDataRequest) -> RedeemDataResponse:
        package = next((p for p in DATA_PACKAGES if p.id == request.package_id), None)
        if not package:
            raise ValueError(f"Selected data package '{request.package_id}' not found.")

        wallet = RewardsService.get_wallet(student_id)
        if wallet.points_balance < package.points_cost:
            raise ValueError(f"Insufficient learning points. Required: {package.points_cost}, Available: {wallet.points_balance}.")

        # Deduct points
        new_balance = wallet.points_balance - package.points_cost
        new_total_redeemed = wallet.total_redeemed + package.points_cost
        
        # Parse data MB amount
        mb_value = 500
        if "GB" in package.data_amount:
            try:
                gb = float(package.data_amount.replace("GB", ""))
                mb_value = int(gb * 1024)
            except ValueError:
                mb_value = 1024
        elif "MB" in package.data_amount:
            try:
                mb_value = int(package.data_amount.replace("MB", ""))
            except ValueError:
                mb_value = 500

        new_total_mb = wallet.mobile_data_mb_redeemed + mb_value

        _wallets[student_id] = {
            "student_id": student_id,
            "points_balance": new_balance,
            "total_earned": wallet.total_earned,
            "total_redeemed": new_total_redeemed,
            "mobile_data_mb_redeemed": new_total_mb
        }

        ref_id = f"TELCO-{request.provider.upper()}-{uuid.uuid4().hex[:8].upper()}"
        tx_id = f"tx_rdm_{uuid.uuid4().hex[:10]}"

        tx = {
            "id": tx_id,
            "type": "redeemed",
            "description": f"Redeemed {package.data_amount} {request.provider} to {request.phone_number}",
            "points": -package.points_cost,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "completed",
            "metadata": {
                "phone": request.phone_number,
                "provider": request.provider,
                "carrier_ref": ref_id
            }
        }
        if student_id not in _transactions:
            _transactions[student_id] = []
        _transactions[student_id].append(tx)

        # Sync with Supabase if active
        supabase = get_supabase_client()
        if supabase:
            try:
                supabase.table("wallets").upsert(_wallets[student_id]).execute()
                supabase.table("reward_transactions").insert({
                    **tx,
                    "student_id": student_id
                }).execute()
            except Exception:
                pass

        return RedeemDataResponse(
            success=True,
            transaction_id=tx_id,
            message=f"Successfully credited {package.data_amount} {request.provider} data to {request.phone_number}!",
            points_deducted=package.points_cost,
            remaining_balance=new_balance,
            data_granted=package.data_amount,
            phone_number=request.phone_number,
            simulated_carrier_reference=ref_id
        )
