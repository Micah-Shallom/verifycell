from sqlalchemy import Column, String, Boolean, ForeignKey
from .baseInfoModel import BaseInfoModel  # Assuming this imports your base model
from app.src.config.database import Base  # Assuming this imports your SQLAlchemy Base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, Session

class User(Base, BaseInfoModel):
    """User model representing a user in the application."""

    __tablename__ = "users"

    # Columns
    firstname = Column(String, index=True)
    lastname = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String(450))
    phone_number = Column(String)

    def set_password(self, password: str):
        """Hashes and sets the user's password."""
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        """Checks if the provided password matches the hashed password."""
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_username(cls, session: Session, username: str):
        """Fetches a user by username from the database."""
        return session.query(cls).filter_by(username=username).first()

    @classmethod
    def get_user_by_email(cls, session: Session, email: str):
        """Fetches a user by email from the database."""
        return session.query(cls).filter_by(email=email).first()

    def __repr__(self):
        """String representation of the User instance."""
        return f"<User(username={self.username}, email={self.email})>"

class TokenTable(Base, BaseInfoModel):
    """TokenTable model to store access and refresh tokens."""

    __tablename__ = "tokentable"

    # Columns
    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450), nullable=False)
    status = Column(Boolean, default=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    # Relationships
    user = relationship("User", backref="users")
