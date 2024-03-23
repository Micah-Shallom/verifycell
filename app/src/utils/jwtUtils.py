import os
from passlib.context import CryptContext
from typing import Union, Any
from jose import jwt
from datetime import datetime, timedelta
from src.config import config
from fastapi_jwt_auth import AuthJWT
from fastapi import Depends


password_context = CryptContext(schemes=["bcrypt"], deprected="auto")

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(password: str, hashed_pas: str) -> bool:
    return password_context.verify(password, hashed_pas)


def create_access_token(subject: Union[str, Any], Authorize: AuthJWT = Depends()) -> str:
    """
    create_access_token supports an optional 'fresh' argument,
    which marks the token as fresh or non-fresh accordingly.
    As we just verified their username and password, we are
    going to mark the token as fresh here.
    """
    return Authorize.create_access_token(subject=subject, fresh=True)


def create_refresh_token(subject: Union[str, Any], Authorize: AuthJWT = Depends()) -> str:
    return Authorize.create_refresh_token(subject=subject)


# def create_access_token(subject: Union[str, Any], expires_delta:int = None) -> str:
#     if expires_delta is not None:
#         expires_delta = datetime.utcnow() + expires_delta
#     else:
#         expires_delta = datetime.utcnow() + timedelta(minutes=config.JWT_ACCESS_TOKEN_EXPIRES)


#     to_encode = {"exp":expires_delta, "sub": str(subject)}
#     encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY,config.ALGORITHM)
#     return encoded_jwt

# def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
#     if expires_delta is not None:
#         expires_delta = datetime.utcnow() + expires_delta
#     else:
#         expires_delta = datetime.utcnow() + timedelta(minutes=config.JWT_REFRESH_TOKEN_EXPIRES)
    
#     to_encode = {"exp": expires_delta, "sub": str(subject)}
#     encoded_jwt = jwt.encode(to_encode, config.JWT_REFRESH_SECRET_KEY, config.ALGORITHM)
#     return encoded_jwt

