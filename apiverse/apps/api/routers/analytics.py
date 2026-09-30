import random
from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/analytics", tags=["Dashboard & Galaxy Analytics"])

@router.get("/metrics")
async def get_galaxy_metrics():
    return {
        "totalRequests24h": 1542109,
        "avgLatencyMs": 78.4,
        "p95LatencyMs": 142.1,
        "p99LatencyMs": 310.5,
        "errorRatePercent": 0.04,
        "monthCostUsd": 1321.80,
        "costBurnRateDailyUsd": 44.06,
        "activeComets": 24,
        "anomaliesDetected": 0
    }

@router.get("/comets")
async def get_live_comets():
    """Simulates live light-beams and comets traversing the galaxy between API planets."""
    comets = []
    services = ["Stripe", "OpenAI", "Twilio", "Supabase", "GitHub", "Resend"]
    methods = ["GET", "POST", "PUT"]
    for i in range(12):
        s = random.choice(services)
        comets.append({
            "id": f"comet_{i}_{random.randint(100,999)}",
            "service": s,
            "method": random.choice(methods),
            "endpoint": f"/v1/{s.lower()}/process",
            "status": 200 if random.random() > 0.05 else 500,
            "latencyMs": round(random.uniform(25, 210), 1),
            "sourcePlanet": s,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })
    return comets
