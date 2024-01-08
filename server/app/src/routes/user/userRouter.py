from fastapi import APIRouter, Depends, HTTPException, status
from app.src.schemas.userSchema import UserCreate
from .controller import get_user_by_email
from app.src.utils.db_dependency import get_session
from sqlalchemy.orm import Session, object_session
from app.src.schemas.userSchema import UserCreate, GetUser, LoginUser
from app.src.models.userModel import User
from app.src.utils.jwtUtils import create_access_token, create_refresh_token


router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description":"Not found"}}
)

@router.get("/greet", summary="Greet user")
async def root():
    return {"message": "Hello World"}

@router.post("/register", response_model=GetUser, summary="Create a new user")
async def register_user(user: UserCreate, db: Session = Depends(get_session)):
    
    #querying database to check if user already exists
    #if user exists, return error message
    #if user does not exist, create new user

    if not user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please add Email"
        )

    userE = get_user_by_email(user.email, db)

    if userE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User with email {user.email} already exists"
        )

    new_user = User(
        fullname=user.fullname,
        username=user.username,
        email=user.email,
        password=user.password,
        phone_number=user.phone_number
    )

    

    new_user.save(db, commit=True)
    return user

@router.post("/login", response_model=GetUser, summary="Login user")
async def login_user(user: LoginUser, db: Session = Depends(get_session)):
    """
        Login user based on email and password
    """
    user = get_user_by_email(db, user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email {user.email} not found"
        )
    
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_id": user.id
    }


#look into passwordbearer authentication

