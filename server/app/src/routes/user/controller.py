from fastapi import Depends
from pydantic import EmailStr
from sqlalchemy.orm import Session
from app.src.models.userModel import User  # Assuming this imports your User model
from app.src.config.database import SessionLocal  # Assuming this imports your SessionLocal

def get_user_by_email(email: EmailStr, session: Session = Depends(SessionLocal)) -> User:
    """
    Retrieves a user from the database based on email address.

    Args:
        email (EmailStr): The email address of the user to fetch.
        session (Session, optional): SQLAlchemy database session. Defaults to Depends(SessionLocal).

    Returns:
        User: The user object corresponding to the given email address.
    """
    user = session.query(User).filter_by(email=email).first()
    return user

def get_user_by_username(username: str, session: Session = Depends(SessionLocal)) -> User:
    """
    Retrieves a user from the database based on username.

    Args:
        username (str): The username of the user to fetch.
        session (Session, optional): SQLAlchemy database session. Defaults to Depends(SessionLocal).

    Returns:
        User: The user object corresponding to the given username.
    """
    user = session.query(User).filter_by(username=username).first()
    return user
