from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.src.routes.user.userRouter import router as userRouter
import logging


app = FastAPI()

# Adjust SQLAlchemy logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine.Engine').setLevel(logging.WARNING)

# CORS middleware to allow cross-origin requests (if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with frontend URL(s) in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include route definitions
app.include_router(userRouter)
