from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.src.routes.user import userRouter
from contextlib import asynccontextmanager
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import JSONResponse
from app.src.schemas.userSchema import Settings
import uvicorn


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
app.include_router(userRouter.router)  # Include authentication routes

# Startup event handlers, if any
@asynccontextmanager
async def startup_event():
    # Any startup tasks such as connecting to the database can go here
    pass


@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

# Shutdown event handlers, if any
@asynccontextmanager
async def shutdown_event():
    # Any shutdown tasks such as closing database connections can go here
    pass

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)