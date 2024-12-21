# FastAPI app's entry point

from fastapi import FastAPI
from app.routes import metrics

app = FastAPI(title="GitHub Metrics API", version="1.0.0")

app.include_router(metrics.router, prefix="/metrics")
