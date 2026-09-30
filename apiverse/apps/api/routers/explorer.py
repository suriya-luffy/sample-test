from fastapi import APIRouter

router = APIRouter(prefix="/explorer", tags=["API Explorer"])

CATALOG = [
    {
        "id": "stripe",
        "name": "Stripe Payments",
        "category": "Fintech & Billing",
        "constellation": "Cygnus",
        "description": "Financial infrastructure for the internet. Payments, billing, subscriptions and identity.",
        "authType": "API_KEY",
        "pricing": "FREEMIUM",
        "latencyMs": 85,
        "uptime99": 99.99,
        "freeTierLimit": "Sandbox unlimited, 2.9% + $0.30 per live charge",
        "icon": "💳",
        "endpointsCount": 182,
        "popularityRank": 98
    },
    {
        "id": "openai",
        "name": "OpenAI API",
        "category": "AI & Machine Learning",
        "constellation": "Orion",
        "description": "State-of-the-art LLMs (GPT-4o, embeddings, DALL-E, whisper audio transcripts).",
        "authType": "BEARER",
        "pricing": "PAID",
        "latencyMs": 240,
        "uptime99": 99.85,
        "freeTierLimit": "$5 initial grant on sign up",
        "icon": "🧠",
        "endpointsCount": 45,
        "popularityRank": 99
    },
    {
        "id": "twilio",
        "name": "Twilio Communications",
        "category": "Messaging & Voice",
        "constellation": "Pegasus",
        "description": "SMS, Voice, WhatsApp, Verify, and programmable video APIs.",
        "authType": "BASIC",
        "pricing": "FREEMIUM",
        "latencyMs": 110,
        "uptime99": 99.95,
        "freeTierLimit": "$15 free credit trial",
        "icon": "📱",
        "endpointsCount": 94,
        "popularityRank": 92
    },
    {
        "id": "github",
        "name": "GitHub REST & GraphQL",
        "category": "Developer Tools",
        "constellation": "Cassiopeia",
        "description": "Access repositories, pull requests, actions, security advisories, and webhooks.",
        "authType": "BEARER",
        "pricing": "OPEN_SOURCE",
        "latencyMs": 62,
        "uptime99": 99.92,
        "freeTierLimit": "5,000 req/hr authenticated free",
        "icon": "🐙",
        "endpointsCount": 320,
        "popularityRank": 97
    },
    {
        "id": "supabase",
        "name": "Supabase Platform",
        "category": "Databases & Storage",
        "constellation": "Lyra",
        "description": "Open source Firebase alternative: Postgres DB, Auth, Edge Functions, Realtime, Storage.",
        "authType": "API_KEY",
        "pricing": "FREEMIUM",
        "latencyMs": 48,
        "uptime99": 99.97,
        "freeTierLimit": "2 free projects, 500MB DB, 50,000 MAU",
        "icon": "⚡",
        "endpointsCount": 78,
        "popularityRank": 95
    },
    {
        "id": "resend",
        "name": "Resend Email",
        "category": "Messaging & Voice",
        "constellation": "Pegasus",
        "description": "Modern developer-first transactional email API with React Email templates.",
        "authType": "BEARER",
        "pricing": "FREEMIUM",
        "latencyMs": 55,
        "uptime99": 99.99,
        "freeTierLimit": "3,000 emails / month free",
        "icon": "✉️",
        "endpointsCount": 24,
        "popularityRank": 94
    }
]

@router.get("/apis")
async def list_apis(category: str = None, pricing: str = None):
    results = CATALOG
    if category:
        results = [a for a in results if a["category"].lower() == category.lower()]
    if pricing:
        results = [a for a in results if a["pricing"].lower() == pricing.lower()]
    return results

@router.get("/compare")
async def compare_apis(api_ids: str):
    ids = api_ids.split(",")
    matched = [a for a in CATALOG if a["id"] in ids]
    return {
        "compared": matched,
        "recommendation": "Supabase + Resend provides the fastest developer bootstrap with $0 upfront cost."
    }
