from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from app.services.ai_service import ai_service
import os
import shutil
import uuid

router = APIRouter(prefix="/import", tags=["import"])

@router.post("/image")
async def import_image(board_id: str = Form(...), file: UploadFile = File(...)):
    try:
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        file_path = os.path.join(temp_dir, f"{uuid.uuid4()}_{file.filename}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # AI Analizi (Vision)
        analysis = await ai_service.analyze_image(file_path)
        
        # Temizlik (Gerçekte buluta yüklenir)
        # os.remove(file_path)
        
        return {
            "status": "success",
            "type": "image",
            "analysis": analysis,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/audio")
async def import_audio(board_id: str = Form(...), file: UploadFile = File(...)):
    try:
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        file_path = os.path.join(temp_dir, f"{uuid.uuid4()}_{file.filename}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Whisper Deşifre
        transcript = await ai_service.transcribe_audio(file_path)
        
        os.remove(file_path)
        
        return {
            "status": "success",
            "type": "audio",
            "transcript": transcript,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
