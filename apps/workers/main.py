import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "nailing_workers",
    broker=REDIS_URL,
    backend=REDIS_URL
)

@celery_app.task(name="health_check")
def health_check():
    return {"status": "online", "service": "worker"}
