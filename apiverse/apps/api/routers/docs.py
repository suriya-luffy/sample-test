from fastapi import APIRouter

router = APIRouter(prefix="/docs", tags=["Documentation Hub"])

DOCS_INDEX = [
    {
        "id": "doc_stripe_01",
        "api": "Stripe",
        "endpoint": "POST /v1/payment_intents",
        "summary": "Create a PaymentIntent object to start payment collection flow.",
        "parameters": [
            {"name": "amount", "type": "integer", "required": True, "desc": "Amount intended to be collected in cents."},
            {"name": "currency", "type": "string", "required": True, "desc": "Three-letter ISO currency code (e.g. usd)."}
        ],
        "aiExplanation": "A PaymentIntent guides the complete payment lifecycle, orchestrating 3D Secure verification, retries, and webhook status pushes."
    },
    {
        "id": "doc_openai_01",
        "api": "OpenAI",
        "endpoint": "POST /v1/chat/completions",
        "summary": "Creates a model response for the given chat conversation.",
        "parameters": [
            {"name": "model", "type": "string", "required": True, "desc": "ID of the model to use (e.g. gpt-4o)."},
            {"name": "messages", "type": "array", "required": True, "desc": "A list of messages comprising the conversation so far."}
        ],
        "aiExplanation": "Generates streamable completions supporting structured outputs (JSON schema), tool/function calling, and multi-modal inputs."
    }
]

@router.get("/")
async def list_docs():
    return DOCS_INDEX
