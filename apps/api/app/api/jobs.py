from fastapi import APIRouter, HTTPException, Body
from app.services.job_service import job_service
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/jobs", tags=["jobs"])

class ProgressUpdate(BaseModel):
    progress: int
    message: str

@router.get("/{job_id}")
async def get_job_status(job_id: str):
    job = job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/{job_id}/update")
async def update_job(job_id: str, data: ProgressUpdate):
    job_service.update_progress(job_id, data.progress, data.message)
    return {"status": "updated"}

@router.post("/{job_id}/complete")
async def complete_job(job_id: str, result: Dict[str, Any] = Body({})):
    job_service.complete_job(job_id, result)
    return {"status": "completed"}

@router.post("/{job_id}/fail")
async def fail_job(job_id: str, data: Dict[str, Any] = Body({})):
    job_service.fail_job(job_id, data.get("error", "Unknown error"))
    return {"status": "failed"}
