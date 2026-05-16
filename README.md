# Nailing AI Clone — Foundation

This is the foundational architecture for the Nailing AI clone.

## Architecture
- **apps/web**: Next.js (Frontend)
- **apps/api**: FastAPI (Backend)
- **apps/workers**: Celery (Async Jobs)
- **packages/**: Shared UI, types, and logic

## Local Startup

### 1. Requirements
- Node.js 20+
- pnpm 8+
- Python 3.11+
- Docker & Docker Compose

### 2. Environment Setup
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

### 3. Installation
```bash
pnpm install
```

### 4. Running with Docker (Recommended)
```bash
docker-compose up --build
```

### 5. Running Individually
- **Frontend**: `pnpm --filter @nailing/web dev`
- **Backend**: `cd apps/api && uvicorn app.main:app --reload`
- **Workers**: `cd apps/workers && celery -A main.celery_app worker --loglevel=info`

## Health Checks
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/health
- Workers: Check docker logs
