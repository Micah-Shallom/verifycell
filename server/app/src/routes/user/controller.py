from fastapi import HTTPException
from pydantic import EmailStr
from sqlalchemy.orm import Session
from app.src.models.userModel import User


def get_user_by_email(session: Session, email:EmailStr) -> User:
    user = session.query(User).filter_by(email=email).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"There is no user with the email {email}"
        )
    return user