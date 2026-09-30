from fastapi import APIRouter

router = APIRouter(prefix="/learning", tags=["Learning Hub"])

MISSIONS = [
    {
        "id": "mission_01",
        "title": "Constellation 1: The Foundations of REST & Idempotency",
        "planet": "Mercury",
        "xp": 500,
        "status": "COMPLETED",
        "lessonsCount": 4
    },
    {
        "id": "mission_02",
        "title": "Constellation 2: Mastering OAuth2, JWTs & Scopes",
        "planet": "Venus",
        "xp": 750,
        "status": "IN_PROGRESS",
        "lessonsCount": 6
    },
    {
        "id": "mission_03",
        "title": "Constellation 3: Webhook Verification & Replay Protection",
        "planet": "Mars",
        "xp": 1000,
        "status": "LOCKED",
        "lessonsCount": 5
    }
]

@router.get("/missions")
async def get_learning_missions():
    return {
        "missions": MISSIONS,
        "totalXp": 1250,
        "currentStreakDays": 7,
        "rank": "Senior Orbital Architect"
    }
