from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.apify_service import apify_service
from app.services.ai_service import ai_service
import json

router = APIRouter(prefix="/competitor", tags=["competitor"])

class CompetitorAnalyzeRequest(BaseModel):
    url: str
    platform: str = "instagram"

@router.post("/analyze")
async def analyze_competitor(request: CompetitorAnalyzeRequest):
    try:
        # 1. Rakip Verilerini Çek
        posts = apify_service.scrape_profile_data(request.url, request.platform)
        
        # 2. Veriyi Sadeleştir
        data_to_analyze = []
        total_likes = 0
        for p in posts[:10]:
            likes = p.get("likesCount") or p.get("diggCount") or 0
            total_likes += likes
            data_to_analyze.append({
                "caption": p.get("caption") or p.get("text"),
                "likes": likes,
                "type": p.get("type"),
                "hashtags": p.get("hashtags")
            })

        avg_likes = total_likes / len(posts) if posts else 0

        # 3. AI Stratejik Analiz
        prompt = f"""
        Aşağıdaki rakip hesaba ({request.platform}) ait son 10 gönderi verilerini analiz et:
        {json.dumps(data_to_analyze)}

        Lütfen şu stratejik raporu çıkar:
        1. Ana İçerik Temaları: Bu hesap en çok hangi konularda paylaşım yapıyor?
        2. Kanca (Hook) Analizi: İnsanları durdurmak için hangi teknikleri kullanıyorlar?
        3. Viral Faktörler: En yüksek beğeni alan gönderilerin ortak noktaları neler?
        4. CTA Stratejisi: Takipçilerini nasıl harekete geçiriyorlar?
        5. Zayıf Noktalar ve Fırsatlar: Biz bu rakipten daha iyi ne yapabiliriz?
        """

        report = await ai_service.generate_text(
            prompt=prompt,
            system_prompt="Sen profesyonel bir pazar araştırmacısı ve rakip stratejisti uzmanısın."
        )

        return {
            "status": "success",
            "avg_engagement": avg_likes,
            "post_count": len(posts),
            "report": report
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
