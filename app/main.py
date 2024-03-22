from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.src.routes import auth
from app.src.config.config import Config


config = Config()
app = FastAPI()

# CORS middleware to allow cross-origin requests (if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with frontend URL(s) in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include route definitions
# app.include_router(auth.router)  # Include authentication routes
# Include other route definitions as needed

# Startup event handlers, if any
@app.on_event("startup")
async def startup_event():
    # Any startup tasks such as connecting to the database can go here
    pass


@app.get("/")
def main_function():
    return "Hello World"

# Shutdown event handlers, if any
@app.on_event("shutdown")
async def shutdown_event():
    # Any shutdown tasks such as closing database connections can go here
    pass
