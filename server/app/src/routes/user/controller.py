from fastapi import Depends
from pydantic import EmailStr
from sqlalchemy.orm import Session
from app.src.models.userModel import User
from app.src.config.database import SessionLocal


def get_user_by_email(email:EmailStr , session: Session = Depends(SessionLocal)) -> User:
    user = session.query(User).filter_by(email=email).first()
    return user

def get_user_by_username(username:str , session: Session = Depends(SessionLocal)) -> User:
    user = session.query(User).filter_by(username=username).first()

    return user


