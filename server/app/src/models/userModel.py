from sqlalchemy import Column, String, Boolean, ForeignKey
from .baseInfoModel import BaseInfoModel
from app.src.config.database import Base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, Session



class User(Base, BaseInfoModel):

    __tablename__ = "users"

    firstname = Column(String, index=True)
    lastname = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String(128))
    phone_number = Column(String)

    def set_password(self, password:str):
        self.password = generate_password_hash(password)

    def check_password(self, password:str):
        return check_password_hash(self.password_hash, password)
    
    @classmethod
    def get_user_by_username(cls, session: Session, username:str):
        return session.query(cls).filter_by(username=username).first()

    @classmethod
    def get_user_by_email(cls, session:Session, email:str):
        return session.query(cls).filter_by(email=email).first()

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email} created>"
    
class TokenTable(Base, BaseInfoModel):
    __tablename__ = "tokentable"

    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450), nullable=False)
    status = Column(Boolean, default=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    user = relationship("User", backref="users")
    