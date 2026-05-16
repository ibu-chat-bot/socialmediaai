from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from celery import Celery
import os

router = APIRouter(prefix="/import", tags=["import"])

# Celery Client
celery_app = Celery("tasks", broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"))

class YoutubeImportRequest(BaseModel):
    url: str
    board_id: str

@router.post("/youtube")
async def import_youtube(request: YoutubeImportRequest):
    try:
        # Kuyruğa ekle
        task = celery_app.send_task(
            "process_youtube_video",
            args=[request.url, request.board_id]
        )
        return {"status": "queued", "task_id": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
