from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/recommender", tags=["AI Project Recommender"])

class IdeaInput(BaseModel):
    idea: str

@router.post("/recommend")
async def recommend_stack(data: IdeaInput):
    return {
        "idea": data.idea,
        "recommendedStack": [
            {
                "service": "Next.js 14 + Supabase",
                "role": "Core Framework & Database",
                "freeTier": "Free $0/mo tier",
                "why": "Instant PostgreSQL, Row Level Security, Edge Functions and Realtime WebSockets out of the box."
            },
            {
                "service": "Stripe Checkout",
                "role": "Monetization",
                "freeTier": "Pay as you transact (no fixed monthly fee)",
                "why": "Global payment methods, built-in tax compliance, customer billing portal."
            },
            {
                "service": "Resend",
                "role": "Email & Notifications",
                "freeTier": "3,000 free emails/mo",
                "why": "Modern developer ergonomics with React Email templates."
            },
            {
                "service": "OpenAI / Claude API",
                "role": "Intelligence Layer",
                "freeTier": "Pay per token (~$5-20/mo pilot)",
                "why": "High-accuracy semantic extraction and code synthesis."
            }
        ],
        "estimatedMonthlyCost": "$15 - $45 / month (initial pilot)",
        "tradeoffs": "Using Supabase minimizes backend maintenance, but migration to self-hosted Postgres is straightforward if database volume surpasses 100GB."
    }
