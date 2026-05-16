from typing import Optional, Dict, Any
import uuid
from datetime import datetime

# MOCK DB (Real DB integration will use this interface)
jobs_db = {}

class JobService:
    def create_job(self, type: str, board_id: str, payload: Dict[str, Any] = {}) -> str:
        job_id = str(uuid.uuid4())
        jobs_db[job_id] = {
            "id": job_id,
            "type": type,
            "board_id": board_id,
            "status": "queued",
            "progress": 0,
            "message": "Sıraya alındı...",
            "payload": payload,
            "created_at": datetime.utcnow()
        }
        return job_id

    def update_progress(self, job_id: str, progress: int, message: str):
        if job_id in jobs_db:
            jobs_db[job_id].update({
                "status": "running",
                "progress": progress,
                "message": message,
                "updated_at": datetime.utcnow()
            })

    def complete_job(self, job_id: str, result: Dict[str, Any] = {}):
        if job_id in jobs_db:
            jobs_db[job_id].update({
                "status": "completed",
                "progress": 100,
                "message": "Tamamlandı",
                "result": result,
                "updated_at": datetime.utcnow()
            })

    def fail_job(self, job_id: str, error: str):
        if job_id in jobs_db:
            jobs_db[job_id].update({
                "status": "failed",
                "message": f"Hata: {error}",
                "updated_at": datetime.utcnow()
            })

    def get_job(self, job_id: str) -> Optional[Dict[str, Any]]:
        return jobs_db.get(job_id)

job_service = JobService()
