from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/alerts", tags=["Smart Alerts & Solar Flares"])

ALERTS = [
    {
        "id": "alert_01",
        "ruleName": "Rate Limit Threshold Exceeded (95%)",
        "service": "Twilio",
        "severity": "CRITICAL",
        "message": "Twilio Staging fallback hit 198 req/min (capacity 200 req/min). Pulsing solar flare.",
        "planetId": "key_03",
        "triggeredAt": "2026-09-30T07:15:00Z",
        "acknowledged": False,
        "aiIncidentSummary": "Surge detected in SMS verification retry attempts from staging load tests. Recommend throttling caller."
    },
    {
        "id": "alert_02",
        "ruleName": "Monthly Budget 80% Consumed",
        "service": "OpenAI",
        "severity": "WARNING",
        "message": "OpenAI monthly spend reached $845.20 of $1,000 threshold.",
        "planetId": "key_02",
        "triggeredAt": "2026-09-29T18:40:00Z",
        "acknowledged": True,
        "aiIncidentSummary": "High volume of GPT-4o embeddings calls. Consider switching embeddings to text-embedding-3-small."
    }
]

@router.get("/")
async def list_alerts():
    return ALERTS

@router.post("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str):
    for a in ALERTS:
        if a["id"] == alert_id:
            a["acknowledged"] = True
            return {"status": "ACKNOWLEDGED", "alert": a}
    return {"status": "NOT_FOUND"}
