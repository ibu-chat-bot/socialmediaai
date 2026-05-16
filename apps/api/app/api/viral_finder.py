from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.apify_service import apify_service
from app.services.ai_service import ai_service
import json

router = APIRouter(prefix="/viral", tags=["viral"])

class ViralAnalyzeRequest(BaseModel):
    topic: str
    platform: str = "instagram"

@router.post("/analyze")
async def analyze_viral_trends(request: ViralAnalyzeRequest):
    try:
        # 1. Sosyal Medyada Arama Yap
        raw_results = apify_service.search_trending_content(request.topic, request.platform)
        
        # 2. Veriyi Sadeleştir
        summarized_data = []
        for item in raw_results[:5]: # İlk 5 sonuç yeterli
            summarized_data.append({
                "caption": item.get("caption") or item.get("text"),
                "likes": item.get("likesCount") or item.get("diggCount"),
                "hashtags": item.get("hashtags")
            })

        # 3. AI ile Analiz Et
        prompt = f"""
        Aşağıdaki '{request.topic}' konusuyla ilgili popüler sosyal medya verilerini analiz et:
        {json.dumps(summarized_data)}

        Lütfen şu bilgileri çıkar:
        1. Viral Fırsatlar: Hangi alt konular şu an popüler?
        2. Trend Formatlar: Videoların yapısı nasıl? (Konuşan kafa, liste, tutorial vb.)
        3. Viral Kancalar (Hooks): Dikkat çeken ilk cümle örnekleri.
        4. Stratejik Öneri: Bu konuda içerik üretecek birine ne önerirsin?
        """

        analysis = await ai_service.generate_text(
            prompt=prompt,
            system_prompt="Sen dünyanın en iyi sosyal medya büyüme uzmanısın."
        )

        return {
            "status": "success",
            "topic": request.topic,
            "analysis": analysis,
            "raw_count": len(raw_results)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
