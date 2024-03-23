from .userRouter import router
from fastapi import Depends, HTTPException, status
from fastapi_jwt_auth import AuthJWT
from src.utils.db_dependency import get_session
from sqlalchemy.orm import Session
from src.utils.jwtUtils import create_access_token, create_refresh_token

from src.schemas import userSchema

from src.models.userModel import User, TokenTable
from .controller import get_user_by_email



@router.post("/register")
def register_user(user: userSchema.UserCreate, session: Session = Depends(get_session)):
    
    existing_user = User.get_user_by_username(user.username)
    existing_email = User.get_user_by_email(user.email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        username= user.username,
        first_name= user.first_name,
        last_name = user.last_name,
        email = user.email,
        password_hash = user.password
    )

    #generate password hash
    new_user.set_password(user.password)

    #save created user 
    new_user.save(commit=True, db=session)

    return {"message":"user created successfully"}


@router.post("/login")
def login_user(request: userSchema.LoginUser, session: Session = Depends(get_session)):
    
    # db.query(User).filter_by(email=request.email).first()
    user = get_user_by_email(session, request.email)

    verify_password = user.check_password(request.password)

    if not verify_password:
        raise HTTPException(
            status_code=400,
            detail="Incorrect Password"
        )
    
    #generate access and refresh tokens
    access_token = create_access_token(request.username)
    refresh_token = create_refresh_token(request.username)

    #add tokens to TokenTable

    token_entry = TokenTable(id=user.id, access_token=access_token, refresh_token=refresh_token, status=True)

    #save into token_table
    token_entry.save(db=session, commit=True)

    return {
        "message":"Logged in successfully",
        "tokens" : {
            "access_token": access_token,
            "refresh_token": refresh_token
        } 
    }
# Any valid JWT access token can access this endpoint
@router.get("/protected")
def get_logged_in_user(Authorize:AuthJWT=Depends()):
    try:
        Authorize.jwt_required()

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid token")
    
    current_user= Authorize.get_jwt_subject()

    return {"current_user":current_user}


@router.post('/refresh')
def refresh_token(Authorize:AuthJWT=Depends()):
    """
    Refresh token endpoint. This will generate a new access token from
    the refresh token, but will mark that access token as non-fresh,
    as we do not actually verify a password in this endpoint.
    """

    try:
        Authorize.jwt_refresh_token_required()

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid token")

    current_user=Authorize.get_jwt_subject()

    access_token= create_access_token(subject=current_user)

    return {"new_access_token":access_token}



@router.post("/fresh-login")
def fresh_login(user: userSchema.LoginUser, Authorize: AuthJWT=Depends(), session: Session=Depends(get_session)):
    """
    Fresh login endpoint. This is designed to be used if we need to
    make a fresh token for a user (by verifying they have the
    correct username and password). Unlike the standard login endpoint,
    this will only return a new access token, so that we don't keep
    generating new refresh tokens, which entirely defeats their point.
    """
    current_user = get_user_by_email(session=session, email=user.email)

    if user.username != current_user.username or user.password != current_user.password_hash:
        raise HTTPException(status_code=401,detail="Bad username or password")

    new_access_token = create_access_token(subject=user.username,fresh=True)
    return {"access_token": new_access_token}