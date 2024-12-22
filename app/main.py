# FastAPI app's entry point

from fastapi import FastAPI
from app.routes import metrics
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="GitHub Metrics API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(metrics.router, prefix="/metrics")