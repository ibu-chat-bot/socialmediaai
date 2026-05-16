from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.apify_service import apify_service

router = APIRouter(prefix="/import", tags=["import"])

class SocialImportRequest(BaseModel):
    url: str
    board_id: str

@router.post("/instagram")
async def import_instagram(request: SocialImportRequest):
    try:
        data = apify_service.scrape_instagram(request.url)
        return {
            "status": "success",
            "platform": "instagram",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tiktok")
async def import_tiktok(request: SocialImportRequest):
    try:
        data = apify_service.scrape_tiktok(request.url)
        return {
            "status": "success",
            "platform": "tiktok",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
