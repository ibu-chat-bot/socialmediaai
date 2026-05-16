from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from app.services.doc_service import doc_service
import os
import shutil
import uuid

router = APIRouter(prefix="/import", tags=["import"])

class WebImportRequest(BaseModel):
    url: str
    board_id: str

@router.post("/web")
async def import_web(request: WebImportRequest):
    try:
        data = doc_service.extract_web_article(request.url)
        # Gerçek uygulamada burada board_id'ye ait bir Node oluşturulur
        return {
            "status": "success",
            "type": "web",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pdf")
async def import_pdf(board_id: str = Form(...), file: UploadFile = File(...)):
    try:
        # Geçici dosya kaydı
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        file_path = os.path.join(temp_dir, f"{uuid.uuid4()}_{file.filename}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # PDF Analizi
        data = doc_service.extract_pdf_text(file_path)
        
        # Temizlik
        os.remove(file_path)
        
        return {
            "status": "success",
            "type": "pdf",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
