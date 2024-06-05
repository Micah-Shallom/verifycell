from fastapi import APIRouter, Depends, HTTPException, status,Request
from app.src.schemas.userSchema import UserCreate
from .controller import get_user_by_email, get_user_by_username
from app.src.utils.db_dependency import get_session
from sqlalchemy.orm import Session
from app.src.schemas.userSchema import UserCreate, GetUser, LoginUser, GetLogin
from app.src.models.userModel import User
from app.src.utils.jwtUtils import create_access_token, create_refresh_token
from app.src.schemas.tokenSchema import Token, RefreshToken, TokenData
from app.src.utils.jwtUtils import verify_refresh_token
from app.src.utils.verification import send_user_otp, verify_user_otp
from app.src.schemas.verificationSchema import SendOTP, VerifyOTP
from app.src.utils.exception import handle_status_code
from app.src.config.config import config
import logging


logger = logging.getLogger(__name__)



router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
    responses={404: {"description":"Not found"}}
)

@router.get("/greet", summary="Greet user")
async def root():
    return {"message": "Hello World"}

@router.post("/register", response_model=GetUser, summary="Create a new user")
async def register_user(user: UserCreate, db: Session = Depends(get_session)):
    
    
    #create new user entry in the database
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



@router.post("/login", response_model=GetLogin, summary="Login user")
async def login_user(user: LoginUser, db: Session = Depends(get_session)):
    """
        Login user based on email and password
        User login endpoint
    """
    userP = get_user_by_email(user.email, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email {user.email} not found"
        )
    
    # perform password check
    if not userP.check_password(user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid password"
        )
    
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_id": userP.id
    }

@router.post("/refresh", response_model=Token, summary="Refresh token")
async def refresh_token(refresh_token: RefreshToken,  db: Session = Depends(get_session)):
    """
        Refresh token endpoint
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

#look into passwordbearer authentication

# a simple endpoint that returns the request headers
@router.get("/test-auth")
async def test_auth(request: Request):
    headers = request.headers
    return {"headers": headers}

@router.post("/verify-otp", summary="Verify OTP")
async def verify_otp(data: VerifyOTP):
    """
        Verify OTP endpoint
    """
    #verify otp
    # print("Verifying OTP...")
    logger.info("Verifying OTP...")


    otp_response = verify_user_otp(
        verification_reference=data.verification_reference,
        verification_code=data.verification_code,
        api_key=config.SENDCHAMP_API_KEY
    )

    # if otp_response.status_code != 200:
    # Use the function
    status_code = otp_response.status_code
    message = handle_status_code(status_code)
    logger.info(f"Response status code: {status_code}, message: {message}")

    return {
        "status_code": status_code,
        "message": message
    }



@router.post("/send-otp", summary="Send OTP")
async def send_otp(user: SendOTP, db: Session = Depends(get_session)):
    #querying database to check if user already exists
    #if user exists, return error message
    #if user does not exist, create new user
    """
        Create a new user
    """
    if not user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please add Email"
        )

    userE = get_user_by_email(user.email, db)
    username =  get_user_by_username(user.username, db)

    if userE != None:
        print("User with email {user.email} already exists")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User with email {user.email} already exists"
        )

    
    if username != None:
        print("User with username {user.username} already exists")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User with username {user.username} already exists"
        )
    
    """
        perform phone number verification
        send otp to user
    """

    #send otp to the user
    # print("Sending OTP to user...")
    logger.info(f"Sending OTP to user {user.phone_number}")

    otp_response = send_user_otp(
        phone_number=user.phone_number,
        token_length=6,
        expiration_time=10, #10mins
        api_key= config.SENDCHAMP_API_KEY
    )

    logger.info(f"OTP response: {otp_response}")
    
    # if otp_response.status_code != 200:
    # Use the function
    status_code = otp_response.status_code
    message = handle_status_code(status_code)
    logger.info(f"Response status code: {status_code}, message: {message}")

    print(otp_response)

    # return {
    #     "status_code": status_code,
    #     "message": message,
    #     "otp_response": otp_response.json()
    # }
    return otp_response.json()
