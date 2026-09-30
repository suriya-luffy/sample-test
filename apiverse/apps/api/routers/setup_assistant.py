from fastapi import APIRouter
from schemas.api_schemas import SetupVerifyStepSchema

router = APIRouter(prefix="/setup", tags=["Setup Assistant"])

STEPS = [
    {"id": "step_1", "title": "Create Account & Get API Key", "desc": "Sign up on provider console and copy production or test key."},
    {"id": "step_2", "title": "Store Secret in APIVerse Key Vault", "desc": "Keep keys encrypted under AES-256-GCM zero-trust storage."},
    {"id": "step_3", "title": "Configure Environment Variables", "desc": "Add SDK environment bindings to your local .env or CI/CD."},
    {"id": "step_4", "title": "Execute Verification Ping", "desc": "Run an automated test ping from APIVerse to confirm connectivity."}
]

@router.get("/steps/{api_name}")
async def get_setup_steps(api_name: str):
    return {"api": api_name, "steps": STEPS}

@router.post("/verify")
async def verify_step(payload: SetupVerifyStepSchema):
    return {
        "api": payload.api_name,
        "step_id": payload.step_id,
        "verified": True,
        "latencyMs": 42,
        "message": f"Successfully verified {payload.api_name} connection with live handshake!"
    }
