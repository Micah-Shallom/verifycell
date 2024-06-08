from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.src.schemas.userSchema import UserCreate, GetUser, LoginUser, GetLogin, GetUserProfile
from app.src.models.userModel import User
from app.src.utils.db_dependency import get_session
from sqlalchemy.orm import Session
from app.src.utils.jwtUtils import create_access_token, create_refresh_token
from app.src.schemas.tokenSchema import Token, RefreshToken, TokenData
from app.src.utils.jwtUtils import verify_refresh_token
from app.src.utils.verification import send_user_otp, verify_user_otp
from app.src.schemas.verificationSchema import SendOTP, VerifyOTP
from app.src.utils.exception import handle_status_code
from app.src.config.config import config
from app.src.routes.user.controller import get_user_by_email, get_user_by_username
import logging

# Initialize logger
logger = logging.getLogger(__name__)

# Create a router instance
router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}}
)

# Simple greet endpoint
@router.get("/greet", summary="Greet user")
async def root():
    return {"message": "Hello World"}

# Register user endpoint
@router.post("/register", response_model=GetUser, summary="Create a new user")
async def register_user(user: UserCreate, db: Session = Depends(get_session)):
    """
    Create a new user endpoint.

    Args:
        user (UserCreate): User creation data.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_session).

    Returns:
        GetUser: Created user data.
    """
    # Create a new user entry in the database
    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        username=user.username,
        email=user.email,
        password=user.password,
        phone_number=user.phone_number
    )

    new_user.set_password(user.password)

    new_user.save(db, commit=True)
    return user

# Login user endpoint
@router.post("/login", response_model=GetLogin, summary="Login user")
async def login_user(user: LoginUser, db: Session = Depends(get_session)):
    """
    Login user based on email and password.

    Args:
        user (LoginUser): User login credentials.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_session).

    Returns:
        GetLogin: Login response with access token, refresh token, and user data.
    """
    userP = get_user_by_email(user.email, db)
    if not userP:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email {user.email} not found"
        )
    
    # Perform password check
    if not userP.check_password(user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid password"
        )
    
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    userJson = {
        "firstname": userP.firstname,
        "lastname": userP.lastname,
        "username": userP.username,
        "email": userP.email,
        "phone_number": userP.phone_number
    }

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": userJson
    }

# Refresh token endpoint
@router.post("/refresh", response_model=Token, summary="Refresh token")
async def refresh_token(refresh_token: RefreshToken,  db: Session = Depends(get_session)):
    """
    Refresh token endpoint.

    Args:
        refresh_token (RefreshToken): Refresh token data.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_session).

    Returns:
        Token: Refreshed access token data.
    """
    user = verify_refresh_token(refresh_token.refresh_token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    access_token = create_access_token(user.email)
    email_token = TokenData(email=user.email)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": email_token
    }

# Test authentication endpoint
@router.get("/test-auth")
async def test_auth(request: Request):
    """
    A simple endpoint that returns the request headers.

    Args:
        request (Request): FastAPI request object.

    Returns:
        dict: Request headers.
    """
    headers = request.headers
    return {"headers": headers}

# Verify OTP endpoint
@router.post("/verify-otp", summary="Verify OTP")
async def verify_otp(data: VerifyOTP):
    """
    Verify OTP endpoint.

    Args:
        data (VerifyOTP): Verification data.

    Returns:
        dict: Response status code and message.
    """
    logger.info("Verifying OTP...")

    otp_response = verify_user_otp(
        verification_reference=data.verification_reference,
        verification_code=data.verification_code,
        api_key=config.SENDCHAMP_API_KEY
    )

    status_code = otp_response.status_code
    message = handle_status_code(status_code)
    logger.info(f"Response status code: {status_code}, message: {message}")

    return {
        "status_code": status_code,
        "message": message
    }

# Send OTP endpoint
@router.post("/send-otp", summary="Send OTP")
async def send_otp(user: SendOTP, db: Session = Depends(get_session)):
    """
    Send OTP endpoint.

    Args:
        user (SendOTP): User data for sending OTP.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_session).

    Returns:
        dict: OTP response JSON.
    """
    if not user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please add Email"
        )

    userE = get_user_by_email(user.email, db)
    username = get_user_by_username(user.username, db)

    if userE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User with email {user.email} already exists"
        )

    if username:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User with username {user.username} already exists"
        )

    logger.info(f"Sending OTP to user {user.phone_number}")

    otp_response = send_user_otp(
        phone_number=user.phone_number,
        token_length=6,
        expiration_time=10,  # 10mins
        api_key=config.SENDCHAMP_API_KEY
    )

    logger.info(f"OTP response: {otp_response}")

    status_code = otp_response.status_code
    message = handle_status_code(status_code)
    logger.info(f"Response status code: {status_code}, message: {message}")

    return otp_response.json()

# Get user profile endpoint
@router.get("/profile/{username}", response_model=GetUserProfile, summary="Get user profile")
async def get_user_profile(username: str, db: Session = Depends(get_session)):
    """
    Get user profile endpoint.

    Args:
        username (str): Username of the user profile to fetch.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_session).

    Returns:
        dict: User profile data.
    """
    user = get_user_by_username(username, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    userJson = {
        "user": {
            "firstname": user.firstname,
            "lastname": user.lastname,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number
        }
    }

    return userJson
