from fastapi import APIRouter

router = APIRouter(prefix="/community", tags=["Community Hub"])

POSTS = [
    {
        "id": "post_01",
        "author": "Sarah Connor",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        "title": "Production Checklist for Zero-Downtime Stripe Webhook Handlers",
        "content": "Make sure your webhook handlers verify cryptographic signatures with tolerance, return 200 before long-running tasks, and store idempotent event IDs.",
        "upvotes": 142,
        "commentsCount": 18,
        "tags": ["stripe", "webhooks", "reliability"],
        "createdAt": "2 hours ago"
    },
    {
        "id": "post_02",
        "author": "Neo Anderson",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        "title": "Shared Collection: Complete AI Agent Toolset (OpenAI + Tavily + Upstash)",
        "content": "Importable APIVerse collection pre-configured with rate limit safety and Ultron prompt templates.",
        "upvotes": 289,
        "commentsCount": 34,
        "tags": ["ai", "agents", "starter-kit"],
        "createdAt": "Yesterday"
    }
]

@router.get("/feed")
async def get_community_feed():
    return POSTS
