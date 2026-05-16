# Worker Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Medya işleme için ffmpeg şart
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Celery worker'ı başlat
CMD ["celery", "-A", "tasks", "worker", "--loglevel=info"]
