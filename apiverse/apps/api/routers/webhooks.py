from fastapi import APIRouter

router = APIRouter(prefix="/webhooks", tags=["Webhooks & Uptime"])

@router.get("/deliveries")
async def get_webhook_deliveries():
    return [
        {
            "id": "wh_01",
            "event": "payment_intent.succeeded",
            "destinationUrl": "https://api.myapp.com/webhooks/stripe",
            "status": 200,
            "latencyMs": 48,
            "timestamp": "2026-09-30T07:22:10Z"
        },
        {
            "id": "wh_02",
            "event": "user.created",
            "destinationUrl": "https://api.myapp.com/webhooks/clerk",
            "status": 200,
            "latencyMs": 35,
            "timestamp": "2026-09-30T07:19:44Z"
        }
    ]
