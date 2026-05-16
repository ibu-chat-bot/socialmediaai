import os
import yt_dlp
import requests
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

celery_app = Celery("tasks", broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"))

API_URL = "http://localhost:8000"

@celery_app.task(name="process_youtube_video")
def process_youtube_video(video_url: str, board_id: str, job_id: str):
    def update_job(progress, message):
        requests.post(f"{API_URL}/jobs/{job_id}/update", json={
            "progress": progress,
            "message": message
        })

    try:
        # Step 1: Metadata
        update_job(10, "Video bilgileri çekiliyor...")
        ydl_opts = {'quiet': True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            video_data = {"title": info.get('title'), "id": info.get('id')}

        # Step 2: Analysis
        update_job(40, "Yapay zeka ile analiz ediliyor...")
        # (AI Analiz simülasyonu)
        
        # Step 3: Creating Nodes
        update_job(80, "Tuval kartları oluşturuluyor...")
        requests.post(f"{API_URL}/boards/{board_id}/nodes", json={
            "id": f"yt-{video_data['id']}",
            "type": "video",
            "position": {"x": 100, "y": 100},
            "data": {"label": video_data['title'], "url": video_url}
        })

        # Final
        update_job(100, "Tamamlandı")
        requests.post(f"{API_URL}/jobs/{job_id}/complete")

    except Exception as e:
        requests.post(f"{API_URL}/jobs/{job_id}/fail", json={"error": str(e)})
        return {"status": "failed", "error": str(e)}
