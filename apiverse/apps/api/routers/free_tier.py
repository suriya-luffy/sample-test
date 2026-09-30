from fastapi import APIRouter

router = APIRouter(prefix="/free-tier", tags=["Free Tier Finder"])

TIERS = [
    {
        "service": "Supabase",
        "freeLimit": "500MB DB, 50,000 MAU, 2 projects",
        "currentUsage": 180,
        "maxQuota": 500,
        "unit": "MB",
        "percentUsed": 36,
        "requiresCreditCard": False,
        "isOpenSource": True
    },
    {
        "service": "Resend",
        "freeLimit": "3,000 emails / month",
        "currentUsage": 1240,
        "maxQuota": 3000,
        "unit": "Emails",
        "percentUsed": 41.3,
        "requiresCreditCard": False,
        "isOpenSource": False
    },
    {
        "service": "GitHub REST API",
        "freeLimit": "5,000 requests / hour",
        "currentUsage": 820,
        "maxQuota": 5000,
        "unit": "Req/hr",
        "percentUsed": 16.4,
        "requiresCreditCard": False,
        "isOpenSource": True
    },
    {
        "service": "Upstash Redis",
        "freeLimit": "10,000 commands / day",
        "currentUsage": 6800,
        "maxQuota": 10000,
        "unit": "Commands",
        "percentUsed": 68.0,
        "requiresCreditCard": False,
        "isOpenSource": True
    }
]

@router.get("/gauges")
async def get_free_tier_gauges():
    return TIERS
