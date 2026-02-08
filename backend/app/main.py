import logging
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_client
from app.routers import bac, drinks, sobriety, users
from app.services.indexes import create_indexes

logger = logging.getLogger(__name__)

# --------------------
# Lifespan (startup / shutdown)
# --------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # MongoDB: connect, ping, set db, create indexes
    client = create_client()
    try:
        await client.admin.command("ping")
        logger.info("Successfully connected to MongoDB Atlas")
    except Exception as e:
        logger.exception("MongoDB connection failed: %s", e)
        raise ConnectionError(
            "MongoDB connection failed. Check MONGODB_URI and network."
        ) from e

    app.state.db = client.get_database("saferound")
    await create_indexes(app.state.db)

    # Shared HTTP client (e.g. Gemini, external APIs)
    app.state.http_client = httpx.AsyncClient(timeout=30.0)

    yield

    await app.state.http_client.aclose()
    client.close()


# --------------------
# App initialization
# --------------------
app = FastAPI(
    title="SafeRound API",
    description="Safety and drink validation backend",
    lifespan=lifespan,
)

# --------------------
# CORS Middleware
# --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # web dev
        "http://localhost:19006",     # expo web
        "http://127.0.0.1:19006",
        "http://10.186.38.91:19006",  # expo on phone (optional)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚠️ During development ONLY, you can simplify to:
# allow_origins=["*"]
# (Do NOT ship that to prod with credentials enabled)

# --------------------
# Routers
# --------------------
app.include_router(drinks.router)
app.include_router(bac.router)
app.include_router(sobriety.router)
app.include_router(users.router)

# --------------------
# Health & root
# --------------------
@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "SafeRound API",
        "docs": "/docs",
        "health": "/health",
    }

@app.get("/health")
async def health():
    return {"status": "ok"}