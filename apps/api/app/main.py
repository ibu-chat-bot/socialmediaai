# --- NAILING AI CLONE: MAIN API ENTRY POINT ---
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    boards, ai, import_youtube, import_docs, 
    import_media, import_social, viral_finder, 
    competitor, jobs
)

app = FastAPI(
    title="Nailing AI Clone API",
    description="Professional Multimodal Social Media Intelligence Platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router Registration
app.include_router(boards.router)
app.include_router(ai.router)
app.include_router(import_youtube.router)
app.include_router(import_docs.router)
app.include_router(import_media.router)
app.include_router(import_social.router)
app.include_router(viral_finder.router)
app.include_router(competitor.router)
app.include_router(jobs.router)

@app.get("/health")
async def health_check():
    return {"status": "online", "service": "api"}

@app.get("/")
async def root():
    return {"message": "Welcome to Nailing AI Clone API"}
