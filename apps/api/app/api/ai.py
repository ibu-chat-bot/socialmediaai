from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
from app.services.ai_service import ai_service

router = APIRouter(prefix="/ai", tags=["ai"])

class ChatRequest(BaseModel):
    prompt: str
    context: Optional[str] = ""
    provider: Optional[str] = "openai"
    model: Optional[str] = None

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        async def event_generator():
            async for chunk in ai_service.chat_stream(
                prompt=request.prompt,
                context=request.context,
                provider=request.provider,
                model=request.model
            ):
                yield chunk

        return StreamingResponse(event_generator(), media_type="text/plain")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/providers")
async def get_providers():
    return {
        "openai": True,
        "anthropic": True,
        "google": True
    }

@router.post("/test")
async def test_ai(prompt: str = "Merhaba"):
    # ... mevcut test kodu ...
    pass
